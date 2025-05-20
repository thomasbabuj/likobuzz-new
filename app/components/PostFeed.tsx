"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";

import { useInfinitePosts } from "@/app/hooks/use-infinite-posts";
import { useRef, useEffect } from "react";
import { VoteButtons } from "./VoteButtons";
import Loading from "@/app/loading";

// Mock data - replace with real data fetching
const MOCK_POSTS = [
  {
    id: 1,
    title:
      "Jungkook's \"Seven\" tops Complex's list of best K-pop and rap collaborations of all time",
    category: "NEWS",
    author: "Alec06",
    timeAgo: "23 minutes ago",
    views: "289",
    comments: 1,
    upvotes: 3,
    downvotes: 1,
    image: "/jungkook.jpg",
  },
  {
    id: 2,
    title: "NEWBEAT wraps up first week of debut promotions with strong impact",
    category: "NEWS",
    author: "Alec06",
    timeAgo: "58 minutes ago",
    views: "573",
    comments: 1,
    upvotes: 6,
    downvotes: 2,
    image: "/newbeat.jpg",
  },
];

export function PostFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isFetching,
  } = useInfinitePosts();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // When the sentinel comes into view, fetch the next page
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" } // Increased rootMargin to load earlier
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handle loading and error states
  if (status === "pending" && !data) {
    return <Loading />;
  }

  if (status === "error") {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading posts: {error.message}
      </div>
    );
  }

  // Flatten all pages of posts into a single array
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  // If we have no posts, show a message
  if (posts.length === 0) {
    return <div className="text-center py-10">No posts found</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow overflow-hidden border"
        >
          {/* Desktop */}
          <div className="hidden sm:flex">
            {/* Vote bar */}
            <div className="flex flex-col items-center justify-center bg-slate-50 px-3 py-4 border-r">
              <VoteButtons
                postId={post.id}
                initialUpvotes={post.upvotes}
                initialDownvotes={post.downvotes}
                initialUserVote={post.userVote}
                size="sm"
              />
            </div>
            {/* Image with badge */}
            <div className="relative w-40 h-40 flex-shrink-0 border-r">
              <Image
                src={post.imageUrl || "/assets/likobuzz_post_placeholder_2.png"}
                alt={post.title}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">
                {post.category || "NEWS"}
              </span>
              <span className="absolute top-2 right-2 text-3xl font-bold text-white drop-shadow-lg">
                {index + 1}
              </span>
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col justify-between p-4">
              <Link href={`/post/${post.id}`}>
                <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-x-2 gap-y-1">
                <span>Posted by {post.author}</span>
                <span>·</span>
                <span>{post.timeAgo || ""}</span>
                {post.views && (
                  <>
                    <span>·</span>
                    <span>{post.views} views</span>
                  </>
                )}
                <span>·</span>
                <span>
                  {post.commentCount ?? post.comments ?? 0}{" "}
                  {(post.commentCount ?? post.comments ?? 0) === 1
                    ? "Comment"
                    : "Comments"}
                </span>
              </div>
            </div>
          </div>
          {/* Mobile */}
          <div className="sm:hidden">
            {/* Image with badge */}
            <div className="relative w-full h-48">
              <Image
                src={post.imageUrl || "/assets/likobuzz_post_placeholder_2.png"}
                alt={post.title}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">
                {post.category || "NEWS"}
              </span>
              <span className="absolute top-2 right-2 text-2xl font-bold text-white drop-shadow-lg">
                {index + 1}
              </span>
            </div>
            {/* Content */}
            <div className="p-3">
              <Link href={`/post/${post.id}`}>
                <h2 className="text-base font-semibold hover:text-blue-600">
                  {post.title}
                </h2>
              </Link>
              <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 gap-x-2 gap-y-1">
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.timeAgo || ""}</span>
                {post.views && (
                  <>
                    <span>·</span>
                    <span>{post.views} views</span>
                  </>
                )}
                <span>·</span>
                <span>
                  {post.commentCount ?? post.comments ?? 0}{" "}
                  {(post.commentCount ?? post.comments ?? 0) === 1
                    ? "Comment"
                    : "Comments"}
                </span>
              </div>
            </div>
            {/* Vote bar */}
            <div className="flex items-center justify-center bg-slate-50 border-t">
              <VoteButtons
                postId={post.id}
                initialUpvotes={post.upvotes}
                initialDownvotes={post.downvotes}
                initialUserVote={post.userVote}
                size="sm"
                horizontal
              />
            </div>
          </div>
        </article>
      ))}

      {/* Sentinel element for intersection observer */}
      <div ref={loadMoreRef} className="h-10 mt-4" />

      {/* Loading indicator for next page */}
      {isFetchingNextPage && <Loading />}

      {/* Message when there are no more posts */}
      {!hasNextPage && posts.length > 0 && (
        <div className="text-center text-muted-foreground py-4">
          No more posts
        </div>
      )}
    </div>
  );
}
