"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal, MapPin, X, Loader2 } from "lucide-react";
import RoomCard from "@/components/room/RoomCard";
import { clientFetch } from "@/lib/client-fetch";
import { Listing } from "@/types/listing";

const bedroomOptions = [1, 2, 3, 4] as const;

interface ListingsResponse {
  listings: Listing[];
}

export default function FindRoomPage() {
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState<number | "All">("All");
  const [maxRent, setMaxRent] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);

  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (city.trim()) params.set("city", city.trim());
      if (maxRent) params.set("maxRent", String(maxRent));
      if (bedrooms !== "All") params.set("bedrooms", String(bedrooms));

      try {
        const { listings } = await clientFetch<ListingsResponse>(`/api/rooms?${params.toString()}`);
        setListings(listings);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load listings");
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [city, bedrooms, maxRent]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Find your next room</h1>
          <p className="mt-2 max-w-xl text-slate-500">
            Verified rooms and apartments, matched to how you actually live.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-md transition-shadow duration-300 focus-within:shadow-xl">
              <Search className="h-5 w-5 flex-shrink-0 text-slate-400" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search by city"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              {city && (
                <button onClick={() => setCity("")} aria-label="Clear search">
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

          {showFilters && (
            <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setBedrooms("All")}
                    className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                      bedrooms === "All"
                        ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white shadow-md"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Any bedrooms
                  </button>
                  {bedroomOptions.map((n) => (
                    <button
                      key={n}
                      onClick={() => setBedrooms(n)}
                      className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                        bedrooms === n
                          ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white shadow-md"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {n} bed{n > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 sm:w-64">
                  <label className="whitespace-nowrap text-sm font-medium text-slate-600">
                    Max ৳{maxRent.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={5000}
                    max={50000}
                    step={1000}
                    value={maxRent}
                    onChange={(e) => setMaxRent(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />}
          <p className="text-sm text-slate-500">
            {isLoading ? (
              "Searching…"
            ) : (
              <>
                <span className="font-semibold text-slate-900">{listings.length}</span> rooms found
              </>
            )}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error} — is the API server running?
          </div>
        )}

        {!isLoading && !error && listings.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-md">
            <MapPin className="h-8 w-8 text-slate-300" />
            <p className="font-semibold text-slate-700">No rooms match your search</p>
            <p className="text-sm text-slate-500">Try adjusting your filters or search term.</p>
          </div>
        )}

        {listings.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <RoomCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}