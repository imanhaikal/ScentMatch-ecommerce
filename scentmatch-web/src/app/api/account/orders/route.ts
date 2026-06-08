import type { NextRequest } from "next/server";
import { assertTrustedMutationOrigin, jsonError, requireAuthenticatedUserId } from "@/lib/account/api";
import { createAccountService } from "@/lib/account/service";
import type { AccountOrder } from "@/lib/account/types";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const userId = await requireAuthenticatedUserId(request);
    const account = await createAccountService().getAccount(userId);
    return Response.json({ orders: account?.orders ?? [] });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    assertTrustedMutationOrigin(request);
    const userId = await requireAuthenticatedUserId(request);
    const body = (await request.json()) as { order?: AccountOrder };
    if (!body.order) throw new Error("Order is required.");

    const order = await createAccountService().saveOrder(userId, body.order);
    return Response.json({ order });
  } catch (error) {
    return jsonError(error);
  }
}
