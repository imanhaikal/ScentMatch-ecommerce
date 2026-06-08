import { hashPassword, verifyPassword } from "./password";
import { createAccountStore } from "./store";
import type { AccountOrder, AccountSnapshot, AccountUser, SavedScentProfile, StoredAccountUser } from "./types";

type AccountStore = ReturnType<typeof createAccountStore>;

interface AccountServiceOptions {
  store?: AccountStore;
}

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class AccountServiceError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

function toPublicUser(user: StoredAccountUser): AccountUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    memberSince: user.memberSince,
    status: user.status,
  };
}

function toSnapshot(user: StoredAccountUser): AccountSnapshot {
  return {
    user: toPublicUser(user),
    scentProfile: user.scentProfile,
    orders: [...user.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  };
}

function validateSignupInput(input: SignupInput) {
  if (!input.name.trim()) throw new AccountServiceError("Name is required.");
  if (!EMAIL_PATTERN.test(input.email.trim())) throw new AccountServiceError("A valid email is required.");
  if (input.password.length < 8) throw new AccountServiceError("Password must be at least 8 characters.");
}

function validateOrder(order: AccountOrder) {
  if (!order.reference.trim()) throw new AccountServiceError("Order reference is required.");
  if (order.items.filter((item) => item.quantity > 0).length === 0) throw new AccountServiceError("Cannot save an account order without cart items.");
}

export function createAccountService(options: AccountServiceOptions = {}) {
  const store = options.store ?? createAccountStore();

  return {
    async signup(input: SignupInput) {
      validateSignupInput(input);
      const existing = await store.findUserByEmail(input.email);
      if (existing) throw new AccountServiceError("An account already exists for this email.", 409);

      const user = await store.createUser({
        name: input.name,
        email: input.email,
        passwordHash: await hashPassword(input.password),
      });

      return toPublicUser(user);
    },
    async login(input: LoginInput) {
      const user = await store.findUserByEmail(input.email);
      if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
        throw new AccountServiceError("Invalid email or password.", 401);
      }

      return toPublicUser(user);
    },
    async getAccount(userId: string) {
      const user = await store.findUserById(userId);
      return user ? toSnapshot(user) : null;
    },
    async saveScentProfile(userId: string, scentProfile: SavedScentProfile) {
      const user = await store.updateScentProfile(userId, scentProfile);
      if (!user) throw new AccountServiceError("Account not found.", 404);
      return toSnapshot(user);
    },
    async saveOrder(userId: string, order: AccountOrder) {
      validateOrder(order);
      const user = await store.addOrder(userId, order);
      if (!user) throw new AccountServiceError("Account not found.", 404);
      return order;
    },
    async saveFeedback(userId: string, reference: string, rating: number, now = new Date()) {
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new AccountServiceError("Feedback rating must be between 1 and 5.");

      const account = await this.getAccount(userId);
      if (!account) throw new AccountServiceError("Account not found.", 404);
      if (!account.orders.some((order) => order.reference === reference)) throw new AccountServiceError("Order not found.", 404);

      const feedback = { rating, submittedAt: now.toISOString() };
      await store.saveOrderFeedback(userId, reference, feedback);
      return feedback;
    },
  };
}
