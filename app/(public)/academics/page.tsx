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

const resourceTypes = ["DateSheet", "Notes", "PastPaper", "Syllabus"];

export default async function AcademicsPage() {
  const academicResources = await prisma.academicResource.findMany({
    orderBy: { academicYear: "desc" },
  });

  const resourcesByType = resourceTypes.reduce<Record<string, typeof academicResources>>(
    (acc, type) => {
      acc[type] = academicResources.filter((r) => r.type === type);
      return acc;
    },
    {}
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            {school.name}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Academic Resources
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 text-lg">
            Curriculum guides, date sheets, past papers, and the full academic calendar — everything
            you need to plan the year ahead.
          </p>
        </div>
      </section>

      {/* ── Curriculum Levels ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-navy">Our Curriculum</h2>
          <p className="mt-2 text-slate-500">
            Five integrated levels from Montessori through Intermediate, all under one academic
            framework.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {curriculumLevels.map((level) => (
              <div
                key={level.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold text-royal">
                    {level.ages}
                  </span>
                  <GraduationCap className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-navy">{level.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{level.summary}</p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Classes
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{level.classes.join(" · ")}</p>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Subjects
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {level.subjects.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Date Sheets & Downloads ── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-navy">Date Sheets &amp; Downloads</h2>
          <p className="mt-2 text-slate-500">
            Official date sheets, notes, past papers, and syllabi published by the academic office.
          </p>

          {academicResources.length === 0 ? (
            <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <FileText className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-3 text-slate-500">
                No resources published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {resourceTypes.map((type) => {
                const items = resourcesByType[type];
                if (!items || items.length === 0) return null;
                const Icon = resourceTypeIcon[type] ?? FileText;
                return (
                  <div key={type} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5">
                        <Icon className="h-5 w-5 text-navy" />
                      </div>
                      <h3 className="font-semibold text-navy text-lg">{type}s</h3>
                    </div>
                    <ul className="mt-4 divide-y divide-slate-100">
                      {items.map((r) => (
                        <li key={r.id} className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{r.title}</p>
                            <p className="text-xs text-slate-500">
                              {r.className && `${r.className} · `}
                              {r.academicYear}
                            </p>
                          </div>
                          <a
                            href={r.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 rounded-md bg-royal px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy transition-colors"
                          >
                            <Download className="h-3 w-3" />
                            Download
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Academic Calendar ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-gold" />
            <h2 className="font-serif text-3xl font-bold text-navy">Academic Calendar 2026–27</h2>
          </div>
          <p className="mt-2 text-slate-500">
            Key dates for the upcoming academic session at all Shaheen campuses.
          </p>

          <div className="mt-10 relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 sm:left-8" />

            <ol className="space-y-6">
              {calendarEvents.map((event, i) => (
                <li key={i} className="relative flex gap-6 pl-16 sm:pl-20">
                  {/* Dot */}
                  <div
                    className={`absolute left-3.5 sm:left-5.5 flex h-5 w-5 items-center justify-center rounded-full ${event.color} ring-4 ring-white`}
                  />
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-gold">
                      {event.month}
                    </p>
                    <p className="mt-1 font-semibold text-navy">{event.label}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{event.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Fee Structure ── */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-white">Fee Structure</h2>
          <p className="mt-2 text-slate-400">
            Indicative monthly fees for the 2026–27 academic year. Exact amounts are confirmed at
            enrolment.
          </p>

          <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-5 py-4 font-semibold text-gold">Level</th>
                  <th className="px-5 py-4 font-semibold text-gold">Tuition / month</th>
                  <th className="px-5 py-4 font-semibold text-gold">Lab fee</th>
                  <th className="px-5 py-4 font-semibold text-gold">Exam fee</th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 transition-colors hover:bg-white/5"
                  >
                    <td className="px-5 py-4 font-medium text-white">{row.level}</td>
                    <td className="px-5 py-4 text-slate-300">{row.tuition}</td>
                    <td className="px-5 py-4 text-slate-300">{row.lab}</td>
                    <td className="px-5 py-4 text-slate-300">{row.exam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            * Fees are subject to annual revision. Lab fee applies where science practical facilities
            are used. Exam fee is charged per term. No hidden charges.
          </p>
        </div>
      </section>
    </>
  );
}
