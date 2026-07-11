import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath } from "lucide-react";
import { Listing } from "@/types/listing";

interface RoomCardProps {
  listing: Listing;
}

export default function RoomCard({ listing }: RoomCardProps) {
  const cover = listing.images[0] ?? "/placeholder-room.jpg";

  return (
    <Link
      href={`/find-room/${listing._id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={cover}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {!listing.isAvailable && (
          <span className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-800">
              Not Available
            </span>
          </span>
        )}
      </div>

      <div className="space-y-3 p-5">
        <h3 className="line-clamp-1 text-base font-bold text-slate-900">{listing.title}</h3>

        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4 flex-shrink-0 text-cyan-500" />
          <span className="line-clamp-1">
            {listing.address}, {listing.city}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-slate-400" />
            {listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-slate-400" />
            {listing.bathrooms} bath{listing.bathrooms !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <span className="text-lg font-bold text-slate-900">
              ৳{listing.rentPerMonth.toLocaleString()}
            </span>
            <span className="text-sm text-slate-500"> / month</span>
          </div>
        </div>
      </div>
    </Link>
  );
}