"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { voteSchema, type VoteInput } from "@/lib/validations/vote";

/**
 * Cast or change a vote on a post
 * A user can only have one vote per post (either upvote or downvote)
 */
export async function votePost(input: VoteInput) {
  // Validate user is authenticated
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized", success: false };
  }

  // Validate input
  try {
    voteSchema.parse(input);
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

    // Check if the user has already voted on this post
    const existingVote = await db.vote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: input.postId,
        },
      },
    });

    if (existingVote) {
      if (existingVote.type === input.type) {
        // If clicking the same vote type, remove the vote
        await db.vote.delete({
          where: { id: existingVote.id },
        });

        revalidatePath(`/post/${input.postId}`);
        revalidatePath("/");

        return {
          success: true,
          message: "Vote removed",
        };
      } else {
        // If clicking different vote type, update the vote
        await db.vote.update({
          where: { id: existingVote.id },
          data: { type: input.type },
        });

        revalidatePath(`/post/${input.postId}`);
        revalidatePath("/");

        return {
          success: true,
          message: "Vote updated",
        };
      }
    } else {
      // Create a new vote
      await db.vote.create({
        data: {
          type: input.type,
          userId: user.id,
          postId: input.postId,
        },
      });

      revalidatePath(`/post/${input.postId}`);
      revalidatePath("/");

      return {
        success: true,
        message: "Vote added",
      };
    }
  } catch (error) {
    console.error("Error voting on post:", error);
    return {
      error: "Failed to process vote",
      success: false,
    };
  }
}
