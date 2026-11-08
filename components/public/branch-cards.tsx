import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

type Branch = {
  id: string;
  code: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  whatsapp: string;
  mapUrl: string;
  isMain: boolean;
  established: string;
  principal: string;
};

export function BranchCards({ branches }: { branches: Branch[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {branches.map((b) => (
        <article
          key={b.id}
          className="group relative rounded-2xl border border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between"
        >
          {/* Background ambient radial */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="h-3 w-3" />
                  BRANCH CODE: {b.code}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {b.name}
                </h3>
              </div>

              {b.isMain ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono uppercase tracking-wider shrink-0 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                  Flagship Campus
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono uppercase tracking-wider shrink-0">
                  Regional Campus
                </span>
              )}
            </div>

            {/* Address */}
            <p className="mt-4 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
              <MapPin className="mt-0.5 h-4 w-4 text-cyan-400 shrink-0" />
              <span>
                {b.address}, <strong className="text-white">{b.city}</strong>
              </span>
            </p>

            {/* Principal & Established */}
            <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/5 bg-slate-950/60 p-3 text-xs">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Campus Principal</p>
                <p className="font-semibold text-white mt-0.5 truncate">{b.principal}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Established</p>
                <p className="font-semibold text-cyan-300 mt-0.5">{b.established}</p>
              </div>
            </div>
          </div>

          {/* Action Contact Buttons */}
          <div className="mt-6 pt-5 border-t border-cyan-500/15 flex flex-wrap items-center gap-2">
            <a
              href={`tel:${b.phone}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-slate-950/60 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition"
            >
              <Phone className="h-3.5 w-3.5" /> {b.phone}
            </a>

            <a
              href={`mailto:${b.email}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-950/60 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </a>

            <a
              href={whatsappLink(b.whatsapp, `Assalam-o-Alaikum, I am inquiring about admissions and details at ${b.name} (${b.city}).`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition active:scale-95"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>

            {b.mapUrl && (
              <a
                href={b.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition"
              >
                <span>Google Map</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}