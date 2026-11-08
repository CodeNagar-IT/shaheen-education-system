"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function submitInquiry(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const childAge = String(formData.get("childAge") ?? "").trim() || null;
  const classInterest = String(formData.get("classInterest") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();
  const branchId = String(formData.get("branchId") ?? "");

  if (!name || !phone || !message || !branchId) {
    return { ok: false, error: "Please complete name, phone, campus and message." };
  }

  await prisma.inquiry.create({
    data: { name, phone, email, childAge, classInterest, message, branchId },
  });

  revalidatePath("/inquiries");
  revalidatePath("/contact");
  return { ok: true };
}

export async function updateInquiryStatus(id: string, status: string) {
  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/inquiries");
}
