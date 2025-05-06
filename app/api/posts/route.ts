// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const DEFAULT_LIMIT = 10;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");
  const limit = parseInt(searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10);

  const posts = await db.post.findMany({
    take: limit + 1,
    ...(cursor && { skip: 1, cursor: { id: cursor } }),
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { username: true } }, // or 'name' if that's your field
      votes: true,
      comments: true,
      categories: true,
    },
  });

  const shapedPosts = posts.slice(0, limit).map((post) => {
    const upVotes = post.votes.filter((v) => v.type === "UPVOTE").length;
    const downVotes = post.votes.filter((v) => v.type === "DOWNVOTE").length;
    const commentCount = post.comments.length;
    const categories = post.categories.map((c) => c.name).join(", ");
    return {
      id: post.id,
      title: post.title,
      author: post.author?.username ?? "Unknown",
      upvotes: upVotes,
      downvotes: downVotes,
      commentCount,
      categories,
    };
  });

  let nextCursor: string | null = null;
  if (posts.length > limit) {
    nextCursor = posts[limit].id;
    posts.pop();
  }

  return NextResponse.json({ posts: shapedPosts, nextCursor });
}
