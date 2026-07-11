import { Listing } from "./listing";

export type BookingStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface Booking {
  _id: string;
  listingId: string;
  tenantId: string;
  ownerId: string;
  status: BookingStatus;
  message?: string;
  createdAt: string;
  updatedAt: string;
  listing?: Listing | null;
}

export interface CreateBookingInput {
  listingId: string;
  tenantId: string;
  message?: string;
}