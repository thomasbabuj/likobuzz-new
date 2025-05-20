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
import { UserFilters } from "./components/UserFilters";

const PAGE_SIZE = 10;

type SortField = "createdAt" | "lastSignInAt" | "firstName";
type SortOrder = "asc" | "desc";

async function getUsers(
  page: number,
  sortField: SortField = "createdAt",
  sortOrder: SortOrder = "desc",
  search?: string
) {
  const skip = (page - 1) * PAGE_SIZE;

  const where = search
    ? {
        OR: [
          { firstName: { contains: search, mode: "insensitive" as const } },
          { lastName: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: PAGE_SIZE,
      where,
      orderBy: {
        [sortField]: sortOrder,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        imageUrl: true,
        createdAt: true,
        lastSignInAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}

export default async function UsersPage({
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

  const { users, totalPages } = await getUsers(
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
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage your platform users</p>
      </div>

      <UserFilters
        sortField={sortField}
        sortOrder={sortOrder}
        search={search}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Sign In</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.imageUrl && (
                      <img
                        src={user.imageUrl}
                        alt={user.firstName || ""}
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                    <div>
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {formatDistanceToNow(user.createdAt, { addSuffix: true })}
                </TableCell>
                <TableCell>
                  {user.lastSignInAt
                    ? formatDistanceToNow(user.lastSignInAt, {
                        addSuffix: true,
                      })
                    : "Never"}
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
              href={`/admin/users?${createQueryString({ page: page - 1 })}`}
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
                      href={`/admin/users?${createQueryString({ page: pageNum })}`}
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
              href={`/admin/users?${createQueryString({ page: page + 1 })}`}
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
