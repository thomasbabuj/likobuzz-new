"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ThumbsDown,
  ThumbsUp,
  Reply,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import Loading from "@/app/loading";
import Logger from "@/lib/logger/client";

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

  // New state for expanded view and pagination
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [replyPage, setReplyPage] = useState(1);
  const REPLIES_PER_PAGE = 3;

  // Calculate how many replies to show based on current page
  const visibleRepliesCount = showAllReplies
    ? comment.replies?.length || 0
    : Math.min(REPLIES_PER_PAGE * replyPage, comment.replies?.length || 0);

  // Determine if there are more replies to load (either locally or from server)
  const hasMoreLoadedReplies =
    comment.replies && visibleRepliesCount < comment.replies.length;
  const hasMoreServerReplies =
    comment.totalReplies > (comment.replies?.length || 0);
  const hasMoreReplies = hasMoreLoadedReplies || hasMoreServerReplies;

  // Debug logging to help find issues
  useEffect(() => {
    if (
      comment.totalReplies > 0 &&
      (!comment.replies || comment.replies.length === 0)
    ) {
      Logger.info(
        "Comment with replies but none loaded:",
        comment.id,
        comment.content.substring(0, 20),
        comment.totalReplies
      );
    }
  }, [comment]);

  const handleLoadMore = async () => {
    if (!postId || !comment.id) return;

    // If we already have enough replies loaded, just show more from what we have
    if (comment.replies && comment.replies.length > visibleRepliesCount) {
      setReplyPage((prev) => prev + 1);
      return;
    }

    // Otherwise, fetch more from the server
    setIsLoading(true);
    try {
      const newReplies = await loadMoreReplies(
        comment.id,
        comment.replies?.length || 0, // Use actual loaded replies count
        COMMENT_CONSTANTS.LOAD_MORE_INCREMENT
      );

      if (newReplies.length > 0) {
        // Ensure replies array exists before adding to it
        const updatedReplies = [...(comment.replies || []), ...newReplies];
        comment.replies = updatedReplies;
        // Automatically increment the page to show the newly loaded replies
        setReplyPage((prev) => prev + 1);
        // Update the loaded replies count
        setLoadedReplies(updatedReplies.length);
      }
    } catch (error) {
      console.error("Failed to load more replies:", error);
      toast.error("Failed to load more replies");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowAllReplies = () => {
    setShowAllReplies((prev) => !prev);
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
        "flex gap-3 md:gap-4",
        isReply
          ? "ml-2 md:ml-8 mt-3 md:mt-4 border-l-2 border-red-200 bg-red-50 md:bg-white pl-2 md:pl-4 rounded-xl w-[95%] max-w-[95%]"
          : "mt-0"
      )}
    >
      <Avatar>
        <AvatarImage src={comment.author.image} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div
        className={cn("flex-1", isReply ? "flex flex-col items-start p-3" : "")}
      >
        <div
          className={cn(
            "flex items-center gap-2 w-full",
            isReply ? "mb-1" : ""
          )}
        >
          <span className="font-semibold">{comment.author.name}</span>
        </div>
        <p className="mt-1 text-gray-800 w-full break-words">
          {comment.content}
        </p>
        <div className="mt-2 flex items-center gap-4 w-full">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 hidden md:flex"
            onClick={() => handleVote("UPVOTE")}
            disabled={!isSignedIn}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{comment.upvotes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 hidden md:flex"
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
            <span className="ml-2 text-xs text-gray-500 md:hidden">
              {comment.createdAt}
            </span>
          </Button>
          <span className="text-sm text-gray-500 hidden md:inline">
            {comment.createdAt}
          </span>
          {!isReply && comment.totalReplies > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span>{comment.totalReplies} replies</span>
            </div>
          )}
        </div>

        {/* Show replies with pagination */}
        {((comment.replies && comment.replies.length > 0) ||
          comment.totalReplies > 0) && (
          <div className="mt-4 space-y-4">
            {/* Show replies based on current page */}
            {comment.replies &&
              comment.replies
                .slice(0, visibleRepliesCount)
                .map((reply) => (
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

            {/* Pagination controls for replies */}
            {comment.totalReplies > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {/* Load more button - show when there are more replies to load */}
                {hasMoreReplies && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-1 inline-block h-3 w-3 animate-spin rounded-full border-2 border-slate-200 border-t-black"></span>
                        Loading...
                      </>
                    ) : (
                      `Show ${Math.min(REPLIES_PER_PAGE, comment.totalReplies - (comment.replies?.length || 0))} more replies`
                    )}
                  </Button>
                )}

                {/* Expand/Collapse button when there are many replies loaded */}
                {comment.replies &&
                  comment.replies.length > REPLIES_PER_PAGE && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleShowAllReplies}
                      className="text-xs"
                    >
                      {showAllReplies
                        ? "Collapse replies"
                        : "Expand all replies"}
                    </Button>
                  )}

                {/* View in full page link */}
                {!showFullThread && comment.totalReplies > REPLIES_PER_PAGE && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="text-xs"
                  >
                    <Link href={`/post/${postId}/comments/${comment.id}`}>
                      View thread in full page
                    </Link>
                  </Button>
                )}
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
    "newest"
  );
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  // New state for comment pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const COMMENTS_PER_PAGE = 5;
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      if (!postId) return;

      setIsLoading(true);
      try {
        const fetchedComments = await getPostComments(postId, sortBy);

        // Display only the first batch of comments
        setComments(fetchedComments.slice(0, COMMENTS_PER_PAGE));
        setTotalComments(fetchedComments.length);
        setHasMore(fetchedComments.length > COMMENTS_PER_PAGE);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        // Fallback to empty array
        setComments([]);
        setHasMore(false);
        setTotalComments(0);
      } finally {
        setIsLoading(false);
      }
    }

    // Reset pagination when sorting changes
    setPage(1);
    fetchComments();
  }, [postId, sortBy]);

  const loadMoreComments = async () => {
    if (!postId || loadingMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const startIndex = COMMENTS_PER_PAGE * (nextPage - 1);
      const endIndex = startIndex + COMMENTS_PER_PAGE;

      // Fetch all comments again (in a real implementation, this would be paginated from the server)
      const allComments = await getPostComments(postId, sortBy);

      // Add next page of comments to the existing ones
      const nextPageComments = allComments.slice(startIndex, endIndex);
      setComments((prev) => [...prev, ...nextPageComments]);

      // Update pagination state
      setPage(nextPage);
      setHasMore(endIndex < allComments.length);
    } catch (error) {
      console.error("Failed to load more comments:", error);
      toast.error("Failed to load more comments");
    } finally {
      setLoadingMore(false);
    }
  };

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
                // For replies, add to the beginning of the replies array for "newest" order
                replies: [optimisticComment, ...(comment.replies || [])],
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
        // It's a top-level comment - Add to the beginning for "newest" order
        setComments((prev) => [optimisticComment, ...prev]);
        // Increment total comments count
        setTotalComments((prev) => prev + 1);
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
        setComments(updatedComments.slice(0, COMMENTS_PER_PAGE * page));
        setTotalComments(updatedComments.length);
        setHasMore(updatedComments.length > COMMENTS_PER_PAGE * page);
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
          setTotalComments((prev) => prev - 1);
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
        <div className="flex items-center gap-2">
          {/* Mobile: comment icon and count */}
          <span className="md:hidden flex items-center gap-1 font-semibold text-lg">
            <MessageCircle className="h-5 w-5 text-red-500" />
            {totalComments}
          </span>
          <h2 className="hidden md:block text-xl font-semibold">
            Comments
            {totalComments > 0 && (
              <span className="text-sm text-gray-500">({totalComments})</span>
            )}
          </h2>
        </div>
        <select
          className="rounded-full border px-3 py-1 text-sm md:rounded-md md:text-base"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "popular" | "newest" | "oldest")
          }
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="popular">Most popular</option>
        </select>
      </div>

      {/* Comment box */}
      <div
        id="comment-form"
        className="rounded-xl border md:border p-4 md:bg-white bg-red-50 border-red-200 md:border-gray-200"
      >
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
        <div className="flex flex-col gap-2">
          <textarea
            placeholder={
              isSignedIn ? "Join the conversation..." : "Sign in to comment"
            }
            className="w-full rounded-md border border-red-200 bg-red-50 p-3 text-[15px] focus:border-red-400 focus:ring-0 md:bg-white md:border-gray-200"
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={!isSignedIn || isSubmitting}
          />
          {/* Mobile: icons row */}
          <div className="flex gap-3 items-center text-red-400 text-lg md:hidden mb-1">
            <span className="cursor-pointer">
              <span role="img" aria-label="emoji">
                😊
              </span>
            </span>
            <span className="cursor-pointer">
              <span role="img" aria-label="image">
                🖼️
              </span>
            </span>
            <span className="cursor-pointer">
              <span role="img" aria-label="gif">
                GIF
              </span>
            </span>
            <span className="cursor-pointer">
              <span role="img" aria-label="video">
                🎥
              </span>
            </span>
            <span className="cursor-pointer">
              <span role="img" aria-label="text">
                Aa
              </span>
            </span>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handlePostComment}
              disabled={!isSignedIn || !commentText.trim() || isSubmitting}
              className="rounded-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-semibold md:rounded-md md:bg-primary md:hover:bg-primary/90 md:text-base md:px-4 md:py-2"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-4 border-slate-200 border-t-black"></span>
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
      </div>

      {/* Divider for mobile */}
      <div className="md:hidden border-t border-gray-200 my-2" />

      {isLoading ? (
        <Loading />
      ) : comments.length > 0 ? (
        <div>
          <div className="space-y-4 md:space-y-6">
            {comments.map((comment) => (
              <div
                className="rounded-xl bg-white md:bg-transparent p-3 md:p-0 border border-gray-100 md:border-0"
                key={comment.id}
              >
                <CommentCard
                  comment={comment}
                  showFullThread={showFullThread}
                  postId={postId}
                  onReplyClick={handleReplyClick}
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {hasMore && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="w-full max-w-md flex items-center justify-center gap-2"
                onClick={loadMoreComments}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-black" />
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show More Comments
                  </>
                )}
              </Button>
            </div>
          )}

          {/* View All Comments on separate page */}
          {totalComments > COMMENTS_PER_PAGE && !showFullThread && (
            <div className="mt-4 text-center">
              <Button variant="link" asChild>
                <Link href={`/post/${postId}/comments`}>
                  View All {totalComments} Comments in Full Page
                </Link>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
}
