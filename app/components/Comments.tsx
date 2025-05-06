"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, Reply, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { mockComments } from "@/app/mocks/comments";
import {
  COMMENT_CONSTANTS,
  ROLE_STYLES,
  USER_ROLES,
} from "@/app/constants/comments";
import {
  CommentData,
  createComment,
  getPostComments,
  loadMoreReplies,
  voteComment,
} from "@/app/actions/comment";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CommentCard({
  comment,
  isReply = false,
  showFullThread = false,
  postId,
  nestingLevel = 0,
  onReplyClick,
}: {
  comment: CommentData;
  isReply?: boolean;
  showFullThread?: boolean;
  postId?: string;
  nestingLevel?: number;
  onReplyClick?: (commentId: string) => void;
}) {
  const [loadedReplies, setLoadedReplies] = useState<number>(
    COMMENT_CONSTANTS.INITIAL_REPLIES_SHOWN
  );
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useAuth();

  const handleLoadMore = async () => {
    if (!postId || !comment.id) return;

    setIsLoading(true);
    try {
      const newReplies = await loadMoreReplies(
        comment.id,
        loadedReplies,
        COMMENT_CONSTANTS.LOAD_MORE_INCREMENT
      );

      if (newReplies.length > 0 && comment.replies) {
        comment.replies = [...comment.replies, ...newReplies];
      }

      setLoadedReplies((prev) =>
        Math.min(
          prev + COMMENT_CONSTANTS.LOAD_MORE_INCREMENT,
          comment.totalReplies
        )
      );
    } catch (error) {
      console.error("Failed to load more replies:", error);
      toast.error("Failed to load more replies");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (type: "UPVOTE" | "DOWNVOTE") => {
    if (!isSignedIn) {
      toast.error("Please sign in to vote");
      return;
    }

    try {
      await voteComment(comment.id, type);
    } catch (error) {
      console.error("Failed to vote:", error);
      toast.error("Failed to vote on comment");
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
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1"
            onClick={() => handleVote("UPVOTE")}
            disabled={!isSignedIn}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{comment.upvotes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1"
            onClick={() => handleVote("DOWNVOTE")}
            disabled={!isSignedIn}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{comment.downvotes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1"
            onClick={() => onReplyClick?.(comment.id)}
            disabled={!isSignedIn}
          >
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
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.slice(0, loadedReplies).map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                isReply={true}
                showFullThread={showFullThread}
                postId={postId}
                nestingLevel={nestingLevel + 1}
                onReplyClick={onReplyClick}
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
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "oldest">(
    "popular"
  );
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    async function fetchComments() {
      if (!postId) return;

      setIsLoading(true);
      try {
        const fetchedComments = await getPostComments(postId, sortBy);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        // Fallback to empty array
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComments();
  }, [postId, sortBy]);

  const handlePostComment = async () => {
    if (!commentText.trim() || !postId) return;
    if (!isSignedIn || !user) {
      toast.error("Please sign in to comment");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create optimistic comment to show immediately
      const optimisticComment: CommentData = {
        id: `temp-${Date.now()}`,
        content: commentText,
        author: {
          id: user.id,
          name: user.fullName || user.username || "User",
          image: user.imageUrl || "",
          role: "USER", // Default role
        },
        createdAt: "Just now",
        upvotes: 0,
        downvotes: 0,
        totalReplies: 0,
        replies: [],
      };

      // If it's a reply, add it to the parent comment's replies
      if (replyToId) {
        setComments((prev) =>
          prev.map((comment) => {
            if (comment.id === replyToId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), optimisticComment],
                totalReplies: comment.totalReplies + 1,
              };
            } else {
              // Check nested replies
              if (comment.replies?.some((reply) => reply.id === replyToId)) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) => {
                    if (reply.id === replyToId) {
                      return {
                        ...reply,
                        // We can't show deeper nested replies in the UI currently,
                        // but we increment the count
                        totalReplies: reply.totalReplies + 1,
                      };
                    }
                    return reply;
                  }),
                };
              }
              return comment;
            }
          })
        );
      } else {
        // It's a top-level comment
        setComments((prev) => [optimisticComment, ...prev]);
      }

      // Clear form
      setCommentText("");
      setReplyToId(null);

      // Actually submit the comment
      const result = await createComment({
        postId,
        content: commentText,
        ...(replyToId && { parentId: replyToId }),
      });

      if (result.success) {
        // Refresh comments to get the real data
        const updatedComments = await getPostComments(postId, sortBy);
        setComments(updatedComments);
        toast.success("Comment posted successfully");
      } else {
        toast.error(result.error || "Failed to post comment");
        // Roll back optimistic update
        if (replyToId) {
          setComments((prev) =>
            prev.map((comment) => {
              if (comment.id === replyToId) {
                return {
                  ...comment,
                  replies:
                    comment.replies?.filter(
                      (r) => r.id !== optimisticComment.id
                    ) || [],
                  totalReplies: comment.totalReplies - 1,
                };
              }
              return comment;
            })
          );
        } else {
          setComments((prev) =>
            prev.filter((c) => c.id !== optimisticComment.id)
          );
        }
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplyClick = (commentId: string) => {
    setReplyToId(commentId);
    // Scroll to comment form
    document
      .getElementById("comment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comments</h2>
        <select
          className="rounded-md border px-3 py-1"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "popular" | "newest" | "oldest")
          }
        >
          <option value="popular">Most popular</option>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div id="comment-form" className="rounded-lg border p-4">
        {replyToId && (
          <div className="mb-2 flex items-center justify-between rounded-md bg-gray-50 p-2">
            <span className="text-sm">
              Replying to comment
              {comments.find((c) => c.id === replyToId)
                ? ` from ${comments.find((c) => c.id === replyToId)?.author.name}`
                : ""}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyToId(null)}
            >
              Cancel
            </Button>
          </div>
        )}
        <textarea
          placeholder={
            isSignedIn ? "Join the conversation..." : "Sign in to comment"
          }
          className="w-full rounded-md border p-3"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={!isSignedIn || isSubmitting}
        />
        <div className="mt-2 flex justify-end">
          <Button
            onClick={handlePostComment}
            disabled={!isSignedIn || !commentText.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
                {replyToId ? "Posting Reply..." : "Posting Comment..."}
              </>
            ) : replyToId ? (
              "Post Reply"
            ) : (
              "Post Comment"
            )}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <p>Loading comments...</p>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              showFullThread={showFullThread}
              postId={postId}
              onReplyClick={handleReplyClick}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
}
