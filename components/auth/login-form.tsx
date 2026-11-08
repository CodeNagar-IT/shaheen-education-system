"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const demos = [
  { role: "Super Admin", email: "superadmin@shaheen.edu.pk", password: "Admin@123" },
  { role: "Branch Admin", email: "admin.main@shaheen.edu.pk", password: "Admin@123" },
  { role: "Teacher", email: "teacher@shaheen.edu.pk", password: "Teacher@123" },
  { role: "Parent", email: "parent@shaheen.edu.pk", password: "Parent@123" },
];

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("superadmin@shaheen.edu.pk");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    setPending(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push(params.get("callbackUrl") || "/admin");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
      <h1 className="font-serif text-3xl text-navy">Portal sign in</h1>
      <p className="mt-1 text-sm text-slate-600">Staff, teachers and parents use role-based credentials.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in…" : "Enter dashboard"}
        </Button>
      </form>
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Demo accounts</p>
        <ul className="mt-2 space-y-2">
          {demos.map((d) => (
            <li key={d.email}>
              <button
                type="button"
                onClick={() => {
                  setEmail(d.email);
                  setPassword(d.password);
                }}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-left text-xs hover:bg-slate-50"
              >
                <span className="font-semibold text-navy">{d.role}</span>
                <span className="block text-slate-500">{d.email}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
