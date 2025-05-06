import { z } from "zod";

export const voteSchema = z.object({
  postId: z.string(),
  type: z.enum(["UPVOTE", "DOWNVOTE"]),
});

export type VoteInput = z.infer<typeof voteSchema>;
