// app/admin/posts/[id]/edit/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PostForm } from "@/app/components/forms/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { sessionClaims, userId } = await auth();
  if (sessionClaims?.role !== "admin") redirect("/");

  const queryParams = await params;

  const post = await db.post.findUnique({
    where: { id: queryParams.id },
    include: {
      categories: true,
      images: true,
    },
  });
  if (!post) redirect("/admin/posts");

  // const shapedPost = {
  //   ...post,
  //   imageUrl: post.images.find((img) => img.type === "featured")?.url || null,
  // };

  console.log(JSON.stringify(post, null, 2));

  // Fetch all categories for the select
  const allCategories = await db.category.findMany();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <PostForm post={post} allCategories={allCategories} mode="edit" />
      </div>
    </div>
  );
}
