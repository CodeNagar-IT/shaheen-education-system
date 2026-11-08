"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, GraduationCap, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1577896852618-a48624364b2a?auto=format&fit=crop&w=2000&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-royal/70" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <MapPin className="h-3.5 w-3.5" />
            Madina Market, Upper Chattar, Domail
          </p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Where every child learns to <span className="text-gold">soar</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Shaheen Education System is a multi-branch academy offering Montessori to College programmes, transparent
            fee management, and a trusted portal for parents, teachers, and administrators.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 font-semibold text-navy hover:bg-yellow-400"
            >
              Apply for Admission <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Talk to Admissions
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {[
            { icon: GraduationCap, label: "Learners on roll", value: "650+", hint: "Main Campus" },
            { icon: Award, label: "Board pass rate", value: "97%", hint: "Last Matric cohort" },
            { icon: MapPin, label: "Campuses", value: "2", hint: "Live + prospective" },
            { icon: GraduationCap, label: "Programmes", value: "PG–College", hint: "One academic framework" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <item.icon className="mb-3 h-6 w-6 text-gold" />
              <p className="font-serif text-3xl text-white">{item.value}</p>
              <p className="text-sm font-medium text-slate-100">{item.label}</p>
              <p className="text-xs text-slate-300">{item.hint}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
