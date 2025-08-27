import { QueryClient, QueryFunction } from "@tanstack/react-query";

// ---- base URL + resolver ----
const API_BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/+$/, "");
function resolveUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl) || pathOrUrl.startsWith("//")) return pathOrUrl;
  if (!API_BASE) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${API_BASE}${path}`;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(method: string, url: string, data?: unknown) {
  const res = await fetch(resolveUrl(url), {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });
  await throwIfResNotOk(res);
  return res;
}

// ✅ declare the generic on the function
export const getQueryFn = <T>({ on401 }: { on401: "returnNull" | "throw" }): QueryFunction<T> => {
  return async ({ queryKey }) => {
    const url = String(queryKey[0]);
    const res = await fetch(resolveUrl(url), { credentials: "include" });

    if (on401 === "returnNull" && res.status === 401) {
      // still satisfy T
      return null as unknown as T;
    }

    await throwIfResNotOk(res);
    return (await res.json()) as T;
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: { retry: false },
  },
});
