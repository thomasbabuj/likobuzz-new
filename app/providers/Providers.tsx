"use client";

import clientLogger from "@/lib/logger/client";
import { ReactQueryProvider } from "./react-query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  clientLogger.info("Providers mounted");
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
