import { afterEach, describe, expect, it, vi } from "vitest";

import { getShopifyConfig, shopifyFetch } from "./client";

const originalEnv = process.env;

describe("Shopify Storefront client", () => {
  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("normalizes the Storefront API endpoint from environment variables", () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "https://scentmatch.myshopify.com/",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "token",
      SHOPIFY_STOREFRONT_API_VERSION: "2026-04",
    };

    expect(getShopifyConfig().endpoint).toBe(
      "https://scentmatch.myshopify.com/api/2026-04/graphql.json",
    );
  });

  it("throws a useful error when required environment variables are missing", () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "",
    };

    expect(() => getShopifyConfig()).toThrow(
      "Missing Shopify environment variables",
    );
  });

  it("posts GraphQL requests with the Storefront token", async () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "scentmatch.myshopify.com",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "token",
      SHOPIFY_STOREFRONT_API_VERSION: "2026-04",
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { shop: { name: "ScentMatch" } } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await shopifyFetch<{ shop: { name: string } }>("query { shop { name } }");

    expect(result.shop.name).toBe("ScentMatch");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://scentmatch.myshopify.com/api/2026-04/graphql.json",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": "token",
        }),
      }),
    );
  });
});
