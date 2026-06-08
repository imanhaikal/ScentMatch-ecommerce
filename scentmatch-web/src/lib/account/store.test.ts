import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { createAccountStore } from "./store";
import type { AccountOrder, SavedScentProfile } from "./types";

describe("account file store", () => {
  let directory: string;

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), "scentmatch-account-"));
  });

  afterEach(async () => {
    await rm(directory, { recursive: true, force: true });
  });

  it("creates users and finds them by normalized email", async () => {
    const store = createAccountStore({ dataPath: join(directory, "accounts.json") });

    const user = await store.createUser({ name: "Iman Haikal", email: " IMAN@Example.COM ", passwordHash: "hash" });

    expect(user.id).toMatch(/^acct_/);
    expect(user.email).toBe("iman@example.com");
    await expect(store.findUserByEmail("iman@example.com")).resolves.toMatchObject({ id: user.id, email: "iman@example.com" });
  });

  it("updates scent profiles, orders, and feedback for a stored user", async () => {
    const store = createAccountStore({ dataPath: join(directory, "accounts.json") });
    const user = await store.createUser({ name: "Iman Haikal", email: "iman@example.com", passwordHash: "hash" });
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

    await store.updateScentProfile(user.id, profile);
    await store.addOrder(user.id, order);
    await store.saveOrderFeedback(user.id, order.reference, { rating: 4, submittedAt: "2026-06-22T01:02:03.000Z" });

    const updated = await store.findUserById(user.id);
    expect(updated?.scentProfile).toEqual(profile);
    expect(updated?.orders).toHaveLength(1);
    expect(updated?.orders[0].feedback).toEqual({ rating: 4, submittedAt: "2026-06-22T01:02:03.000Z" });
  });
});
