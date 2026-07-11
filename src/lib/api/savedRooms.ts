// import { serverFetch } from "@/lib/fetch";
import { Listing } from "@/types/listing";
import { serverFetch } from "../core/server";
// import { serverFetch } from "../core/server";

interface SavedRoomsResponse {
  listings: Listing[];
}

export async function getSavedRooms(tenantId: string): Promise<Listing[]> {
  const { listings } = await serverFetch<SavedRoomsResponse>(`/api/saved-rooms/${tenantId}`);
  return listings;
}