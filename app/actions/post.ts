"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { postCreateSchema, type PostCreateInput } from "@/lib/validations/post";
import { slugify } from "../lib/utils";

export async function createPost(input: PostCreateInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) throw new Error("User not found in DB");

  // Validate input
  const validatedData = postCreateSchema.parse(input);

  // Create post
  const post = await db.post.create({
    data: {
      title: validatedData.title,
      content: validatedData.content,
      authorId: user.id,
      published: validatedData.published,

      categories: {
        connect: validatedData.categories.map((id) => ({ id })),
      },
      slug: slugify(validatedData.title),
    },
  });

  revalidatePath("/admin/posts");
  return post;
}
