"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function AddToCartButton({
  product,
  quantity = 1,
  large = false
}: {
  product: Product;
  quantity?: number;
  large?: boolean;
}) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product, quantity)}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#0068c9] font-bold text-white shadow-sm transition hover:bg-[#0056aa] ${
        large ? "h-12 w-full px-6 text-base sm:w-auto sm:px-8" : "h-10 px-4 text-sm"
      }`}
    >
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </button>
  );
}
