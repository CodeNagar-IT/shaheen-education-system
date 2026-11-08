"use client";

import React from "react";
import { formatPKR, formatDate } from "@/lib/utils";
import { Emblem } from "@/components/public/emblem";
import { Printer, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface VoucherProps {
  invoice: {
    id: string;
    challanNo: string;
    month: string;
    academicYear: string;
    tuition: number;
    lab: number;
    exam: number;
    other: number;
    amount: number;
    dueDate: Date | string;
    status: string;
    paidAt?: Date | string | null;
    method?: string | null;
    student: {
      firstName: string;
      lastName: string;
      rollNumber: string;
      admissionNo: string;
      className: string;
      section: string;
      guardianName: string;
      branch: {
        code: string;
        name: string;
        address: string;
        phone: string;
      };
    };
  };
}

export function VoucherTemplate({ invoice }: VoucherProps) {
  const copies = ["Bank Copy", "School Copy", "Student Copy"];
  const lateFine = 500;
  const totalAfterDue = invoice.amount + lateFine;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Action Header - hidden on print */}
      <div className="no-print flex items-center justify-between rounded-2xl border border-cyan-500/20 bg-slate-900/90 backdrop-blur-xl p-4 shadow-xl text-white">
        <div className="flex items-center gap-3">
          <Link
            href="/fees"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-cyan-400 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg font-bold text-white">
                Official Fee Challan Voucher
              </h1>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider font-mono ${
                  invoice.status === "PAID"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                }`}
              >
                {invoice.status === "PAID" && <CheckCircle2 className="h-3 w-3" />}
                {invoice.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Challan #{invoice.challanNo} • Due: {formatDate(invoice.dueDate)} • Student: {invoice.student.firstName} {invoice.student.lastName}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:brightness-110 shadow-lg shadow-cyan-500/20 transition active:scale-95"
        >
          <Printer className="h-4 w-4" /> Print 3-Copy Challan
        </button>
      </div>

      {/* 3-Copy Printable Challan Container */}
      <div className="print-sheet bg-white p-4 border border-slate-300 rounded-2xl shadow-xl text-slate-900 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3 print:gap-3">
          {copies.map((copyName, idx) => (
            <div
              key={copyName}
              className={`relative border border-slate-400 p-4 rounded-xl flex flex-col justify-between bg-white overflow-hidden ${
                idx > 0 ? "border-l-2 border-dashed border-slate-400" : ""
              }`}
            >
              {/* Subtle watermark emblem in background */}
              <div className="absolute right-0 bottom-10 opacity-5 pointer-events-none">
                <Emblem className="h-56 w-56" />
              </div>

              {/* Header */}
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 border-b-2 border-slate-800 pb-2.5 mb-2">
                  <div className="h-10 w-10 flex-shrink-0">
                    <Emblem className="h-10 w-10" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-serif font-black text-[13px] tracking-tight uppercase leading-tight text-slate-900">
                      Shaheen Education System
                    </h2>
                    <p className="text-[10px] font-bold text-red-700 tracking-wide uppercase">
                      Muzaffarabad • {invoice.student.branch.name}
                    </p>
                    <p className="text-[9px] text-slate-600 truncate">
                      {invoice.student.branch.address}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-bold uppercase mb-2">
                  <span className="text-amber-400 font-mono tracking-wide">{copyName}</span>
                  <span className="font-mono text-cyan-300">
                    CAMPUS: {invoice.student.branch.code}
                  </span>
                </div>

                <div className="text-[9.5px] bg-slate-50 border border-slate-300 p-2 rounded mb-2 leading-tight">
                  <span className="font-bold text-slate-800">Authorized Bank:</span> Askari Bank / Bank Alfalah
                  <br />
                  <span className="font-bold text-slate-800">Title:</span> Shaheen Education System Muzaffarabad
                  <br />
                  <span className="font-bold text-slate-800">A/C:</span> 0184-1005928491 (1Link 1Bill: 100928)
                </div>

                {/* Voucher Meta */}
                <table className="w-full text-[10px] mb-2.5">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-600 font-medium">Challan No:</td>
                      <td className="py-0.5 font-black font-mono text-right text-slate-900">{invoice.challanNo}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-600 font-medium">Fee Month:</td>
                      <td className="py-0.5 font-bold text-right">{invoice.month} ({invoice.academicYear})</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-600 font-medium">Admission No:</td>
                      <td className="py-0.5 font-mono font-bold text-right">{invoice.student.admissionNo}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-600 font-medium">Student Name:</td>
                      <td className="py-0.5 font-black text-right truncate text-slate-900">
                        {invoice.student.firstName} {invoice.student.lastName}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-600 font-medium">Father&apos;s Name:</td>
                      <td className="py-0.5 font-medium text-right truncate">{invoice.student.guardianName}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-600 font-medium">Class / Section:</td>
                      <td className="py-0.5 font-bold text-right">
                        {invoice.student.className} - {invoice.student.section} (Roll: {invoice.student.rollNumber})
                      </td>
                    </tr>
                    <tr className="border-b-2 border-slate-800 bg-red-50/70">
                      <td className="py-0.5 text-red-700 font-bold">Due Date:</td>
                      <td className="py-0.5 font-black text-red-700 text-right">{formatDate(invoice.dueDate)}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Fee Particulars Breakdown */}
                <table className="w-full text-[10px] border border-slate-300">
                  <thead className="bg-slate-100 border-b border-slate-300 font-bold text-slate-800">
                    <tr>
                      <th className="py-1 px-1.5 text-left">Particulars</th>
                      <th className="py-1 px-1.5 text-right">Amount (PKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    <tr>
                      <td className="py-1 px-1.5 text-slate-700 font-sans">Monthly Tuition Fee</td>
                      <td className="py-1 px-1.5 text-right font-semibold">{invoice.tuition.toLocaleString()}</td>
                    </tr>
                    {invoice.lab > 0 && (
                      <tr>
                        <td className="py-1 px-1.5 text-slate-700 font-sans">Computer & Science Lab</td>
                        <td className="py-1 px-1.5 text-right font-semibold">{invoice.lab.toLocaleString()}</td>
                      </tr>
                    )}
                    {invoice.exam > 0 && (
                      <tr>
                        <td className="py-1 px-1.5 text-slate-700 font-sans">Examination & Assessment</td>
                        <td className="py-1 px-1.5 text-right font-semibold">{invoice.exam.toLocaleString()}</td>
                      </tr>
                    )}
                    {invoice.other > 0 && (
                      <tr>
                        <td className="py-1 px-1.5 text-slate-700 font-sans">Stationery & Library</td>
                        <td className="py-1 px-1.5 text-right font-semibold">{invoice.other.toLocaleString()}</td>
                      </tr>
                    )}
                    <tr className="bg-slate-100 font-black text-slate-900 border-t-2 border-slate-800 font-mono">
                      <td className="py-1 px-1.5 font-sans font-bold">Payable Within Due Date:</td>
                      <td className="py-1 px-1.5 text-right text-xs">{formatPKR(invoice.amount)}</td>
                    </tr>
                    <tr className="text-red-700 bg-red-50 font-bold font-mono">
                      <td className="py-1 px-1.5 font-sans">After Due Date (Fine +500):</td>
                      <td className="py-1 px-1.5 text-right">{formatPKR(totalAfterDue)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Instructions and Signatures */}
              <div className="relative z-10 mt-3 pt-2 border-t border-slate-300 text-[9px] text-slate-600">
                <p className="font-semibold text-slate-800 leading-tight">
                  * Note: Fee once deposited is non-refundable. Non-payment by 15th will incur a surcharge.
                </p>
                <div className="flex justify-between items-end mt-7 pt-2 border-t border-slate-400">
                  <div className="text-center">
                    <div className="w-20 border-b border-slate-400 mb-0.5" />
                    <span>Cashier / Bank Stamp</span>
                  </div>
                  <div className="text-center">
                    <div className="w-20 border-b border-slate-400 mb-0.5" />
                    <span>Authorized Officer</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}