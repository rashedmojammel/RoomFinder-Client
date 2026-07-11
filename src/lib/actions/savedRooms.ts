"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";
// import { serverMutation } from "@/lib/fetch";

export async function saveRoom(tenantId: string, listingId: string): Promise<void> {
  await serverMutation("/api/saved-rooms", { tenantId, listingId }, "POST");
  revalidatePath("/dashboard/tenant/saved");
}

export async function unsaveRoom(tenantId: string, listingId: string): Promise<void> {
  await serverMutation(`/api/saved-rooms/${tenantId}/${listingId}`, undefined, "DELETE");
  revalidatePath("/dashboard/tenant/saved");
}