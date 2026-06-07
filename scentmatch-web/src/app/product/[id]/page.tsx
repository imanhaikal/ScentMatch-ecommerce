import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getProductByHandle, getProducts } from "@/lib/shopify/products";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, products] = await Promise.all([getProductByHandle(id), getProducts(12)]);

  if (!product) {
    notFound();
  }

  const sameCategory = products.filter((item) => item.id !== product.id && item.category === product.category);
  const others = products.filter((item) => item.id !== product.id && item.category !== product.category);
  const recommendations = [...sameCategory, ...others].slice(0, 3);

  return <ProductDetailClient key={product.id} product={product} recommendations={recommendations} />;
}
