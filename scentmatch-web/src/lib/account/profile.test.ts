import { describe, expect, it } from "vitest";

import { createSavedScentProfile } from "./profile";
import type { ScentMatchResult } from "@/lib/scentmatch/matcher";

describe("saved scent profile formatting", () => {
  it("summarizes quiz answers and top match metadata", () => {
    const result: ScentMatchResult = {
      result: "match",
      answers: { environment: "Woodland Cabin", aesthetic: "Vintage & Warm", intensity: "Mysterious" },
      matches: [
        {
          id: "perfume-1",
          handle: "red",
          title: "Red",
          name: "Red",
          artisan: "Dumont",
          price: 150,
          currencyCode: "MYR",
          images: ["red.jpg"],
          description: "Warm oud.",
          category: "Parfum",
          stock: 4,
          variantId: "local:perfume-1",
          notes: { top: "Cedar", heart: "Amber", base: "Oud" },
          reviews: [],
          score: 92,
          reasons: ["Profile affinity for oud"],
        },
      ],
    };

    expect(createSavedScentProfile(result, new Date("2026-06-08T01:00:00.000Z"))).toEqual({
      answers: result.answers,
      summary: "Woodland Cabin / Vintage & Warm / Mysterious",
      topMatch: { id: "perfume-1", name: "Red", score: 92 },
      savedAt: "2026-06-08T01:00:00.000Z",
    });
  });
});
