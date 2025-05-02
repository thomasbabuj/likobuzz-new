// app/admin/posts/page.tsx
import { db } from "@/lib/db";
import { PostListTable } from "@/app/components/admin/PostListTable";

const PAGE_SIZE = 10;

export default async function AdminPostListPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) > 0 ? Number(searchParams.page) : 1;
  const skip = (page - 1) * PAGE_SIZE;

  const [posts, total] = await Promise.all([
    db.post.findMany({
      skip,
      take: PAGE_SIZE,
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { username: true, id: true } },
        categories: { select: { name: true, id: true } },
        _count: { select: { comments: true } },
      },
    }),
    db.post.count(),
  ]);

  // Map to your prop shape:
  const mappedPosts = posts.map((post) => ({
    ...post,
    commentsCount: post._count.comments,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <PostListTable
        posts={mappedPosts}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
