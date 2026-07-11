import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_BASE_URL");
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const serverFetch = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  return handleStatusCode<T>(res);
};

export const serverMutation = async <T>(
  path: string,
  data?: unknown,
  method: HttpMethod = "POST"
): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
  });

  return handleStatusCode<T>(res);
};

const handleStatusCode = async <T>(res: Response): Promise<T> => {
  if (res.status === 401) {
    redirect("/unauthorized");
  }

  if (res.status === 403) {
    redirect("/forbidden");
  }

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // No JSON body (e.g. some DELETE responses)
  }

  if (!res.ok) {
    const message =
      (body as { error?: { message?: string } } | null)?.error?.message ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body as T;
};