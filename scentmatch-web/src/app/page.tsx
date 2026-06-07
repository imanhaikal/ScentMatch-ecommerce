import HomeClient from "./HomeClient";
import { getProducts } from "@/lib/shopify/products";

export default async function ScentMatchLanding() {
  const products = await getProducts(6);

  return <HomeClient products={products} />;
}
