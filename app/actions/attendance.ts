"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/session-guard";

export async function saveAttendance(formData: FormData) {
  const user = await requireStaff();
  const date = String(formData.get("date") ?? "");
  const className = String(formData.get("className") ?? "");
  const ids = formData.getAll("studentId").map(String);

  const day = new Date(date);
  day.setHours(0, 0, 0, 0);

  for (const id of ids) {
    const status = String(formData.get(`status-${id}`) ?? "PRESENT");
    await prisma.attendance.upsert({
      where: { studentId_date: { studentId: id, date: day } },
      update: { status, markedById: user.id },
      create: { studentId: id, date: day, status, markedById: user.id },
    });
  }

  revalidatePath("/attendance");
  return { ok: true, className };
}
