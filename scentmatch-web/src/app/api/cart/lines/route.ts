import { addShopifyCartLines, removeShopifyCartLines, updateShopifyCartLine } from "@/lib/shopify/cart";

type CartLineAction =
  | { action: "add"; cartId: string; lines: Array<{ variantId: string; quantity: number }> }
  | { action: "update"; cartId: string; lineId: string; quantity: number }
  | { action: "remove"; cartId: string; lineIds: string[] };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CartLineAction;

    if (body.action === "add") {
      return Response.json({ cart: await addShopifyCartLines(body.cartId, body.lines) });
    }

    if (body.action === "update") {
      return Response.json({ cart: await updateShopifyCartLine(body.cartId, body.lineId, body.quantity) });
    }

    if (body.action === "remove") {
      return Response.json({ cart: await removeShopifyCartLines(body.cartId, body.lineIds) });
    }

    return Response.json({ error: "Unsupported cart line action." }, { status: 400 });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to update Shopify cart." },
      { status: 400 },
    );
  }
}
