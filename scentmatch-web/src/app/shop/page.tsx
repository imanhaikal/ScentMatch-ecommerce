import ShopClient from "./ShopClient";
import { getProducts } from "@/lib/shopify/products";

export default async function ShopPage() {
  const products = await getProducts();

  return <ShopClient products={products} />;
}
