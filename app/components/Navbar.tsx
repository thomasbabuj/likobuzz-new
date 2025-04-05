"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { MainNav } from "./MainNav";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              Likobuzz
            </Link>
            <MainNav />
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/sign-in"
                  className="rounded-md bg-black px-4 py-2 text-sm text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-md border border-black px-4 py-2 text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
