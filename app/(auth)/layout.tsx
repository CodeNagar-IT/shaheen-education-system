import { Emblem } from "@/components/public/emblem";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Shaheen emblem + name */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <Emblem className="h-20 w-20" />
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-gold tracking-wide">
              Shaheen Education System
            </p>
            <p className="mt-1 text-sm text-slate-400 tracking-widest uppercase">
              Staff & Parent Portal
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
