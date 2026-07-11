"use server";

import { revalidatePath } from "next/cache";
// import { serverMutation } from "@/lib/fetch";
import { Listing, CreateListingInput, UpdateListingInput, ListingApprovalStatus } from "@/types/listing";
import { serverMutation } from "../core/server";

const RESOURCE = "/api/rooms";

interface ListingResponse {
  listing: Listing;
}

interface DeleteResponse {
  message: string;
}

export async function createListing(data: CreateListingInput): Promise<Listing> {
  const { listing } = await serverMutation<ListingResponse>(RESOURCE, data, "POST");
  revalidatePath("/dashboard/owner/listings");
  return listing;
}

export async function updateListing(id: string, data: UpdateListingInput): Promise<Listing> {
  const { listing } = await serverMutation<ListingResponse>(`${RESOURCE}/${id}`, data, "PATCH");
  revalidatePath("/dashboard/owner/listings");
  return listing;
}

export async function updateListingApproval(
  id: string,
  approvalStatus: ListingApprovalStatus,
  rejectionReason?: string
): Promise<Listing> {
  const { listing } = await serverMutation<ListingResponse>(
    `${RESOURCE}/${id}/approval`,
    { approvalStatus, rejectionReason },
    "PATCH"
  );
  revalidatePath("/dashboard/admin/listings");
  revalidatePath("/dashboard/owner/listings");
  revalidatePath("/find-room");
  return listing;
}

export async function deleteListing(id: string): Promise<string> {
  const { message } = await serverMutation<DeleteResponse>(`${RESOURCE}/${id}`, undefined, "DELETE");
  revalidatePath("/dashboard/owner/listings");
  return message;
}