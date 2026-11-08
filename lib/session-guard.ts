import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  return session.user;
}

export async function requireStaff() {
  const user = await requireUser();
  if (!["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER"].includes(user.role)) {
    redirect("/admin");
  }
  return user;
}

export function branchScope(user: { role: string; branchId: string | null }) {
  if (user.role === "SUPER_ADMIN") return {};
  if (user.branchId) return { branchId: user.branchId };
  return { branchId: "__none__" };
}
