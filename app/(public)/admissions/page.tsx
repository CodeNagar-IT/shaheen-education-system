export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { AdmissionForm } from "@/components/public/admission-form";
import { prisma } from "@/lib/db";
import { school } from "@/lib/school";

export const metadata: Metadata = { title: "Admissions" };

const fallbackBranches = [
  {
    id: "main-branch",
    code: "SES-MAIN",
    name: school.mainBranch.name,
    address: school.mainBranch.address,
    city: school.mainBranch.city,
    phone: school.mainBranch.phone,
    email: school.mainBranch.email,
    whatsapp: school.mainBranch.whatsapp,
    mapUrl: school.mainBranch.mapUrl,
    isMain: true,
    established: school.established,
    principal: "Mrs. Farzana Bibi",
    studentCap: 650,
  },
];

export default async function AdmissionsPage() {
  let branches: any[] = [];
  try {
    branches = await prisma.branch.findMany({ orderBy: { isMain: "desc" } });
  } catch (error) {
    console.warn("Database query skipped for admissions:", error);
  }

  const displayBranches = branches.length > 0 ? branches : fallbackBranches;

  return (
    <div>
      <div className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Join Shaheen</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">Online admissions</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Apply to Main Campus or register interest for a prospective branch. Track your file with a unique code.
            Admission tests for Classes 3–10 are scheduled after document review.
          </p>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {[
            { step: "01", title: "Submit", body: "Complete the form and upload B-Form or last result card." },
            { step: "02", title: "Review", body: "Campus office verifies documents and issues a test/interview slot." },
            { step: "03", title: "Enrol", body: "Fee challan is generated in the portal once the seat is offered." },
          ].map((s) => (
            <div key={s.step} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="font-serif text-3xl text-gold">{s.step}</p>
              <h2 className="mt-2 font-semibold text-navy">{s.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
        <AdmissionForm branches={displayBranches} />
      </section>
    </div>
  );
}
