import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#05366d] px-4 py-7 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold">Filters</h2>
          <p className="mt-2 text-sm text-white/75">Category, price and brand controls.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">About Us</h2>
          <p className="mt-2 text-sm text-white/75">Curated essentials for modern shoppers.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">Follow Us</h2>
          <div className="mt-3 flex gap-3">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
              <span
                key={index}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/12"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-8 border-t border-white/15 pt-5 text-center text-sm text-white/70">
        Copyright 2026 Whatbytes Storefront. All rights reserved.
      </p>
    </footer>
  );
}
