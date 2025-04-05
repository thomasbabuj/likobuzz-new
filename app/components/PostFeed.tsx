"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";

// Mock data - replace with real data fetching
const MOCK_POSTS = [
  {
    id: 1,
    title:
      "Jungkook's \"Seven\" tops Complex's list of best K-pop and rap collaborations of all time",
    author: "Alec06",
    timeAgo: "23 minutes ago",
    views: "304",
    comments: 1,
    votes: 3,
    image: "/jungkook.jpg",
  },
  {
    id: 2,
    title: "NEWBEAT wraps up first week of debut promotions with strong impact",
    author: "Alec06",
    timeAgo: "58 minutes ago",
    views: "573",
    comments: 1,
    votes: 6,
    image: "/newbeat.jpg",
  },
];

export function PostFeed() {
  return (
    <div className="space-y-4">
      {MOCK_POSTS.map((post) => (
        <article key={post.id} className="flex bg-white rounded-lg border">
          {/* Vote Column */}
          <div className="flex flex-col items-center py-2 px-2 bg-slate-50 rounded-l-lg">
            <button className="hover:text-blue-500">
              <ChevronUp className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium my-1">{post.votes}</span>
            <button className="hover:text-red-500">
              <ChevronDown className="h-5 w-5" />
            </button>
            <span className="text-xs text-muted-foreground mt-1">VOTE</span>
          </div>

          {/* Content */}
          <div className="flex-1 p-3">
            {/* Category and Title */}
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground uppercase">
                NEWS
              </div>
              <Link href={`/post/${post.id}`}>
                <h2 className="text-lg font-semibold hover:text-blue-600">
                  {post.title}
                </h2>
              </Link>
            </div>

            {/* Post Meta */}
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Posted by {post.author}</span>
              <span>•</span>
              <span>{post.timeAgo}</span>
              <span>•</span>
              <span>{post.views} views</span>
              <span>•</span>
              <span>{post.comments} Comment</span>
            </div>
          </div>

          {/* Thumbnail - Hidden on mobile */}
          {post.image && (
            <div className="hidden sm:block w-[100px] relative">
              <Image
                src={post.image}
                alt={post.title}
                width={100}
                height={100}
                className="object-cover h-full rounded-r-lg"
              />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
