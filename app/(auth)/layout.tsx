import { Emblem } from "@/components/public/emblem";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 flex flex-col justify-between p-4 relative overflow-hidden">
      {/* Background Cyber Grid & Lighting Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back navigation */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-2 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition bg-slate-900/80 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Return to Public Portal
        </Link>
        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 256-bit Encrypted Session
        </span>
      </div>

      {/* Main Form Center */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
        {/* Emblem & Title */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="relative mb-3 group">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-amber-500 opacity-70 blur-md group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-slate-950 p-2 rounded-full border border-cyan-500/40 shadow-2xl">
              <Emblem className="h-20 w-20" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 mb-2">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            Muzaffarabad • AJK
          </div>

          <h1 className="font-serif text-2xl font-bold tracking-tight text-white">
            Shaheen Education System
          </h1>
          <p className="mt-1 text-xs text-slate-400 tracking-wider uppercase font-mono">
            Staff & Parent Management Portal
          </p>
        </div>

        {/* Card containing the children form */}
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-cyan-500/40 via-blue-500/20 to-transparent blur-sm pointer-events-none" />
          <div className="relative rounded-3xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
            {children}
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="relative z-10 text-center py-3 text-xs text-slate-500 font-mono">
        © 2026 Shaheen Education System Muzaffarabad. All rights reserved.
      </div>
    </div>
  );
}