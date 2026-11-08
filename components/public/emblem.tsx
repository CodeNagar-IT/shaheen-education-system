import React from "react";
import Image from "next/image";

interface EmblemProps {
  className?: string;
  glow?: boolean;
  priority?: boolean;
}

export function Emblem({ className = "h-12 w-12", glow = false, priority = false }: EmblemProps) {
  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md -z-10 animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-transparent.png"
        alt="Shaheen Education System Muzaffarabad Official Emblem"
        className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}
