"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Wallet,
  ClipboardCheck,
  GraduationCap,
  MessageSquare,
  FileText,
  LogOut,
  School,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { Emblem } from "@/components/public/emblem";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Executive Dashboard", icon: LayoutDashboard, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER", "PARENT", "STUDENT"] },
  { href: "/students", label: "Student Directory", icon: Users, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER"] },
  { href: "/fees", label: "Fees & Challans", icon: Wallet, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "PARENT", "STUDENT"] },
  { href: "/attendance", label: "Smart Attendance", icon: ClipboardCheck, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER", "PARENT"] },
  { href: "/results", label: "Examinations & Marks", icon: GraduationCap, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER", "PARENT", "STUDENT"] },
  { href: "/applications", label: "Admissions Pipeline", icon: FileText, roles: ["SUPER_ADMIN", "BRANCH_ADMIN"] },
  { href: "/inquiries", label: "Parent Inquiries", icon: MessageSquare, roles: ["SUPER_ADMIN", "BRANCH_ADMIN"] },
];

export function DashboardSidebar({
  user,
}: {
  user: { name?: string | null; email?: string | null; role: string; branchName?: string | null };
}) {
  const pathname = usePathname();
  const items = nav.filter((i) => i.roles.includes(user.role));

  return (
    <aside className="relative flex h-full min-h-screen w-64 flex-col bg-slate-950/95 border-r border-cyan-500/15 backdrop-blur-xl text-slate-200 shadow-2xl z-20">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-radial-at-t from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Brand Header */}
      <div className="relative flex items-center gap-3 border-b border-cyan-500/15 px-4 py-5 bg-gradient-to-b from-cyan-950/30 to-transparent">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-60 blur-sm group-hover:opacity-100 transition duration-300" />
          <div className="relative bg-slate-950 p-1 rounded-full border border-cyan-500/30">
            <Emblem className="h-10 w-10" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-serif font-bold text-white tracking-tight truncate text-sm">
              SHAHEEN SYSTEM
            </p>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-cyan-400 truncate">
              {user.role.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>

      {/* Branch context banner */}
      <div className="px-4 py-2 bg-cyan-950/40 border-b border-cyan-500/10 flex items-center justify-between text-[11px]">
        <span className="text-slate-400 truncate flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">{user.branchName ?? "HQ / All Branches"}</span>
        </span>
        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
          Live
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
        <p className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          Management Controls
        </p>
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold"
                  : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 transition-transform duration-200 group-hover:scale-110",
                  active ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-2 border-t border-white/5">
          <p className="px-3 pb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Public Gateway
          </p>
          <Link
            href="/"
            className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white border border-transparent transition"
          >
            <div className="flex items-center gap-3">
              <School className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Public Institution Site</span>
            </div>
            <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-white transition" />
          </Link>
        </div>
      </nav>

      {/* User profile & sign out footer */}
      <div className="border-t border-cyan-500/15 p-4 bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-md border border-white/20 shrink-0">
            {user.name ? user.name.slice(0, 2).toUpperCase() : "SE"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">{user.name}</p>
            <p className="truncate text-[10px] font-mono text-cyan-400/80">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2 text-xs font-medium text-slate-300 hover:bg-rose-500/20 hover:text-rose-200 hover:border-rose-500/30 border border-white/10 transition duration-200"
        >
          <LogOut className="h-3.5 w-3.5" /> Secure Sign Out
        </button>
      </div>
    </aside>
  );
}