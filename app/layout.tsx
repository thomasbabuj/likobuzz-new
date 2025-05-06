import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Likobuzz",
  description:
    "A fun, public discussion, Q&A, and gossip platform for the Filipino community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
