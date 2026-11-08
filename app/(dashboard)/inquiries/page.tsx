import type { Metadata } from "next";
import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { formatDate, whatsappLink } from "@/lib/utils";
import { updateInquiryStatus } from "@/app/actions/inquiries";
import {
  MessageSquare,
  CheckCircle,
  Clock,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Parent Inquiries & Public Leads — SES Portal",
};

export default async function InquiriesPage() {
  const user = await requireUser();
  const scope = branchScope(user);

  const inquiries = await prisma.inquiry.findMany({
    where: scope,
    include: {
      branch: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const total = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "NEW").length;
  const respondedCount = inquiries.filter((i) => i.status === "RESPONDED").length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">
          Public Inquiries & Leads Desk
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Messages received from the website contact and admissions interest portal.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Inquiries</span>
            <MessageSquare className="h-4 w-4 text-navy" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-navy">{total}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-600 uppercase">Awaiting Response</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-amber-600">{newCount}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 uppercase">Responded</span>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-emerald-600">{respondedCount}</p>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-serif text-lg font-bold text-navy">Parent & Student Inquiries</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3">Inquirer Name</th>
                <th className="px-5 py-3">Phone & Direct Contact</th>
                <th className="px-5 py-3">Interest / Age</th>
                <th className="px-5 py-3">Message</th>
                <th className="px-5 py-3">Campus</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-slate-400">
                    No inquiries recorded.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5 font-medium text-navy">
                      {inq.name}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{inq.phone}</span>
                        <a
                          href={whatsappLink(inq.phone, `Assalam-o-Alaikum ${inq.name}, regarding your inquiry with Shaheen Education System:`)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-600 hover:text-emerald-700"
                          title="Message on WhatsApp"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                      </div>
                      {inq.email && <p className="text-slate-400 mt-0.5">{inq.email}</p>}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-700">
                      {inq.classInterest || "General Inquiry"}
                      {inq.childAge && <span className="text-slate-400"> (Age: {inq.childAge})</span>}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-600 max-w-xs truncate" title={inq.message}>
                      {inq.message}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-600">{inq.branch.name}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">{formatDate(inq.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          inq.status === "RESPONDED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {inq.status !== "RESPONDED" && (
                        <form
                          action={async () => {
                            "use server";
                            await updateInquiryStatus(inq.id, "RESPONDED");
                          }}
                        >
                          <button
                            type="submit"
                            className="rounded bg-navy px-2.5 py-1 text-xs font-semibold text-white hover:bg-navy/90 transition"
                          >
                            Mark Handled
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
