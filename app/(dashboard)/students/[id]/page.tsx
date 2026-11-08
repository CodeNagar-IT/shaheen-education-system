import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { formatDate, formatPKR } from "@/lib/utils";
import { Emblem } from "@/components/public/emblem";
import {
  ArrowLeft,
  GraduationCap,
  CreditCard,
  ClipboardCheck,
  Award,
  Printer,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Student Profile & Digital ID — SES Portal",
};

export default async function StudentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireUser();
  const scope = branchScope(user);

  const student = await prisma.student.findFirst({
    where: {
      id: params.id,
      ...scope,
    },
    include: {
      branch: true,
      fees: {
        orderBy: { createdAt: "desc" },
      },
      attendance: {
        orderBy: { date: "desc" },
        take: 30,
      },
      results: {
        include: {
          exam: true,
        },
      },
    },
  });

  if (!student) {
    notFound();
  }

  // Calculate attendance summary
  const totalMarked = student.attendance.length;
  const presentCount = student.attendance.filter((a) => a.status === "PRESENT").length;
  const attendanceRate = totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 100;

  // Calculate academic total
  const totalMarks = student.results.reduce((acc, r) => acc + r.marks, 0);
  const maxTotal = student.results.reduce((acc, r) => acc + r.maxMarks, 0);
  const academicPct = maxTotal > 0 ? Math.round((totalMarks / maxTotal) * 100) : 0;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/students"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-navy">
              {student.firstName} {student.lastName}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Adm: {student.admissionNo} • Roll: {student.rollNumber} • {student.branch.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              student.status === "ACTIVE"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {student.status}
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Digital ID Card Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-royal" />
              Digital Student ID Card
            </h2>

            {/* Simulated Smart ID Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-navy to-royal p-6 text-white shadow-xl border border-gold/30">
              {/* Watermark Emblem */}
              <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                <Emblem className="h-48 w-48 text-white" />
              </div>

              {/* ID Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2.5">
                  <Emblem className="h-9 w-9 text-gold" />
                  <div>
                    <p className="font-serif text-xs font-bold tracking-tight text-white uppercase">
                      Shaheen Education System
                    </p>
                    <p className="text-[10px] text-gold font-medium">Student Identity Card</p>
                  </div>
                </div>
                <ShieldCheck className="h-5 w-5 text-gold" />
              </div>

              {/* Card Body */}
              <div className="mt-5 flex gap-4 items-center">
                <div className="h-24 w-20 flex-shrink-0 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center text-center p-1">
                  <GraduationCap className="h-8 w-8 text-gold mb-1" />
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold">
                    {student.gender}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="font-serif text-lg font-bold leading-tight text-white">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-xs text-gold font-semibold">
                    Class: {student.className} ({student.section})
                  </p>
                  <p className="text-xs text-slate-300 font-mono">
                    Roll No: <span className="text-white font-bold">{student.rollNumber}</span>
                  </p>
                  <p className="text-xs text-slate-300 font-mono">
                    Reg No: {student.admissionNo}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/15 grid grid-cols-2 text-[11px] gap-2">
                <div>
                  <p className="text-slate-400">Guardian</p>
                  <p className="font-semibold text-slate-100 truncate">{student.guardianName}</p>
                </div>
                <div>
                  <p className="text-slate-400">Emergency Contact</p>
                  <p className="font-semibold text-slate-100 font-mono">{student.guardianPhone}</p>
                </div>
                <div className="col-span-2 mt-1">
                  <p className="text-slate-400">Campus</p>
                  <p className="font-semibold text-gold truncate">{student.branch.name}</p>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>VALID FOR 2026-27</span>
                <span className="tracking-widest">||| | |||| | || |||| |</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500 uppercase">Attendance</p>
                <ClipboardCheck className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="mt-2 font-serif text-3xl font-bold text-navy">{attendanceRate}%</p>
              <p className="text-xs text-slate-500 mt-1">{presentCount} of {totalMarked} days present</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500 uppercase">Academics</p>
                <Award className="h-4 w-4 text-gold" />
              </div>
              <p className="mt-2 font-serif text-3xl font-bold text-navy">{academicPct}%</p>
              <p className="text-xs text-slate-500 mt-1">
                {totalMarks}/{maxTotal} aggregate
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Fees, and Results History */}
        <div className="lg:col-span-7 space-y-6">
          {/* Detailed Bio Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-navy mb-4">Biodata & Guardian Info</h2>
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <span className="text-slate-500 text-xs block">Date of Birth</span>
                <span className="font-medium text-navy">{formatDate(student.dateOfBirth)}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Blood Group</span>
                <span className="font-medium text-navy">{student.bloodGroup || "Not Provided"}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Guardian Name & Relation</span>
                <span className="font-medium text-navy">{student.guardianName} ({student.relation})</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Guardian Phone</span>
                <span className="font-medium text-navy font-mono">{student.guardianPhone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 text-xs block">Residential Address</span>
                <span className="font-medium text-navy">{student.address}</span>
              </div>
            </div>
          </div>

          {/* Academic Exam Results */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
                <Award className="h-5 w-5 text-gold" />
                Examination Records
              </h2>
            </div>

            {student.results.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No examination entries logged yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                    <tr>
                      <th className="px-4 py-2.5">Exam</th>
                      <th className="px-4 py-2.5">Subject</th>
                      <th className="px-4 py-2.5">Marks</th>
                      <th className="px-4 py-2.5">Grade</th>
                      <th className="px-4 py-2.5">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.results.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-medium text-navy text-xs">{r.exam.name}</td>
                        <td className="px-4 py-2.5 text-slate-700">{r.subject}</td>
                        <td className="px-4 py-2.5 font-mono text-slate-800">
                          {r.marks} / {r.maxMarks}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="rounded bg-navy/10 px-2 py-0.5 text-xs font-bold text-navy">
                            {r.grade}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-slate-500">{r.remarks || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Fee Billing Records */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-royal" />
                Fee Challans & History
              </h2>
              <Link href="/fees" className="text-xs text-royal hover:underline font-medium">
                Manage Invoices
              </Link>
            </div>

            {student.fees.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No fee invoices issued yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                    <tr>
                      <th className="px-4 py-2.5">Challan No</th>
                      <th className="px-4 py-2.5">Billing Month</th>
                      <th className="px-4 py-2.5">Amount</th>
                      <th className="px-4 py-2.5">Status</th>
                      <th className="px-4 py-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.fees.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-mono text-xs font-semibold text-slate-700">
                          {inv.challanNo}
                        </td>
                        <td className="px-4 py-2.5 text-slate-700">{inv.month}</td>
                        <td className="px-4 py-2.5 font-semibold text-navy">
                          {formatPKR(inv.amount)}
                        </td>
                        <td className="px-4 py-2.5">
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
                        <td className="px-4 py-2.5 text-right">
                          <Link
                            href={`/fees/${inv.id}`}
                            className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                          >
                            <Printer className="h-3 w-3" /> View Voucher
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
