// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// if (!baseUrl) {
//   throw new Error("Missing required environment variable: NEXT_PUBLIC_BASE_URL");
// }

// export async function clientFetch<T>(path: string): Promise<T> {
//   const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });

//   let body: unknown = null;
//   try {
//     body = await res.json();
//   } catch {
//     // no JSON body
//   }

//   if (!res.ok) {
//     const message =
//       (body as { error?: { message?: string } } | null)?.error?.message ||
//       `Request failed with status ${res.status}`;
//     throw new Error(message);
//   }

//   return body as T;
// }
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_BASE_URL");
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getClientToken(): Promise<string | null> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const res = await fetch("/api/token");
  if (!res.ok) return null;

  const { token } = await res.json();
  if (!token) return null;

  // Cache for 10 minutes — comfortably under the 15-minute token expiry set in auth.ts
  cachedToken = { value: token, expiresAt: Date.now() + 10 * 60 * 1000 };
  return token;
}

export async function clientFetch<T>(path: string): Promise<T> {
  const token = await getClientToken();

  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    const message =
      (body as { error?: { message?: string } } | null)?.error?.message ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body as T;
}