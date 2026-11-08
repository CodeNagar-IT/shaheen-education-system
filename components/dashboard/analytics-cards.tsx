import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnalyticsCards({
  items,
}: {
  items: { label: string; value: string; hint?: string; icon: LucideIcon; tone?: "navy" | "royal" | "gold" }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-500/40"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-cyan-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {item.label}
              </p>
              <span
                className={cn(
                  "rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-110",
                  item.tone === "gold" && "bg-amber-500/15 text-amber-700 border border-amber-500/20",
                  item.tone === "royal" && "bg-cyan-500/15 text-cyan-700 border border-cyan-500/20",
                  (!item.tone || item.tone === "navy") && "bg-slate-900 text-cyan-400 border border-cyan-500/30"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>

            <p className="mt-3 font-serif text-3xl font-black tracking-tight text-navy">
              {item.value}
            </p>

            {item.hint && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <span className="h-1 w-1 rounded-full bg-cyan-500" />
                {item.hint}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}