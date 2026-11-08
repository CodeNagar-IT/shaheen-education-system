import type { Metadata } from "next";
import { BranchCards } from "@/components/public/branch-cards";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Campuses" };

export default async function BranchesPage() {
  const branches = await prisma.branch.findMany({
    orderBy: { isMain: "desc" },
    include: { notices: { orderBy: { publishedAt: "desc" }, take: 3 } },
  });

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
        <BranchCards branches={branches} />
        <div className="grid gap-6 md:grid-cols-2">
          {branches.map((b) => (
            <div key={b.id} className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-serif text-2xl text-navy">{b.name} notices</h2>
              <ul className="mt-4 space-y-3">
                {b.notices.length === 0 && <li className="text-sm text-slate-500">No campus notices yet.</li>}
                {b.notices.map((n) => (
                  <li key={n.id} className="border-l-2 border-gold pl-3">
                    <p className="text-xs text-royal">
                      {n.category} · {formatDate(n.publishedAt)}
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
