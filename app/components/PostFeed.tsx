"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with real data fetching
const MOCK_POSTS = [
  {
    id: 1,
    title:
      "Jungkook's \"Seven\" tops Complex's list of best K-pop and rap collaborations of all time",
    author: "Alec06",
    timestamp: "23 minutes ago",
    imageUrl:
      "https://www.allkpop.com/upload/2025/03/content/310011/1743394315-2025-03-31-1.png",
    category: "NEWS",
    commentCount: 1,
    views: 304,
    upvotes: 3,
    downvotes: 1,
  },
  {
    id: 2,
    title: "NEWBEAT wraps up first week of debut promotions with strong impact",
    author: "Alec06",
    timestamp: "58 minutes ago",
    imageUrl:
      "https://www.allkpop.com/upload/2025/03/content/310153/1743400409-131317498.jpg",
    category: "NEWS",
    commentCount: 1,
    views: 573,
    upvotes: 6,
    downvotes: 2,
  },
];

export function PostFeed() {
  return (
    <div className="space-y-2">
      {MOCK_POSTS.map((post) => (
        <article key={post.id} className="bg-card border">
          {/* Mobile Layout */}
          <div className="md:hidden w-full">
            {post.imageUrl && (
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <Badge
                  variant="secondary"
                  className="absolute left-2 top-2 text-xs px-1.5 py-0.5 bg-white/90"
                >
                  {post.category}
                </Badge>
              </div>
            )}
            <div className="p-3">
              <Link href={`/post/${post.id}`}>
                <h2 className="font-medium leading-tight hover:text-primary">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>Posted by {post.author}</span>
                <span>•</span>
                <span>{post.timestamp}</span>
                <span>•</span>
                <span>{post.views} views</span>
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{post.commentCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ChevronUp className="h-4 w-4" />
                  <span className="ml-1">{post.upvotes}</span>
                </Button>
                <span className="text-muted-foreground">VOTE</span>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <span className="mr-1">{post.downvotes}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex">
            {/* Vote Column */}
            <div className="flex flex-col items-center justify-center py-2 px-3 bg-muted min-h-[100px]">
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                <ChevronUp className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{post.upvotes}</span>
              <span className="text-xs text-muted-foreground my-1">VOTE</span>
              <span className="text-sm font-medium">{post.downvotes}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Content Column */}
            <div className="flex flex-1 p-3 items-center">
              {/* Thumbnail */}
              {post.imageUrl && (
                <div className="relative w-[100px] h-[70px] mr-4 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Text Content */}
              <div className="min-w-0 flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Badge
                      variant="secondary"
                      className="text-[10px] h-4 px-1 rounded-sm"
                    >
                      {post.category}
                    </Badge>
                  </div>

                  <Link href={`/post/${post.id}`} className="block">
                    <h2 className="text-base font-medium leading-tight hover:text-primary line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground mt-2">
                  <span>Posted by {post.author}</span>
                  <span>•</span>
                  <span>{post.timestamp}</span>
                  <span>•</span>
                  <span>{post.views} views</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-0.5" />
                    {post.commentCount} Comment
                    {post.commentCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
