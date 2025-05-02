// components/ui/pagination.tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaginationProps {
  page: number;
  pageCount: number;
}

export function Pagination({ page, pageCount }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav className="flex gap-2">
      <Link
        href={`?page=${page - 1}`}
        className={cn(
          "px-3 py-1 rounded",
          page === 1 && "pointer-events-none opacity-50"
        )}
        aria-disabled={page === 1}
      >
        Prev
      </Link>
      {Array.from({ length: pageCount }, (_, i) => (
        <Link
          key={i + 1}
          href={`?page=${i + 1}`}
          className={cn(
            "px-3 py-1 rounded",
            page === i + 1 ? "bg-primary text-white" : "hover:bg-gray-100"
          )}
          aria-current={page === i + 1 ? "page" : undefined}
        >
          {i + 1}
        </Link>
      ))}
      <Link
        href={`?page=${page + 1}`}
        className={cn(
          "px-3 py-1 rounded",
          page === pageCount && "pointer-events-none opacity-50"
        )}
        aria-disabled={page === pageCount}
      >
        Next
      </Link>
    </nav>
  );
}
