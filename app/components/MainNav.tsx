"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "NEW", href: "/new" },
  { label: "BEST", href: "/best" },
  { label: "HOT", href: "/hot" },
  { label: "FORUMS", href: "/forums" },
  { label: "LEXICON", href: "/lexicon" },
  { label: "GALLERY", href: "/gallery" },
  { label: "CALENDAR", href: "/calendar" },
  { label: "THE SHOP", href: "/shop" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
            pathname === item.href
              ? "text-black font-semibold"
              : "text-muted-foreground"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
