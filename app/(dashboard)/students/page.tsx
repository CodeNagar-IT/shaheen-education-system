import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { AnalyticsCards } from "@/components/dashboard/analytics-cards";
import Link from "next/link";
import { Users } from "lucide-react";

export const metadata = { title: "Students | SES Portal" };

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "ACTIVE"
      ? "bg-green-100 text-green-700"
      : status === "INACTIVE"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: { search?: string; branch?: string };
}) {
  const user = await requireUser();
  const scope = branchScope(user);

  const search = searchParams.search?.trim() ?? "";
  const branchFilter = searchParams.branch ?? "";

  const where = {
    ...scope,
    ...(branchFilter ? { branchId: branchFilter } : {}),
    ...(search
      ? {
          OR: [
            { firstName: { contains: search } },
            { lastName: { contains: search } },
            { rollNumber: { contains: search } },
          ],
        }
      : {}),
  };

  const [students, totalStudents, activeStudents, maleCount, femaleCount, branches] =
    await Promise.all([
      prisma.student.findMany({
        where,
        include: { branch: true },
        orderBy: [{ className: "asc" }, { rollNumber: "asc" }],
      }),
      prisma.student.count({ where: { ...scope } }),
      prisma.student.count({ where: { ...scope, status: "ACTIVE" } }),
      prisma.student.count({ where: { ...scope, gender: "Male" } }),
      prisma.student.count({ where: { ...scope, gender: "Female" } }),
      prisma.branch.findMany({ orderBy: { name: "asc" } }),
    ]);

  const cards = [
    { label: "Total Students", value: String(totalStudents), icon: Users, tone: "navy" as const },
    { label: "Active Students", value: String(activeStudents), icon: Users, tone: "royal" as const },
    { label: "Male", value: String(maleCount), icon: Users, tone: "navy" as const },
    { label: "Female", value: String(femaleCount), icon: Users, tone: "gold" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-navy">Student Directory</h1>
          <p className="mt-1 text-sm text-slate-500">{students.length} students shown</p>
        </div>
        <Link
          href="/students/new"
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy/90"
        >
          + Add Student
        </Link>
      </div>

      <AnalyticsCards items={cards} />

      {/* Filters */}
      <form method="GET" className="flex flex-wrap gap-3">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search name or roll no…"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-royal"
        />
        {user.role === "SUPER_ADMIN" && (
          <select
            name="branch"
            defaultValue={branchFilter}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-royal"
          >
            <option value="">All Branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        )}
        <button
          type="submit"
          className="rounded-lg bg-royal px-4 py-2 text-sm font-medium text-white hover:bg-royal/90"
        >
          Filter
        </button>
        {(search || branchFilter) && (
          <Link
            href="/students"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Clear
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Roll No</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Section</th>
              <th className="px-4 py-3 text-left">Guardian Phone</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  No students found.
                </td>
              </tr>
            )}
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{s.rollNumber}</td>
                <td className="px-4 py-3 font-medium text-slate-800">
                  {s.firstName} {s.lastName}
                </td>
                <td className="px-4 py-3 text-slate-600">{s.className}</td>
                <td className="px-4 py-3 text-slate-600">{s.section}</td>
                <td className="px-4 py-3 text-slate-600">{s.guardianPhone}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/students/${s.id}`}
                      className="rounded bg-navy/10 px-2 py-1 text-xs font-medium text-navy hover:bg-navy/20"
                    >
                      View
                    </Link>
                    <Link
                      href={`/students/${s.id}/edit`}
                      className="rounded bg-royal/10 px-2 py-1 text-xs font-medium text-royal hover:bg-royal/20"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
