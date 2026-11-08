import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F172A",
          950: "#060B18",
          900: "#0A1128",
          800: "#0F1E3D",
          700: "#1E293B",
        },
        royal: {
          DEFAULT: "#1E40AF",
          light: "#3B82F6",
          dark: "#172554",
        },
        gold: {
          DEFAULT: "#EAB308",
          light: "#FDE047",
          dark: "#CA8A04",
          amber: "#F59E0B",
        },
        ruby: {
          DEFAULT: "#DC2626",
          dark: "#991B1B",
          glow: "#EF4444",
        },
        emerald: {
          DEFAULT: "#10B981",
          leaf: "#16A34A",
          dark: "#065F46",
          cyan: "#06B6D4",
        },
        cyber: {
          dark: "#040814",
          card: "rgba(10, 17, 40, 0.75)",
          border: "rgba(56, 189, 248, 0.2)",
          glow: "rgba(6, 182, 212, 0.4)",
        },
        background: "#F8FAFC",
        foreground: "#0F172A",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite linear",
        ticker: "ticker 25s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
