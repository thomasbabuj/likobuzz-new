import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Sidebar } from "@/components/admin/Sidebar";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Posts",
    href: "/admin/posts",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
  {
    title: "Comments",
    href: "/admin/comments",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
  },
  {
    title: "Settings",
    href: "/admin/settings",
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // TODO: Add admin role check here

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop/tablet */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {/* Topbar for mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 flex items-center h-14 bg-background border-b px-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="mr-2 p-2 rounded-md hover:bg-muted focus:outline-none">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0 w-56">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-sm hover:bg-muted border-b last:border-b-0"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </PopoverContent>
        </Popover>
        <span className="font-bold text-lg ml-2">Likobuzz Admin</span>
      </div>
      {/* Main content, with top padding for mobile topbar */}
      <main className="flex-1 overflow-y-auto p-8 pt-20 md:pt-8">
        {children}
      </main>
    </div>
  );
}
