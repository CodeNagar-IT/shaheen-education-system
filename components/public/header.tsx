"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Emblem } from "@/components/public/emblem";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/branches", label: "Campuses" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur">
      <div className="bg-royal text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:text-sm">
          <p className="truncate">Madina Market, Shoukat Line, Upper Chattar, Domail</p>
          <a href="tel:+923005512345" className="flex items-center gap-1 font-medium">
            <Phone className="h-3.5 w-3.5" />
            +92 300 5512345
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Emblem className="h-11 w-11" />
          <span>
            <span className="block font-serif text-lg font-semibold leading-tight text-white sm:text-xl">
              Shaheen Education System
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold">Excellence in Learning</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white",
                pathname === link.href && "bg-white/10 text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="ml-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy hover:bg-yellow-400"
          >
            Portal Login
          </Link>
        </nav>
        <button
          className="rounded-md p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-navy px-4 py-3 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-white hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-md bg-gold px-3 py-2 text-center text-sm font-semibold text-navy"
          >
            Portal Login
          </Link>
        </div>
      )}
    </header>
  );
}
