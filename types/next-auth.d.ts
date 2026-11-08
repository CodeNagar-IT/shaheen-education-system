import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      branchId: string | null;
      branchName: string | null;
      studentId: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    branchId?: string | null;
    branchName?: string | null;
    studentId?: string | null;
  }
}
