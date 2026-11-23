import { Star } from "./Sparkles";
import { cn } from "@/lib/format";

/** A slow ribbon of words — like tape wrapping around a hoop. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden py-5", className)} aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="display text-[clamp(1.8rem,4vw,3.2rem)] italic">{t}</span>
            <Star className="h-5 w-5 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
