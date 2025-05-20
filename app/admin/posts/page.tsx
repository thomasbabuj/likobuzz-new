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
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TableFilters } from "../components/table-filters";
import { TablePagination } from "../components/table-pagination";
import { Badge } from "@/components/ui/badge";

const PAGE_SIZE = 10;

type SortField = "createdAt" | "title" | "_count";
type SortOrder = "asc" | "desc";

async function getPosts(
  page: number,
  sortField: SortField = "createdAt",
  sortOrder: SortOrder = "desc",
  search?: string
) {
  const skip = (page - 1) * PAGE_SIZE;

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { content: { contains: search, mode: "insensitive" as const } },
          {
            author: {
              firstName: { contains: search, mode: "insensitive" as const },
            },
          },
          {
            author: {
              lastName: { contains: search, mode: "insensitive" as const },
            },
          },
        ],
      }
    : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: PAGE_SIZE,
      where,
      orderBy:
        sortField === "_count"
          ? {
              comments: {
                _count: sortOrder,
              },
            }
          : {
              [sortField]: sortOrder,
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
    }),
    prisma.post.count({ where }),
  ]);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    sort?: string;
    order?: string;
    search?: string;
  };
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const sortField = (params.sort as SortField) || "createdAt";
  const sortOrder = (params.order as SortOrder) || "desc";
  const search = params.search;

  const { posts, totalPages } = await getPosts(
    page,
    sortField,
    sortOrder,
    search
  );

  const createQueryString = (params: Record<string, string | number>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value.toString());
    });
    return searchParams.toString();
  };

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

      <TableFilters
        searchPlaceholder="Search posts..."
        sortOptions={[
          { value: "createdAt", label: "Created Date" },
          { value: "title", label: "Title" },
          { value: "_count", label: "Comments" },
        ]}
        defaultSortField="createdAt"
        defaultSortOrder="desc"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
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
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
