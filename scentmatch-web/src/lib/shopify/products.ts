import { PRODUCTS } from "@/data/products";
import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "./queries";
import { shopifyFetch } from "./client";
import { mapLocalProduct, mapShopifyProduct, mapShopifyProducts } from "./mappers";
import type { ScentProduct, ShopifyProductConnection, ShopifyProductNode } from "./types";

interface ProductsQueryData {
  products: ShopifyProductConnection;
}

interface ProductByHandleQueryData {
  product: ShopifyProductNode | null;
}

export function getFallbackProducts(): ScentProduct[] {
  return PRODUCTS.map(mapLocalProduct);
}

function hasShopifyConfig() {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN?.trim() && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim());
}

export async function getProducts(first = 24): Promise<ScentProduct[]> {
  if (!hasShopifyConfig()) {
    return getFallbackProducts();
  }

  const data = await shopifyFetch<ProductsQueryData>(PRODUCTS_QUERY, { first });
  return mapShopifyProducts(data.products);
}

export async function getProductByHandle(handle: string): Promise<ScentProduct | null> {
  if (!hasShopifyConfig()) {
    return getFallbackProducts().find((product) => product.handle === handle || product.id === handle) ?? null;
  }

  const data = await shopifyFetch<ProductByHandleQueryData>(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.product ? mapShopifyProduct(data.product) : null;
}
