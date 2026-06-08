import { describe, expect, it } from "vitest";

import { isTrustedMutationOrigin } from "./api";

describe("account API helpers", () => {
  it("accepts same-origin mutation requests", () => {
    const headers = new Headers({ host: "example.test", origin: "https://example.test" });

    expect(isTrustedMutationOrigin(headers)).toBe(true);
  });

  it("rejects cross-origin mutation requests", () => {
    const headers = new Headers({ host: "example.test", origin: "https://evil.test" });

    expect(isTrustedMutationOrigin(headers)).toBe(false);
  });
});
