import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
          include: { branch: true, student: true },
        });
        if (!user) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          branchId: user.branchId,
          branchName: user.branch?.name ?? null,
          studentId: user.studentId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.branchId = (user as { branchId?: string | null }).branchId;
        token.branchName = (user as { branchName?: string | null }).branchName;
        token.studentId = (user as { studentId?: string | null }).studentId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string) ?? "";
        session.user.branchId = (token.branchId as string | null) ?? null;
        session.user.branchName = (token.branchName as string | null) ?? null;
        session.user.studentId = (token.studentId as string | null) ?? null;
      }
      return session;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions);
}

export function canManageBranch(role: string) {
  return role === "SUPER_ADMIN" || role === "BRANCH_ADMIN";
}

export function isStaff(role: string) {
  return ["SUPER_ADMIN", "BRANCH_ADMIN", "TEACHER"].includes(role);
}
