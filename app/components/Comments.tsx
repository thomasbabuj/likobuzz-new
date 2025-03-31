"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, Reply, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type Comment = {
  id: string;
  content: string;
  author: {
    name: string;
    image?: string;
    role?: string;
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  totalReplies: number;
  replies?: Comment[];
};

// Mock data with more replies for testing
const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "This new feature is amazing! The UI is so intuitive and responsive. Great job on the implementation.",
    author: {
      name: "JohnDoe",
      role: "Regular User",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2 hours ago",
    upvotes: 45,
    downvotes: 2,
    totalReplies: 15,
    replies: [
      {
        id: "1-1",
        content: "I agree! The performance improvements are noticeable too.",
        author: {
          name: "JaneSmith",
          role: "Top Commenter",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        },
        createdAt: "1 hour ago",
        upvotes: 12,
        downvotes: 1,
        totalReplies: 3,
        replies: [
          {
            id: "1-1-1",
            content: "Especially on mobile devices, it's much smoother now.",
            author: {
              name: "TechGuru",
              role: "Expert",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
            },
            createdAt: "45 minutes ago",
            upvotes: 8,
            downvotes: 0,
            totalReplies: 0,
          },
        ],
      },
      {
        id: "1-2",
        content: "Would love to see more features like this in future updates!",
        author: {
          name: "AliceJohnson",
          role: "Regular User",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        },
        createdAt: "30 minutes ago",
        upvotes: 5,
        downvotes: 0,
        totalReplies: 8,
        replies: [
          {
            id: "1-2-1",
            content:
              "I have some feature suggestions that could be interesting.",
            author: {
              name: "IdeaGenerator",
              role: "Regular User",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Idea",
            },
            createdAt: "25 minutes ago",
            upvotes: 4,
            downvotes: 0,
            totalReplies: 2,
            replies: [
              {
                id: "1-2-1-1",
                content:
                  "What kind of features do you have in mind? I'm curious to hear your thoughts.",
                author: {
                  name: "ProductManager",
                  role: "Staff",
                  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=PM",
                },
                createdAt: "20 minutes ago",
                upvotes: 3,
                downvotes: 0,
                totalReplies: 1,
                replies: [
                  {
                    id: "1-2-1-1-1",
                    content: "I'll DM you the detailed proposal!",
                    author: {
                      name: "IdeaGenerator",
                      role: "Regular User",
                      image:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Idea",
                    },
                    createdAt: "15 minutes ago",
                    upvotes: 2,
                    downvotes: 0,
                    totalReplies: 0,
                  },
                ],
              },
            ],
          },
          {
            id: "1-2-2",
            content:
              "The roadmap already includes some exciting features coming soon!",
            author: {
              name: "TeamLead",
              role: "Staff",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lead",
            },
            createdAt: "22 minutes ago",
            upvotes: 6,
            downvotes: 0,
            totalReplies: 3,
            replies: [
              {
                id: "1-2-2-1",
                content: "Can't wait to see what's coming next!",
                author: {
                  name: "ExcitedUser",
                  role: "Regular User",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Excited",
                },
                createdAt: "18 minutes ago",
                upvotes: 3,
                downvotes: 0,
                totalReplies: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    content:
      "Has anyone encountered issues with the latest update? I'm seeing some inconsistencies in the data sync.",
    author: {
      name: "DevExplorer",
      role: "Power User",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev",
    },
    createdAt: "3 hours ago",
    upvotes: 28,
    downvotes: 3,
    totalReplies: 20,
    replies: [
      {
        id: "2-1",
        content: "Yes, I noticed this too. It happens specifically when...",
        author: {
          name: "BugHunter",
          role: "Expert",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bug",
        },
        createdAt: "2 hours ago",
        upvotes: 15,
        downvotes: 0,
        totalReplies: 4,
        replies: [
          {
            id: "2-1-1",
            content:
              "I found a workaround for this issue. Here's what you need to do...",
            author: {
              name: "SolutionPro",
              role: "Top Commenter",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Solution",
            },
            createdAt: "1 hour ago",
            upvotes: 20,
            downvotes: 0,
            totalReplies: 2,
            replies: [
              {
                id: "2-1-1-1",
                content:
                  "Thanks! This workaround saved me hours of troubleshooting.",
                author: {
                  name: "GratefulDev",
                  role: "Regular User",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Grateful",
                },
                createdAt: "30 minutes ago",
                upvotes: 5,
                downvotes: 0,
                totalReplies: 0,
              },
            ],
          },
        ],
      },
      {
        id: "2-2",
        content: "The team is aware of this issue and working on a fix.",
        author: {
          name: "TeamMember",
          role: "Staff",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Team",
        },
        createdAt: "1 hour ago",
        upvotes: 25,
        downvotes: 0,
        totalReplies: 0,
      },
    ],
  },
  {
    id: "3",
    content:
      "Just published a detailed tutorial on how to maximize the use of this platform. Check it out!",
    author: {
      name: "ContentCreator",
      role: "Top Contributor",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creator",
    },
    createdAt: "4 hours ago",
    upvotes: 72,
    downvotes: 1,
    totalReplies: 25,
    replies: [
      {
        id: "3-1",
        content:
          "This tutorial is gold! Especially the section about advanced features.",
        author: {
          name: "Learner123",
          role: "Regular User",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Learner",
        },
        createdAt: "3 hours ago",
        upvotes: 18,
        downvotes: 0,
        totalReplies: 3,
        replies: [
          {
            id: "3-1-1",
            content: "Could you elaborate more on the automation part?",
            author: {
              name: "CuriousMind",
              role: "Regular User",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Curious",
            },
            createdAt: "2 hours ago",
            upvotes: 8,
            downvotes: 0,
            totalReplies: 2,
            replies: [
              {
                id: "3-1-1-1",
                content:
                  "I'll create a follow-up tutorial focusing on automation next week!",
                author: {
                  name: "ContentCreator",
                  role: "Top Contributor",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Creator",
                },
                createdAt: "1 hour ago",
                upvotes: 12,
                downvotes: 0,
                totalReplies: 0,
              },
            ],
          },
        ],
      },
      {
        id: "3-2",
        content:
          "Would love to see more tutorials like this. Very well explained!",
        author: {
          name: "Enthusiast",
          role: "Regular User",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Enthusiast",
        },
        createdAt: "2 hours ago",
        upvotes: 15,
        downvotes: 0,
        totalReplies: 0,
      },
    ],
  },
];

function CommentCard({
  comment,
  isReply = false,
  showFullThread = false,
  postId,
  nestingLevel = 0,
}: {
  comment: Comment;
  isReply?: boolean;
  showFullThread?: boolean;
  postId?: string;
  nestingLevel?: number;
}) {
  const [loadedReplies, setLoadedReplies] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      setLoadedReplies((prev) => Math.min(prev + 10, comment.totalReplies));
    } catch (error) {
      console.error("Failed to load more replies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Maximum nesting level before we start using the same indentation
  const MAX_VISIBLE_NESTING = 3;
  const indentationLevel = Math.min(nestingLevel, MAX_VISIBLE_NESTING);

  return (
    <div
      className={cn(
        "flex gap-4",
        isReply &&
          `ml-${indentationLevel * 8} mt-4 border-l-2 border-gray-100 pl-4`
      )}
    >
      <Avatar>
        <AvatarImage src={comment.author.image} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{comment.author.name}</span>
          {comment.author.role && (
            <span
              className={cn(
                "rounded px-2 py-0.5 text-xs",
                comment.author.role === "Staff"
                  ? "bg-green-100 text-green-600"
                  : comment.author.role === "Expert"
                    ? "bg-purple-100 text-purple-600"
                    : comment.author.role === "Top Contributor"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
              )}
            >
              {comment.author.role}
            </span>
          )}
          <span className="text-sm text-gray-500">{comment.createdAt}</span>
        </div>
        <p className="mt-1 text-gray-800">{comment.content}</p>
        <div className="mt-2 flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{comment.upvotes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <ThumbsDown className="h-4 w-4" />
            <span>{comment.downvotes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Reply className="h-4 w-4" />
            <span>Reply</span>
          </Button>
          {!isReply && comment.totalReplies > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span>{comment.totalReplies} replies</span>
            </div>
          )}
        </div>

        {/* Show replies */}
        {comment.replies && (
          <div className="mt-4 space-y-4">
            {comment.replies.slice(0, loadedReplies).map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                isReply={true}
                showFullThread={showFullThread}
                postId={postId}
                nestingLevel={nestingLevel + 1}
              />
            ))}

            {/* Show load more button if there are more replies */}
            {comment.totalReplies > loadedReplies && !showFullThread && (
              <div className="mt-4 flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/post/${postId}/comments/${comment.id}`}>
                    View all {comment.totalReplies} replies
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load more replies"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Comments({
  postId,
  showFullThread = false,
}: {
  postId?: string;
  showFullThread?: boolean;
}) {
  const [sortBy, setSortBy] = useState("popular");
  const [commentText, setCommentText] = useState("");

  const handlePostComment = async () => {
    if (!commentText.trim()) return;

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCommentText("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comments</h2>
        <select
          className="rounded-md border px-3 py-1"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popular">Most popular</option>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="rounded-lg border p-4">
        <textarea
          placeholder="Join the conversation..."
          className="w-full rounded-md border p-3"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Button onClick={handlePostComment}>Post Comment</Button>
        </div>
      </div>

      <div className="space-y-6">
        {mockComments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            showFullThread={showFullThread}
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
}
