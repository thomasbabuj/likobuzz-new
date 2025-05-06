import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
      author: { select: { username: true } },
      votes: true,
      comments: true,
      categories: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const upvotes = post.votes.filter((v) => v.type === "UPVOTE").length;
  const downvotes = post.votes.filter((v) => v.type === "DOWNVOTE").length;
  const commentCount = post.comments.length;

  return NextResponse.json({
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.author?.username ?? "Unknown",
    categories: post.categories.map((c) => c.name),
    upvotes,
    downvotes,
    commentCount,
    createdAt: post.createdAt,
    // add other fields as needed
  });
}
