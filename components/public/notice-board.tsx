import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Megaphone } from "lucide-react";

type Notice = {
  id: string;
  title: string;
  body: string;
  category: string;
  publishedAt: Date;
};

export function NoticeBoard({ notices }: { notices: Notice[] }) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-navy px-5 py-4 text-white">
        <Megaphone className="h-5 w-5 text-gold" />
        <h2 className="font-serif text-xl">Notice Board</h2>
      </div>
      <ul className="divide-y divide-slate-100">
        {notices.map((n) => (
          <li key={n.id} className="px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-royal">
              {n.category} · {formatDate(n.publishedAt)}
            </p>
            <p className="mt-1 font-semibold text-navy">{n.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">{n.body}</p>
          </li>
        ))}
      </ul>
      <div className="px-5 py-3 text-right">
        <Link href="/academics" className="text-sm font-semibold text-royal hover:underline">
          Academic downloads →
        </Link>
      </div>
    </aside>
  );
}
