import { verifyShopifyWebhook } from "@/lib/shopify/webhooks";

export async function POST(request: Request) {
  const rawBody = Buffer.from(await request.arrayBuffer());
  const hmac = request.headers.get("x-shopify-hmac-sha256");

  if (!verifyShopifyWebhook(rawBody, hmac, process.env.SHOPIFY_WEBHOOK_SECRET)) {
    return new Response("Invalid Shopify webhook signature.", { status: 401 });
  }

  return Response.json({ received: true });
}
