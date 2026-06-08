import { afterEach, describe, expect, it, vi } from "vitest";

import { trackEvent, trackPageView } from "./analytics";

describe("trackEvent", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.NEXT_PUBLIC_GA_DEBUG_MODE;
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

  it("adds debug mode when enabled for GA DebugView", () => {
    process.env.NEXT_PUBLIC_GA_DEBUG_MODE = "true";
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

    expect(trackEvent("shopify_checkout_created", { value: 240 })).toBe(true);
    expect(gtag).toHaveBeenCalledWith("event", "shopify_checkout_created", { value: 240, debug_mode: true });
  });

  it("tracks page views with debug mode when gtag exists", () => {
    process.env.NEXT_PUBLIC_GA_DEBUG_MODE = "true";
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

    expect(trackPageView("G-TEST", "/shop?q=oud")).toBe(true);
    expect(gtag).toHaveBeenCalledWith("config", "G-TEST", { page_path: "/shop?q=oud", debug_mode: true });
  });
});
