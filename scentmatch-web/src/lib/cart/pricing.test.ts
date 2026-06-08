import { describe, expect, it } from "vitest";

import { calculateCartPricing } from "./pricing";

describe("calculateCartPricing", () => {
  const items = [
    { price: 100, quantity: 2 },
    { price: 75, quantity: 1 },
  ];

  it("returns subtotal, tax, shipping, and total for a cart", () => {
    expect(calculateCartPricing(items)).toEqual({
      subtotal: 275,
      discount: 0,
      tax: 16.5,
      shipping: 15,
      total: 306.5,
      promo: { code: "", isApplied: false, message: "Add SCENT20 for 20% off your first artisan allocation." },
    });
  });

  it("waives shipping when discounted subtotal reaches the free shipping threshold", () => {
    expect(calculateCartPricing([{ price: 400, quantity: 1 }]).shipping).toBe(0);
  });

  it("applies SCENT20 as a 20 percent subtotal discount before tax and shipping", () => {
    expect(calculateCartPricing(items, " scent20 ")).toEqual({
      subtotal: 275,
      discount: 55,
      tax: 13.2,
      shipping: 15,
      total: 248.2,
      promo: { code: "SCENT20", isApplied: true, message: "SCENT20 applied: 20% off your first artisan allocation." },
    });
  });

  it("returns a useful message for invalid promo codes", () => {
    expect(calculateCartPricing(items, "SAVE10").promo).toEqual({
      code: "SAVE10",
      isApplied: false,
      message: "SAVE10 is not active for this prototype. Use SCENT20.",
    });
  });
});
