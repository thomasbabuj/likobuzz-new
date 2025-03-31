"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface VoteButtonsProps {
  upvotes: number;
  downvotes: number;
}

export function VoteButtons({ upvotes, downvotes }: VoteButtonsProps) {
  return (
    <div className="md:hidden grid grid-cols-3 items-center bg-muted/30 border-b">
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          className="h-16 flex items-center gap-2 hover:bg-transparent hover:text-red-600 rounded-none"
        >
          <ChevronUp className="h-8 w-8" />
          <span className="text-xl font-medium">{upvotes}</span>
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-sm uppercase">Vote</span>
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          className="h-16 flex items-center gap-2 hover:bg-transparent hover:text-red-600 rounded-none"
        >
          <span className="text-xl font-medium">{downvotes}</span>
          <ChevronDown className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
