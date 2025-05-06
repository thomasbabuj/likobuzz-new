// app/hooks/use-infinite-posts.ts
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPosts = async ({ pageParam = null }) => {
  const params = new URLSearchParams();
  if (pageParam) params.append("cursor", pageParam);
  params.append("limit", "10");
  const res = await fetch(`/api/posts?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: null,
  });
}
