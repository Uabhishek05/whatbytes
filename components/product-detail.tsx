"use client";

import Link from "next/link";
import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { RatingStars } from "@/components/rating-stars";
import { formatPrice, Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <Link href="/" className="text-sm font-bold text-[#0068c9]">
        Back to products
      </Link>

      <section className="mt-5 grid gap-5 lg:mt-6 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <div className="product-image-bg aspect-square overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-4 sm:p-8"
            />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3 sm:gap-3">
            {product.specs.map((spec) => (
              <div
                key={spec}
                className="rounded-lg border border-line bg-mist px-3 py-3 text-center text-xs font-bold text-ink"
              >
                {spec}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0068c9]">
            {product.brand}
          </p>
          <h1 className="mt-3 break-words text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <RatingStars rating={product.rating} />
            <span className="text-sm font-semibold text-slate-500">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl">
            {formatPrice(product.price)}
          </p>
          <p className="mt-5 text-base leading-7 text-slate-600">{product.description}</p>

          <div className="mt-6 rounded-lg bg-mist p-4">
            <p className="text-sm font-bold text-ink">Category</p>
            <p className="text-sm text-slate-600">{product.category}</p>
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex h-12 items-center overflow-hidden rounded-lg border border-line bg-white">
              <button
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="grid h-12 w-12 place-items-center text-ink hover:bg-mist"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="grid h-12 w-12 place-items-center border-x border-line text-base font-bold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((current) => current + 1)}
                className="grid h-12 w-12 place-items-center text-ink hover:bg-mist"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <AddToCartButton product={product} quantity={quantity} large />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-line p-4">
              <Truck className="h-5 w-5 text-[#0068c9]" />
              <span className="text-sm font-bold text-ink">Fast delivery available</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-line p-4">
              <ShieldCheck className="h-5 w-5 text-leaf" />
              <span className="text-sm font-bold text-ink">Secure checkout</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm sm:mt-8 sm:p-7">
        <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Reviews</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {["Excellent quality and quick delivery.", "Looks premium and works exactly as expected."].map(
            (review) => (
              <article key={review} className="rounded-lg border border-line p-4">
                <RatingStars rating={5} />
                <p className="mt-3 text-sm leading-6 text-slate-600">{review}</p>
              </article>
            )
          )}
        </div>
      </section>
    </main>
  );
}
