import { MapPin, BedDouble, Bath, CheckCircle2, XCircle } from "lucide-react";
import { Listing } from "@/types/listing";

interface RoomDetailsProps {
  listing: Listing;
}

export default function RoomDetails({ listing }: RoomDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3 border-b border-gray-100 pb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{listing.title}</h1>

        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4 text-cyan-500" />
          {listing.address}, {listing.city}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-md">
          <BedDouble className="mx-auto mb-2 h-5 w-5 text-cyan-500" />
          <p className="text-sm font-bold text-slate-900">{listing.bedrooms}</p>
          <p className="text-xs text-slate-500">Bedrooms</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-md">
          <Bath className="mx-auto mb-2 h-5 w-5 text-cyan-500" />
          <p className="text-sm font-bold text-slate-900">{listing.bathrooms}</p>
          <p className="text-xs text-slate-500">Bathrooms</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-md">
          {listing.isAvailable ? (
            <CheckCircle2 className="mx-auto mb-2 h-5 w-5 text-teal-500" />
          ) : (
            <XCircle className="mx-auto mb-2 h-5 w-5 text-slate-400" />
          )}
          <p className="text-sm font-bold text-slate-900">
            {listing.isAvailable ? "Available" : "Unavailable"}
          </p>
          <p className="text-xs text-slate-500">Status</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-bold text-slate-900">About this place</h2>
        <p className="leading-relaxed text-slate-600">{listing.description}</p>
      </div>
    </div>
  );
}