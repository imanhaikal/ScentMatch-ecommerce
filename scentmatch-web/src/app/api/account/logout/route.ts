import { NextResponse } from "next/server";
import { assertTrustedMutationOrigin, jsonError } from "@/lib/account/api";
import { SESSION_COOKIE_NAME } from "@/lib/account/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    assertTrustedMutationOrigin(request);
    const response = NextResponse.json({ ok: true });
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  } catch (error) {
    return jsonError(error);
  }
}
