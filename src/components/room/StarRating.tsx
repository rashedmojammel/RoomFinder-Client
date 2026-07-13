"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
}

export default function StarRating({ value, onChange, size = 20, readOnly = false }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayValue = hovered ?? value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(null)}
          className={readOnly ? "cursor-default" : "cursor-pointer transition-transform hover:scale-110"}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            style={{ width: size, height: size }}
            className={star <= displayValue ? "fill-cyan-500 text-cyan-500" : "fill-none text-slate-300"}
          />
        </button>
      ))}
    </div>
  );
}