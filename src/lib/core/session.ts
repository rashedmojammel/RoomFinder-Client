import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "../auth";
// import { auth } from "../auth";
// import { auth } from "../auth";

// React's cache() dedupes this per-request, so calling getUserSession() and
// getUserToken() in the same render only hits auth.api.getSession() once.
const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });
});

export const getUserSession = async () => {
  const session = await getSession();
  return session?.user ?? null;
};

export const getUserToken = async () => {
  const session = await getSession();
  return session?.session?.token ?? null;
};