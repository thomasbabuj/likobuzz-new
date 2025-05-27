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

function getCategoryBadgeColor(category?: string) {
  switch ((category || "").toLowerCase()) {
    case "news":
      return "bg-[var(--category-news)]";
    case "gossip":
      return "bg-[var(--category-gossip)]";
    case "lifestyle":
      return "bg-[var(--category-lifestyle)]";
    case "entertainment":
      return "bg-[var(--category-entertainment)]";
    default:
      return "bg-[var(--category-default)]";
  }
}

function Avatar({
  user,
  size = "xs",
}: {
  user: string;
  size?: "xs" | "sm" | "md";
}) {
  // Simple fallback avatar with initials
  const initials = user
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const sizeMap = {
    xs: "w-7 h-7 text-xs",
    sm: "w-9 h-9 text-sm",
    md: "w-12 h-12 text-base",
  };
  return (
    <div
      className={`rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] flex items-center justify-center font-bold ${sizeMap[size]}`}
    >
      {initials}
    </div>
  );
}

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
    <div className="space-y-6">
      {posts.map((post, index) => (
        <article
          key={post.id}
          className="group flex flex-col sm:flex-row bg-[var(--card)] rounded-2xl shadow-lg border border-[var(--border)] transition-all hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
        >
          {/* Desktop vote bar */}
          <div className="hidden sm:flex flex-col items-center justify-center bg-[var(--muted)] px-3 py-4 border-r border-[var(--border)]">
            <VoteButtons
              postId={post.id}
              initialUpvotes={post.upvotes}
              initialDownvotes={post.downvotes}
              initialUserVote={post.userVote}
              size="sm"
            />
          </div>
          {/* Image + badge */}
          <div className="relative w-full sm:w-44 h-48 sm:h-auto flex-shrink-0">
            <Image
              src={post.imageUrl || "/assets/likobuzz_post_placeholder_2.png"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 176px"
            />
            <span
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-[var(--card-foreground)] shadow ${getCategoryBadgeColor(post.category)}`}
            >
              {post.category || "NEWS"}
            </span>
            <span className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-black/60 text-white text-lg font-extrabold drop-shadow-lg">
              #{index + 1}
            </span>
          </div>
          {/* Content */}
          <div className="flex-1 flex flex-col justify-between p-5 gap-2">
            <div>
              <Link href={`/post/${post.slug}`}>
                <h2 className="text-xl font-semibold group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </Link>
              <div className="mt-3 flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                <Avatar user={post.author} size="xs" />
                <span className="font-medium">{post.author}</span>
                <span className="opacity-60">·</span>
                <span>{post.timeAgo || ""}</span>
                {post.views && (
                  <>
                    <span className="opacity-60">·</span>
                    <span>{post.views} views</span>
                  </>
                )}
                <span className="opacity-60">·</span>
                <span>
                  {post.commentCount ?? post.comments ?? 0}{" "}
                  {(post.commentCount ?? post.comments ?? 0) === 1
                    ? "Comment"
                    : "Comments"}
                </span>
              </div>
            </div>
            {/* Mobile vote bar */}
            <div className="flex sm:hidden justify-center items-center border-t border-[var(--border)] bg-[var(--muted)] rounded-b-2xl py-2">
              <VoteButtons
                postId={post.id}
                initialUpvotes={post.upvotes}
                initialDownvotes={post.downvotes}
                initialUserVote={post.userVote}
                size="sm"
                orientation="horizontal"
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
