import { calculateScentMatch, type ScentQuizAnswers } from "@/lib/scentmatch/matcher";
import { getProducts } from "@/lib/shopify/products";

function isValidAnswers(value: unknown): value is ScentQuizAnswers {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ScentQuizAnswers>;
  return [candidate.environment, candidate.aesthetic, candidate.intensity].every((answer) => typeof answer === "string" && answer.trim().length > 0);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answers?: unknown };

    if (!isValidAnswers(body.answers)) {
      return Response.json({ error: "Quiz answers are required." }, { status: 400 });
    }

    const products = await getProducts(24);
    return Response.json(calculateScentMatch(body.answers, products));
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to calculate a scent match." },
      { status: 400 },
    );
  }
}
