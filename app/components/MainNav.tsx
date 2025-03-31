"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex h-14 items-center px-4 sm:px-6">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <span className="sr-only">Open menu</span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Likobuzz</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-1 ml-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/new">NEW</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/best">BEST</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/hot">HOT</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/forums">FORUMS</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/lexicon">LEXICON</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/gallery">GALLERY</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/calendar">CALENDAR</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/shop">THE SHOP</Link>
            </Button>
          </nav>

          {/* Right Side Items */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
}
