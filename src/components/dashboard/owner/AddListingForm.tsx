"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Loader2, MapPin, Trash2, Upload } from "lucide-react";
import { roomTypes, amenityOptions } from "@/lib/room-options";
import type { RoomType } from "@/types/room";

interface ImagePreview {
  file: File;
  url: string;
}

interface FormState {
  title: string;
  description: string;
  roomType: RoomType;
  city: string;
  area: string;
  address: string;
  price: string;
  amenities: string[];
}

const initialState: FormState = {
  title: "",
  description: "",
  roomType: roomTypes[0],
  city: "",
  area: "",
  address: "",
  price: "",
  amenities: [],
};

export default function AddListingForm() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialState);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const addImages = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({ file, url: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...next].slice(0, 8));
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addImages(e.dataTransfer.files);
  };

  const validate = (): string | null => {
    if (!form.title.trim()) return "Please add a title for your listing.";
    if (!form.city.trim() || !form.area.trim()) return "Please add the city and area.";
    if (!form.price || Number(form.price) <= 0) return "Please add a valid monthly rent.";
    if (images.length === 0) return "Please add at least one photo.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("description", form.description);
      payload.append("roomType", form.roomType);
      payload.append("city", form.city);
      payload.append("area", form.area);
      payload.append("address", form.address);
      payload.append("price", form.price);
      payload.append("amenities", JSON.stringify(form.amenities));
      images.forEach(({ file }) => payload.append("images", file));

      // TODO: point this at your real listings endpoint once it exists
      // (Next.js route handler at app/api/listings/route.ts, or your Express backend)
      const res = await fetch("/api/listings", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error?.message || "Failed to create listing.");
      }

      setSuccess("Listing created successfully!");
      setForm(initialState);
      images.forEach((img) => URL.revokeObjectURL(img.url));
      setImages([]);

      setTimeout(() => router.push("/dashboard/owner/listings"), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic info */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
        <p className="mt-1 text-sm text-slate-500">Give tenants a clear picture of the room.</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Listing Title</label>
            <input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Cozy single room near AIUB"
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-cyan-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe the room, the neighborhood, and what makes it a great fit..."
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none focus:border-cyan-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Room Type</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {roomTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateField("roomType", type)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    form.roomType === type
                      ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white shadow-md"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & pricing */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">Location &amp; Pricing</h3>
        <p className="mt-1 text-sm text-slate-500">Where is the room, and what does it cost?</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Dhaka"
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-cyan-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Area</label>
            <input
              value={form.area}
              onChange={(e) => updateField("area", e.target.value)}
              placeholder="Kuratoli"
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-cyan-400 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700">Full Address</label>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-cyan-400 focus-within:bg-white">
              <MapPin size={16} className="text-gray-400" />
              <input
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="House/Road/Block details"
                className="h-12 w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Monthly Rent (৳)</label>
            <input
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="12000"
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-cyan-400 focus:bg-white"
            />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">Amenities</h3>
        <p className="mt-1 text-sm text-slate-500">Select everything included with the room.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {amenityOptions.map((amenity) => {
            const selected = form.amenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  selected
                    ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white shadow-md"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </section>

      {/* Photos */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">Photos</h3>
        <p className="mt-1 text-sm text-slate-500">
          Add up to 8 photos. The first photo becomes the cover image.
        </p>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors duration-200 ${
            isDragging ? "border-cyan-400 bg-cyan-50" : "border-gray-200 bg-gray-50 hover:bg-slate-100"
          }`}
        >
          <Upload className="h-6 w-6 text-slate-400" />
          <p className="text-sm font-medium text-slate-600">Drag and drop, or click to upload</p>
          <p className="text-xs text-slate-400">PNG or JPG, up to 8 photos</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addImages(e.target.files)}
            className="hidden"
          />
        </label>

        {images.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <AnimatePresence>
              {images.map((img, index) => (
                <motion.div
                  key={img.url}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative aspect-square overflow-hidden rounded-xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                  {index === 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-600 opacity-0 shadow transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      {success && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">{success}</p>}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/dashboard/owner")}
          className="h-12 rounded-xl border border-gray-200 px-6 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <ImagePlus className="h-4 w-4" />
              Publish Listing
            </>
          )}
        </button>
      </div>
    </form>
  );
}