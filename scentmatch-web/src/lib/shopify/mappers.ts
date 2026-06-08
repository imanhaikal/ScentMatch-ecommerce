import type { Product } from "@/data/products";
import type { ScentCategory, ScentProduct, ShopifyProductConnection, ShopifyProductNode } from "./types";

const CATEGORIES: ScentCategory[] = ["Extract", "Parfum", "Cologne"];

function normalizeCategory(value: string | undefined): ScentCategory {
  if (CATEGORIES.includes(value as ScentCategory)) {
    return value as ScentCategory;
  }

  return "Parfum";
}

function uniqueImages(images: string[]) {
  return [...new Set(images.filter(Boolean))];
}

export function mapShopifyProduct(product: ShopifyProductNode): ScentProduct {
  const variant = product.variants.edges[0]?.node;
  const images = uniqueImages([
    product.featuredImage?.url ?? "",
    ...product.images.edges.map((edge) => edge.node.url),
  ]);

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    name: product.title,
    artisan: product.vendor || product.artisan?.value || "ScentMatch",
    price: Number(variant?.price.amount ?? 0),
    currencyCode: variant?.price.currencyCode ?? "MYR",
    images: images.length > 0 ? images : ["/santal-vol-1.jpg"],
    description: product.shortDescription?.value || product.description,
    category: normalizeCategory(product.concentration?.value),
    stock: variant?.availableForSale ? variant.quantityAvailable ?? 999 : 0,
    variantId: variant?.id ?? "",
    notes: {
      top: product.topNotes?.value ?? "",
      heart: product.heartNotes?.value ?? "",
      base: product.baseNotes?.value ?? "",
    },
    reviews: [],
  };
}

export function mapShopifyProducts(connection: ShopifyProductConnection): ScentProduct[] {
  return connection.edges.map((edge) => mapShopifyProduct(edge.node));
}

export function mapLocalProduct(product: Product): ScentProduct {
  return {
    ...product,
    handle: product.id,
    title: product.name,
    currencyCode: "MYR",
    variantId: "",
  };
}
