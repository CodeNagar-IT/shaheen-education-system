import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  default: "bg-navy text-white",
  gold: "bg-gold text-navy",
  outline: "border border-slate-300 text-slate-700",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof styles }) {
  return (
    <div
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", styles[variant], className)}
      {...props}
    />
  );
}
