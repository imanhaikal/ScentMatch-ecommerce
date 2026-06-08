import type { NextRequest } from "next/server";
import { assertTrustedMutationOrigin, jsonError, requireAuthenticatedUserId } from "@/lib/account/api";
import { createSavedScentProfile } from "@/lib/account/profile";
import { createAccountService } from "@/lib/account/service";
import type { ScentMatchResult } from "@/lib/scentmatch/matcher";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
  try {
    assertTrustedMutationOrigin(request);
    const userId = await requireAuthenticatedUserId(request);
    const body = (await request.json()) as { result?: ScentMatchResult };
    if (!body.result?.answers) throw new Error("Scent match result is required.");

    const account = await createAccountService().saveScentProfile(userId, createSavedScentProfile(body.result));
    return Response.json(account);
  } catch (error) {
    return jsonError(error);
  }
}
