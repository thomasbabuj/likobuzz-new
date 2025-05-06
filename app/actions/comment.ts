"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { z } from "zod";
import { VoteType } from "@prisma/client";

// Validation schema for creating/replying to a comment
const commentSchema = z.object({
  postId: z.string(),
  content: z.string().min(1).max(1000),
  parentId: z.string().optional(),
});

type CommentInput = z.infer<typeof commentSchema>;

// Custom types for the UI
export interface CommentAuthor {
  id: string;
  name: string;
  image: string;
  role: string;
}

export interface CommentData {
  id: string;
  content: string;
  author: CommentAuthor;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: VoteType | null;
  totalReplies: number;
  replies?: CommentData[];
  parentId?: string;
}

// Fetch comments for a specific post
export async function getPostComments(
  postId: string,
  sortBy: "popular" | "newest" | "oldest" = "popular"
) {
  try {
    // Get the current user if any
    const { userId } = await auth();
    let dbUser = null;

    if (userId) {
      dbUser = await db.user.findUnique({
        where: { clerkId: userId },
      });
    }

    // Determine the sort order based on the sortBy parameter
    let orderBy: any;

    if (sortBy === "popular") {
      // We'll handle this differently since we can't directly sort by upvotes
      orderBy = undefined; // We'll manually sort after fetching
    } else if (sortBy === "newest") {
      orderBy = { createdAt: "desc" };
    } else {
      orderBy = { createdAt: "asc" };
    }

    // Get top-level comments (no parentId)
    const comments = await db.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      orderBy,
      include: {
        author: true,
        replies: {
          include: {
            author: true,
            _count: {
              select: {
                replies: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
          take: 3, // Initially load only a few replies
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });

    // Transform the data to match the expected format in the UI
    const transformedComments: CommentData[] = comments.map((comment) => {
      // For now, just set placeholder values for votes
      // In a future update with proper schema, we'll implement proper vote counting
      const upvotes = 0;
      const downvotes = 0;
      const userVote = null;

      return {
        id: comment.id,
        content: comment.content,
        author: {
          id: comment.author.id,
          name: comment.author.username,
          image: comment.author.imageUrl || "",
          role: comment.author.role,
        },
        createdAt: formatDate(comment.createdAt),
        upvotes,
        downvotes,
        userVote,
        totalReplies: comment._count.replies,
        replies: comment.replies.map((reply) => {
          // Placeholder values for votes
          const replyUpvotes = 0;
          const replyDownvotes = 0;
          const replyUserVote = null;

          return {
            id: reply.id,
            content: reply.content,
            author: {
              id: reply.author.id,
              name: reply.author.username,
              image: reply.author.imageUrl || "",
              role: reply.author.role,
            },
            createdAt: formatDate(reply.createdAt),
            upvotes: replyUpvotes,
            downvotes: replyDownvotes,
            userVote: replyUserVote,
            totalReplies: reply._count.replies,
            parentId: comment.id,
          };
        }),
      };
    });

    // Apply sorting
    if (sortBy === "popular") {
      // Since we don't have real vote data yet, default to newest comments first
      transformedComments.sort((a, b) => {
        const dateA = new Date(a.createdAt.replace(" ago", "")).getTime();
        const dateB = new Date(b.createdAt.replace(" ago", "")).getTime();
        return dateB - dateA;
      });
    }

    return transformedComments;
  } catch (error) {
    console.error("Error fetching post comments:", error);
    return [];
  }
}

// Fetch a specific comment thread
export async function getCommentThread(
  commentId: string
): Promise<CommentData | null> {
  try {
    // Get the specific comment and all its nested replies
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
            _count: {
              select: {
                replies: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
        post: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!comment) {
      return null;
    }

    // Placeholder values for votes until schema is updated
    const upvotes = 0;
    const downvotes = 0;
    const userVote = null;

    // Transform to match UI format
    return {
      id: comment.id,
      content: comment.content,
      author: {
        id: comment.author.id,
        name: comment.author.username,
        image: comment.author.imageUrl || "",
        role: comment.author.role,
      },
      createdAt: formatDate(comment.createdAt),
      upvotes,
      downvotes,
      userVote,
      totalReplies: comment._count.replies,
      replies: comment.replies.map((reply) => {
        // Placeholder values for reply votes
        const replyUpvotes = 0;
        const replyDownvotes = 0;
        const replyUserVote = null;

        return {
          id: reply.id,
          content: reply.content,
          author: {
            id: reply.author.id,
            name: reply.author.username,
            image: reply.author.imageUrl || "",
            role: reply.author.role,
          },
          createdAt: formatDate(reply.createdAt),
          upvotes: replyUpvotes,
          downvotes: replyDownvotes,
          userVote: replyUserVote,
          totalReplies: reply._count.replies,
          parentId: comment.id,
        };
      }),
    };
  } catch (error) {
    console.error("Error fetching comment thread:", error);
    return null;
  }
}

// Load more replies for a specific comment
export async function loadMoreReplies(
  commentId: string,
  skip: number,
  take: number
): Promise<CommentData[]> {
  try {
    const replies = await db.comment.findMany({
      where: {
        parentId: commentId,
      },
      include: {
        author: true,
        _count: {
          select: {
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      skip,
      take,
    });

    return replies.map((reply) => {
      // Placeholder values for votes until schema is updated
      const upvotes = 0;
      const downvotes = 0;
      const userVote = null;

      return {
        id: reply.id,
        content: reply.content,
        author: {
          id: reply.author.id,
          name: reply.author.username,
          image: reply.author.imageUrl || "",
          role: reply.author.role,
        },
        createdAt: formatDate(reply.createdAt),
        upvotes,
        downvotes,
        userVote,
        totalReplies: reply._count.replies,
        parentId: commentId,
      };
    });
  } catch (error) {
    console.error("Error loading more replies:", error);
    return [];
  }
}

// Create a new comment or reply
export async function createComment(input: CommentInput) {
  // Validate user is authenticated
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized", success: false };
  }

  // Validate input
  try {
    commentSchema.parse(input);
  } catch (error) {
    return { error: "Invalid input", success: false };
  }

  try {
    // Get the database user from Clerk ID
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return { error: "User not found", success: false };
    }

    // Create the comment
    const comment = await db.comment.create({
      data: {
        content: input.content,
        authorId: user.id,
        postId: input.postId,
        ...(input.parentId && { parentId: input.parentId }),
      },
    });

    revalidatePath(`/post/${input.postId}`);
    return {
      success: true,
      commentId: comment.id,
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    return {
      error: "Failed to create comment",
      success: false,
    };
  }
}

// Vote on a comment - stub implementation until schema is updated
export async function voteComment(commentId: string, type: VoteType) {
  // Validate user is authenticated
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized", success: false };
  }

  try {
    // Get the database user from Clerk ID
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return { error: "User not found", success: false };
    }

    const comment = await db.comment.findUnique({
      where: { id: commentId },
      select: { postId: true },
    });

    if (!comment) {
      return { error: "Comment not found", success: false };
    }

    // For now, just return success without actually processing the vote
    // Need schema migration to add the commentId field to Vote model

    revalidatePath(`/post/${comment.postId}`);
    return { success: true };
  } catch (error) {
    console.error("Error voting on comment:", error);
    return {
      error: "Failed to process vote",
      success: false,
    };
  }
}

// Helper function to format dates
function formatDate(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // diff in seconds

  if (diff < 60) return `${diff} second${diff === 1 ? "" : "s"} ago`;
  if (diff < 3600)
    return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) === 1 ? "" : "s"} ago`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) === 1 ? "" : "s"} ago`;
  if (diff < 2592000)
    return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) === 1 ? "" : "s"} ago`;
  if (diff < 31536000)
    return `${Math.floor(diff / 2592000)} month${Math.floor(diff / 2592000) === 1 ? "" : "s"} ago`;
  return `${Math.floor(diff / 31536000)} year${Math.floor(diff / 31536000) === 1 ? "" : "s"} ago`;
}
