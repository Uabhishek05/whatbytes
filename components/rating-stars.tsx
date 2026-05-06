import { Star } from "lucide-react";

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < Math.round(rating)
              ? "fill-[#10213d] text-[#10213d]"
              : "fill-transparent text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}
