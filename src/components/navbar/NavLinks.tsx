"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Create Poster", href: "/create-poster" },
  { name: "History", href: "/history" },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relative py-1 transition-colors font-sans ${
              isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
            }`}
          >
            {item.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-btn rounded-full animate-in fade-in duration-300" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}