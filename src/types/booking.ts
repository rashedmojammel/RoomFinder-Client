import { Listing } from "./listing";

export type BookingStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface Booking {
  _id: string;
  listingId: string;
  tenantId: string;
  ownerId: string;
  tenantName: string;
  tenantPhone: string;
  moveInDate?: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  listing?: Listing | null;
}

export interface CreateBookingInput {
  listingId: string;
  tenantId: string;
  tenantName: string;
  tenantPhone: string;
  moveInDate?: string;
  message?: string;
}