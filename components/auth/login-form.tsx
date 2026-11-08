"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const demos = [
  { role: "Super Admin", email: "superadmin@shaheen.edu.pk", password: "Admin@123", badge: "Executive" },
  { role: "Branch Admin", email: "admin.main@shaheen.edu.pk", password: "Admin@123", badge: "Campus Lead" },
  { role: "Teacher", email: "teacher@shaheen.edu.pk", password: "Teacher@123", badge: "Academic" },
  { role: "Parent", email: "parent@shaheen.edu.pk", password: "Parent@123", badge: "Family" },
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
      setError("Invalid credentials. Please verify your email and password.");
      return;
    }
    router.push(params.get("callbackUrl") || "/admin");
    router.refresh();
  }

  return (
    <div className="w-full text-slate-100">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
          Sign In to Portal
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Enter your authorized credentials or select a one-click demo role below.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-xs text-slate-300 font-medium">
            Email Address
          </Label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-slate-950/80 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl text-sm"
              placeholder="user@shaheen.edu.pk"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="text-xs text-slate-300 font-medium">
            Password
          </Label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-slate-950/80 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl text-sm"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-300 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl shadow-lg shadow-cyan-500/25 transition duration-200"
          disabled={pending}
        >
          {pending ? "Authenticating Session…" : (
            <span className="flex items-center justify-center gap-2">
              Authenticate & Launch <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Demo Credentials Fast Switcher */}
      <div className="mt-6 pt-5 border-t border-cyan-500/15">
        <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 mb-2.5">
          <Sparkles className="h-3 w-3" /> Quick Switch Demo Accounts:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {demos.map((d) => (
            <button
              key={d.email}
              type="button"
              onClick={() => {
                setEmail(d.email);
                setPassword(d.password);
              }}
              className="group text-left p-2.5 rounded-xl border border-cyan-500/20 bg-slate-950/50 hover:bg-cyan-950/40 hover:border-cyan-400/50 transition duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-white group-hover:text-cyan-300 transition">
                  {d.role}
                </span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 font-mono">
                  {d.badge}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">{d.email}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}