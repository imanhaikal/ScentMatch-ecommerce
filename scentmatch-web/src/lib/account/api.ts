import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AccountServiceError, createAccountService } from "./service";
import { SESSION_COOKIE_NAME, createSessionToken, getSessionCookieOptions, verifySessionToken } from "./session";
import type { AccountUser } from "./types";

export function isTrustedMutationOrigin(headers: Headers) {
  const origin = headers.get("origin");
  if (!origin) return true;

  const host = headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function assertTrustedMutationOrigin(request: Request) {
  if (!isTrustedMutationOrigin(request.headers)) {
    throw new AccountServiceError("Untrusted request origin.", 403);
  }
}

export function getAuthenticatedUserId(request: NextRequest) {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value)?.userId ?? null;
}

export async function requireAuthenticatedUserId(request: NextRequest) {
  const userId = getAuthenticatedUserId(request);
  if (!userId) throw new AccountServiceError("Authentication required.", 401);

  const account = await createAccountService().getAccount(userId);
  if (!account) throw new AccountServiceError("Authentication required.", 401);

  return userId;
}

export function jsonError(error: unknown) {
  if (error instanceof AccountServiceError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to complete account request." }, { status: 400 });
}

export function sessionResponse(user: AccountUser) {
  const token = createSessionToken(user.id);
  const session = verifySessionToken(token);
  if (!session) throw new AccountServiceError("Unable to create account session.", 500);

  const response = NextResponse.json({ user });
  response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(session.expiresAt));
  return response;
}
