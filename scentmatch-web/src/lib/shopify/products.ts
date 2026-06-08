import { PRODUCTS } from "@/data/products";
import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "./queries";
import { shopifyFetch } from "./client";
import { mapLocalProduct, mapShopifyProduct, mapShopifyProducts } from "./mappers";
import type { ScentCategory, ScentProduct, ShopifyProductConnection, ShopifyProductNode } from "./types";

interface ProductsQueryData {
  products: ShopifyProductConnection;
}

interface ProductByHandleQueryData {
  product: ShopifyProductNode | null;
}

export interface ProductPageResult {
  products: ScentProduct[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

function normalizePage(page: number) {
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function normalizePageSize(pageSize: number) {
  return Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 24;
}

function normalizeSearchQuery(query: string | undefined) {
  const searchQuery = query?.trim();
  return searchQuery ? searchQuery : null;
}

function normalizeCategoryFilter(category: ScentCategory | "All" | undefined) {
  return category && category !== "All" ? category : null;
}

function matchesSearchQuery(product: ScentProduct, query: string | null) {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.toLowerCase();
  return [product.name, product.notes.top, product.notes.heart, product.notes.base]
    .some((value) => value.toLowerCase().includes(normalizedQuery));
}

function matchesCategory(product: ScentProduct, category: ScentCategory | null) {
  return !category || product.category === category;
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

  const data = await shopifyFetch<ProductsQueryData>(PRODUCTS_QUERY, { first, after: null, query: null });
  return mapShopifyProducts(data.products);
}

export async function getProductsPage(
  page = 1,
  pageSize = 24,
  searchQuery?: string,
  categoryFilter?: ScentCategory | "All",
): Promise<ProductPageResult> {
  const currentPage = normalizePage(page);
  const perPage = normalizePageSize(pageSize);
  const query = normalizeSearchQuery(searchQuery);
  const category = normalizeCategoryFilter(categoryFilter);

  if (!hasShopifyConfig()) {
    const allProducts = getFallbackProducts()
      .filter((product) => matchesSearchQuery(product, query))
      .filter((product) => matchesCategory(product, category));
    const start = (currentPage - 1) * perPage;
    const products = allProducts.slice(start, start + perPage);

    return {
      products,
      currentPage,
      hasNextPage: start + perPage < allProducts.length,
      hasPreviousPage: currentPage > 1,
    };
  }

  if (category) {
    const targetStart = (currentPage - 1) * perPage;
    const targetEnd = targetStart + perPage;
    const matchingProducts: ScentProduct[] = [];
    let after: string | null = null;
    let pageData: ProductsQueryData | null = null;

    do {
      pageData = await shopifyFetch<ProductsQueryData>(PRODUCTS_QUERY, { first: perPage, after, query });
      matchingProducts.push(
        ...mapShopifyProducts(pageData.products).filter((product) => matchesCategory(product, category)),
      );
      after = pageData.products.pageInfo.endCursor;
    } while (matchingProducts.length <= targetEnd && pageData.products.pageInfo.hasNextPage);

    return {
      products: matchingProducts.slice(targetStart, targetEnd),
      currentPage,
      hasNextPage: matchingProducts.length > targetEnd,
      hasPreviousPage: currentPage > 1,
    };
  }

  let after: string | null = null;
  let fetchedPage = 1;
  let pageData: ProductsQueryData | null = null;

  while (fetchedPage <= currentPage) {
    pageData = await shopifyFetch<ProductsQueryData>(PRODUCTS_QUERY, { first: perPage, after, query });

    if (fetchedPage === currentPage || !pageData.products.pageInfo.hasNextPage) {
      break;
    }

    after = pageData.products.pageInfo.endCursor;
    fetchedPage += 1;
  }

  const isBeyondLastPage = fetchedPage < currentPage && !pageData?.products.pageInfo.hasNextPage;

  return {
    products: pageData && !isBeyondLastPage ? mapShopifyProducts(pageData.products) : [],
    currentPage,
    hasNextPage: Boolean(pageData?.products.pageInfo.hasNextPage),
    hasPreviousPage: currentPage > 1,
  };
}

export async function getProductByHandle(handle: string): Promise<ScentProduct | null> {
  if (!hasShopifyConfig()) {
    return getFallbackProducts().find((product) => product.handle === handle || product.id === handle) ?? null;
  }

  const data = await shopifyFetch<ProductByHandleQueryData>(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.product ? mapShopifyProduct(data.product) : null;
}
