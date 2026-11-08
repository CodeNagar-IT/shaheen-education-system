import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In — Shaheen Education System",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center text-slate-500 shadow-xl">
          Loading sign in...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
