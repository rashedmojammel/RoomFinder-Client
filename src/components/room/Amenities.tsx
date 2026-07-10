import {
  Wifi,
  Snowflake,
  ShowerHead,
  UtensilsCrossed,
  ParkingCircle,
  ShieldCheck,
  Zap,
  Building2,
  Dumbbell,
  WashingMachine,
  Sofa,
  Droplets,
  LucideIcon,
} from "lucide-react";

interface AmenitiesProps {
  amenities: string[];
}

const amenityIcons: Record<string, LucideIcon> = {
  "Wi-Fi": Wifi,
  "Air Conditioning": Snowflake,
  "Attached Bathroom": ShowerHead,
  "Shared Bathroom": ShowerHead,
  Kitchenette: UtensilsCrossed,
  "Shared Kitchen": UtensilsCrossed,
  Parking: ParkingCircle,
  "24/7 Security": ShieldCheck,
  "Generator Backup": Zap,
  Elevator: Building2,
  "Gym Access": Dumbbell,
  Laundry: WashingMachine,
  Balcony: Sofa,
  "Rooftop Access": Building2,
  "Study Table": Sofa,
  "Water Supply 24/7": Droplets,
};

export default function Amenities({ amenities }: AmenitiesProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <h2 className="mb-5 text-lg font-bold text-slate-900">What this place offers</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {amenities.map((amenity) => {
          const Icon = amenityIcons[amenity] ?? ShieldCheck;
          return (
            <div
              key={amenity}
              className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 text-white">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="font-medium">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}