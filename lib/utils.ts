import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPKR(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value: Date | string, options?: Intl.DateTimeFormatOptions) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(date);
}

export function formatLongDate(value: Date | string) {
  return formatDate(value, { day: "2-digit", month: "long", year: "numeric" });
}

export function studentFullName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`.trim();
}

export function gradeFromPercent(percent: number) {
  if (percent >= 90) return "A+";
  if (percent >= 80) return "A";
  if (percent >= 70) return "B";
  if (percent >= 60) return "C";
  if (percent >= 50) return "D";
  return "F";
}

export function remarksFromGrade(grade: string) {
  const map: Record<string, string> = {
    "A+": "Outstanding",
    A: "Excellent",
    B: "Very Good",
    C: "Good",
    D: "Needs Improvement",
    F: "Fail",
  };
  return map[grade] ?? "Satisfactory";
}

export function trackingCode() {
  const year = new Date().getFullYear().toString().slice(-2);
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SES-${year}-${rand}`;
}

export function challanNumber(seq: number) {
  const year = new Date().getFullYear();
  return `CH-${year}-${String(seq).padStart(5, "0")}`;
}

export function whatsappLink(phone: string, text?: string) {
  const digits = phone.replace(/[^\d]/g, "");
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${q}`;
}
