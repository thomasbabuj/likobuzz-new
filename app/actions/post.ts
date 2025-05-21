"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { postCreateSchema, type PostCreateInput } from "@/lib/validations/post";
import { slugify } from "@/lib/utils";

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
      images: validatedData.images?.length
        ? {
            create: validatedData.images.map((img) => ({
              url: img.url,
              featured: img.featured ?? false,
              type: img.type ?? "content",
            })),
          }
        : undefined,
    },
  });

  revalidatePath("/admin/posts");
  return post;
}

export async function updatePost(id: string, input: PostCreateInput) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) throw new Error("User not found in DB");

  // Validate input
  const validatedData = postCreateSchema.parse(input);

  // Update post
  const post = await db.post.update({
    where: { id },
    data: {
      title: validatedData.title,
      content: validatedData.content,
      published: validatedData.published,
      categories: {
        set: validatedData.categories.map((id) => ({ id })),
      },
      slug: slugify(validatedData.title),
      images: {
        deleteMany: {},
        create:
          validatedData.images?.map((img) => ({
            url: img.url,
            featured: img.featured ?? false,
            type: img.type ?? "content",
          })) || [],
      },
    },
  });

  revalidatePath("/admin/posts");
  return post;
}
