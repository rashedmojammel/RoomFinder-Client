"use server";

// import { serverMutation } from "@/lib/fetch";
import { Listing, CreateListingInput, UpdateListingInput } from "@/types/listing";
import { serverMutation } from "../core/server";

const RESOURCE = "/api/rooms";

interface ListingResponse {
  listing: Listing;
}

interface DeleteResponse {
  message: string;
}

// POST /api/rooms
export async function createListing(data: CreateListingInput): Promise<Listing> {
  const { listing } = await serverMutation<ListingResponse>(RESOURCE, data, "POST");
  return listing;
}

// PATCH /api/rooms/:id
export async function updateListing(id: string, data: UpdateListingInput): Promise<Listing> {
  const { listing } = await serverMutation<ListingResponse>(`${RESOURCE}/${id}`, data, "PATCH");
  return listing;
}

// DELETE /api/rooms/:id
export async function deleteListing(id: string): Promise<string> {
  const { message } = await serverMutation<DeleteResponse>(`${RESOURCE}/${id}`, undefined, "DELETE");
  return message;
}