import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUserId, jsonError } from "@/lib/account/api";
import { createAccountService } from "@/lib/account/service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const userId = getAuthenticatedUserId(request);
    if (!userId) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

    const account = await createAccountService().getAccount(userId);
    if (!account) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

    return NextResponse.json(account);
  } catch (error) {
    return jsonError(error);
  }
}
