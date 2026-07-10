"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";
import RoomCard from "@/components/room/RoomCard";
import { rooms } from "@/data/rooms";
import { RoomType } from "@/types/room";

const roomTypes: RoomType[] = ["Single Room", "Shared Room", "Studio", "Apartment", "Family Suite"];

export default function FindRoomPage() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<RoomType | "All">("All");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesQuery =
        query.trim() === "" ||
        room.title.toLowerCase().includes(query.toLowerCase()) ||
        room.area.toLowerCase().includes(query.toLowerCase()) ||
        room.city.toLowerCase().includes(query.toLowerCase());

      const matchesType = activeType === "All" || room.roomType === activeType;
      const matchesPrice = room.price <= maxPrice;

      return matchesQuery && matchesType && matchesPrice;
    });
  }, [query, activeType, maxPrice]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero / search header */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Find your next room</h1>
          <p className="mt-2 max-w-xl text-slate-500">
            Verified rooms and apartments across Dhaka, matched to how you actually live.
          </p>

          {/* Search bar */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-md transition-shadow duration-300 focus-within:shadow-xl">
              <Search className="h-5 w-5 flex-shrink-0 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by area, city, or room title"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search">
                  <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {(["All", ...roomTypes] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                        activeType === type
                          ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white shadow-md"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 sm:w-64">
                  <label className="whitespace-nowrap text-sm font-medium text-slate-600">
                    Max ৳{maxPrice.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={5000}
                    max={50000}
                    step={1000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">{filteredRooms.length}</span> rooms
            found
          </p>
        </div>

        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-md">
            <MapPin className="h-8 w-8 text-slate-300" />
            <p className="font-semibold text-slate-700">No rooms match your search</p>
            <p className="text-sm text-slate-500">Try adjusting your filters or search term.</p>
          </div>
        )}
      </section>
    </main>
  );
}