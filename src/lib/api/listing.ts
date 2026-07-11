// import { serverFetch } from "@/lib/fetch";
import { Listing, ListingFilters } from "@/types/listing";
import { serverFetch } from "../core/server";

const RESOURCE = "/api/rooms";

interface ListingsResponse {
  listings: Listing[];
}

interface ListingResponse {
  listing: Listing;
}

function buildQuery(filters: ListingFilters): string {
  const params = new URLSearchParams();

  if (filters.city) params.set("city", filters.city);
  if (filters.minRent !== undefined) params.set("minRent", String(filters.minRent));
  if (filters.maxRent !== undefined) params.set("maxRent", String(filters.maxRent));
  if (filters.bedrooms !== undefined) params.set("bedrooms", String(filters.bedrooms));

  const query = params.toString();
  return query ? `?${query}` : "";
}

// GET /api/rooms — public feed, approved + available only (enforced server-side)
export async function getListings(filters: ListingFilters = {}): Promise<Listing[]> {
  const { listings } = await serverFetch<ListingsResponse>(`${RESOURCE}${buildQuery(filters)}`);
  return listings;
}

// GET /api/rooms/:id
export async function getListingById(id: string): Promise<Listing | null> {
  try {
    const { listing } = await serverFetch<ListingResponse>(`${RESOURCE}/${id}`);
    return listing;
  } catch {
    return null;
  }
}

// GET /api/rooms/owner/:ownerId — every status, for the owner's own dashboard
export async function getOwnerListings(ownerId: string): Promise<Listing[]> {
  const { listings } = await serverFetch<ListingsResponse>(`${RESOURCE}/owner/${ownerId}`);
  return listings;
}

// GET /api/rooms/admin/pending — admin review queue
export async function getPendingListings(): Promise<Listing[]> {
  const { listings } = await serverFetch<ListingsResponse>(`${RESOURCE}/admin/pending`);
  return listings;
}