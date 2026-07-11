const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_BASE_URL");
}

export async function clientFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });

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