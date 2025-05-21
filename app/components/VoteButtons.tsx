"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVote } from "@/app/hooks/use-vote";

interface VoteButtonsProps {
  postId: string;
  initialUpvotes: number;
  initialDownvotes: number;
  initialUserVote?: "UPVOTE" | "DOWNVOTE" | null;
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function VoteButtons({
  postId,
  initialUpvotes,
  initialDownvotes,
  initialUserVote = null,
  orientation = "vertical",
  size = "md",
  className,
}: VoteButtonsProps) {
  const { upvotes, downvotes, userVote, handleVote, isVoting } = useVote({
    postId,
    initialUpvotes,
    initialDownvotes,
    initialUserVote,
  });

  // Size classes for the ChevronUp/Down icons
  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8",
  };

  // Size classes for the vote count text
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-xl",
  };

  if (orientation === "horizontal") {
    // Horizontal layout (e.g., for mobile)
    return (
      <div
        className={cn(
          "grid grid-cols-3 items-center gap-4 bg-muted/30",
          className
        )}
      >
        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isVoting}
            onClick={() => handleVote("UPVOTE")}
            className={cn(
              "h-14 flex items-center gap-2 hover:bg-transparent rounded-none",
              userVote === "UPVOTE" ? "text-blue-600" : "hover:text-blue-600"
            )}
            aria-label="Upvote"
          >
            <ChevronUp className={iconSizes[size]} />
            <span className={cn("font-medium", textSizes[size])}>
              {upvotes}
            </span>
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-sm uppercase">Vote</span>
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isVoting}
            onClick={() => handleVote("DOWNVOTE")}
            className={cn(
              "h-14 flex items-center gap-2 hover:bg-transparent rounded-none",
              userVote === "DOWNVOTE" ? "text-red-600" : "hover:text-red-600"
            )}
            aria-label="Downvote"
          >
            <span className={cn("font-medium", textSizes[size])}>
              {downvotes}
            </span>
            <ChevronDown className={iconSizes[size]} />
          </Button>
        </div>
      </div>
    );
  }

  // Default vertical layout
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isVoting}
        onClick={() => handleVote("UPVOTE")}
        className={cn(
          "hover:text-blue-600",
          userVote === "UPVOTE" && "text-blue-600"
        )}
        aria-label="Upvote"
        aria-pressed={userVote === "UPVOTE"}
      >
        <ChevronUp className={iconSizes[size]} />
      </Button>
      <span className={cn("font-medium my-1", textSizes[size])}>{upvotes}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isVoting}
        onClick={() => handleVote("DOWNVOTE")}
        className={cn(
          "hover:text-red-600",
          userVote === "DOWNVOTE" && "text-red-600"
        )}
        aria-label="Downvote"
        aria-pressed={userVote === "DOWNVOTE"}
      >
        <ChevronDown className={iconSizes[size]} />
      </Button>
      <span className={cn("text-xs text-muted-foreground mt-1", textSizes.sm)}>
        VOTE
      </span>
    </div>
  );
}
