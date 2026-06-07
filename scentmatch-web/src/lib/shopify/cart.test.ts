import { describe, expect, it } from "vitest";

import { buildCartLines, readCartPayload } from "./cart";

describe("Shopify cart helpers", () => {
  it("builds Storefront cart lines from app cart items", () => {
    expect(
      buildCartLines([
        { variantId: "gid://shopify/ProductVariant/1", quantity: 2 },
        { variantId: "gid://shopify/ProductVariant/2", quantity: 0 },
      ]),
    ).toEqual([{ merchandiseId: "gid://shopify/ProductVariant/1", quantity: 2 }]);
  });

  it("rejects carts that do not contain valid Shopify variant IDs", () => {
    expect(() => buildCartLines([{ variantId: "local-product-id", quantity: 1 }])).toThrow(
      "Invalid Shopify variant ID: local-product-id",
    );
  });

  it("rejects mixed carts containing invalid positive-quantity variant IDs", () => {
    expect(() =>
      buildCartLines([
        { variantId: "gid://shopify/ProductVariant/1", quantity: 1 },
        { variantId: "local-product-id", quantity: 1 },
      ]),
    ).toThrow("Invalid Shopify variant ID: local-product-id");
  });

  it("reads a successful cart payload and surfaces checkout data", () => {
    expect(
      readCartPayload({
        cartCreate: {
          cart: {
            id: "gid://shopify/Cart/1",
            checkoutUrl: "https://checkout.shopify.com/1",
            totalQuantity: 2,
          },
          userErrors: [],
        },
      }, "cartCreate"),
    ).toEqual({
      id: "gid://shopify/Cart/1",
      checkoutUrl: "https://checkout.shopify.com/1",
      totalQuantity: 2,
    });
  });

  it("throws useful messages for Shopify cart user errors", () => {
    expect(() =>
      readCartPayload(
        {
          cartCreate: {
            cart: null,
            userErrors: [{ field: ["lines"], message: "Variant is not available" }],
          },
        },
        "cartCreate",
      ),
    ).toThrow("Variant is not available");
  });
});
