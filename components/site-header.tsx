"use client";

import Link from "next/link";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { totalItems } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("q") ?? "";

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = event.target.value;
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.push(`/${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <header className="blue-panel animate-drop sticky top-0 z-20 px-4 py-3 text-white shadow-lg shadow-blue-950/10 sm:px-6 sm:py-4 lg:px-8 xl:px-10">
      <div className="grid gap-3 md:grid-cols-[auto_minmax(260px,460px)_auto] md:items-center md:justify-between">
        <div className="flex min-w-0 items-center justify-between gap-3 md:block">
          <Link href="/" className="shrink-0 transition duration-200 hover:scale-[1.03]" aria-label="WhatBytes home">
            <img
              src="/whatbytes-logo.png"
              alt="WhatBytes"
              className="h-8 w-auto max-w-[160px] object-contain sm:h-10 sm:max-w-[210px]"
            />
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              className="motion-button relative grid h-11 w-11 place-items-center rounded-lg bg-[#06356f] shadow-lg hover:bg-[#052b5c]"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-coral px-1 text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <div className="grid h-11 w-11 place-items-center rounded-full bg-white/15 transition duration-200 hover:scale-105 hover:bg-white/25">
              <UserRound className="h-5 w-5" />
            </div>
          </div>
        </div>

        <label className="flex h-12 w-full items-center gap-3 rounded-lg border border-white/30 bg-white/10 px-4 text-white shadow-inner transition duration-200 focus-within:border-white/70 focus-within:bg-white/15 md:max-w-[460px]">
          <Search className="h-5 w-5 shrink-0" />
          <input
            value={pathname === "/" ? search : ""}
            onChange={handleSearch}
            placeholder="Search for products..."
            className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/85"
          />
        </label>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/cart"
            className="motion-button relative inline-flex h-12 items-center gap-2 rounded-lg bg-[#06356f] px-5 text-sm font-bold shadow-lg hover:bg-[#052b5c]"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-coral px-1 text-xs">
                {totalItems}
              </span>
            )}
          </Link>
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white/15 transition duration-200 hover:scale-105 hover:bg-white/25">
            <UserRound className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
