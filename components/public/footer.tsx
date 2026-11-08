import Link from "next/link";
import { Emblem } from "@/components/public/emblem";
import { school } from "@/lib/school";
import { Mail, MapPin, Phone, ShieldCheck, ExternalLink, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#050814] text-slate-300 border-t border-white/10 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:px-8 py-16 md:grid-cols-4 relative z-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-4">
            <Emblem className="h-14 w-14" glow />
            <div>
              <p className="font-serif text-2xl font-bold text-white tracking-tight">
                {school.name}
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                Muzaffarabad • Multi-Campus Network
              </p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            {school.tagline} Offering values-rooted, technology-driven education from Montessori through College with BISE-aligned curricula and automated management.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified Educational System
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs text-cyan-300">
              Established 2009
            </span>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Explore & Portals</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span>Director&apos;s Message</span>
              </Link>
            </li>
            <li>
              <Link href="/admissions" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span>Online Admissions Desk</span>
              </Link>
            </li>
            <li>
              <Link href="/academics" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span>Syllabus & Date Sheets</span>
              </Link>
            </li>
            <li>
              <Link href="/branches" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span>Campus Directory</span>
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span>Facilities & Gallery</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-gold-light hover:underline font-semibold flex items-center gap-1.5">
                <span>Staff & Parent Login</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Main Flagship Campus</p>
          <ul className="space-y-3.5 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 text-gold flex-shrink-0" />
              <span className="text-xs leading-relaxed">{school.mainBranch.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-cyan-400 flex-shrink-0" />
              <a href={`tel:${school.mainBranch.phone}`} className="text-xs hover:text-white font-mono">
                {school.mainBranch.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <a href={`mailto:${school.mainBranch.email}`} className="text-xs hover:text-white">
                {school.mainBranch.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500 relative z-10">
        <p className="flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Shaheen Education System Muzaffarabad. Built with excellence for students, parents, and educators.
        </p>
      </div>
    </footer>
  );
}
