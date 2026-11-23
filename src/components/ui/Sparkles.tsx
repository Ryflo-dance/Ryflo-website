import { cn } from "@/lib/format";

export function Star({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <path d="M12 0c.7 6.4 5.6 11.3 12 12-6.4.7-11.3 5.6-12 12-.7-6.4-5.6-11.3-12-12C6.4 11.3 11.3 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

// Deterministic layout so server & client render the same thing.
const DEFAULT = [
  { x: 8, y: 18, s: 14, d: 0 },
  { x: 88, y: 12, s: 10, d: 0.8 },
  { x: 92, y: 70, s: 16, d: 1.6 },
  { x: 14, y: 82, s: 9, d: 0.4 },
  { x: 50, y: 4, s: 8, d: 1.2 },
  { x: 72, y: 92, s: 11, d: 2 },
  { x: 30, y: 40, s: 7, d: 2.4 },
];

/** A handful of twinkling stars scattered across the parent. */
export function Sparkles({
  className,
  points = DEFAULT,
  color = "text-wine",
}: {
  className?: string;
  points?: { x: number; y: number; s: number; d: number }[];
  color?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {points.map((p, i) => (
        <Star
          key={i}
          className={cn("animate-twinkle absolute", color)}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }}
        />
      ))}
    </div>
  );
}
