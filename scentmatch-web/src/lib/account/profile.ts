import type { ScentMatchResult } from "@/lib/scentmatch/matcher";
import type { SavedScentProfile } from "./types";

export function createSavedScentProfile(result: ScentMatchResult, now = new Date()): SavedScentProfile {
  const topMatch = result.matches[0];

  return {
    answers: result.answers,
    summary: [result.answers.environment, result.answers.aesthetic, result.answers.intensity].join(" / "),
    topMatch: topMatch ? { id: topMatch.id, name: topMatch.name, score: topMatch.score } : null,
    savedAt: now.toISOString(),
  };
}
