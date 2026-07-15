// import { redirect } from "next/navigation";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// if (!baseUrl) {
//   throw new Error("Missing required environment variable: NEXT_PUBLIC_BASE_URL");
// }

// type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// export const serverFetch = async <T>(path: string): Promise<T> => {
//   const res = await fetch(`${baseUrl}${path}`, {
//     cache: "no-store",
//   });

//   return handleStatusCode<T>(res);
// };

// export const serverMutation = async <T>(
//   path: string,
//   data?: unknown,
//   method: HttpMethod = "POST"
// ): Promise<T> => {
//   const res = await fetch(`${baseUrl}${path}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
//   });

//   return handleStatusCode<T>(res);
// };

// const handleStatusCode = async <T>(res: Response): Promise<T> => {
//   if (res.status === 401) {
//     redirect("/unauthorized");
//   }

//   if (res.status === 403) {
//     redirect("/forbidden");
//   }

//   let body: unknown = null;
//   try {
//     body = await res.json();
//   } catch {
//     // No JSON body (e.g. some DELETE responses)
//   }

//   if (!res.ok) {
//     const message =
//       (body as { error?: { message?: string } } | null)?.error?.message ||
//       `Request failed with status ${res.status}`;
//     throw new Error(message);
//   }

//   return body as T;
// };
import { redirect } from "next/navigation";
import { headers as nextHeaders } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const authServerUrl = process.env.BETTER_AUTH_URL;

if (!baseUrl) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_BASE_URL");
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function authHeader(): Promise<Record<string, string>> {
  try {
    const incoming = await nextHeaders();
    const cookie = incoming.get("cookie");
    if (!cookie) return {};

    const res = await fetch(`${authServerUrl}/api/auth/token`, {
      headers: { cookie },
      cache: "no-store",
    });

    if (!res.ok) return {};

    const { token } = await res.json();
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export const serverFetch = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
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
      ...(await authHeader()),
    },
    ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
  });

  return handleStatusCode<T>(res);
};

const handleStatusCode = async <T>(res: Response): Promise<T> => {
  if (res.status === 401) {
    redirect("/sign-in");
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