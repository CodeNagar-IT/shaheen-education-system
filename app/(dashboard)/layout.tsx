import { requireUser } from "@/lib/session-guard";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ReactNode } from "react";

export const metadata = { title: "SES Portal | Dashboard" };

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <DashboardSidebar user={user} />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-14 items-center border-b border-slate-200 bg-white px-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="font-semibold text-navy">SES Portal</span>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-3 text-sm text-slate-600">
            <span className="hidden sm:block">
              {user.name ?? user.email}
            </span>
            <span className="rounded-full bg-navy px-2 py-0.5 text-xs font-medium text-gold">
              {(user.role as string).replace("_", " ")}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
