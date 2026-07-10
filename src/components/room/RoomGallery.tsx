"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

interface RoomGalleryProps {
  images: string[];
  title: string;
}

export default function RoomGallery({ images, title }: RoomGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openAt = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <div className="relative">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl h-[420px]">
        <button
          onClick={() => openAt(0)}
          className="relative col-span-2 row-span-2 overflow-hidden"
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="50vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </button>

        {images.slice(1, 5).map((img, i) => (
          <button
            key={i}
            onClick={() => openAt(i + 1)}
            className="relative col-span-1 row-span-1 overflow-hidden"
          >
            <Image
              src={img}
              alt={`${title} photo ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {images.length > 1 && (
        <button
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        >
          <Images className="h-4 w-4" />
          Show all {images.length} photos
        </button>
      )}

      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4">
          <button
            onClick={close}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prev}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 md:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative h-[70vh] w-full max-w-4xl">
            <Image
              src={images[activeIndex]}
              alt={`${title} photo ${activeIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={next}
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 md:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <span className="absolute bottom-6 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}