import type { Metadata } from "next";
import Link from "next/link";
import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { saveMarks } from "@/app/actions/results";
import {
  Printer,
  PlusCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Marks Entry & Report Cards — SES Portal",
};

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: { examId?: string; className?: string };
}) {
  const user = await requireUser();
  const scope = branchScope(user);

  const exams = await prisma.exam.findMany({
    orderBy: { academicYear: "desc" },
  });

  const selectedExamId = searchParams.examId || exams[0]?.id || "";

  // Classes list
  const classesList = await prisma.student.findMany({
    where: scope,
    select: { className: true },
    distinct: ["className"],
    orderBy: { className: "asc" },
  });

  const selectedClass = searchParams.className || classesList[0]?.className || "Class 10";

  // Students in selected class
  const students = await prisma.student.findMany({
    where: {
      ...scope,
      className: selectedClass,
      status: "ACTIVE",
    },
    include: {
      results: {
        where: selectedExamId ? { examId: selectedExamId } : {},
      },
      branch: true,
    },
    orderBy: { rollNumber: "asc" },
  });

  const subjects = [
    "English",
    "Urdu",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Pakistan Studies",
    "Islamiyat",
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">
            Examination & Grading Engine
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Log subject-wise marks, compute BISE-aligned grades, and generate automated printable report cards.
          </p>
        </div>
      </div>

      {/* Grid: Marks Entry Form + Filter */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Marks Entry Widget */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-base font-bold text-navy flex items-center gap-2 mb-1">
            <PlusCircle className="h-4 w-4 text-royal" />
            Subject Marks Entry
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Record or update individual student test score.
          </p>

          <form
            action={async (formData) => {
              "use server";
              await saveMarks(formData);
            }}
            className="space-y-3 text-xs"
          >
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Exam / Term</label>
              <select
                name="examId"
                defaultValue={selectedExamId}
                required
                className="w-full rounded-md border border-slate-300 p-2 text-xs"
              >
                {exams.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name} ({e.academicYear})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Student</label>
              <select
                name="studentId"
                required
                className="w-full rounded-md border border-slate-300 p-2 text-xs"
              >
                <option value="">Select a student...</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    Roll {s.rollNumber} - {s.firstName} {s.lastName} ({s.className})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Subject</label>
              <select
                name="subject"
                required
                className="w-full rounded-md border border-slate-300 p-2 text-xs"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Marks Obtained</label>
                <input
                  type="number"
                  name="marks"
                  step="0.5"
                  required
                  placeholder="e.g. 85"
                  className="w-full rounded-md border border-slate-300 p-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Max Marks</label>
                <input
                  type="number"
                  name="maxMarks"
                  defaultValue="100"
                  required
                  className="w-full rounded-md border border-slate-300 p-2 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-navy py-2.5 font-semibold text-white hover:bg-navy/90 text-xs shadow-sm transition"
            >
              Save Marks Entry
            </button>
          </form>
        </div>

        {/* Filters and Exam Selector */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-base font-bold text-navy mb-2">Class Examination Roster</h2>
            <p className="text-xs text-slate-500 mb-4">
              Select examination session and class to view aggregate results and print official report cards.
            </p>
          </div>

          <form method="GET" className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Active Examination</label>
              <select
                name="examId"
                defaultValue={selectedExamId}
                className="w-full rounded-md border border-slate-300 p-2 text-xs"
              >
                {exams.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Class Grade</label>
              <select
                name="className"
                defaultValue={selectedClass}
                className="w-full rounded-md border border-slate-300 p-2 text-xs"
              >
                {classesList.map((c) => (
                  <option key={c.className} value={c.className}>
                    {c.className}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-royal px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
              >
                Load Roster
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Ledger & Report Card Generator Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-navy">
              Class Results Sheet — {selectedClass}
            </h2>
            <p className="text-xs text-slate-500">
              Exam: {exams.find((e) => e.id === selectedExamId)?.name || "Session 2026-27"}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3">Roll #</th>
                <th className="px-5 py-3">Student Name</th>
                <th className="px-5 py-3">Section</th>
                <th className="px-5 py-3 text-center">Subjects Evaluated</th>
                <th className="px-5 py-3 text-center">Total Score</th>
                <th className="px-5 py-3 text-center">Aggregate %</th>
                <th className="px-5 py-3 text-right">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                    No active students enrolled in {selectedClass}.
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const totalMarks = student.results.reduce((acc, r) => acc + r.marks, 0);
                  const maxMarks = student.results.reduce((acc, r) => acc + r.maxMarks, 0);
                  const pct = maxMarks > 0 ? Math.round((totalMarks / maxMarks) * 100) : 0;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">
                        {student.rollNumber}
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-navy text-sm">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-xs text-slate-400">Adm: {student.admissionNo}</p>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 font-semibold">
                        Section {student.section}
                      </td>
                      <td className="px-5 py-3.5 text-center text-xs font-semibold text-slate-700">
                        {student.results.length} subjects
                      </td>
                      <td className="px-5 py-3.5 text-center font-mono font-bold text-navy">
                        {totalMarks} / {maxMarks}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            pct >= 80
                              ? "bg-emerald-100 text-emerald-800"
                              : pct >= 60
                              ? "bg-blue-100 text-royal"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {pct}%
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {selectedExamId ? (
                          <Link
                            href={`/results/${selectedExamId}/report-card/${student.id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy/90 transition shadow-sm"
                          >
                            <Printer className="h-3.5 w-3.5 text-gold" />
                            Print Result Sheet
                          </Link>
                        ) : (
                          <span className="text-xs text-slate-400">Select Exam</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
