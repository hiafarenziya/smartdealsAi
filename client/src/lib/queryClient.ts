import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Build URL from queryKey array
    let url = queryKey[0] as string; // First element is the base path
    
    // If there are additional parameters (as objects), convert to query string
    if (queryKey.length > 1) {
      const params = new URLSearchParams();
      
      for (let i = 1; i < queryKey.length; i++) {
        const paramObj = queryKey[i];
        
        if (typeof paramObj === "object" && paramObj !== null) {
          // Convert object to query parameters
          Object.entries(paramObj).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              params.append(key, String(value));
            }
          });
        } else if (paramObj !== undefined && paramObj !== null && paramObj !== "") {
          // Handle non-object parameters (shouldn't happen in our current setup, but for safety)
          params.append("param", String(paramObj));
        }
      }
      
      if (params.toString()) {
        url += "?" + params.toString();
      }
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
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
    mutations: {
      retry: false,
    },
  },
});
