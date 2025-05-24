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
          <div className="flex items-center gap-2 sm:gap-6">
            {/* <div className="sm:hidden">
              <MainNav />
            </div> */}
            <Link href="/" className="font-bold text-xl">
              Likobuzz
            </Link>
            {/* <div className="hidden sm:block">
              <MainNav />
            </div> */}
          </div>
          <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex gap-2 sm:gap-4">
                <Link
                  href="/sign-in"
                  className="rounded-md bg-black px-3 sm:px-4 py-2 text-xs sm:text-sm text-white whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-md border border-black px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap"
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
