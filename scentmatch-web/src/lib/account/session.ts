import { createHmac, timingSafeEqual } from "node:crypto";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { AccountSession } from "./types";

export const SESSION_COOKIE_NAME = "scentmatch_session";
export const DEFAULT_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

interface SessionTokenOptions {
  secret?: string;
  now?: Date;
  maxAgeSeconds?: number;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getSessionSecret(explicitSecret?: string) {
  const secret = explicitSecret ?? process.env.SCENTMATCH_SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production" && process.env.VERCEL !== "1") {
    throw new Error("SCENTMATCH_SESSION_SECRET is required in production.");
  }
  return "development-only-scentmatch-session-secret";
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(userId: string, options: SessionTokenOptions = {}) {
  const now = options.now ?? new Date();
  const maxAgeSeconds = options.maxAgeSeconds ?? DEFAULT_SESSION_MAX_AGE_SECONDS;
  const expiresAt = new Date(now.getTime() + maxAgeSeconds * 1000).toISOString();
  const payload = base64UrlEncode(JSON.stringify({ userId, expiresAt } satisfies AccountSession));
  const signature = sign(payload, getSessionSecret(options.secret));

  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null, options: SessionTokenOptions = {}): AccountSession | null {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = sign(payload, getSessionSecret(options.secret));
  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as AccountSession;
    if (typeof session.userId !== "string" || typeof session.expiresAt !== "string") return null;
    if (new Date(session.expiresAt).getTime() <= (options.now ?? new Date()).getTime()) return null;
    return session;
  } catch {
    return null;
  }
}

export function getSessionCookieOptions(expiresAt: string): Partial<ResponseCookie> {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  };
}
