"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { createListing } from "@/lib/actions/listing";
import ImageUploader from "@/components/ui/ImageUploader";

export default function AddListingForm() {
  const router = useRouter();
  const { data: session, isPending: isSessionLoading } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [rentPerMonth, setRentPerMonth] = useState("");
  const [bedrooms, setBedrooms] = useState("1");
  const [bathrooms, setBathrooms] = useState("1");
  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isImagesUploading, setIsImagesUploading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addAmenity = () => {
    const value = amenityInput.trim();
    if (value && !amenities.includes(value)) {
      setAmenities([...amenities, value]);
    }
    setAmenityInput("");
  };

  const removeAmenity = (value: string) => {
    setAmenities(amenities.filter((a) => a !== value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const ownerId = session?.user?.id;

    if (!ownerId) {
      setError("You must be signed in to publish a listing.");
      return;
    }

    if (!title || !description || !city || !address || !rentPerMonth) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isImagesUploading) {
      setError("Please wait for image uploads to finish.");
      return;
    }

    setIsSubmitting(true);
    try {
      const listing = await createListing({
        title,
        description,
        city,
        address,
        rentPerMonth: Number(rentPerMonth),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        ownerId,
        amenities,
        images,
      });

      router.push(`/find-room/${listing._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {!isSessionLoading && !session?.user && (
        <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          You need to be signed in to publish a listing.
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Sunlit Studio Near Gulshan Lake"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Describe the room, the building, and the neighborhood…"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">City *</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Dhaka"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Address *</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Road 11, Gulshan 1"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Rent / month (৳) *</label>
          <input
            type="number"
            min={0}
            value={rentPerMonth}
            onChange={(e) => setRentPerMonth(e.target.value)}
            placeholder="18500"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Bedrooms</label>
          <input
            type="number"
            min={0}
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Bathrooms</label>
          <input
            type="number"
            min={0}
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Amenities</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAmenity();
              }
            }}
            placeholder="e.g. Wi-Fi, then press Enter"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
          <button
            type="button"
            onClick={addAmenity}
            className="flex items-center justify-center rounded-xl bg-slate-100 px-4 text-slate-600 transition hover:bg-slate-200"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {amenities.map((amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-sm text-slate-600"
              >
                {amenity}
                <button type="button" onClick={() => removeAmenity(amenity)}>
                  <X className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Photos</label>
        <ImageUploader
          value={images}
          onChange={setImages}
          onUploadingChange={setIsImagesUploading}
          maxImages={8}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isImagesUploading || isSessionLoading || !session?.user}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Publishing…" : isImagesUploading ? "Waiting for uploads…" : "Publish Listing"}
      </button>
    </form>
  );
}