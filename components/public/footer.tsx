import Link from "next/link";
import { Emblem } from "@/components/public/emblem";
import { school } from "@/lib/school";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Emblem className="h-12 w-12" />
            <div>
              <p className="font-serif text-xl text-white">{school.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Multi-campus network</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed">{school.tagline}</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">Director&apos;s Message</Link></li>
            <li><Link href="/admissions" className="hover:text-white">Apply Online</Link></li>
            <li><Link href="/academics" className="hover:text-white">Syllabus & Date Sheets</Link></li>
            <li><Link href="/branches" className="hover:text-white">Campus Directory</Link></li>
            <li><Link href="/login" className="hover:text-white">Staff & Parent Portal</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Main Campus</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" />{school.mainBranch.address}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 text-gold" />{school.mainBranch.phone}</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 text-gold" />{school.mainBranch.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Shaheen Education System. All rights reserved.
      </div>
    </footer>
  );
}
