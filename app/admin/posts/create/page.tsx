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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">
            Create a new post to share with the community
          </p>
        </div>
      </div>
      <PostForm />
    </div>
  );
}
