"use client";

import { useQuery } from "@tanstack/react-query";

export function usePost(postId: string) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${postId}`);
      console.log(res);
      if (!res.ok) throw new Error("Post not found");
      return res.json();
    },
    enabled: !!postId,
  });
}
