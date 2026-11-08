"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { trackingCode } from "@/lib/utils";

export async function submitAdmission(formData: FormData) {
  const applicantName = String(formData.get("applicantName") ?? "").trim();
  const fatherName = String(formData.get("fatherName") ?? "").trim();
  const motherName = String(formData.get("motherName") ?? "").trim() || null;
  const gender = String(formData.get("gender") ?? "").trim();
  const dob = String(formData.get("dateOfBirth") ?? "");
  const classApplied = String(formData.get("classApplied") ?? "").trim();
  const previousSchool = String(formData.get("previousSchool") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const address = String(formData.get("address") ?? "").trim();
  const cnic = String(formData.get("cnic") ?? "").trim() || null;
  const branchId = String(formData.get("branchId") ?? "");
  const file = formData.get("document") as File | null;

  if (!applicantName || !fatherName || !gender || !dob || !classApplied || !phone || !address || !branchId) {
    return { ok: false as const, error: "Please complete all required fields." };
  }

  let documentName: string | undefined;
  let documentUrl: string | undefined;
  if (file && file.size > 0) {
    const bytes = Buffer.from(await file.arrayBuffer());
    const safe = `${Date.now()}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
    const dir = path.join(process.cwd(), "public", "uploads", "admissions");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, safe), bytes);
    documentName = file.name;
    documentUrl = `/uploads/admissions/${safe}`;
  }

  const code = trackingCode();
  await prisma.admissionApplication.create({
    data: {
      trackingCode: code,
      applicantName,
      fatherName,
      motherName,
      gender,
      dateOfBirth: new Date(dob),
      classApplied,
      previousSchool,
      phone,
      email,
      address,
      cnic,
      documentName,
      documentUrl,
      branchId,
    },
  });

  revalidatePath("/applications");
  return { ok: true as const, trackingCode: code };
}

export async function trackAdmission(code: string) {
  const application = await prisma.admissionApplication.findUnique({
    where: { trackingCode: code.trim().toUpperCase() },
    include: { branch: true },
  });
  return application;
}

export async function updateApplicationStatus(id: string, status: string, notes?: string) {
  await prisma.admissionApplication.update({
    where: { id },
    data: { status, notes },
  });
  revalidatePath("/applications");
}
