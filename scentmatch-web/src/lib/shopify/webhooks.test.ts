import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";

import { verifyShopifyWebhook } from "./webhooks";

describe("Shopify webhook verification", () => {
  it("accepts valid Shopify HMAC signatures", () => {
    const body = Buffer.from(JSON.stringify({ id: 1 }));
    const secret = "shared-secret";
    const hmac = createHmac("sha256", secret).update(body).digest("base64");

    expect(verifyShopifyWebhook(body, hmac, secret)).toBe(true);
  });

  it("rejects invalid Shopify HMAC signatures", () => {
    const body = Buffer.from(JSON.stringify({ id: 1 }));

    expect(verifyShopifyWebhook(body, "invalid", "shared-secret")).toBe(false);
  });
});
