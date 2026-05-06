import { Suspense } from "react";
import { ProductListing } from "@/components/product-listing";

export default function HomePage() {
  return (
    <main className="w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
      <Suspense fallback={<div className="py-20 text-center font-semibold">Loading products...</div>}>
        <ProductListing />
      </Suspense>
    </main>
  );
}
