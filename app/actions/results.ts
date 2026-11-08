"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { gradeFromPercent, remarksFromGrade } from "@/lib/utils";
import { requireStaff } from "@/lib/session-guard";

export async function saveMarks(formData: FormData) {
  await requireStaff();
  const examId = String(formData.get("examId") ?? "");
  const studentId = String(formData.get("studentId") ?? "");
  const subject = String(formData.get("subject") ?? "").trim();
  const marks = Number(formData.get("marks") ?? 0);
  const maxMarks = Number(formData.get("maxMarks") ?? 100);

  if (!examId || !studentId || !subject) return { ok: false, error: "Missing exam, student or subject." };

  const percent = maxMarks ? (marks / maxMarks) * 100 : 0;
  const grade = gradeFromPercent(percent);
  await prisma.result.upsert({
    where: { studentId_examId_subject: { studentId, examId, subject } },
    update: { marks, maxMarks, grade, remarks: remarksFromGrade(grade) },
    create: { studentId, examId, subject, marks, maxMarks, grade, remarks: remarksFromGrade(grade) },
  });
  revalidatePath("/results");
  return { ok: true };
}
