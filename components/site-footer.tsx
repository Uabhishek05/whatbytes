import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#05366d] px-4 py-6 text-white sm:px-6 lg:px-8 xl:px-10">
      <div className="grid gap-6 border-b border-white/15 pb-6 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
        <div className="max-w-md">
          <Link href="/" className="inline-flex transition duration-200 hover:scale-[1.02]" aria-label="WhatBytes home">
            <img
              src="/whatbytes-logo.png"
              alt="WhatBytes"
              className="h-9 w-auto max-w-[190px] object-contain"
            />
          </Link>
          <p className="mt-3 text-sm leading-6 text-white/72">
            Everyday essentials, selected for smoother shopping and quick checkout.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-white/90">Shop</h2>
          <div className="mt-3 grid gap-2 text-sm text-white/72">
            <Link href="/" className="transition hover:text-white">All products</Link>
            <Link href="/?category=Electronics" className="transition hover:text-white">Electronics</Link>
            <Link href="/?category=Clothing" className="transition hover:text-white">Clothing</Link>
            <Link href="/cart" className="transition hover:text-white">Cart</Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-white/90">Connect</h2>
          <div className="mt-3 space-y-2 text-sm text-white/72">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-white/85" />
              support@whatbytes.store
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-white/85" />
              Fast delivery across India
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
              <span
                key={index}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition duration-200 hover:-translate-y-1 hover:bg-white/20"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4 text-xs text-white/62 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 WhatBytes Storefront. All rights reserved.</p>
        <p>Secure checkout · Easy returns · Curated picks</p>
      </div>
    </footer>
  );
}
