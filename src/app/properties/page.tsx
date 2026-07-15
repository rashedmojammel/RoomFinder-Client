import Link from "next/link";
import { ArrowRight, Building2, MapPin, Users, Home, DoorOpen, Warehouse } from "lucide-react";
import { getListings } from "@/lib/api/listing";
import RoomCard from "@/components/room/RoomCard";
import StatBadge from "@/components/marketing/StatBadge";

const bedroomCategories = [
  { label: "Single Rooms", bedrooms: 1, icon: DoorOpen },
  { label: "2 Bedroom Apartments", bedrooms: 2, icon: Home },
  { label: "3+ Bedroom Homes", bedrooms: 3, icon: Warehouse },
];

export default async function PropertiesPage() {
  const listings = await getListings();

  const cities = [...new Set(listings.map((l) => l.city))];
  const featured = listings.slice(0, 6);
  const avgRent =
    listings.length > 0
      ? Math.round(listings.reduce((sum, l) => sum + l.rentPerMonth, 0) / listings.length)
      : 0;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Browse our properties</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Verified rooms and apartments from real owners, ready for you to move in.
          </p>

          <Link
            href="/find-room"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          >
            Search all properties
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            <StatBadge icon={Building2} value={String(listings.length)} label="Active listings" />
            <StatBadge icon={MapPin} value={String(cities.length)} label="Cities covered" />
            <StatBadge icon={Users} value={`৳${avgRent.toLocaleString()}`} label="Average rent / month" />
          </div>
        </div>
      </section>

      {/* Browse by bedrooms */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Browse by size</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {bedroomCategories.map(({ label, bedrooms, icon: Icon }) => (
            <Link
              key={label}
              href={`/find-room?bedrooms=${bedrooms}`}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 text-white">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-slate-900">{label}</p>
                <p className="text-sm text-slate-500 transition-colors group-hover:text-cyan-600">
                  Explore listings →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by city */}
      {cities.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Browse by city</h2>
          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/find-room?city=${encodeURIComponent(city)}`}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors duration-300 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
              >
                <MapPin className="h-4 w-4 text-cyan-500" />
                {city}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured listings */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Featured properties</h2>
          <Link href="/find-room" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700">
            View all →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-md">
            <p className="text-slate-500">No properties available right now — check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <RoomCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}