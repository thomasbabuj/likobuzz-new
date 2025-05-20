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

const PAGE_SIZE = 10;

type SortField = "createdAt" | "content";
type SortOrder = "asc" | "desc";

async function getComments(
  page: number,
  sortField: SortField = "createdAt",
  sortOrder: SortOrder = "desc",
  search?: string
) {
  const skip = (page - 1) * PAGE_SIZE;

  const where = search
    ? {
        OR: [
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
          {
            post: { title: { contains: search, mode: "insensitive" as const } },
          },
        ],
      }
    : {};

  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      skip,
      take: PAGE_SIZE,
      where,
      orderBy: {
        [sortField]: sortOrder,
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
    }),
    prisma.comment.count({ where }),
  ]);

  return {
    comments,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}

export default async function CommentsPage({
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

  const { comments, totalPages } = await getComments(
    page,
    sortField,
    sortOrder,
    search
  );

  const createQueryString = (params: Record<string, string | number>) => {
    const searchParams = new URLSearchParams();
    if (page) searchParams.set("page", page.toString());
    if (sortField) searchParams.set("sort", sortField);
    if (sortOrder) searchParams.set("order", sortOrder);
    if (search) searchParams.set("search", search);
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value.toString());
    });
    return searchParams.toString();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Comments</h1>
        <p className="text-muted-foreground">Manage your platform comments</p>
      </div>

      <TableFilters
        searchPlaceholder="Search comments..."
        sortOptions={[
          { value: "createdAt", label: "Created Date" },
          { value: "content", label: "Content" },
        ]}
        defaultSortField="createdAt"
        defaultSortOrder="desc"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Comment</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="max-w-md truncate">
                  {comment.content}
                </TableCell>
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
                <TableCell>
                  <a
                    href={`/posts/${comment.post.slug}`}
                    className="hover:underline"
                  >
                    {comment.post.title}
                  </a>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/admin/comments?${createQueryString({ page: page - 1 })}`}
              aria-disabled={page <= 1}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => {
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`/admin/comments?${createQueryString({ page: pageNum })}`}
                      isActive={pageNum === page}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              if (pageNum === 2 || pageNum === totalPages - 1) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null;
            }
          )}

          <PaginationItem>
            <PaginationNext
              href={`/admin/comments?${createQueryString({ page: page + 1 })}`}
              aria-disabled={page >= totalPages}
              className={
                page >= totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
