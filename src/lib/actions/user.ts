"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
// import { getAuthDb } from "@/lib/db/mongo";
import { getUserSession } from "@/lib/core/session";
import { getAuthDb } from "../lib/mongo";

async function assertAdmin() {
  const user = await getUserSession();
  if (!user || user.role !== "admin") {
    throw new Error("Not authorized");
  }
  return user;
}

function toFilter(userId: string) {
  return ObjectId.isValid(userId) ? { _id: new ObjectId(userId) } : { id: userId };
}

export async function updateUserRole(userId: string, role: "tenant" | "owner" | "admin") {
  await assertAdmin();

  const db = await getAuthDb();
  await db.collection("user").updateOne(toFilter(userId), { $set: { role } });

  revalidatePath("/dashboard/admin/users");
}

export async function setUserBanned(userId: string, banned: boolean) {
  await assertAdmin();

  const db = await getAuthDb();
  await db.collection("user").updateOne(toFilter(userId), { $set: { banned } });

  revalidatePath("/dashboard/admin/users");
}