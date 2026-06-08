import type { ScentProduct } from "@/lib/shopify/types";

export interface ScentQuizAnswers {
  environment: string;
  aesthetic: string;
  intensity: string;
}

export interface ScentMatchProduct extends ScentProduct {
  score: number;
  reasons: string[];
}

export interface ScentMatchResult {
  result: "match" | "zero";
  matches: ScentMatchProduct[];
  answers: ScentQuizAnswers;
}

const MATCH_THRESHOLD = 70;

const preferenceNotes: Record<keyof ScentQuizAnswers, Record<string, string[]>> = {
  environment: {
    "Woodland Cabin": ["cedar", "pine", "moss", "oud"],
    "Ocean Breeze": ["marine", "salt", "aquatic", "citrus"],
    "Midnight Library": ["tea", "ink", "amber", "leather", "oud"],
    "Botanical Garden": ["rose", "jasmine", "green", "fig", "neroli"],
  },
  aesthetic: {
    "Minimalist & Sharp": ["citrus", "iris", "musk", "aldehyde"],
    "Vintage & Warm": ["amber", "vanilla", "tobacco", "oud"],
    "Avant-Garde": ["smoke", "metal", "pepper", "incense"],
    "Classic Elegance": ["rose", "jasmine", "sandalwood", "bergamot"],
  },
  intensity: {
    Mysterious: ["oud", "incense", "smoke", "leather"],
    Approachable: ["musk", "citrus", "green", "tea"],
    Commanding: ["spice", "pepper", "amber", "strong"],
    Ethereal: ["iris", "neroli", "musk", "powder"],
  },
};

export function calculateScentMatch(answers: ScentQuizAnswers, products: ScentProduct[]): ScentMatchResult {
  const ranked = products
    .map((product) => scoreProduct(product, answers))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  const matches = ranked.filter((product) => product.score >= MATCH_THRESHOLD).slice(0, 3);

  if (matches.length > 0) {
    return { result: "match", matches, answers };
  }

  return { result: "zero", matches: ranked.slice(0, 3), answers };
}

function scoreProduct(product: ScentProduct, answers: ScentQuizAnswers): ScentMatchProduct {
  const notes = [product.notes.top, product.notes.heart, product.notes.base].map((note) => note.toLowerCase());
  const selectedPreferences = Object.entries(answers).flatMap(([key, answer]) => {
    const typedKey = key as keyof ScentQuizAnswers;
    return preferenceNotes[typedKey][answer] ?? [];
  });
  const uniquePreferences = Array.from(new Set(selectedPreferences));
  const matchedPreferences = uniquePreferences.filter((preference) =>
    notes.some((note) => note.includes(preference) || preference.includes(note)),
  );
  const matchedLayers = notes.filter((note) =>
    uniquePreferences.some((preference) => note.includes(preference) || preference.includes(note)),
  );
  const score = uniquePreferences.length === 0 ? 0 : Math.round((matchedLayers.length / 3) * 100);
  const reasons = matchedPreferences.slice(0, 4).map((note) => `Profile affinity for ${note}`);

  return {
    ...product,
    score,
    reasons: reasons.length > 0 ? reasons : ["Curated fallback from the artisan archive"],
  };
}
