"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2 } from "lucide-react";
import { updateListing } from "@/lib/actions/listing";
import ImageUploader from "@/components/ui/ImageUploader";
import { Listing } from "@/types/listing";

interface EditListingFormProps {
  listing: Listing;
  onSuccess?: () => void;
}

export default function EditListingForm({ listing, onSuccess }: EditListingFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(listing.title);
  const [description, setDescription] = useState(listing.description);
  const [city, setCity] = useState(listing.city);
  const [address, setAddress] = useState(listing.address);
  const [rentPerMonth, setRentPerMonth] = useState(String(listing.rentPerMonth));
  const [bedrooms, setBedrooms] = useState(String(listing.bedrooms));
  const [bathrooms, setBathrooms] = useState(String(listing.bathrooms));
  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState<string[]>(listing.amenities);
  const [images, setImages] = useState<string[]>(listing.images);
  const [isImagesUploading, setIsImagesUploading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addAmenity = () => {
    const value = amenityInput.trim();
    if (value && !amenities.includes(value)) setAmenities([...amenities, value]);
    setAmenityInput("");
  };

  const removeAmenity = (value: string) => setAmenities(amenities.filter((a) => a !== value));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
      await updateListing(listing._id, {
        title,
        description,
        city,
        address,
        rentPerMonth: Number(rentPerMonth),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        amenities,
        images,
      });

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/owner/listings");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {listing.approvalStatus === "approved" && (
        <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Saving changes will send this listing back for admin review before it&apos;s visible to tenants again.
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
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
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Address *</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
              <span key={amenity} className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
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
        <ImageUploader value={images} onChange={setImages} onUploadingChange={setIsImagesUploading} maxImages={8} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isImagesUploading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}