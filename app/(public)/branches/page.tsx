export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { BranchCards } from "@/components/public/branch-cards";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { school } from "@/lib/school";

export const metadata: Metadata = { title: "Campuses" };

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
    notices: [
      {
        id: "n1",
        title: "Winter Admissions Open",
        category: "Admissions",
        publishedAt: new Date(),
        body: "Registration for academic session 2026-27 is open for all grades.",
      },
    ],
  },
  {
    id: "north-branch",
    code: "SES-NORTH",
    name: "Prospective Campus — North Block",
    address: "North Sector, Chattar Road, Domail",
    city: "Domail",
    phone: "+92-300-5512346",
    email: "north@shaheen.edu.pk",
    whatsapp: "923005512346",
    mapUrl: "https://maps.google.com/?q=Chattar+Road+Domail",
    isMain: false,
    established: "2027",
    principal: "Administration",
    studentCap: 400,
    notices: [],
  },
];

export default async function BranchesPage() {
  let branches: any[] = [];
  try {
    branches = await prisma.branch.findMany({
      orderBy: { isMain: "desc" },
      include: { notices: { orderBy: { publishedAt: "desc" }, take: 3 } },
    });
  } catch (error) {
    console.warn("Database query skipped for branches:", error);
  }

  const displayBranches = branches.length > 0 ? branches : fallbackBranches;

  return (
    <div>
      <div className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Multi-branch architecture</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">Campus directory</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Each campus has a unique branch ID, its own staff and student lists, and local notices — while sharing one
            academic policy and parent portal.
          </p>
        </div>
      </div>
      <section className="mx-auto max-w-7xl space-y-10 px-4 py-16">
        <BranchCards branches={displayBranches} />
        <div className="grid gap-6 md:grid-cols-2">
          {displayBranches.map((b) => (
            <div key={b.id} className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-serif text-2xl text-navy">{b.name} notices</h2>
              <ul className="mt-4 space-y-3">
                {(!b.notices || b.notices.length === 0) && (
                  <li className="text-sm text-slate-500">No campus notices yet.</li>
                )}
                {b.notices &&
                  b.notices.map((n: any) => (
                    <li key={n.id} className="border-l-2 border-gold pl-3">
                      <p className="text-xs text-royal">
                        {n.category} • {formatDate(n.publishedAt)}
                      </p>
                      <p className="font-medium text-navy">{n.title}</p>
                      <p className="text-sm text-slate-600">{n.body}</p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
