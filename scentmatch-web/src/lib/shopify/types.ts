import type { ProductReview } from "@/data/products";

export type ScentCategory = "Extract" | "Parfum" | "Cologne";

export interface ScentProduct {
  id: string;
  handle: string;
  title: string;
  name: string;
  artisan: string;
  price: number;
  currencyCode: string;
  images: string[];
  description: string;
  category: ScentCategory;
  stock: number;
  variantId: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  reviews: ProductReview[];
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMetafield {
  value: string;
}

export interface ShopifyVariantNode {
  id: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
}

export interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  description: string;
  featuredImage: ShopifyImage | null;
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyVariantNode }>;
  };
  artisan: ShopifyMetafield | null;
  concentration: ShopifyMetafield | null;
  topNotes: ShopifyMetafield | null;
  heartNotes: ShopifyMetafield | null;
  baseNotes: ShopifyMetafield | null;
  shortDescription: ShopifyMetafield | null;
}

export interface ShopifyProductConnection {
  edges: Array<{ node: ShopifyProductNode }>;
}

export interface ShopifyCartLineInput {
  merchandiseId: string;
  quantity: number;
}

export interface ShopifyCartPayload {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
}
