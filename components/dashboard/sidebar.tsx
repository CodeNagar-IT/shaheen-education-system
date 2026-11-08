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
} from "lucide-react";
import { Emblem } from "@/components/public/emblem";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER", "PARENT", "STUDENT"] },
  { href: "/students", label: "Students", icon: Users, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER"] },
  { href: "/fees", label: "Fees", icon: Wallet, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "PARENT", "STUDENT"] },
  { href: "/attendance", label: "Attendance", icon: ClipboardCheck, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER", "PARENT"] },
  { href: "/results", label: "Results", icon: GraduationCap, roles: ["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER", "PARENT", "STUDENT"] },
  { href: "/applications", label: "Admissions Inbox", icon: FileText, roles: ["SUPER_ADMIN", "BRANCH_ADMIN"] },
  { href: "/inquiries", label: "Inquiries", icon: MessageSquare, roles: ["SUPER_ADMIN", "BRANCH_ADMIN"] },
];

export function DashboardSidebar({
  user,
}: {
  user: { name?: string | null; email?: string | null; role: string; branchName?: string | null };
}) {
  const pathname = usePathname();
  const items = nav.filter((i) => i.roles.includes(user.role));

  return (
    <aside className="flex h-full min-h-screen w-64 flex-col bg-navy text-slate-200">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-5">
        <Emblem className="h-10 w-10" />
        <div>
          <p className="font-serif text-white">SES Portal</p>
          <p className="text-[10px] uppercase tracking-widest text-gold">{user.role.replace("_", " ")}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-white/10",
                active && "bg-white/15 text-gold"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
        <Link href="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-white/10">
          <School className="h-4 w-4" />
          Public Website
        </Link>
      </nav>
      <div className="border-t border-white/10 p-4">
        <p className="truncate text-sm font-medium text-white">{user.name}</p>
        <p className="truncate text-xs text-slate-400">{user.branchName ?? "All campuses"}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-white/10 py-2 text-sm hover:bg-white/20"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}
