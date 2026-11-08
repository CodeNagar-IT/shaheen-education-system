import type { Metadata } from "next";
import Link from "next/link";
import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { AnalyticsCards } from "@/components/dashboard/analytics-cards";
import { formatPKR, formatDate } from "@/lib/utils";
import { generateMonthlyChallans, markFeePaid } from "@/app/actions/fees";
import {
  Wallet,
  AlertCircle,
  FileText,
  Printer,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fee Management & Recovery — SES Portal",
};

export default async function FeesPage({
  searchParams,
}: {
  searchParams: { month?: string; status?: string; branchId?: string };
}) {
  const user = await requireUser();
  const scope = branchScope(user);

  const monthFilter = searchParams.month;
  const statusFilter = searchParams.status;
  const branchFilter = searchParams.branchId;

  const where = {
    ...(monthFilter ? { month: monthFilter } : {}),
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(branchFilter && user.role === "SUPER_ADMIN"
      ? { student: { branchId: branchFilter } }
      : scope.branchId
      ? { student: { branchId: scope.branchId } }
      : {}),
  };

  const [invoices, paidSum, pendingSum, totalCount, overdueCount, branches] =
    await Promise.all([
      prisma.feeInvoice.findMany({
        where,
        include: {
          student: {
            include: {
              branch: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      prisma.feeInvoice.aggregate({
        _sum: { amount: true },
        where: {
          status: "PAID",
          ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
        },
      }),
      prisma.feeInvoice.aggregate({
        _sum: { amount: true },
        where: {
          status: "PENDING",
          ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
        },
      }),
      prisma.feeInvoice.count({
        where: {
          ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
        },
      }),
      prisma.feeInvoice.count({
        where: {
          status: "OVERDUE",
          ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
        },
      }),
      prisma.branch.findMany({
        orderBy: { isMain: "desc" },
      }),
    ]);

  const totalCollected = paidSum._sum.amount ?? 0;
  const totalPending = pendingSum._sum.amount ?? 0;
  const overallBilled = totalCollected + totalPending;
  const recoveryRate = overallBilled > 0 ? Math.round((totalCollected / overallBilled) * 100) : 0;

  const cards = [
    {
      label: "Total Fee Recovery",
      value: formatPKR(totalCollected),
      hint: `${recoveryRate}% overall collection rate`,
      icon: Wallet,
      tone: "gold" as const,
    },
    {
      label: "Pending Receivables",
      value: formatPKR(totalPending),
      hint: "Unpaid active vouchers",
      icon: AlertCircle,
      tone: "royal" as const,
    },
    {
      label: "Vouchers Issued",
      value: String(totalCount),
      hint: "Across all billing cycles",
      icon: FileText,
      tone: "navy" as const,
    },
    {
      label: "Overdue Notices",
      value: String(overdueCount),
      hint: "Requires follow-up calls",
      icon: AlertCircle,
      tone: "navy" as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">
            Financial & Fee Tracking
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Automated fee challan generation, payment tracking, and printable bank vouchers.
          </p>
        </div>
      </div>

      <AnalyticsCards items={cards} />

      {/* Generation Bar & Filters */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Challan Generator */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-base font-bold text-navy flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-gold" />
            Bulk Challan Engine
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Issue monthly fee vouchers for active students in a single click.
          </p>

          <form
            action={async (formData) => {
              "use server";
              await generateMonthlyChallans(formData);
            }}
            className="space-y-3 text-xs"
          >
            <div>
              <label className="block text-slate-700 font-medium mb-1">Billing Month</label>
              <input
                name="month"
                defaultValue="November-2026"
                required
                className="w-full rounded-md border border-slate-300 p-2 text-xs focus:ring-1 focus:ring-royal"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                defaultValue="2026-11-15"
                required
                className="w-full rounded-md border border-slate-300 p-2 text-xs focus:ring-1 focus:ring-royal"
              />
            </div>
            <input type="hidden" name="academicYear" value="2026-27" />

            <button
              type="submit"
              className="w-full rounded-lg bg-navy py-2 font-semibold text-white hover:bg-navy/90 text-xs shadow-sm transition"
            >
              Generate Monthly Challans
            </button>
          </form>
        </div>

        {/* Filter controls */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-base font-bold text-navy mb-2">Filter Records</h2>
            <p className="text-xs text-slate-500 mb-4">Filter fee ledger by billing status or campus.</p>
          </div>

          <form method="GET" className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
              <select
                name="status"
                defaultValue={statusFilter || ""}
                className="w-full rounded-md border border-slate-300 p-2 text-xs"
              >
                <option value="">All Statuses</option>
                <option value="PAID">PAID</option>
                <option value="PENDING">PENDING</option>
                <option value="OVERDUE">OVERDUE</option>
              </select>
            </div>

            {user.role === "SUPER_ADMIN" && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Campus</label>
                <select
                  name="branchId"
                  defaultValue={branchFilter || ""}
                  className="w-full rounded-md border border-slate-300 p-2 text-xs"
                >
                  <option value="">All Campuses</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-royal py-2 font-semibold text-white text-xs hover:bg-blue-700 transition"
              >
                Apply Filter
              </button>
              <Link
                href="/fees"
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
              >
                Reset
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-serif text-lg font-bold text-navy">Fee Vouchers Ledger</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3">Challan #</th>
                <th className="px-5 py-3">Student & Roll</th>
                <th className="px-5 py-3">Class</th>
                <th className="px-5 py-3">Month</th>
                <th className="px-5 py-3">Total Payable</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-slate-400">
                    No fee invoices found. Click &quot;Generate Monthly Challans&quot; above to issue vouchers.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-navy">
                      {inv.challanNo}
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-navy text-sm">
                        {inv.student.firstName} {inv.student.lastName}
                      </p>
                      <p className="text-xs text-slate-400">Roll: {inv.student.rollNumber}</p>
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-600">
                      {inv.student.className} ({inv.student.section})
                    </td>
                    <td className="px-5 py-3 text-xs font-medium text-slate-700">
                      {inv.month}
                    </td>
                    <td className="px-5 py-3 font-mono font-semibold text-navy">
                      {formatPKR(inv.amount)}
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500">
                      {formatDate(inv.dueDate)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          inv.status === "PAID"
                            ? "bg-emerald-100 text-emerald-800"
                            : inv.status === "OVERDUE"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inv.status !== "PAID" && (
                          <form
                            action={async () => {
                              "use server";
                              await markFeePaid(inv.id);
                            }}
                          >
                            <button
                              type="submit"
                              className="rounded bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700 transition"
                            >
                              Mark Paid
                            </button>
                          </form>
                        )}
                        <Link
                          href={`/fees/${inv.id}`}
                          className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <Printer className="h-3 w-3" /> Voucher
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
