"use client";

import React from "react";
import { formatPKR, formatDate } from "@/lib/utils";
import { Emblem } from "@/components/public/emblem";
import { Printer, ArrowLeft } from "lucide-react";
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
      <div className="no-print flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/fees"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-lg font-bold text-navy">Fee Voucher / Challan</h1>
            <p className="text-xs text-slate-500 font-mono">
              Challan #{invoice.challanNo} • Status: {invoice.status}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90 shadow transition"
        >
          <Printer className="h-4 w-4" /> Print Challan
        </button>
      </div>

      {/* 3-Copy Printable Challan Container */}
      <div className="print-sheet bg-white p-4 border border-slate-300 rounded-xl shadow-sm text-slate-900 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3 print:gap-3">
          {copies.map((copyName, idx) => (
            <div
              key={copyName}
              className={`border border-slate-400 p-4 rounded flex flex-col justify-between ${
                idx > 0 ? "border-l-2 border-dashed border-slate-400" : ""
              }`}
            >
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 border-b border-slate-300 pb-2 mb-2">
                  <Emblem className="h-7 w-7 text-royal flex-shrink-0" />
                  <div className="min-w-0">
                    <h2 className="font-serif font-bold text-xs uppercase leading-tight text-navy">
                      Shaheen Education System
                    </h2>
                    <p className="text-[10px] text-slate-600 truncate">
                      {invoice.student.branch.name}
                    </p>
                    <p className="text-[9px] text-slate-500 truncate">
                      {invoice.student.branch.address}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-navy uppercase mb-2">
                  <span>{copyName}</span>
                  <span className="font-mono text-royal">
                    Branch: {invoice.student.branch.code}
                  </span>
                </div>

                <div className="text-[10px] bg-amber-50 border border-amber-200 p-1.5 rounded mb-2 leading-tight">
                  <span className="font-bold">Designated Bank:</span> Bank Alfalah / Askari Bank Ltd
                  <br />
                  <span className="font-bold">A/C Title:</span> Shaheen Education System Domail
                  <br />
                  <span className="font-bold">A/C No:</span> 0184-1005928491 (1Link Enabled)
                </div>

                {/* Voucher Meta */}
                <table className="w-full text-[10px] mb-3">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-500 font-medium">Challan No:</td>
                      <td className="py-0.5 font-bold font-mono text-right">{invoice.challanNo}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-500 font-medium">Month / Session:</td>
                      <td className="py-0.5 font-semibold text-right">{invoice.month} ({invoice.academicYear})</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-500 font-medium">Admission No:</td>
                      <td className="py-0.5 font-mono text-right">{invoice.student.admissionNo}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-500 font-medium">Student Name:</td>
                      <td className="py-0.5 font-bold text-right truncate">
                        {invoice.student.firstName} {invoice.student.lastName}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-500 font-medium">Father / Guardian:</td>
                      <td className="py-0.5 font-medium text-right truncate">{invoice.student.guardianName}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-slate-500 font-medium">Class & Section:</td>
                      <td className="py-0.5 font-semibold text-right">
                        {invoice.student.className} - {invoice.student.section} (Roll: {invoice.student.rollNumber})
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-0.5 text-red-600 font-bold">Due Date:</td>
                      <td className="py-0.5 font-bold text-red-600 text-right">{formatDate(invoice.dueDate)}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Particulars Table */}
                <table className="w-full text-[10px] border border-slate-300 mb-3">
                  <thead className="bg-slate-100 font-bold">
                    <tr>
                      <th className="border border-slate-300 p-1 text-left">Fee Particulars</th>
                      <th className="border border-slate-300 p-1 text-right">Amount (PKR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-1">Monthly Tuition Fee</td>
                      <td className="border border-slate-300 p-1 text-right font-mono">
                        {formatPKR(invoice.tuition)}
                      </td>
                    </tr>
                    {invoice.lab > 0 && (
                      <tr>
                        <td className="border border-slate-300 p-1">Science & Computer Lab</td>
                        <td className="border border-slate-300 p-1 text-right font-mono">
                          {formatPKR(invoice.lab)}
                        </td>
                      </tr>
                    )}
                    {invoice.exam > 0 && (
                      <tr>
                        <td className="border border-slate-300 p-1">Examination & Assessment</td>
                        <td className="border border-slate-300 p-1 text-right font-mono">
                          {formatPKR(invoice.exam)}
                        </td>
                      </tr>
                    )}
                    {invoice.other > 0 && (
                      <tr>
                        <td className="border border-slate-300 p-1">Library & Sports Fund</td>
                        <td className="border border-slate-300 p-1 text-right font-mono">
                          {formatPKR(invoice.other)}
                        </td>
                      </tr>
                    )}
                    <tr className="bg-slate-100 font-bold text-navy">
                      <td className="border border-slate-300 p-1">Total Within Due Date</td>
                      <td className="border border-slate-300 p-1 text-right font-mono text-royal">
                        {formatPKR(invoice.amount)}
                      </td>
                    </tr>
                    <tr className="text-red-700">
                      <td className="border border-slate-300 p-1">After Due Date (+Rs 500)</td>
                      <td className="border border-slate-300 p-1 text-right font-mono font-bold">
                        {formatPKR(totalAfterDue)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Status stamp */}
                <div className="flex items-center justify-between text-[10px] mb-4">
                  <span>
                    Status:{" "}
                    <strong
                      className={
                        invoice.status === "PAID"
                          ? "text-emerald-700"
                          : invoice.status === "OVERDUE"
                          ? "text-red-700"
                          : "text-amber-700"
                      }
                    >
                      {invoice.status}
                    </strong>
                  </span>
                  {invoice.paidAt && (
                    <span className="text-slate-500">Paid on: {formatDate(invoice.paidAt)}</span>
                  )}
                </div>
              </div>

              {/* Signatures */}
              <div className="mt-6 pt-6 border-t border-slate-300 grid grid-cols-2 gap-2 text-[9px] text-center text-slate-500">
                <div className="border-t border-dotted border-slate-400 pt-1">
                  Cashier / Bank Stamp
                </div>
                <div className="border-t border-dotted border-slate-400 pt-1">
                  Accounts Officer
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
