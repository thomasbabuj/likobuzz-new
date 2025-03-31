"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, Reply, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { type Comment, mockComments } from "@/app/mocks/comments";
import {
  COMMENT_CONSTANTS,
  ROLE_STYLES,
  USER_ROLES,
} from "@/app/constants/comments";

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
  const [loadedReplies, setLoadedReplies] = useState<number>(
    COMMENT_CONSTANTS.INITIAL_REPLIES_SHOWN
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadedReplies((prev) =>
        Math.min(
          prev + COMMENT_CONSTANTS.LOAD_MORE_INCREMENT,
          comment.totalReplies
        )
      );
    } catch (error) {
      console.error("Failed to load more replies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const indentationLevel = Math.min(
    nestingLevel,
    COMMENT_CONSTANTS.MAX_VISIBLE_NESTING
  );
  const roleStyle = ROLE_STYLES[comment.author.role || USER_ROLES.REGULAR];

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
            <span className={cn("rounded px-2 py-0.5 text-xs", roleStyle)}>
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
