import { createShopifyCart } from "@/lib/shopify/cart";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { lines?: Array<{ variantId: string; quantity: number }> };
    const cart = await createShopifyCart(body.lines ?? []);

    return Response.json({ cart });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to create Shopify cart." },
      { status: 400 },
    );
  }
}
