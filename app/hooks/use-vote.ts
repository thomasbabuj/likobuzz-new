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

      // Optimistically update UI
      const isAdd = userVote !== voteType;
      const isRemove = userVote === voteType;
      const isSwitch = userVote && userVote !== voteType;

      // Handle optimistic updates
      if (voteType === "UPVOTE") {
        if (isAdd) setUpvotes((prev) => prev + 1);
        if (isRemove) setUpvotes((prev) => prev - 1);
        if (isSwitch) {
          setUpvotes((prev) => prev + 1);
          setDownvotes((prev) => prev - 1);
        }
      } else {
        if (isAdd) setDownvotes((prev) => prev + 1);
        if (isRemove) setDownvotes((prev) => prev - 1);
        if (isSwitch) {
          setDownvotes((prev) => prev + 1);
          setUpvotes((prev) => prev - 1);
        }
      }

      // Update userVote state
      if (isRemove) {
        setUserVote(null);
      } else {
        setUserVote(voteType);
      }

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
