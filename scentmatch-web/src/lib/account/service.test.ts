import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { createAccountService } from "./service";
import { createAccountStore } from "./store";
import type { AccountOrder, SavedScentProfile } from "./types";

describe("account service", () => {
  let directory: string;
  let service: ReturnType<typeof createAccountService>;

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), "scentmatch-service-"));
    service = createAccountService({ store: createAccountStore({ dataPath: join(directory, "accounts.json") }) });
  });

  afterEach(async () => {
    await rm(directory, { recursive: true, force: true });
  });

  it("signs up users, hides password hashes, and rejects duplicate emails", async () => {
    const user = await service.signup({ name: "Iman Haikal", email: "iman@example.com", password: "secret-passphrase" });

    expect(user).toMatchObject({ name: "Iman Haikal", email: "iman@example.com", memberSince: "2026" });
    expect("passwordHash" in user).toBe(false);
    await expect(service.signup({ name: "Other", email: " IMAN@example.com ", password: "secret-passphrase" })).rejects.toThrow("An account already exists for this email.");
  });

  it("logs in with valid credentials and rejects invalid credentials", async () => {
    const signedUp = await service.signup({ name: "Iman Haikal", email: "iman@example.com", password: "secret-passphrase" });

    await expect(service.login({ email: "iman@example.com", password: "secret-passphrase" })).resolves.toMatchObject({ id: signedUp.id });
    await expect(service.login({ email: "iman@example.com", password: "wrong-passphrase" })).rejects.toThrow("Invalid email or password.");
  });

  it("persists scent profiles, account orders, and feedback", async () => {
    const user = await service.signup({ name: "Iman Haikal", email: "iman@example.com", password: "secret-passphrase" });
    const profile: SavedScentProfile = {
      answers: { environment: "Woodland Cabin", aesthetic: "Vintage & Warm", intensity: "Mysterious" },
      summary: "Woodland Cabin / Vintage & Warm / Mysterious",
      topMatch: { id: "perfume-1", name: "Red", score: 92 },
      savedAt: "2026-06-08T01:00:00.000Z",
    };
    const order: AccountOrder = {
      reference: "SM-20260608-010203",
      createdAt: "2026-06-08T01:02:03.000Z",
      customerEmail: "iman@example.com",
      shipping: { name: "Iman", email: "iman@example.com", address: "1 Lane", city: "KL", postcode: "50000", country: "Malaysia" },
      billingSameAsShipping: true,
      paymentMethod: "Card ending 4242",
      items: [{ id: "perfume-1", variantId: "local:perfume-1", name: "Red", artisan: "Dumont", price: 150, image: "red.jpg", quantity: 1 }],
      pricing: { subtotal: 150, discount: 0, tax: 9, shipping: 15, total: 174, promo: { code: "", isApplied: false, message: "No promo applied." } },
    };

    await service.saveScentProfile(user.id, profile);
    await service.saveOrder(user.id, order);
    await service.saveFeedback(user.id, order.reference, 5, new Date("2026-06-22T01:02:03.000Z"));

    const account = await service.getAccount(user.id);
    expect(account?.scentProfile).toEqual(profile);
    expect(account?.orders[0].feedback).toEqual({ rating: 5, submittedAt: "2026-06-22T01:02:03.000Z" });
  });
});
