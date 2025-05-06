import { prefetchQuery } from "@/lib/queryClient";
import { PostsList } from "./posts-list";

// This is a Server Component that prefetches data
export default async function PostsPage() {
  // Example of prefetching data on the server
  await prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      // In a real app, this would be a fetch call to your API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/posts`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      return res.json();
    },
  });

  // Return the client component that will use the prefetched data
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <PostsList />
    </div>
  );
}
