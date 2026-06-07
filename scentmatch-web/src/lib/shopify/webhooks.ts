import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyShopifyWebhook(rawBody: Buffer, providedHmac: string | null, secret: string | undefined) {
  if (!providedHmac || !secret) return false;

  const computed = createHmac("sha256", secret).update(rawBody).digest("base64");
  const providedBuffer = Buffer.from(providedHmac, "utf8");
  const computedBuffer = Buffer.from(computed, "utf8");

  if (providedBuffer.length !== computedBuffer.length) return false;

  return timingSafeEqual(providedBuffer, computedBuffer);
}
