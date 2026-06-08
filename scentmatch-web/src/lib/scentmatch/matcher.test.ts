import { describe, expect, it } from "vitest";

import { calculateScentMatch } from "./matcher";
import type { ScentProduct } from "@/lib/shopify/types";

const makeProduct = (overrides: Partial<ScentProduct>): ScentProduct => ({
  id: "product-1",
  handle: "product-1",
  title: "Woodland Smoke",
  name: "Woodland Smoke",
  artisan: "Atelier Test",
  price: 200,
  currencyCode: "MYR",
  images: ["wood.jpg"],
  description: "Test fragrance",
  category: "Extract",
  stock: 5,
  variantId: "gid://shopify/ProductVariant/1",
  notes: { top: "Cedar", heart: "Tea", base: "Oud" },
  reviews: [],
  ...overrides,
});

describe("calculateScentMatch", () => {
  it("returns ranked product matches with reasons", () => {
    const result = calculateScentMatch(
      {
        environment: "Woodland Cabin",
        aesthetic: "Vintage & Warm",
        intensity: "Mysterious",
      },
      [
        makeProduct({ id: "wood", handle: "wood", notes: { top: "Cedar", heart: "Amber", base: "Oud" } }),
        makeProduct({ id: "sea", handle: "sea", notes: { top: "Marine", heart: "Salt", base: "Musk" } }),
      ],
    );

    expect(result.result).toBe("match");
    expect(result.matches[0]).toMatchObject({ id: "wood", score: 100 });
    expect(result.matches[0].reasons.length).toBeGreaterThan(0);
  });

  it("returns curated fallback when no product passes the match threshold", () => {
    const result = calculateScentMatch(
      {
        environment: "Botanical Garden",
        aesthetic: "Classic Elegance",
        intensity: "Ethereal",
      },
      [makeProduct({ id: "spice", notes: { top: "Pepper", heart: "Smoke", base: "Leather" } })],
    );

    expect(result.result).toBe("zero");
    expect(result.matches[0]).toMatchObject({ id: "spice" });
  });
});
