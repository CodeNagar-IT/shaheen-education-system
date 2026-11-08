import type { Metadata } from "next";
import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { updateApplicationStatus } from "@/app/actions/admissions";
import { ApplicationBadge } from "@/components/dashboard/status-badge";
import {
  FileText,
  CheckCircle,
  Clock,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admissions Desk & Online Applications — SES Portal",
};

export default async function ApplicationsPage() {
  const user = await requireUser();
  const scope = branchScope(user);

  const applications = await prisma.admissionApplication.findMany({
    where: scope,
    include: {
      branch: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const total = applications.length;
  const submitted = applications.filter((a) => a.status === "SUBMITTED").length;
  const underReview = applications.filter((a) => a.status === "UNDER_REVIEW").length;
  const approved = applications.filter((a) => a.status === "APPROVED").length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">
          Admissions Inbox & Applicant Review
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Review incoming prospective student applications, verify submitted documents, and update status.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Files</span>
            <FileText className="h-4 w-4 text-navy" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-navy">{total}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-600 uppercase">New Submissions</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-amber-600">{submitted}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-royal uppercase">Under Review</span>
            <FileCheck className="h-4 w-4 text-royal" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-royal">{underReview}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 uppercase">Approved / Seats Offered</span>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-emerald-600">{approved}</p>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-serif text-lg font-bold text-navy">Submitted Applications</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3">Tracking Code</th>
                <th className="px-5 py-3">Applicant & Father</th>
                <th className="px-5 py-3">Class Applied</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Campus</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-slate-400">
                    No online admission applications submitted yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-royal">
                      {app.trackingCode}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-navy text-sm">{app.applicantName}</p>
                      <p className="text-xs text-slate-400">S/D of {app.fatherName}</p>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-semibold text-slate-700">
                      {app.classApplied}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-600">
                      <p className="font-mono">{app.phone}</p>
                      {app.email && <p className="text-slate-400">{app.email}</p>}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-600">{app.branch.name}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">{formatDate(app.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <ApplicationBadge status={app.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {app.status !== "APPROVED" && (
                          <form
                            action={async () => {
                              "use server";
                              await updateApplicationStatus(app.id, "APPROVED");
                            }}
                          >
                            <button
                              type="submit"
                              className="rounded bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700 transition"
                            >
                              Approve
                            </button>
                          </form>
                        )}
                        {app.status !== "REJECTED" && (
                          <form
                            action={async () => {
                              "use server";
                              await updateApplicationStatus(app.id, "REJECTED");
                            }}
                          >
                            <button
                              type="submit"
                              className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 transition"
                            >
                              Reject
                            </button>
                          </form>
                        )}
                      </div>
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
