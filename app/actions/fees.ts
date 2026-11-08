"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/session-guard";

export async function generateMonthlyChallans(formData: FormData) {
  await requireStaff();
  const month = String(formData.get("month") ?? "").trim();
  const academicYear = String(formData.get("academicYear") ?? "2026-27");
  const dueDate = String(formData.get("dueDate") ?? "");
  const className = String(formData.get("className") ?? "");
  const branchId = String(formData.get("branchId") ?? "");

  if (!month || !dueDate) return { ok: false, error: "Month and due date are required." };

  const students = await prisma.student.findMany({
    where: {
      status: "ACTIVE",
      ...(className ? { className } : {}),
      ...(branchId ? { branchId } : {}),
    },
  });

  const existing = await prisma.feeInvoice.count();
  let seq = existing + 1;
  for (const student of students) {
    const already = await prisma.feeInvoice.findFirst({
      where: { studentId: student.id, month },
    });
    if (already) continue;
    const tuition = student.className.includes("10") ? 8500 : student.className.includes("8") ? 7200 : 5500;
    const lab = student.className.includes("10") || student.className.includes("8") ? 800 : 0;
    await prisma.feeInvoice.create({
      data: {
        challanNo: `CH-${new Date().getFullYear()}-${String(seq).padStart(5, "0")}`,
        studentId: student.id,
        month,
        academicYear,
        tuition,
        lab,
        exam: 0,
        other: 0,
        amount: tuition + lab,
        dueDate: new Date(dueDate),
        status: "PENDING",
      },
    });
    seq += 1;
  }

  revalidatePath("/fees");
  return { ok: true, generated: students.length };
}

export async function markFeePaid(id: string) {
  await requireStaff();
  const invoice = await prisma.feeInvoice.findUnique({ where: { id } });
  if (!invoice) return;
  await prisma.feeInvoice.update({
    where: { id },
    data: {
      status: "PAID",
      paidAt: new Date(),
      method: "Cash / Bank",
      receiptNo: invoice.receiptNo ?? `RCT-${invoice.challanNo.replace("CH-", "")}`,
    },
  });
  revalidatePath("/fees");
}
