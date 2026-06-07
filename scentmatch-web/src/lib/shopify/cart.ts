import { CART_CREATE_MUTATION, CART_LINES_ADD_MUTATION, CART_LINES_REMOVE_MUTATION, CART_LINES_UPDATE_MUTATION } from "./queries";
import { shopifyFetch } from "./client";
import type { ShopifyCartLineInput, ShopifyCartPayload } from "./types";

interface CartUserError {
  field?: string[] | null;
  message: string;
}

interface CartMutationPayload {
  cart: ShopifyCartPayload | null;
  userErrors: CartUserError[];
}

type CartMutationResponse<TKey extends string> = Record<TKey, CartMutationPayload>;

export interface AppCartLine {
  variantId: string;
  quantity: number;
}

export function buildCartLines(items: AppCartLine[]): ShopifyCartLineInput[] {
  const purchasableItems = items.filter((item) => Number.isInteger(item.quantity) && item.quantity > 0);
  const invalidItem = purchasableItems.find((item) => !item.variantId.startsWith("gid://shopify/ProductVariant/"));

  if (invalidItem) {
    throw new Error(`Invalid Shopify variant ID: ${invalidItem.variantId || "missing"}`);
  }

  const lines = purchasableItems
    .map((item) => ({ merchandiseId: item.variantId, quantity: item.quantity }));

  if (lines.length === 0) {
    throw new Error("No valid Shopify variant IDs were provided.");
  }

  return lines;
}

export function readCartPayload<TKey extends string>(
  data: CartMutationResponse<TKey>,
  key: TKey,
): ShopifyCartPayload {
  const payload = data[key];

  if (payload.userErrors.length > 0) {
    throw new Error(payload.userErrors.map((error) => error.message).join("; "));
  }

  if (!payload.cart) {
    throw new Error("Shopify did not return a cart.");
  }

  return payload.cart;
}

export async function createShopifyCart(items: AppCartLine[]) {
  const lines = buildCartLines(items);

  const data = await shopifyFetch<CartMutationResponse<"cartCreate">>(CART_CREATE_MUTATION, { lines });

  return readCartPayload(data, "cartCreate");
}

export async function addShopifyCartLines(cartId: string, items: AppCartLine[]) {
  const lines = buildCartLines(items);

  if (!cartId) {
    throw new Error("A cart ID and at least one purchasable variant are required.");
  }

  const data = await shopifyFetch<CartMutationResponse<"cartLinesAdd">>(CART_LINES_ADD_MUTATION, { cartId, lines });

  return readCartPayload(data, "cartLinesAdd");
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  if (!cartId || !lineId || quantity < 0) {
    throw new Error("A cart ID, line ID, and non-negative quantity are required.");
  }

  const data = await shopifyFetch<CartMutationResponse<"cartLinesUpdate">>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  return readCartPayload(data, "cartLinesUpdate");
}

export async function removeShopifyCartLines(cartId: string, lineIds: string[]) {
  if (!cartId || lineIds.length === 0) {
    throw new Error("A cart ID and at least one line ID are required.");
  }

  const data = await shopifyFetch<CartMutationResponse<"cartLinesRemove">>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds });

  return readCartPayload(data, "cartLinesRemove");
}
