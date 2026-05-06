import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { getProductById } from "@/lib/products";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
