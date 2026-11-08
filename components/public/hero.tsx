"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  Users,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Activity,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Emblem } from "@/components/public/emblem";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"parent" | "teacher" | "admin">("admin");

  return (
    <section className="relative overflow-hidden cyber-bg text-white py-16 lg:py-24 border-b border-white/10">
      {/* Cyber Grid & Ambient Glow Orbs */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 -right-40 h-[30rem] w-[30rem] rounded-full bg-emerald-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-royal/25 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Live Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-navy-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-white">Flagship Campus:</span>
            <span className="text-gold">Upper Chattar, Domail</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-royal/30 to-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold animate-spin-slow" />
            <span>Website Live & Deployed</span>
          </motion.div>
        </div>

        {/* Master Headline Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-tight">
            <span className="block text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              Shaheen Education System
            </span>
            <span className="block text-gradient-cyan text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-normal mt-2">
              Courage to Know • Excellence to Lead
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Multi-branch institutional framework empowering students from Montessori through College with computerized
            academic tracking, verified fee vouchers, and instantaneous parent portals.
          </p>
        </motion.div>

        {/* Main Grid: Left Emblem Card + Right Glowing Interactive Mockup */}
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Left Column: Official Emblem & Fast Facts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            {/* Real Logo Showcase with Radial Cyber Halo */}
            <div className="relative group p-4 rounded-3xl glass-card neon-glow-cyan border border-cyan-500/30">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-transparent to-emerald-500/10 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col sm:flex-row items-center gap-5">
                <Emblem className="h-28 w-28 sm:h-32 sm:w-32" glow priority />
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                    Official Institutional Seal
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">
                    Shaheen Education System
                  </h3>
                  <p className="text-xs text-gold font-medium">Muzaffarabad • Established 2009</p>
                  <p className="text-[11px] text-slate-300 italic pt-1">
                    &ldquo;Nurturing disciplined intellect & character&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Pills */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Pass Rate</span>
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">97.8%</p>
                <p className="text-[10px] text-slate-400">BISE Board Matric Results</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Enrolled</span>
                  <Users className="h-3.5 w-3.5 text-cyan-400" />
                </div>
                <p className="text-2xl font-bold text-cyan-400 font-mono mt-1">3,050+</p>
                <p className="text-[10px] text-slate-400">Across Branch Campuses</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-amber to-gold px-6 py-3 font-bold text-xs uppercase tracking-wider text-navy-950 shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(234,179,8,0.6)]"
              >
                Apply Online 2026-27 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/branches"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-navy-900/60 px-5 py-3 font-semibold text-xs uppercase tracking-wider text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition"
              >
                <MapPin className="h-3.5 w-3.5 text-gold" />
                Explore Campuses
              </Link>
            </div>
          </motion.div>

          {/* Right Column: High-Tech Cyber Interactive Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl border border-cyan-500/30 bg-[#070D1F]/90 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              {/* Mockup Window Chrome */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-ruby-glow/80 inline-block"></span>
                  <span className="h-3 w-3 rounded-full bg-gold/80 inline-block"></span>
                  <span className="h-3 w-3 rounded-full bg-emerald/80 inline-block"></span>
                  <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                    SES Cloud LMS • Production Node iad1
                  </span>
                </div>

                {/* Role Switcher Tabs */}
                <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 border border-white/10 text-[11px] font-semibold">
                  <button
                    onClick={() => setActiveTab("admin")}
                    className={`rounded px-2.5 py-0.5 transition ${
                      activeTab === "admin"
                        ? "bg-cyan-500 text-navy-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => setActiveTab("teacher")}
                    className={`rounded px-2.5 py-0.5 transition ${
                      activeTab === "teacher"
                        ? "bg-emerald-500 text-navy-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Teacher
                  </button>
                  <button
                    onClick={() => setActiveTab("parent")}
                    className={`rounded px-2.5 py-0.5 transition ${
                      activeTab === "parent"
                        ? "bg-gold text-navy-950 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Parent
                  </button>
                </div>
              </div>

              {/* Dynamic Tab Body */}
              <AnimatePresence mode="wait">
                {activeTab === "admin" && (
                  <motion.div
                    key="admin"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Top Row: Metric Cards with Neon Gradients */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-transparent p-3.5">
                        <p className="text-[11px] text-cyan-300 font-semibold uppercase">Active Students</p>
                        <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">3,050</p>
                        <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                          <TrendingUp className="h-3 w-3" /> +14% this session
                        </p>
                      </div>

                      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-transparent p-3.5">
                        <p className="text-[11px] text-emerald-300 font-semibold uppercase">Fee Recovery</p>
                        <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">PKR 92%</p>
                        <p className="text-[10px] text-slate-300 mt-1">Automated Bank 1Link</p>
                      </div>

                      <div className="col-span-2 sm:col-span-1 rounded-xl border border-gold/30 bg-gradient-to-br from-gold/20 to-transparent p-3.5">
                        <p className="text-[11px] text-gold font-semibold uppercase">Campuses</p>
                        <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">2 Live</p>
                        <p className="text-[10px] text-slate-300 mt-1">Multi-tenant scope</p>
                      </div>
                    </div>

                    {/* Middle Row: Animated Branch Wave Graphic */}
                    <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4">
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-semibold text-white flex items-center gap-2">
                          <Layers className="h-4 w-4 text-cyan-400" />
                          Branch Enrollment & Attendance Trajectory
                        </span>
                        <span className="text-[10px] text-cyan-300 font-mono">Live Sync</span>
                      </div>

                      {/* SVG Line & Bar Chart Simulation */}
                      <div className="relative h-28 w-full flex items-end justify-between gap-2 pt-2 px-1">
                        {[
                          { label: "Mont.", val: 65, color: "bg-cyan-500" },
                          { label: "Class 1-5", val: 85, color: "bg-emerald-500" },
                          { label: "Class 6-8", val: 78, color: "bg-royal-light" },
                          { label: "Matric 9", val: 92, color: "bg-gold" },
                          { label: "Matric 10", val: 96, color: "bg-cyan-400" },
                          { label: "College", val: 74, color: "bg-emerald-400" },
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                            <span className="text-[9px] font-mono text-slate-300">{bar.val}%</span>
                            <div
                              className={`w-full rounded-t-md ${bar.color} transition-all duration-700 shadow-sm`}
                              style={{ height: `${bar.val}%` }}
                            />
                            <span className="text-[8px] text-slate-400 truncate w-full text-center">
                              {bar.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Quick Access */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-400">Direct Portal Route:</span>
                      <Link
                        href="/admin"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-white font-bold transition"
                      >
                        Enter Master Admin Dashboard <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}

                {activeTab === "teacher" && (
                  <motion.div
                    key="teacher"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4">
                      <h4 className="font-serif font-bold text-emerald-300 text-sm">Classroom Marks & Attendance Roster</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Instant grading engine with BISE grade calculation (A+, A, B, C, D, F) and printable report cards.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Link
                          href="/attendance"
                          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition"
                        >
                          Mark Daily Attendance
                        </Link>
                        <Link
                          href="/results"
                          className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition"
                        >
                          Enter Subject Marks
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "parent" && (
                  <motion.div
                    key="parent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="rounded-xl border border-gold/30 bg-yellow-950/30 p-4">
                      <h4 className="font-serif font-bold text-gold text-sm">Parent & Guardian Digital Center</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Download 3-panel bank challan vouchers, verify digital student ID cards, and review examination report sheets.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Link
                          href="/fees"
                          className="rounded-lg bg-gold px-3 py-1.5 text-xs font-bold text-navy-950 hover:bg-yellow-400 transition"
                        >
                          View Fee Challan
                        </Link>
                        <Link
                          href="/students"
                          className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition"
                        >
                          Student Digital ID
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
