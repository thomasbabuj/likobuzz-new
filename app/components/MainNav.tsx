"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only show menu after component mounts to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!mounted) {
    return (
      <button className="sm:hidden p-2 hover:bg-slate-100 rounded-md">
        <Menu className="h-6 w-6" />
      </button>
    );
  }

  return (
    <>
      {/* Mobile burger menu button */}
      <button
        className="sm:hidden p-2 hover:bg-slate-100 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Desktop navigation */}
      <nav className="hidden sm:flex items-center">
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

      {/* Mobile menu overlay */}
      {isOpen && mounted && (
        <div className="fixed inset-0 z-50 bg-white sm:hidden">
          <div className="flex h-14 items-center justify-between px-4 border-b">
            <Link
              href="/"
              className="font-bold text-xl"
              onClick={() => setIsOpen(false)}
            >
              Likobuzz
            </Link>
            <button
              className="p-2 hover:bg-slate-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="px-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-4 text-lg font-medium border-b ${
                  pathname === item.href
                    ? "text-black font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
