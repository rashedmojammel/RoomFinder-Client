// import { serverFetch } from "@/lib/fetch";
import { Booking } from "@/types/booking";
import { serverFetch } from "../core/server";

interface BookingsResponse {
  bookings: Booking[];
}

export async function getTenantBookings(tenantId: string): Promise<Booking[]> {
  const { bookings } = await serverFetch<BookingsResponse>(`/api/bookings/tenant/${tenantId}`);
  return bookings;
}

export async function getOwnerBookings(ownerId: string): Promise<Booking[]> {
  const { bookings } = await serverFetch<BookingsResponse>(`/api/bookings/owner/${ownerId}`);
  return bookings;
}
