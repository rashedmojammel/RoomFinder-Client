import { MapPin, Star, BedDouble, Bath, Users, Ruler, CheckCircle2 } from "lucide-react";
import { Room } from "@/types/room";

interface RoomDetailsProps {
  room: Room;
}

export default function RoomDetails({ room }: RoomDetailsProps) {
  const availableDate = new Date(room.availableFrom).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-gray-100 pb-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{room.title}</h1>
          <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
            {room.roomType}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-cyan-500 text-cyan-500" />
            <span className="font-semibold text-slate-800">{room.rating.toFixed(1)}</span>
            <span>({room.reviewsCount} reviews)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-cyan-500" />
            {room.address}, {room.city}
          </span>
        </div>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { icon: Ruler, label: "Size", value: `${room.size} sqft` },
          { icon: BedDouble, label: "Bedrooms", value: room.bedrooms },
          { icon: Bath, label: "Bathrooms", value: room.bathrooms },
          { icon: Users, label: "Capacity", value: `${room.capacity} guests` },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-md"
          >
            <Icon className="mx-auto mb-2 h-5 w-5 text-cyan-500" />
            <p className="text-sm font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <h2 className="mb-3 text-lg font-bold text-slate-900">About this place</h2>
        <p className="leading-relaxed text-slate-600">{room.description}</p>
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <CheckCircle2 className="h-4 w-4 text-teal-500" />
        {room.available ? (
          <span>
            Available from <span className="font-semibold">{availableDate}</span>
          </span>
        ) : (
          <span>Currently occupied &mdash; next available {availableDate}</span>
        )}
      </div>

      {/* House rules */}
      <div>
        <h2 className="mb-3 text-lg font-bold text-slate-900">House rules</h2>
        <ul className="space-y-2">
          {room.rules.map((rule) => (
            <li key={rule} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}