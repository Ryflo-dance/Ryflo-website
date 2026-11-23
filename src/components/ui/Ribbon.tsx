import { useId } from "react";
import { cn } from "@/lib/format";

const PATHS = {
  wave: "M-20 120 C 120 20, 220 220, 360 110 S 600 10, 720 120",
  loop: "M0 160 C 140 160, 160 40, 260 60 S 340 200, 240 190 S 200 60, 420 70 S 620 150, 720 90",
  swirl: "M-10 60 C 90 200, 260 -20, 360 100 S 560 200, 700 40",
};

/** A floating holographic ribbon inspired by the tape itself. Decorative only. */
export function Ribbon({
  variant = "wave",
  className,
  width = 22,
  rotate = 0,
  delay = 0,
}: {
  variant?: keyof typeof PATHS;
  className?: string;
  width?: number;
  rotate?: number;
  delay?: number;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      aria-hidden
      viewBox="0 0 700 240"
      className={cn("pointer-events-none absolute animate-float overflow-visible", className)}
      style={{ ["--r" as string]: `${rotate}deg`, animationDelay: `${delay}s` }}
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" x2="1" y1="0" y2="0.3">
          <stop offset="0" stopColor="#ffb3dc" />
          <stop offset=".25" stopColor="#c7b6ff" />
          <stop offset=".5" stopColor="#9fe7ff" />
          <stop offset=".72" stopColor="#ffe3a3" />
          <stop offset="1" stopColor="#ff9ccf" />
        </linearGradient>
        <linearGradient id={`${id}-s`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={PATHS[variant]} stroke={`url(#${id}-g)`} strokeWidth={width} strokeLinecap="round" />
      <path
        d={PATHS[variant]}
        stroke={`url(#${id}-s)`}
        strokeWidth={width * 0.25}
        strokeLinecap="round"
        strokeDasharray="60 900"
        style={{ animation: "ribbon-shine 5s linear infinite", animationDelay: `${delay}s` }}
      />
    </svg>
  );
}
