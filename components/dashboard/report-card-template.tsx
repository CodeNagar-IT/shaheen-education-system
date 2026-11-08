"use client";

import React from "react";
import Link from "next/link";
import { formatLongDate } from "@/lib/utils";
import { Emblem } from "@/components/public/emblem";
import { Printer, ArrowLeft, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

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
      <div className="no-print flex items-center justify-between rounded-2xl border border-cyan-500/20 bg-slate-900/90 backdrop-blur-xl p-4 shadow-xl text-white">
        <div className="flex items-center gap-3">
          <Link
            href="/results"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-cyan-400 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg font-bold text-white">
                Academic Progress Certificate
              </h1>
              <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[11px] font-mono font-bold text-cyan-300 border border-cyan-500/40">
                Grade: {overallGrade} ({overallPct}%)
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {student.firstName} {student.lastName} ({student.className}-{student.section}) • {exam.name}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:brightness-110 shadow-lg shadow-cyan-500/20 transition active:scale-95"
        >
          <Printer className="h-4 w-4" /> Print Certificate
        </button>
      </div>

      {/* Official Report Card Printable Document */}
      <div className="print-sheet relative bg-white p-8 md:p-10 border-4 border-double border-slate-800 rounded-3xl shadow-2xl text-slate-900 text-sm overflow-hidden">
        {/* Subtle background watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
          <Emblem className="h-96 w-96" />
        </div>

        {/* Certificate Border Header */}
        <div className="relative z-10 border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 flex-shrink-0">
                <Emblem className="h-20 w-20" />
              </div>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase">
                  Shaheen Education System
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-red-700">
                  Muzaffarabad • Courage to Know
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {student.branch.name} • {student.branch.address} • Ph: {student.branch.phone}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-block rounded-lg border-2 border-slate-900 bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-900 shadow-sm">
                CAMPUS: {student.branch.code}
              </span>
              <p className="text-xs text-slate-600 mt-1.5 font-medium">
                Academic Session: <strong className="text-slate-900 font-mono">{exam.academicYear}</strong>
              </p>
            </div>
          </div>

          <div className="mt-5 text-center">
            <span className="inline-block bg-slate-950 text-amber-300 px-8 py-1.5 rounded-full text-xs font-serif font-black uppercase tracking-widest border border-amber-400/40 shadow">
              {exam.name} — Official Progress Transcript
            </span>
          </div>
        </div>

        {/* Student Biodata Summary */}
        <div className="relative z-10 bg-slate-50 border border-slate-300 rounded-2xl p-4 mb-6 text-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-500 font-medium uppercase text-[10px] tracking-wider">Student Name</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {student.firstName} {student.lastName}
              </p>
            </div>
            <div>
              <p className="text-slate-500 font-medium uppercase text-[10px] tracking-wider">Father / Guardian</p>
              <p className="font-semibold text-slate-800 mt-0.5">{student.guardianName}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium uppercase text-[10px] tracking-wider">Class & Section</p>
              <p className="font-bold text-slate-900 mt-0.5">
                {student.className} ({student.section})
              </p>
            </div>
            <div>
              <p className="text-slate-500 font-medium uppercase text-[10px] tracking-wider">Roll No / Reg ID</p>
              <p className="font-mono font-bold text-slate-900 mt-0.5">
                {student.rollNumber} / {student.admissionNo}
              </p>
            </div>
          </div>
        </div>

        {/* Marks Table */}
        <div className="relative z-10 overflow-hidden rounded-xl border border-slate-300 mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3 text-right">Max Marks</th>
                <th className="py-2.5 px-3 text-right">Marks Obtained</th>
                <th className="py-2.5 px-3 text-center">Grade</th>
                <th className="py-2.5 px-3">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {results.map((r, i) => (
                <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                  <td className="py-2 px-3 text-slate-500 font-sans">{i + 1}</td>
                  <td className="py-2 px-3 font-sans font-bold text-slate-900">{r.subject}</td>
                  <td className="py-2 px-3 text-right text-slate-600">{r.maxMarks}</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{r.marks}</td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-black text-xs ${
                        r.grade.startsWith("A")
                          ? "bg-emerald-100 text-emerald-800"
                          : r.grade === "B"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {r.grade}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-600 font-sans italic text-[11px]">
                    {r.remarks || "Satisfactory performance"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 border-t-2 border-slate-800 font-bold">
              <tr>
                <td colSpan={2} className="py-3 px-3 text-slate-900 uppercase font-sans">
                  Total Aggregate
                </td>
                <td className="py-3 px-3 text-right font-mono text-slate-700">{totalMax}</td>
                <td className="py-3 px-3 text-right font-mono text-base font-black text-slate-950">
                  {totalObtained}
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="inline-block bg-slate-950 text-amber-300 px-3 py-1 rounded font-black text-sm">
                    {overallGrade}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono text-xs text-slate-800 font-bold">
                  Score: {overallPct}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Grading Scale Legend */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-6 gap-2 text-[10px] text-center mb-8 border border-slate-200 rounded-xl p-2 bg-slate-50">
          <div className="p-1 rounded bg-white border border-slate-200">
            <strong className="text-emerald-700">A+</strong>: 90% - 100% (Outstanding)
          </div>
          <div className="p-1 rounded bg-white border border-slate-200">
            <strong className="text-emerald-600">A</strong>: 80% - 89% (Excellent)
          </div>
          <div className="p-1 rounded bg-white border border-slate-200">
            <strong className="text-blue-600">B</strong>: 70% - 79% (Very Good)
          </div>
          <div className="p-1 rounded bg-white border border-slate-200">
            <strong className="text-amber-600">C</strong>: 60% - 69% (Good)
          </div>
          <div className="p-1 rounded bg-white border border-slate-200">
            <strong className="text-orange-600">D</strong>: 50% - 59% (Passing)
          </div>
          <div className="p-1 rounded bg-white border border-slate-200">
            <strong className="text-red-600">F</strong>: Below 50% (Needs Improvement)
          </div>
        </div>

        {/* Signatures & Seal Section */}
        <div className="relative z-10 pt-6 border-t-2 border-slate-300 flex items-end justify-between text-xs">
          <div className="text-center">
            <div className="w-32 border-b-2 border-slate-800 mb-1" />
            <p className="font-semibold text-slate-700">Class Incharge</p>
          </div>

          {/* Official Seal Mock */}
          <div className="text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full border-2 border-dashed border-red-700 flex flex-col items-center justify-center text-red-700 font-bold text-[8px] uppercase tracking-wider p-1">
              <ShieldCheck className="h-4 w-4 mb-0.5 text-red-700" />
              <span>OFFICIAL SEAL</span>
              <span>SES AJK</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">Verified Transcript</p>
          </div>

          <div className="text-center">
            <div className="w-32 border-b-2 border-slate-800 mb-1" />
            <p className="font-semibold text-slate-700">Principal / Director</p>
          </div>
        </div>
      </div>
    </div>
  );
}