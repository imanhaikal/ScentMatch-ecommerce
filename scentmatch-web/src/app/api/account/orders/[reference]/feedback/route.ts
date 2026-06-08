import type { NextRequest } from "next/server";
import { assertTrustedMutationOrigin, jsonError, requireAuthenticatedUserId } from "@/lib/account/api";
import { createAccountService } from "@/lib/account/service";

export const runtime = "nodejs";

export async function POST(request: NextRequest, { params }: { params: Promise<{ reference: string }> }) {
  try {
    assertTrustedMutationOrigin(request);
    const userId = await requireAuthenticatedUserId(request);
    const { reference } = await params;
    const body = (await request.json()) as { rating?: number };
    const feedback = await createAccountService().saveFeedback(userId, decodeURIComponent(reference), Number(body.rating));

    return Response.json({ feedback });
  } catch (error) {
    return jsonError(error);
  }
}
