import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
      <h1 className="text-3xl font-extrabold text-ink">Product not found</h1>
      <p className="mt-3 text-slate-500">The product you are looking for is not available.</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-[#0068c9] px-6 font-bold text-white"
      >
        Back to products
      </Link>
    </main>
  );
}
