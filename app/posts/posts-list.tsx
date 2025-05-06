"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function PostsList() {
  // This will use the data that was prefetched on the server
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`/api/posts`);
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      return res.json();
    },
    // Since the data was prefetched, this won't cause a loading state
    // unless the cache was invalidated
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts: {(error as Error).message}</div>;
  if (!posts || posts.length === 0) return <div>No posts found</div>;

  return (
    <div className="space-y-6">
      {posts.map((post: any) => (
        <div key={post.id} className="bg-white shadow rounded-lg p-6">
          <Link href={`/post/${post.id}`} className="block">
            <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
          </Link>
          <div className="mt-2 text-sm text-gray-500">
            {post.createdAt && (
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
