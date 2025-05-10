// app/admin/posts/page.tsx
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

async function getPosts() {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      _count: {
        select: {
          comments: true,
          votes: true,
        },
      },
    },
  });
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Manage your platform posts</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/create">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <a
                    href={`/posts/${post.slug}`}
                    className="font-medium hover:underline"
                  >
                    {post.title}
                  </a>
                </TableCell>
                <TableCell>
                  {post.author.firstName} {post.author.lastName}
                </TableCell>
                <TableCell>{post._count.comments}</TableCell>
                <TableCell>{post._count.votes}</TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
