import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "./components/MainNav";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Likobuzz - Filipino Community Platform",
  description:
    "A fun, public discussion, Q&A, and gossip platform for the Filipino community worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.className
          )}
        >
          <MainNav />
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
