"use server";

import { revalidatePath } from "next/cache";
// import { serverMutation } from "@/lib/fetch";
import { Booking, BookingStatus, CreateBookingInput } from "@/types/booking";
import { serverMutation } from "../core/server";

interface BookingResponse {
  booking: Booking;
}

export async function createBooking(data: CreateBookingInput): Promise<Booking> {
  const { booking } = await serverMutation<BookingResponse>("/api/bookings", data, "POST");
  revalidatePath("/dashboard/tenant/bookings");
  return booking;
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  actorId: string
): Promise<Booking> {
  const { booking } = await serverMutation<BookingResponse>(
    `/api/bookings/${bookingId}/status`,
    { status, actorId },
    "PATCH"
  );
  revalidatePath("/dashboard/owner/bookings");
  revalidatePath("/dashboard/tenant/bookings");
  return booking;
}