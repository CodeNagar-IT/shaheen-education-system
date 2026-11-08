"use client";

import React from "react";
import Link from "next/link";
import { formatLongDate } from "@/lib/utils";
import { Emblem } from "@/components/public/emblem";
import { Printer, ArrowLeft } from "lucide-react";

interface ReportCardProps {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    rollNumber: string;
    admissionNo: string;
    className: string;
    section: string;
    guardianName: string;
    branch: {
      name: string;
      code: string;
      address: string;
      phone: string;
    };
  };
  exam: {
    id: string;
    name: string;
    term: string;
    academicYear: string;
  };
  results: Array<{
    id: string;
    subject: string;
    marks: number;
    maxMarks: number;
    grade: string;
    remarks: string | null;
  }>;
}

export function ReportCardTemplate({ student, exam, results }: ReportCardProps) {
  const totalObtained = results.reduce((acc, r) => acc + r.marks, 0);
  const totalMax = results.reduce((acc, r) => acc + r.maxMarks, 0);
  const overallPct = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;

  function calculateOverallGrade(pct: number) {
    if (pct >= 90) return "A+";
    if (pct >= 80) return "A";
    if (pct >= 70) return "B";
    if (pct >= 60) return "C";
    if (pct >= 50) return "D";
    return "F";
  }

  const overallGrade = calculateOverallGrade(overallPct);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Action Header - hidden during print */}
      <div className="no-print flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/results"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-lg font-bold text-navy">Academic Report Card</h1>
            <p className="text-xs text-slate-500">
              {student.firstName} {student.lastName} ({student.className}) • {exam.name}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90 shadow transition"
        >
          <Printer className="h-4 w-4" /> Print Report Card
        </button>
      </div>

      {/* Official Report Card Printable Document */}
      <div className="print-sheet bg-white p-8 border-2 border-slate-300 rounded-2xl shadow-md text-slate-900 text-sm">
        {/* Certificate Border Header */}
        <div className="border-b-2 border-navy pb-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Emblem className="h-16 w-16 text-navy" />
              <div>
                <h1 className="font-serif text-2xl font-bold tracking-tight text-navy uppercase">
                  Shaheen Education System
                </h1>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                  Excellence in Learning & Character Development
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {student.branch.name} • {student.branch.address} • Ph: {student.branch.phone}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block rounded border border-navy/20 bg-slate-50 px-3 py-1 font-mono text-xs font-bold text-navy">
                BRANCH: {student.branch.code}
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Session: <strong>{exam.academicYear}</strong>
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="inline-block bg-navy text-gold px-6 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider">
              {exam.name} — Progress Report
            </span>
          </div>
        </div>

        {/* Student Biodata Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-500 font-medium">Student Name</p>
              <p className="font-bold text-navy text-sm">
                {student.firstName} {student.lastName}
              </p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Father / Guardian</p>
              <p className="font-semibold text-slate-800">{student.guardianName}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Class & Section</p>
              <p className="font-bold text-navy">
                {student.className} ({student.section})
              </p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Roll No / Reg #</p>
              <p className="font-mono font-bold text-royal">
                Roll: {student.rollNumber} / {student.admissionNo}
              </p>
            </div>
          </div>
        </div>

        {/* Subject-Wise Assessment Table */}
        <div className="mb-6">
          <table className="w-full border-collapse border border-slate-300 text-xs">
            <thead>
              <tr className="bg-navy text-white text-left font-semibold">
                <th className="border border-slate-300 p-2.5">Subject</th>
                <th className="border border-slate-300 p-2.5 text-center">Max Marks</th>
                <th className="border border-slate-300 p-2.5 text-center">Marks Obtained</th>
                <th className="border border-slate-300 p-2.5 text-center">Percentage</th>
                <th className="border border-slate-300 p-2.5 text-center">Grade</th>
                <th className="border border-slate-300 p-2.5">Teacher&apos;s Remarks</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={6} className="border border-slate-300 p-4 text-center text-slate-400">
                    No subject marks entered for this examination.
                  </td>
                </tr>
              ) : (
                results.map((r) => {
                  const pct = r.maxMarks > 0 ? Math.round((r.marks / r.maxMarks) * 100) : 0;
                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 font-semibold text-navy">
                        {r.subject}
                      </td>
                      <td className="border border-slate-300 p-2.5 text-center font-mono">
                        {r.maxMarks}
                      </td>
                      <td className="border border-slate-300 p-2.5 text-center font-mono font-bold text-slate-800">
                        {r.marks}
                      </td>
                      <td className="border border-slate-300 p-2.5 text-center font-mono">{pct}%</td>
                      <td className="border border-slate-300 p-2.5 text-center">
                        <span className="font-bold text-navy px-1.5 py-0.5 rounded bg-slate-100">
                          {r.grade}
                        </span>
                      </td>
                      <td className="border border-slate-300 p-2.5 text-slate-600">
                        {r.remarks || "Satisfactory"}
                      </td>
                    </tr>
                  );
                })
              )}

              {/* Total Aggregate Row */}
              <tr className="bg-slate-100 font-bold text-navy border-t-2 border-slate-400">
                <td className="border border-slate-300 p-2.5">Grand Total / Aggregate</td>
                <td className="border border-slate-300 p-2.5 text-center font-mono">{totalMax}</td>
                <td className="border border-slate-300 p-2.5 text-center font-mono text-royal">
                  {totalObtained}
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-mono">{overallPct}%</td>
                <td className="border border-slate-300 p-2.5 text-center text-emerald-700 font-extrabold text-sm">
                  {overallGrade}
                </td>
                <td className="border border-slate-300 p-2.5 text-royal font-semibold">
                  {overallGrade === "A+" || overallGrade === "A" ? "Distinction" : "Passed"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grading Scale & Legend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-[11px]">
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
            <p className="font-bold text-navy mb-1.5">Official Grading Criteria</p>
            <div className="grid grid-cols-3 gap-1 text-slate-600">
              <span>90% & Above: <strong>A+ (Outstanding)</strong></span>
              <span>80% – 89%: <strong>A (Excellent)</strong></span>
              <span>70% – 79%: <strong>B (Very Good)</strong></span>
              <span>60% – 69%: <strong>C (Good)</strong></span>
              <span>50% – 59%: <strong>D (Pass)</strong></span>
              <span>Below 50%: <strong className="text-red-600">F (Fail)</strong></span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 flex flex-col justify-between">
            <div>
              <p className="font-bold text-navy mb-1">Directorate Remarks</p>
              <p className="text-slate-600 italic">
                &ldquo;Shows keen dedication towards scientific inquiry and consistent classroom engagement. Recommended for advanced placement.&rdquo;
              </p>
            </div>
            <p className="text-right text-[10px] text-slate-400 mt-2">
              Generated on {formatLongDate(new Date())}
            </p>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-3 gap-6 text-center text-xs text-slate-600">
          <div>
            <div className="h-10 border-b border-dashed border-slate-400" />
            <p className="mt-2 font-medium">Class Teacher</p>
          </div>
          <div>
            <div className="h-10 border-b border-dashed border-slate-400 flex items-center justify-center">
              <span className="text-[10px] uppercase font-serif tracking-widest text-slate-400">
                [ Official Stamp ]
              </span>
            </div>
            <p className="mt-2 font-medium">Controller of Examinations</p>
          </div>
          <div>
            <div className="h-10 border-b border-dashed border-slate-400" />
            <p className="mt-2 font-bold text-navy">Principal / Director</p>
          </div>
        </div>
      </div>
    </div>
  );
}
