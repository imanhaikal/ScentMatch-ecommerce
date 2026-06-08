import { describe, expect, it } from "vitest";

import { hashPassword, verifyPassword } from "./password";

describe("account password helpers", () => {
  it("hashes passwords without storing the plain text", async () => {
    const hash = await hashPassword("secret-passphrase");

    expect(hash).toMatch(/^pbkdf2:sha256:\d+:[a-f0-9]+:[a-f0-9]+$/);
    expect(hash).not.toContain("secret-passphrase");
    await expect(verifyPassword("secret-passphrase", hash)).resolves.toBe(true);
  });

  it("rejects invalid passwords", async () => {
    const hash = await hashPassword("secret-passphrase");

    await expect(verifyPassword("wrong-passphrase", hash)).resolves.toBe(false);
  });
});
