import ShopClient from "./ShopClient";
import { getProductsPage } from "@/lib/shopify/products";
import type { ScentCategory } from "@/lib/shopify/types";

const CATEGORIES: ScentCategory[] = ["Extract", "Parfum", "Cologne"];

function parsePage(value: string | string[] | undefined) {
  const page = Array.isArray(value) ? value[0] : value;
  return Number(page);
}

function parseSearchQuery(value: string | string[] | undefined) {
  const query = Array.isArray(value) ? value[0] : value;
  return query?.trim() ?? "";
}

function parseCategory(value: string | string[] | undefined): ScentCategory | "All" {
  const category = Array.isArray(value) ? value[0] : value;
  return CATEGORIES.includes(category as ScentCategory) ? category as ScentCategory : "All";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page, q, type } = await searchParams;
  const searchQuery = parseSearchQuery(q);
  const selectedCategory = parseCategory(type);
  const productPage = await getProductsPage(parsePage(page), 24, searchQuery, selectedCategory);

  return <ShopClient {...productPage} searchQuery={searchQuery} selectedCategory={selectedCategory} />;
}
