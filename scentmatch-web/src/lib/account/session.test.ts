import { describe, expect, it } from "vitest";

import { SESSION_COOKIE_NAME, createSessionToken, verifySessionToken } from "./session";

describe("account session helpers", () => {
  const secret = "test-session-secret-with-enough-entropy";
  const now = new Date("2026-06-08T01:00:00.000Z");

  it("signs and verifies a user session token", () => {
    const token = createSessionToken("user_123", { secret, now, maxAgeSeconds: 60 });

    expect(token).not.toContain("user_123");
    expect(verifySessionToken(token, { secret, now })).toEqual({
      userId: "user_123",
      expiresAt: "2026-06-08T01:01:00.000Z",
    });
  });

  it("rejects tampered tokens", () => {
    const token = createSessionToken("user_123", { secret, now, maxAgeSeconds: 60 });
    const tampered = `${token.slice(0, -1)}x`;

    expect(verifySessionToken(tampered, { secret, now })).toBeNull();
  });

  it("rejects expired tokens", () => {
    const token = createSessionToken("user_123", { secret, now, maxAgeSeconds: 60 });

    expect(verifySessionToken(token, { secret, now: new Date("2026-06-08T01:02:00.000Z") })).toBeNull();
  });

  it("exports the expected cookie name", () => {
    expect(SESSION_COOKIE_NAME).toBe("scentmatch_session");
  });
});
