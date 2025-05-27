import { ClerkProvider } from "@clerk/nextjs";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./providers/Providers";
import { AdminLayoutGuard } from "./components/AdminLayoutGuard";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

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
        <body className={openSans.className}>
          <AdminLayoutGuard>
            <Navbar />
          </AdminLayoutGuard>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
