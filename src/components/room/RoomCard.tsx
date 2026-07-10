import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, BedDouble, Users } from "lucide-react";
import { Room } from "@/types/room";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Link
      href={`/find-room/${room.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {room.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Featured
          </span>
        )}

        {!room.available && (
          <span className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-800">
              Not Available
            </span>
          </span>
        )}

        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-cyan-500 text-cyan-500" />
          {room.rating.toFixed(1)}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-base font-bold text-slate-900">{room.title}</h3>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4 flex-shrink-0 text-cyan-500" />
          <span className="line-clamp-1">
            {room.area}, {room.city}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-slate-400" />
            {room.bedrooms} bed{room.bedrooms > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-slate-400" />
            {room.capacity} guest{room.capacity > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <span className="text-lg font-bold text-slate-900">
              ৳{room.price.toLocaleString()}
            </span>
            <span className="text-sm text-slate-500"> / month</span>
          </div>
          <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
            {room.roomType}
          </span>
        </div>
      </div>
    </Link>
  );
}