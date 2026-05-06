"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const shipping = items.length > 0 ? 15 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  return (
    <main className="w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Shopping Cart</h1>
        <Link href="/" className="text-sm font-bold text-[#0068c9] transition hover:text-[#004f9a]">
          Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <section className="animate-rise rounded-xl bg-white p-6 text-center shadow-sm sm:p-12">
          <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Your cart is empty</h2>
          <p className="mt-2 text-sm text-slate-500">Add a product to see it here.</p>
          <Link
            href="/"
            className="motion-button mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-[#0068c9] px-6 font-bold text-white"
          >
            Browse products
          </Link>
        </section>
      ) : (
        <section className="grid gap-7 lg:grid-cols-[1fr_340px] 2xl:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {items.map((item, index) => (
              <article
                key={item.product.id}
                className="animate-rise motion-card grid grid-cols-[92px_1fr] gap-3 rounded-xl bg-white p-3 shadow-sm sm:grid-cols-[120px_1fr_auto] sm:gap-4 sm:p-4"
                style={{ animationDelay: `${Math.min(index * 55, 220)}ms` }}
              >
                <Link
                  href={`/product/${item.product.id}`}
                  className="product-image-bg aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="image-zoom h-full w-full object-contain p-3"
                  />
                </Link>
                <div className="min-w-0">
                  <h2 className="break-words text-base font-extrabold text-ink sm:text-lg">
                    {item.product.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{item.product.category}</p>
                  <p className="mt-2 text-base font-extrabold text-ink sm:mt-3 sm:text-lg">
                    {formatPrice(item.product.price)}
                  </p>
                </div>
                <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end sm:justify-between">
                  <div className="flex h-10 items-center overflow-hidden rounded-lg border border-line">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="motion-button grid h-10 w-10 place-items-center hover:bg-mist"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="grid h-10 w-10 place-items-center border-x border-line text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="motion-button grid h-10 w-10 place-items-center hover:bg-mist"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="motion-button grid h-10 w-10 place-items-center rounded-lg border border-line text-coral hover:bg-red-50"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="animate-rise motion-card h-fit rounded-xl bg-white p-4 shadow-sm sm:p-6" style={{ animationDelay: "120ms" }}>
            <h2 className="text-xl font-extrabold text-ink">Price Summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
              <SummaryRow label="Shipping" value={formatPrice(shipping)} />
              <SummaryRow label="Tax" value={formatPrice(tax)} />
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-5 text-lg font-extrabold text-ink">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="motion-button mt-6 h-12 w-full rounded-lg bg-[#0068c9] font-bold text-white hover:bg-[#0056aa]">
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="motion-button mt-3 h-11 w-full rounded-lg border border-line font-bold text-ink hover:bg-mist"
            >
              Clear Cart
            </button>
          </aside>
        </section>
      )}
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-slate-600">
      <span>{label}</span>
      <span className="font-bold text-ink">{value}</span>
    </div>
  );
}
