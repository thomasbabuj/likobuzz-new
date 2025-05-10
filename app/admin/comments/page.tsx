import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

async function getComments() {
  return prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
          imageUrl: true,
        },
      },
      post: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  });
}

export default async function CommentsPage() {
  const comments = await getComments();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Comments</h1>
        <p className="text-muted-foreground">Manage and moderate comments</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {comment.author.imageUrl && (
                      <img
                        src={comment.author.imageUrl}
                        alt={comment.author.firstName || ""}
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                    <div>
                      {comment.author.firstName} {comment.author.lastName}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {comment.content}
                </TableCell>
                <TableCell>
                  <a
                    href={`/posts/${comment.post.slug}`}
                    className="text-primary hover:underline"
                  >
                    {comment.post.title}
                  </a>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
