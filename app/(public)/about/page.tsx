export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { school } from "@/lib/school";
import { prisma } from "@/lib/db";
import { Quote } from "lucide-react";

export const metadata: Metadata = { title: "About & Director's Message" };

const defaultFaculty = [
  {
    id: "f1",
    name: "Prof. Dr. Khalid Mahmood",
    title: "Director & Principal",
    subject: "Educational Leadership",
    bio: "Over 20 years leading academic institutions, fostering science research and character building.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "f2",
    name: "Mrs. Farzana Bibi",
    title: "Headmistress",
    subject: "Languages & Humanities",
    bio: "Dedicated pedagogical expert overseeing primary and secondary school pastoral care.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "f3",
    name: "Sir Ahmed Raza",
    title: "Senior Science Master",
    subject: "Physics & Mathematics",
    bio: "Specialist in STEM pedagogy and BISE matriculation board preparation.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
];

export default async function AboutPage() {
  let faculty: any[] = [];
  try {
    faculty = await prisma.faculty.findMany();
  } catch (error) {
    console.warn("Database query skipped for faculty:", error);
  }

  const displayFaculty = faculty.length > 0 ? faculty : defaultFaculty;

  return (
    <div>
      <div className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our story</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">About Shaheen Education System</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Founded in {school.established} at {school.mainBranch.address}. We operate a multi-branch model so every
            future campus inherits the same academic framework, unique branch ID, and independent student register.
          </p>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-navy">Vision</h2>
          <p className="mt-3 leading-relaxed text-slate-600">{school.vision}</p>
          <h2 className="mt-8 font-serif text-3xl text-navy">Mission</h2>
          <p className="mt-3 leading-relaxed text-slate-600">{school.mission}</p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <Quote className="h-8 w-8 text-gold" />
          <h2 className="mt-4 font-serif text-3xl text-navy">Director&apos;s message</h2>
          <p className="mt-4 leading-relaxed text-slate-700">{school.director.message}</p>
          <p className="mt-6 font-semibold text-navy">{school.director.name}</p>
          <p className="text-sm text-royal">{school.director.title}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl text-navy">Core values</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {school.coreValues.map((v) => (
              <div key={v.title} className="rounded-xl border border-slate-200 p-6">
                <div className="mb-3 h-1 w-12 bg-gold" />
                <h3 className="font-semibold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-serif text-3xl text-navy">Faculty showcase</h2>
        <p className="mt-2 text-slate-600">Subject specialists and pastoral leaders of the Main Campus.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayFaculty.map((f) => (
            <article key={f.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.imageUrl} alt={f.name} className="h-52 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-semibold text-navy">{f.name}</h3>
                <p className="text-sm text-royal">{f.title}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{f.subject}</p>
                <p className="mt-3 text-sm text-slate-600">{f.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
