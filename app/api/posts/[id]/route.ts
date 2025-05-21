import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const queryParams = await params;
  // Get authenticated user if available
  const { userId } = await auth();

  // Fetch the post with related data
  const post = await db.post.findFirst({
    where: { slug: queryParams.id },
    include: {
      author: {
        select: {
          username: true,
          profileImageUrl: true,
        },
      },
      categories: true,
      votes: true,
      comments: true,
      images: {
        where: {
          featured: true,
        },
        take: 1,
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const upvotes = post.votes.filter((v) => v.type === "UPVOTE").length;
  const downvotes = post.votes.filter((v) => v.type === "DOWNVOTE").length;
  const commentCount = post.comments.length;

  // Get user's vote if they are logged in
  let userVote = null;
  if (userId) {
    // Get the internal user ID from Clerk ID
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (user) {
      const vote = post.votes.find((v) => v.userId === user.id);
      if (vote) {
        userVote = vote.type;
      }
    }
  }

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
    userVote,
    imageUrl: post.images[0]?.url || null,
  });
}
