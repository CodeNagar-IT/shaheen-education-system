import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { AnalyticsCards } from "@/components/dashboard/analytics-cards";
import { ApplicationBadge } from "@/components/dashboard/status-badge";
import { formatPKR, formatDate } from "@/lib/utils";
import { Users, Wallet, AlertCircle, ClipboardCheck } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Overview | SES Portal" };

export default async function AdminPage() {
  const user = await requireUser();
  const scope = branchScope(user);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalStudents,
    activeStudents,
    maleCount,
    femaleCount,
    paidInvoices,
    pendingInvoices,
    overdueInvoices,
    attendanceToday,
    recentApplications,
    recentInquiries,
    branches,
  ] = await Promise.all([
    prisma.student.count({ where: { ...scope } }),
    prisma.student.count({ where: { ...scope, status: "ACTIVE" } }),
    prisma.student.count({ where: { ...scope, gender: "Male" } }),
    prisma.student.count({ where: { ...scope, gender: "Female" } }),
    prisma.feeInvoice.aggregate({
      _sum: { amount: true },
      where: {
        status: "PAID",
        ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
      },
    }),
    prisma.feeInvoice.aggregate({
      _sum: { amount: true },
      _count: true,
      where: {
        status: "PENDING",
        ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
      },
    }),
    prisma.feeInvoice.count({
      where: {
        status: "OVERDUE",
        ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
      },
    }),
    prisma.attendance.groupBy({
      by: ["status"],
      where: {
        date: { gte: today, lt: tomorrow },
        ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
      },
      _count: true,
    }),
    prisma.admissionApplication.findMany({
      where: { ...scope },
      include: { branch: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.inquiry.findMany({
      where: { ...scope },
      include: { branch: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.branch.findMany({ orderBy: { name: "asc" } }),
  ]);

  const attendanceMap: Record<string, number> = {};
  for (const a of attendanceToday) {
    attendanceMap[a.status] = a._count;
  }
  const presentCount = attendanceMap["PRESENT"] ?? 0;
  const totalAttendance = Object.values(attendanceMap).reduce((s, c) => s + c, 0);
  const attendancePct = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

  const monthlyCollection = paidInvoices._sum.amount ?? 0;
  const pendingAmount = pendingInvoices._sum.amount ?? 0;

  const cards = [
    {
      label: "Total Students",
      value: String(totalStudents),
      hint: `${activeStudents} active · ${maleCount}M / ${femaleCount}F`,
      icon: Users,
      tone: "navy" as const,
    },
    {
      label: "Monthly Collection",
      value: formatPKR(monthlyCollection),
      hint: "All paid invoices",
      icon: Wallet,
      tone: "gold" as const,
    },
    {
      label: "Pending Fees",
      value: formatPKR(pendingAmount),
      hint: `${pendingInvoices._count} invoices · ${overdueInvoices} overdue`,
      icon: AlertCircle,
      tone: "royal" as const,
    },
    {
      label: "Today's Attendance",
      value: `${attendancePct}%`,
      hint: `${presentCount} present of ${totalAttendance} marked`,
      icon: ClipboardCheck,
      tone: "navy" as const,
    },
  ];

  // Branch enrollment breakdown
  const branchEnrollment = await Promise.all(
    branches.map(async (b) => {
      const count = await prisma.student.count({ where: { branchId: b.id, status: "ACTIVE" } });
      return { name: b.name, count, cap: b.studentCap };
    })
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-navy">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome back, {user.name ?? "Admin"}</p>
      </div>

      <AnalyticsCards items={cards} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Applications */}
        <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-navy">Recent Applications</h2>
            <Link href="/applications" className="text-xs text-royal hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentApplications.length === 0 && (
              <p className="px-5 py-4 text-sm text-slate-400">No applications yet.</p>
            )}
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-800">{app.applicantName}</p>
                  <p className="text-xs text-slate-400">
                    Class {app.classApplied} · {app.branch.name}
                  </p>
                  <p className="text-xs text-slate-400">{formatDate(app.createdAt)}</p>
                </div>
                <ApplicationBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-navy">Recent Inquiries</h2>
            <Link href="/inquiries" className="text-xs text-royal hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentInquiries.length === 0 && (
              <p className="px-5 py-4 text-sm text-slate-400">No inquiries yet.</p>
            )}
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="px-5 py-3">
                <p className="text-sm font-medium text-slate-800">{inq.name}</p>
                <p className="text-xs text-slate-400">
                  {inq.phone} · {inq.classInterest ?? "General"}
                </p>
                <p className="text-xs text-slate-400">
                  {inq.branch.name} · {formatDate(inq.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Branch Enrollment */}
        <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-navy">Branch Enrollment</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {branchEnrollment.map((b) => {
              const pct = b.cap > 0 ? Math.round((b.count / b.cap) * 100) : 0;
              return (
                <div key={b.name} className="px-5 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-700">{b.name}</p>
                    <span className="text-xs text-slate-500">
                      {b.count}/{b.cap}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-royal"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-xs text-slate-400">{pct}% capacity</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
