"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { Emblem } from "@/components/public/emblem";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About & Message" },
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060B18]/90 backdrop-blur-xl transition-all">
      {/* Top Announcement Bar with Cyber Ticker Accent */}
      <div className="relative overflow-hidden bg-gradient-to-r from-navy-950 via-royal-dark to-navy-950 border-b border-cyan-500/20 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Live Campus
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="h-3 w-3 text-gold" />
              Madina Market, Shoukat Line, Upper Chattar, Domail
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="tel:+923005512345"
              className="flex items-center gap-1.5 text-cyan-300 hover:text-white transition"
            >
              <Phone className="h-3 w-3 text-cyan-400" />
              <span>+92 300 5512345</span>
            </a>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-gold-light">
              <Sparkles className="h-3 w-3 text-gold" />
              Admissions 2026-27 Open
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative">
            <Emblem className="h-12 w-12 transition-transform duration-300 group-hover:scale-105" glow />
          </div>
          <div>
            <span className="block font-serif text-lg font-bold leading-tight text-white group-hover:text-cyan-300 transition-colors sm:text-xl">
              Shaheen Education System
            </span>
            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              <span>Muzaffarabad</span>
              <span className="h-1 w-1 rounded-full bg-emerald-400 inline-block"></span>
              <span className="text-emerald-400">Courage to Know</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
                  active
                    ? "bg-gradient-to-r from-royal/40 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Portal Sign-in Button with Cyber Glow */}
          <Link
            href="/login"
            className="ml-3 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-amber via-gold to-yellow-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-[0_0_20px_rgba(234,179,8,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] active:scale-95"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-navy-950" />
            Portal Login
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-lg p-2 text-slate-300 hover:text-white hover:bg-white/10 lg:hidden border border-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5 text-gold" /> : <Menu className="h-5 w-5 text-cyan-400" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="border-t border-white/10 bg-[#060B18]/95 px-4 py-4 backdrop-blur-2xl lg:hidden space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition",
                pathname === link.href
                  ? "bg-royal/30 text-cyan-300 font-bold border border-cyan-500/30"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold to-yellow-400 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-navy-950 shadow-lg"
          >
            <ShieldCheck className="h-4 w-4" />
            Access Management Portal
          </Link>
        </div>
      )}
    </header>
  );
}
