import Link from "next/link";
import { Hero } from "@/components/public/hero";
import { NoticeBoard } from "@/components/public/notice-board";
import { BranchCards } from "@/components/public/branch-cards";
import { school, curriculumLevels } from "@/lib/school";
import { prisma } from "@/lib/db";
import { Award, BookOpen, Heart, Quote } from "lucide-react";

export default async function HomePage() {
  const [notices, branches, news, stories] = await Promise.all([
    prisma.notice.findMany({ orderBy: { publishedAt: "desc" }, take: 4 }),
    prisma.branch.findMany({ orderBy: { isMain: "desc" } }),
    prisma.newsArticle.findMany({ orderBy: { publishedAt: "desc" }, take: 3 }),
    prisma.student.findMany({
      where: { className: "Class 10" },
      take: 3,
      include: { results: true },
    }),
  ]);

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-royal">Vision & mission</p>
            <h2 className="mt-2 font-serif text-4xl text-navy">A neighbourhood school with academy standards</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{school.vision}</p>
            <p className="mt-3 text-slate-600 leading-relaxed">{school.mission}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {school.coreValues.slice(0, 3).map((v) => (
                <div key={v.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  <Heart className="h-5 w-5 text-gold" />
                  <h3 className="mt-3 font-semibold text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
          <NoticeBoard notices={notices} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-royal">Campuses</p>
              <h2 className="mt-2 font-serif text-4xl text-navy">Branch directory</h2>
            </div>
            <Link href="/branches" className="text-sm font-semibold text-royal hover:underline">
              View all campuses →
            </Link>
          </div>
          <div className="mt-8">
            <BranchCards branches={branches} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-royal">Academics</p>
        <h2 className="mt-2 font-serif text-4xl text-navy">Montessori to College</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {curriculumLevels.map((level) => (
            <Link key={level.id} href="/academics" className="rounded-xl border border-slate-200 bg-white p-6 hover:border-royal/40">
              <BookOpen className="h-5 w-5 text-gold" />
              <h3 className="mt-3 font-serif text-2xl text-navy">{level.title}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-royal">{level.ages}</p>
              <p className="mt-3 text-sm text-slate-600">{level.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <Quote className="h-10 w-10 text-gold" />
            <p className="mt-4 font-serif text-2xl leading-relaxed md:text-3xl">&ldquo;{school.director.message.slice(0, 220)}…&rdquo;</p>
            <p className="mt-6 font-semibold text-gold">{school.director.name}</p>
            <p className="text-sm text-slate-300">{school.director.title}</p>
            <Link href="/about" className="mt-6 inline-block text-sm font-semibold text-gold hover:underline">
              Read the full director&apos;s message →
            </Link>
          </div>
          <div className="rounded-2xl bg-white/5 p-8">
            <Award className="h-8 w-8 text-gold" />
            <h3 className="mt-4 font-serif text-2xl">Recent achievements</h3>
            <ul className="mt-4 space-y-3 text-slate-200">
              {news.map((n) => (
                <li key={n.id} className="border-l-2 border-gold pl-4">
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm text-slate-300">{n.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-serif text-4xl text-navy">Student success stories</h2>
        <p className="mt-2 text-slate-600">Matric science group — First Term highlights from Main Campus.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stories.map((s) => {
            const total = s.results.reduce((a, r) => a + r.marks, 0);
            const max = s.results.reduce((a, r) => a + r.maxMarks, 0) || 1;
            const pct = Math.round((total / max) * 100);
            return (
              <article key={s.id} className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="font-serif text-2xl text-navy">
                  {s.firstName} {s.lastName}
                </p>
                <p className="text-sm text-slate-500">
                  {s.className} · Roll {s.rollNumber}
                </p>
                <p className="mt-4 font-serif text-4xl text-royal">{pct}%</p>
                <p className="text-sm text-slate-600">Aggregate in First Term Examination</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
