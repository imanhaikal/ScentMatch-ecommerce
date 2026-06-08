import { describe, expect, it } from "vitest";

import { mapLocalProduct, mapShopifyProduct, mapShopifyProducts } from "./mappers";

const shopifyProduct = {
  id: "gid://shopify/Product/1",
  handle: "santal-vol-1",
  title: "Santal Vol. 1",
  vendor: "Le Labo",
  description: "Sandalwood wrapped in cedar.",
  featuredImage: { url: "https://cdn.shopify.com/santal.jpg", altText: "Bottle" },
  images: {
    edges: [
      { node: { url: "https://cdn.shopify.com/santal-2.jpg", altText: "Second bottle" } },
    ],
  },
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/11",
          availableForSale: true,
          quantityAvailable: 8,
          price: { amount: "310.00", currencyCode: "MYR" },
        },
      },
    ],
  },
  artisan: { value: "Le Labo" },
  concentration: { value: "Extract" },
  topNotes: { value: "Cardamom" },
  heartNotes: { value: "Iris" },
  baseNotes: { value: "Sandalwood" },
  shortDescription: { value: "A definitive sandalwood." },
};

describe("Shopify product mappers", () => {
  it("maps Shopify product fields and metafields into the app product shape", () => {
    expect(mapShopifyProduct(shopifyProduct)).toEqual({
      id: "gid://shopify/Product/1",
      handle: "santal-vol-1",
      title: "Santal Vol. 1",
      name: "Santal Vol. 1",
      artisan: "Le Labo",
      price: 310,
      currencyCode: "MYR",
      images: [
        "https://cdn.shopify.com/santal.jpg",
        "https://cdn.shopify.com/santal-2.jpg",
      ],
      description: "A definitive sandalwood.",
      category: "Extract",
      stock: 8,
      variantId: "gid://shopify/ProductVariant/11",
      notes: {
        top: "Cardamom",
        heart: "Iris",
        base: "Sandalwood",
      },
      reviews: [],
    });
  });

  it("falls back safely when optional Shopify metafields are missing", () => {
    const product = mapShopifyProduct({
      ...shopifyProduct,
      vendor: "",
      featuredImage: null,
      images: { edges: [] },
      artisan: null,
      concentration: { value: "Unknown" },
      topNotes: null,
      heartNotes: null,
      baseNotes: null,
      shortDescription: null,
    });

    expect(product.artisan).toBe("ScentMatch");
    expect(product.category).toBe("Parfum");
    expect(product.images).toEqual(["/santal-vol-1.jpg"]);
    expect(product.description).toBe("Sandalwood wrapped in cedar.");
    expect(product.notes).toEqual({ top: "", heart: "", base: "" });
  });

  it("maps GraphQL edges into product arrays", () => {
    const products = mapShopifyProducts({
      pageInfo: { hasNextPage: false, endCursor: null },
      edges: [{ node: shopifyProduct }],
    });

    expect(products).toHaveLength(1);
    expect(products[0].handle).toBe("santal-vol-1");
  });

  it("maps local fallback products to prototype-purchasable variants", () => {
    expect(
      mapLocalProduct({
        id: "perfume-1",
        name: "Nitro Red",
        artisan: "Dumont",
        price: 150,
        images: ["red.jpg"],
        description: "Fallback product",
        category: "Parfum",
        stock: 10,
        notes: { top: "Scent", heart: "Aromatic", base: "Strong" },
        reviews: [],
      }).variantId,
    ).toBe("local:perfume-1");
  });
});
