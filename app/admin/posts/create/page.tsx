import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { PostForm } from "@/app/components/forms/PostForm";

export default async function CreatePostPage() {
  const { sessionClaims, userId } = await auth();

  // Check if user is admin
  if (sessionClaims?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <PostForm />
      </div>
    </div>
  );
}
