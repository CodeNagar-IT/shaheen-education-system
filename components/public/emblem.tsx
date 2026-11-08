export function Emblem({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#0F172A" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="#EAB308" strokeWidth="2.5" />
      <path
        d="M12 36c8-14 16-20 20-22 4 2 12 8 20 22-6 4-13 8-20 8s-14-4-20-8z"
        fill="#1E40AF"
      />
      <path d="M32 14l3.5 8H44l-7 5.5 2.5 8L32 30l-7.5 5.5 2.5-8-7-5.5h8.5z" fill="#EAB308" />
      <path d="M18 40c4 6 9 10 14 11 5-1 10-5 14-11" fill="none" stroke="#EAB308" strokeWidth="1.6" />
    </svg>
  );
}
