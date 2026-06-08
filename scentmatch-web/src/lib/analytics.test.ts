import { afterEach, describe, expect, it, vi } from "vitest";

import { trackEvent } from "./analytics";

describe("trackEvent", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not throw when window is unavailable", () => {
    vi.stubGlobal("window", undefined);

    expect(() => trackEvent("quiz_started")).not.toThrow();
  });

  it("does not throw when gtag is unavailable", () => {
    vi.stubGlobal("window", {});

    expect(trackEvent("quiz_started")).toBe(false);
  });

  it("dispatches GA events when gtag exists", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

    expect(trackEvent("add_to_cart", { product_id: "perfume-1" })).toBe(true);
    expect(gtag).toHaveBeenCalledWith("event", "add_to_cart", { product_id: "perfume-1" });
  });
});
