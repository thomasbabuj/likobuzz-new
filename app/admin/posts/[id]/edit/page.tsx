// app/admin/posts/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PostForm } from "@/components/admin/post-form";

interface EditPostPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { categories: true },
  });

  if (!post) return notFound();

  const categories = await prisma.category.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm mode="edit" post={post} categories={categories} />
    </div>
  );
}
