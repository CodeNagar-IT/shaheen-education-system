"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Megaphone, Bell, Calendar, ArrowRight, Sparkles } from "lucide-react";

type Notice = {
  id: string;
  title: string;
  body: string;
  category: string;
  publishedAt: Date;
};

export function NoticeBoard({ notices }: { notices: Notice[] }) {
  return (
    <aside className="relative rounded-2xl border border-cyan-500/20 bg-slate-900/90 backdrop-blur-xl shadow-xl overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-cyan-500/15 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-5 py-4 text-white">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
            <Megaphone className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-serif text-base font-bold text-white tracking-wide">
              Official Notice Board
            </h2>
            <p className="text-[10px] font-mono text-cyan-400">Live Academic Dispatches</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active
        </span>
      </div>

      {/* List */}
      <ul className="divide-y divide-white/5">
        {notices.map((n, index) => (
          <li
            key={n.id}
            className="group relative p-4 transition-all duration-200 hover:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                <Sparkles className="h-2.5 w-2.5" />
                {n.category}
              </span>
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Calendar className="h-3 w-3 text-slate-500" />
                {formatDate(n.publishedAt)}
              </span>
            </div>

            <p className="font-semibold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
              {n.title}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-slate-400 leading-relaxed">
              {n.body}
            </p>
          </li>
        ))}
      </ul>

      {/* Footer Link */}
      <div className="border-t border-cyan-500/15 bg-slate-950/60 px-5 py-3 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-mono">Archive & Circulars</span>
        <Link
          href="/academics"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition group"
        >
          <span>Syllabus & Downloads</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </aside>
  );
}