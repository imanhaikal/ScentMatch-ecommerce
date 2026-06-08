import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { AccountDatabase, AccountOrder, OrderFeedback, SavedScentProfile, StoredAccountUser } from "./types";

interface AccountStoreOptions {
  dataPath?: string;
}

interface CreateStoredUserInput {
  name: string;
  email: string;
  passwordHash: string;
}

const DEFAULT_DATABASE: AccountDatabase = { users: [] };

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getDataPath(dataPath?: string) {
  return dataPath ?? process.env.SCENTMATCH_ACCOUNT_DATA_PATH ?? ".scentmatch/account-store.json";
}

function createAccountId() {
  return `acct_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
}

export function createAccountStore(options: AccountStoreOptions = {}) {
  const dataPath = getDataPath(options.dataPath);

  async function readDatabase(): Promise<AccountDatabase> {
    try {
      const raw = await readFile(/*turbopackIgnore: true*/ dataPath, "utf8");
      const parsed = JSON.parse(raw) as AccountDatabase;
      return { users: Array.isArray(parsed.users) ? parsed.users : [] };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return { ...DEFAULT_DATABASE, users: [] };
      throw error;
    }
  }

  async function writeDatabase(database: AccountDatabase) {
    await mkdir(/*turbopackIgnore: true*/ dirname(dataPath), { recursive: true });
    const tempPath = `${dataPath}.${process.pid}.${Date.now()}.tmp`;
    await writeFile(/*turbopackIgnore: true*/ tempPath, JSON.stringify(database, null, 2), "utf8");
    await rename(/*turbopackIgnore: true*/ tempPath, dataPath);
  }

  async function updateUser(userId: string, update: (user: StoredAccountUser) => StoredAccountUser) {
    const database = await readDatabase();
    const index = database.users.findIndex((user) => user.id === userId);
    if (index === -1) return null;

    const nextUser = update(database.users[index]);
    database.users[index] = nextUser;
    await writeDatabase(database);
    return nextUser;
  }

  return {
    async createUser(input: CreateStoredUserInput) {
      const database = await readDatabase();
      const email = normalizeEmail(input.email);
      const now = new Date();
      const user: StoredAccountUser = {
        id: createAccountId(),
        name: input.name.trim(),
        email,
        memberSince: String(now.getFullYear()),
        status: "Privé Member",
        passwordHash: input.passwordHash,
        scentProfile: null,
        orders: [],
      };

      database.users.push(user);
      await writeDatabase(database);
      return user;
    },
    async findUserByEmail(email: string) {
      const database = await readDatabase();
      const normalizedEmail = normalizeEmail(email);
      return database.users.find((user) => user.email === normalizedEmail) ?? null;
    },
    async findUserById(userId: string) {
      const database = await readDatabase();
      return database.users.find((user) => user.id === userId) ?? null;
    },
    async updateScentProfile(userId: string, scentProfile: SavedScentProfile) {
      return updateUser(userId, (user) => ({ ...user, scentProfile }));
    },
    async addOrder(userId: string, order: AccountOrder) {
      return updateUser(userId, (user) => {
        const withoutExisting = user.orders.filter((storedOrder) => storedOrder.reference !== order.reference);
        return { ...user, orders: [order, ...withoutExisting] };
      });
    },
    async saveOrderFeedback(userId: string, reference: string, feedback: OrderFeedback) {
      return updateUser(userId, (user) => ({
        ...user,
        orders: user.orders.map((order) => (order.reference === reference ? { ...order, feedback } : order)),
      }));
    },
  };
}
