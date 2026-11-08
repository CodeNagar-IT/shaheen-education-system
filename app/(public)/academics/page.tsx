export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { curriculumLevels, school } from "@/lib/school";
import {
  BookOpen,
  Calendar,
  Download,
  FileText,
  GraduationCap,
  Library,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Academics — Shaheen Education System",
  description:
    "Curriculum overview, date sheets, academic calendar, and fee structure for Shaheen Education System.",
};

const resourceTypeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  DateSheet: FileText,
  Notes: BookOpen,
  PastPaper: Library,
  Syllabus: GraduationCap,
};

const feeRows = [
  { level: "Montessori (Playgroup – KG)", tuition: "Rs 3,500", lab: "—", exam: "Rs 500" },
  { level: "Primary (Class 1 – 5)", tuition: "Rs 4,500 – 5,500", lab: "Rs 300", exam: "Rs 600" },
  { level: "Middle (Class 6 – 8)", tuition: "Rs 6,500 – 7,200", lab: "Rs 500", exam: "Rs 800" },
  { level: "Secondary / Matric (Class 9 – 10)", tuition: "Rs 8,000 – 8,500", lab: "Rs 700", exam: "Rs 1,000" },
  { level: "College / Intermediate (Year 11 – 12)", tuition: "Rs 9,000 – 10,000", lab: "Rs 1,000", exam: "Rs 1,200" },
];

const calendarEvents = [
  { month: "Sep 2026", label: "Term 1 Begins", color: "bg-royal", detail: "Classes commence for all levels." },
  { month: "Oct – Nov 2026", label: "Mid-Term Examinations", color: "bg-gold", detail: "Written and practical assessments." },
  { month: "Dec 2026 – Jan 2027", label: "Winter Break", color: "bg-slate-400", detail: "Campus closed. Result cards issued." },
  { month: "Feb 2027", label: "Term 2 Begins", color: "bg-royal", detail: "Annual sports week in second fortnight." },
  { month: "Apr – May 2027", label: "Board Exams (Matric & FSc)", color: "bg-gold", detail: "BISE-scheduled examinations." },
  { month: "Jun – Aug 2027", label: "Summer Break", color: "bg-slate-400", detail: "Campus closed. Enrolment for next year opens." },
];

export default async function AcademicsPage() {
  let academicResources: any[] = [];
  try {
    academicResources = await prisma.academicResource.findMany({
      orderBy: { academicYear: "desc" },
    });
  } catch (error) {
    console.warn("Database query skipped for academic resources:", error);
  }

  return (
    <div>
      <div className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Curriculum & Resources</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">Academic resource center</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            From early Montessori phonetics to BISE board exam masterclasses, explore our structured syllabus, annual
            calendar, and official fee schedule.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-royal">Framework</p>
            <h2 className="mt-2 font-serif text-3xl text-navy">Curriculum levels</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {curriculumLevels.map((lvl) => (
            <div key={lvl.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-block rounded bg-royal/10 px-2.5 py-1 text-xs font-semibold text-royal">
                {lvl.ages}
              </span>
              <h3 className="mt-3 font-serif text-2xl text-navy">{lvl.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{lvl.summary}</p>
              <div className="mt-4 border-t border-slate-100 pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Key Subjects</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {lvl.subjects.map((s) => (
                    <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-royal" />
            <h2 className="font-serif text-3xl text-navy">Downloads & date sheets</h2>
          </div>
          <p className="mt-2 text-slate-600">Official syllabi, date sheets, and academic documents for session 2026-27.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {academicResources.length === 0 ? (
              <div className="col-span-3 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                Official date sheets and syllabus guides will be published prior to each examination cycle.
              </div>
            ) : (
              academicResources.map((res) => {
                const Icon = resourceTypeIcon[res.type] ?? FileText;
                return (
                  <div key={res.id} className="flex items-start gap-4 rounded-xl border border-slate-200 p-5 hover:border-royal/40">
                    <div className="rounded-lg bg-royal/10 p-3 text-royal">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy">{res.title}</h3>
                      <p className="text-xs text-slate-500">{res.type} {res.className ? `• ${res.className}` : ""}</p>
                      <a href={res.fileUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-royal hover:underline">
                        <Download className="h-3.5 w-3.5" /> Download PDF
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-royal" />
          <h2 className="font-serif text-3xl text-navy">Academic calendar 2026-27</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calendarEvents.map((evt) => (
            <div key={evt.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold text-white ${evt.color}`}>
                {evt.month}
              </span>
              <h3 className="mt-2 font-semibold text-navy">{evt.label}</h3>
              <p className="mt-1 text-xs text-slate-600">{evt.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl text-navy">Approved fee structure</h2>
          <p className="mt-2 text-slate-600">Standard monthly fee schedule per learner across branches.</p>
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Level / Class</th>
                  <th className="px-6 py-4">Monthly Tuition</th>
                  <th className="px-6 py-4">Lab / IT Fund</th>
                  <th className="px-6 py-4">Annual Exam Fund</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feeRows.map((r) => (
                  <tr key={r.level} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-navy">{r.level}</td>
                    <td className="px-6 py-4 font-mono font-semibold text-royal">{r.tuition}</td>
                    <td className="px-6 py-4 text-slate-600">{r.lab}</td>
                    <td className="px-6 py-4 text-slate-600">{r.exam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
