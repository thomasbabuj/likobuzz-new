"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Something went wrong!</h1>
        <p className="text-muted-foreground">
          An error occurred while loading this page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-black rounded-md hover:bg-slate-50"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
