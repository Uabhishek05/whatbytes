"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { ChangeEvent, useMemo } from "react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { RatingStars } from "@/components/rating-stars";
import { brands, categories, formatPrice, priceBounds, products } from "@/lib/products";

export function ProductListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";
  const activeBrand = searchParams.get("brand") ?? "All";
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const priceParam = searchParams.get("price") ?? `${priceBounds.min}-${priceBounds.max}`;
  const maxPrice = Number(priceParam.split("-")[1] ?? priceBounds.max);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesBrand = activeBrand === "All" || product.brand === activeBrand;
      const matchesPrice = product.price <= maxPrice;
      const matchesSearch =
        !query ||
        [product.title, product.brand, product.category, product.description]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
    });
  }, [activeBrand, activeCategory, maxPrice, query]);

  const featuredProduct =
    filteredProducts.find((product) => product.id === "smartphone") ?? filteredProducts[0];
  const gridProducts = filteredProducts.filter((product) => product.id !== featuredProduct?.id);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/?${params.toString()}`);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setParam("price", `${priceBounds.min}-${event.target.value}`);
  };

  const clearFilters = () => router.push("/");

  return (
    <div className="grid gap-6 lg:grid-cols-[250px_1fr] lg:gap-8">
      <aside className="space-y-4 sm:space-y-6">
        <section className="blue-panel rounded-xl p-4 text-white shadow-soft sm:p-6">
          <div className="mb-4 flex items-center justify-between sm:mb-5">
            <h2 className="text-xl font-bold sm:text-2xl">Filters</h2>
            <SlidersHorizontal className="h-5 w-5" />
          </div>

          <FilterRadioGroup
            title="Category"
            options={["All", ...categories]}
            value={activeCategory}
            onChange={(value) => setParam("category", value)}
            inverse
          />

          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold">
              <span>Price</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              value={maxPrice}
              onChange={handlePriceChange}
              className="h-1 w-full accent-white"
            />
            <div className="mt-2 flex justify-between text-sm text-white/85">
              <span>{priceBounds.min}</span>
              <span>{priceBounds.max}</span>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
          <FilterRadioGroup
            title="Brand"
            options={["All", ...brands]}
            value={activeBrand}
            onChange={(value) => setParam("brand", value)}
          />

          <label className="mt-6 block">
            <span className="text-base font-bold text-ink">Price</span>
            <select
              value={maxPrice}
              onChange={(event) => setParam("price", `${priceBounds.min}-${event.target.value}`)}
              className="mt-3 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-[#0068c9]"
            >
              {[100, 250, 500, priceBounds.max].map((price) => (
                <option key={price} value={price}>
                  Up to {formatPrice(price)}
                </option>
              ))}
            </select>
          </label>
        </section>
      </aside>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Product Listing</h1>
          <button
            onClick={clearFilters}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-bold text-ink transition hover:border-[#0068c9]"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-lg bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-ink">No products found</h2>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your search, category, brand, or price range.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
            <div className="grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
              {gridProducts.map((product) => (
                <article key={product.id} className="rounded-lg bg-white p-3 shadow-sm sm:p-4">
                  <Link href={`/product/${product.id}`}>
                    <div className="product-image-bg aspect-square overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain p-4 transition duration-300 hover:scale-105"
                      />
                    </div>
                    <h2 className="mt-3 min-h-10 break-words text-base font-extrabold leading-tight text-ink">
                      {product.title}
                    </h2>
                    <p className="text-base font-extrabold text-ink">{formatPrice(product.price)}</p>
                  </Link>
                  <div className="mt-3">
                    <AddToCartButton product={product} />
                  </div>
                </article>
              ))}
            </div>

            {featuredProduct && (
              <article className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
                <Link href={`/product/${featuredProduct.id}`}>
                  <div className="product-image-bg aspect-square overflow-hidden rounded-lg sm:aspect-[4/5]">
                    <img
                      src={featuredProduct.image}
                      alt={featuredProduct.title}
                      className="h-full w-full object-contain p-5"
                    />
                  </div>
                  <h2 className="mt-4 break-words text-xl font-extrabold text-ink sm:mt-5 sm:text-2xl">
                    {featuredProduct.title}
                  </h2>
                  <p className="mt-1 text-xl font-extrabold text-ink">
                    {formatPrice(featuredProduct.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <RatingStars rating={featuredProduct.rating} />
                    <span className="text-xs font-semibold text-slate-500">
                      {featuredProduct.reviewCount} reviews
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {featuredProduct.description}
                  </p>
                  <p className="mt-4 text-sm font-bold text-ink">Category</p>
                  <p className="text-sm text-slate-600">{featuredProduct.category}</p>
                </Link>
                <div className="mt-6">
                  <AddToCartButton product={featuredProduct} large />
                </div>
              </article>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterRadioGroup({
  title,
  options,
  value,
  onChange,
  inverse = false
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  inverse?: boolean;
}) {
  return (
    <div>
      <h3 className={`mb-3 text-base font-bold ${inverse ? "text-white" : "text-ink"}`}>
        {title}
      </h3>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-3 text-sm ${
              inverse ? "text-white/95" : "text-slate-700"
            }`}
          >
            <input
              type="radio"
              checked={value === option}
              onChange={() => onChange(option)}
              className="h-4 w-4 accent-[#0072ce]"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
