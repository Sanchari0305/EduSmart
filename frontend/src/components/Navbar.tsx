"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/app" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/60 dark:bg-black/40 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/app" className="text-xl font-bold text-blue-600 dark:text-white">
          EduSmart
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-all duration-300
                ${pathname === item.href
                  ? "text-blue-600 dark:text-white"
                  : "text-zinc-700 dark:text-zinc-300"}
                hover:text-blue-500 dark:hover:text-white
                hover:scale-105 hover:underline underline-offset-4`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
