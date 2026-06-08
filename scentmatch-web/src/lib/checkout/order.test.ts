import { describe, expect, it } from "vitest";

import { createPrototypeOrder, formatOrderReference } from "./order";

describe("prototype order helpers", () => {
  const date = new Date("2026-06-08T01:02:03.000Z");

  it("formats stable ScentMatch order references", () => {
    expect(formatOrderReference(date)).toBe("SM-20260608-010203");
  });

  it("creates a local checkout order summary with pricing and customer details", () => {
    const order = createPrototypeOrder({
      now: date,
      promoCode: "SCENT20",
      items: [
        {
          id: "perfume-1",
          name: "Red",
          artisan: "Dumont",
          price: 150,
          quantity: 2,
          image: "red.jpg",
          variantId: "gid://shopify/ProductVariant/1",
        },
      ],
      shipping: {
        name: "Iman Haikal",
        email: "iman@example.com",
        address: "1 Atelier Lane",
        city: "Kuala Lumpur",
        postcode: "50000",
        country: "Malaysia",
      },
      billingSameAsShipping: true,
      paymentMethod: "Card ending 4242",
    });

    expect(order.reference).toBe("SM-20260608-010203");
    expect(order.customerEmail).toBe("iman@example.com");
    expect(order.paymentMethod).toBe("Card ending 4242");
    expect(order.pricing.total).toBe(269.4);
    expect(order.items).toHaveLength(1);
  });

  it("rejects empty local checkout orders", () => {
    expect(() =>
      createPrototypeOrder({
        now: date,
        items: [],
        shipping: {
          name: "Iman Haikal",
          email: "iman@example.com",
          address: "1 Atelier Lane",
          city: "Kuala Lumpur",
          postcode: "50000",
          country: "Malaysia",
        },
        billingSameAsShipping: true,
        paymentMethod: "Card ending 4242",
      }),
    ).toThrow("Cannot create a prototype order without cart items.");
  });
});
