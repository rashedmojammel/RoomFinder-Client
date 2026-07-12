import { ObjectId } from "mongodb";
// import { getAuthDb } from "@/lib/db/mongo";
import { PublicUser } from "@/types/user";
import { getAuthDb } from "../lib/mongo";

// Only ever call this from Server Components / Server Actions —
// it talks to MongoDB directly, no HTTP hop needed.
export async function getUserById(id: string): Promise<PublicUser | null> {
  const db = await getAuthDb();
  const collection = db.collection("user"); // better-auth's default collection name

  const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };
  const doc = await collection.findOne(filter);

  if (!doc) return null;

  return {
    id: doc.id ?? doc._id?.toString(),
    name: doc.name ?? "Unknown",
    email: doc.email ?? "",
    image: doc.image ?? null,
    phoneNumber: doc.phoneNumber ?? undefined,
  };
}
export async function getAllUsers(): Promise<PublicUser[]> {
  const db = await getAuthDb();
  const collection = db.collection("user");

  const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();

  return docs.map((doc) => ({
    id: doc.id ?? doc._id?.toString(),
    name: doc.name ?? "Unknown",
    email: doc.email ?? "",
    image: doc.image ?? null,
    phoneNumber: doc.phoneNumber ?? undefined,
    role: doc.role ?? "tenant",
    banned: Boolean(doc.banned),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
  }));
}