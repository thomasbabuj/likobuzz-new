import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// Create a client for each request in RSC
// ensuring we don't share clients between requests
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    })
);

/**
 * Utility for prefetching data in Server Components
 *
 * Example usage:
 *
 * // In a Server Component:
 * export default async function Page() {
 *   // Prefetch the data
 *   await prefetchQuery({
 *     queryKey: ['posts'],
 *     queryFn: () => fetchPosts(),
 *   });
 *
 *   // Return the Client Component that will use the prefetched data
 *   return <ClientComponent />;
 * }
 */
export async function prefetchQuery<TData>({
  queryKey,
  queryFn,
}: {
  queryKey: string[];
  queryFn: () => Promise<TData>;
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });
  return null;
}
