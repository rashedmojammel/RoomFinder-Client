import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "roomfinder";

if (!uri) {
  throw new Error("Missing required environment variable: MONGODB_URI");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri);

// Reuse the connection across hot reloads in dev instead of opening a new one per request
const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ?? (global._mongoClientPromise = client.connect());

export async function getAuthDb(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName); // must match whatever name auth.ts passes to client.db(...)
}