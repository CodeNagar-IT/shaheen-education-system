"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/session-guard";

export async function createStudent(formData: FormData) {
  const user = await requireStaff();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const gender = String(formData.get("gender") ?? "Male");
  const dateOfBirth = String(formData.get("dateOfBirth") ?? "");
  const className = String(formData.get("className") ?? "").trim();
  const section = String(formData.get("section") ?? "A").trim();
  const rollNumber = String(formData.get("rollNumber") ?? "").trim();
  const guardianName = String(formData.get("guardianName") ?? "").trim();
  const guardianPhone = String(formData.get("guardianPhone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const branchId = String(formData.get("branchId") ?? user.branchId ?? "");

  if (!firstName || !lastName || !dateOfBirth || !className || !rollNumber || !guardianName || !guardianPhone || !address || !branchId) {
    return { ok: false, error: "Missing required student fields." };
  }

  const count = await prisma.student.count();
  await prisma.student.create({
    data: {
      firstName,
      lastName,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      className,
      section,
      rollNumber,
      admissionNo: `ADM-${new Date().getFullYear()}-${String(count + 201).padStart(3, "0")}`,
      guardianName,
      guardianPhone,
      address,
      branchId,
      status: "ACTIVE",
    },
  });
  revalidatePath("/students");
  revalidatePath("/admin");
  return { ok: true };
}
