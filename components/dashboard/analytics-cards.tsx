import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnalyticsCards({
  items,
}: {
  items: { label: string; value: string; hint?: string; icon: LucideIcon; tone?: "navy" | "royal" | "gold" }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <span
                className={cn(
                  "rounded-md p-2",
                  item.tone === "gold" && "bg-gold/20 text-navy",
                  item.tone === "royal" && "bg-blue-50 text-royal",
                  (!item.tone || item.tone === "navy") && "bg-slate-100 text-navy"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-serif text-3xl text-navy">{item.value}</p>
            {item.hint && <p className="mt-1 text-xs text-slate-500">{item.hint}</p>}
          </div>
        );
      })}
    </div>
  );
}
