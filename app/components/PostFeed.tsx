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
  return (
    <div className="space-y-4">
      {MOCK_POSTS.map((post, index) => (
        <article key={post.id} className="bg-white">
          {/* Desktop/Tablet Layout */}
          <div className="hidden sm:flex border rounded-lg">
            {/* Vote Column */}
            <div className="flex flex-col items-center py-2 px-3 bg-slate-50 rounded-l-lg border-r">
              <button className="hover:text-blue-500">
                <ChevronUp className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium my-1">{post.upvotes}</span>
              <button className="hover:text-red-500">
                <ChevronDown className="h-5 w-5" />
              </button>
              <span className="text-xs text-muted-foreground mt-1">VOTE</span>
            </div>

            {/* Content */}
            <div className="flex-1 p-3">
              {/* Category and Title */}
              <div className="space-y-2">
                <div className="inline-block px-2 py-1 text-xs font-medium text-white bg-red-600 rounded">
                  {post.category}
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

            {/* Thumbnail */}
            {post.image && (
              <div className="w-[120px] relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={120}
                  height={120}
                  className="object-cover h-full rounded-r-lg"
                />
                <div className="absolute top-2 right-2 text-3xl font-bold text-white drop-shadow-lg">
                  {index + 1}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Layout */}
          <div className="sm:hidden border-b">
            <div className="flex">
              {/* Left Vote Column */}
              <div className="flex flex-col items-center py-2 px-2 bg-slate-50">
                <button className="hover:text-blue-500">
                  <ChevronUp className="h-4 w-4" />
                </button>
                <span className="text-xs font-medium my-1">{post.upvotes}</span>
                <button className="hover:text-red-500">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-2">
                <div className="inline-block px-2 py-0.5 text-xs font-medium text-white bg-red-600 rounded mb-1">
                  {post.category}
                </div>
                <Link href={`/post/${post.id}`}>
                  <h2 className="text-base font-semibold hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.timeAgo}</span>
                  <span>•</span>
                  <span>{post.views} views</span>
                  <span>•</span>
                  <span>{post.comments} Comment</span>
                </div>
              </div>

              {/* Number Badge */}
              <div className="flex items-start justify-center w-8 py-2">
                <span className="text-2xl font-bold text-gray-200">
                  {index + 1}
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
