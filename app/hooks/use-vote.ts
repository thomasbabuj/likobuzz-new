"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { votePost } from "@/app/actions/vote";

interface UseVoteProps {
  postId: string;
  initialUpvotes: number;
  initialDownvotes: number;
  initialUserVote?: "UPVOTE" | "DOWNVOTE" | null;
}

export function useVote({
  postId,
  initialUpvotes,
  initialDownvotes,
  initialUserVote = null,
}: UseVoteProps) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<"UPVOTE" | "DOWNVOTE" | null>(
    initialUserVote
  );

  // Calculate upvote percentage for display
  const totalVotes = upvotes + downvotes;
  const upvotePercentage =
    totalVotes > 0 ? Math.round((upvotes / totalVotes) * 100) : 0;

  const handleVote = async (voteType: "UPVOTE" | "DOWNVOTE") => {
    // Require authentication
    if (!isSignedIn) {
      toast.error("You must be signed in to vote");
      router.push("/sign-in");
      return;
    }

    // Prevent multiple simultaneous votes
    if (isVoting) return;

    try {
      setIsVoting(true);

      // Determine the vote action based on current state and clicked vote type
      const isRemove = userVote === voteType;
      const isAdd = userVote === null;
      const isSwitch = userVote !== null && userVote !== voteType;

      // Create a copy of current vote counts to modify
      let newUpvotes = upvotes;
      let newDownvotes = downvotes;
      let newUserVote: "UPVOTE" | "DOWNVOTE" | null = userVote;

      // Apply optimistic updates based on action type
      if (isRemove) {
        // Removing a vote
        if (voteType === "UPVOTE") {
          newUpvotes--;
        } else {
          newDownvotes--;
        }
        newUserVote = null;
      } else if (isAdd) {
        // Adding a new vote
        if (voteType === "UPVOTE") {
          newUpvotes++;
        } else {
          newDownvotes++;
        }
        newUserVote = voteType;
      } else if (isSwitch) {
        // Switching vote type
        if (voteType === "UPVOTE") {
          newUpvotes++;
          newDownvotes--;
        } else {
          newDownvotes++;
          newUpvotes--;
        }
        newUserVote = voteType;
      }

      // Update state with new values
      setUpvotes(newUpvotes);
      setDownvotes(newDownvotes);
      setUserVote(newUserVote);

      // Submit vote to server
      const result = await votePost({
        postId,
        type: voteType,
      });

      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Failed to process your vote");
      console.error(error);

      // Revert optimistic update on error
      setUpvotes(initialUpvotes);
      setDownvotes(initialDownvotes);
      setUserVote(initialUserVote);
    } finally {
      setIsVoting(false);
    }
  };

  return {
    upvotes,
    downvotes,
    upvotePercentage,
    totalVotes,
    userVote,
    isVoting,
    handleVote,
  };
}
