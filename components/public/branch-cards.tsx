import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
        <article key={b.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-royal">{b.code}</p>
              <h3 className="mt-1 font-serif text-2xl text-navy">{b.name}</h3>
            </div>
            <Badge variant={b.isMain ? "gold" : "info"}>{b.isMain ? "Main Campus" : "Prospective"}</Badge>
          </div>
          <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 text-gold" />
            {b.address}, {b.city}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Principal</dt>
              <dd className="font-medium text-navy">{b.principal}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Established</dt>
              <dd className="font-medium text-navy">{b.established}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm">
              <Phone className="h-4 w-4" /> {b.phone}
            </a>
            <a href={`mailto:${b.email}`} className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm">
              <Mail className="h-4 w-4" /> Email
            </a>
            <a
              href={whatsappLink(b.whatsapp, `Assalam-o-Alaikum, I would like information about ${b.name}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <Link href={b.mapUrl} target="_blank" className="inline-flex items-center gap-1 rounded-md bg-navy px-3 py-2 text-sm font-semibold text-white">
              Map
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
