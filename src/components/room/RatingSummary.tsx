import { Star } from "lucide-react";

export default function RatingSummary({ average, count }: { average: number; count: number }) {
  if (count === 0) {
    return <span className="text-sm text-slate-400">No reviews yet</span>;
  }

  return (
    <span className="flex items-center gap-1.5 text-sm">
      <Star className="h-4 w-4 fill-cyan-500 text-cyan-500" />
      <span className="font-semibold text-slate-800">{average.toFixed(1)}</span>
      <span className="text-slate-500">
        ({count} review{count !== 1 ? "s" : ""})
      </span>
    </span>
  );
}