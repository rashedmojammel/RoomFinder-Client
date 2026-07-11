"use client";

import { useCallback, useRef, useState } from "react";
import { ImagePlus, Loader2, X, AlertCircle } from "lucide-react";
import { uploadImageToImgbb } from "@/lib/imgbb";

interface UploadItem {
  id: string;
  previewUrl: string;
  url?: string;
  status: "uploading" | "done" | "error";
  error?: string;
}

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onUploadingChange?: (isUploading: boolean) => void;
  maxImages?: number;
}

export default function ImageUploader({
  value,
  onChange,
  onUploadingChange,
  maxImages = 8,
}: ImageUploaderProps) {
  const [items, setItems] = useState<UploadItem[]>(
    value.map((url) => ({ id: url, previewUrl: url, url, status: "done" as const }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const syncState = (next: UploadItem[]) => {
    setItems(next);
    onChange(next.filter((i) => i.status === "done" && i.url).map((i) => i.url as string));
    onUploadingChange?.(next.some((i) => i.status === "uploading"));
  };

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const remainingSlots = maxImages - items.length;
      if (remainingSlots <= 0) return;

      const filesToUpload = Array.from(files).slice(0, remainingSlots);

      const newItems: UploadItem[] = filesToUpload.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        previewUrl: URL.createObjectURL(file),
        status: "uploading",
      }));

      let working = [...items, ...newItems];
      syncState(working);

      newItems.forEach(async (item, i) => {
        const file = filesToUpload[i];
        try {
          const url = await uploadImageToImgbb(file);
          working = working.map((w) => (w.id === item.id ? { ...w, url, status: "done" } : w));
          syncState(working);
        } catch (err) {
          working = working.map((w) =>
            w.id === item.id
              ? { ...w, status: "error", error: err instanceof Error ? err.message : "Upload failed" }
              : w
          );
          syncState(working);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, maxImages]
  );

  const removeItem = (id: string) => {
    syncState(items.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors duration-300 ${
          isDragging ? "border-cyan-400 bg-cyan-50" : "border-gray-200 bg-slate-50 hover:bg-slate-100"
        }`}
      >
        <ImagePlus className="h-6 w-6 text-slate-400" />
        <p className="text-sm font-medium text-slate-600">Drag & drop images, or click to browse</p>
        <p className="text-xs text-slate-400">
          Up to {maxImages} images · {items.length}/{maxImages} added
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {items.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-slate-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.previewUrl} alt="Room upload" className="h-full w-full object-cover" />

              {item.status === "uploading" && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              )}

              {item.status === "error" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-900/60 p-2 text-center">
                  <AlertCircle className="h-5 w-5 text-white" />
                  <span className="text-xs text-white">{item.error ?? "Upload failed"}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-600 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}