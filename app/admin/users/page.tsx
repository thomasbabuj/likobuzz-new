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

async function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
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
  });
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage your platform users</p>
      </div>

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
    </div>
  );
}
