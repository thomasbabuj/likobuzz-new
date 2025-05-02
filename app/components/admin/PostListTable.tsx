// components/admin/post-list-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/app/components/Pagination";
import Link from "next/link";

interface PostListTableProps {
  posts: {
    id: string;
    title: string;
    published: boolean;
    createdAt: Date;
    author: { username: string; id: string } | null;
    categories: { name: string; id: string }[];
  }[];
  total: number;
  page: number;
  pageSize: number;
}

export function PostListTable({
  posts,
  total,
  page,
  pageSize,
}: PostListTableProps) {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author?.username ?? "—"}</TableCell>
              <TableCell>
                {post.categories.map((cat) => cat.name).join(", ")}
              </TableCell>
              <TableCell>
                {post.published ? (
                  <span className="text-green-600">Published</span>
                ) : (
                  <span className="text-gray-500">Draft</span>
                )}
              </TableCell>
              <TableCell>{post.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <Pagination page={page} pageCount={pageCount} />
      </div>
    </div>
  );
}
