import { cn } from "@/lib/format";

/**
 * Ryflo wordmark.
 * TODO(Ryana): the official logo file was not in the supplied folder. Drop it at
 * /public/assets/brand/ryflo-logo.svg and set OFFICIAL_LOGO below — the rest of the
 * site picks it up automatically.
 */
const OFFICIAL_LOGO: string | null = null; // e.g. "/assets/brand/ryflo-logo.svg"

export function Logo({ className, title = "Ryflo" }: { className?: string; title?: string }) {
  if (OFFICIAL_LOGO) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={OFFICIAL_LOGO} alt={title} className={cn("h-auto", className)} />;
  }
  return (
    <span role="img" aria-label={title} className={cn("relative inline-flex items-baseline leading-none", className)}>
      <span className="font-serif text-[1em] font-medium italic tracking-[-0.04em]">Ryfl</span>
      <span className="relative font-serif text-[1em] font-medium italic tracking-[-0.04em]">
        o
        {/* a little hoop orbiting the final “o” */}
        <svg
          aria-hidden
          viewBox="0 0 100 40"
          className="absolute left-1/2 top-[58%] w-[1.35em] -translate-x-1/2 -translate-y-1/2 -rotate-12 overflow-visible"
        >
          <defs>
            <linearGradient id="logo-holo" x1="0" x2="1">
              <stop offset="0" stopColor="#ff7fbf" />
              <stop offset=".4" stopColor="#a58cff" />
              <stop offset=".7" stopColor="#5fd0e6" />
              <stop offset="1" stopColor="#ff7fbf" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="20" rx="46" ry="13" fill="none" stroke="url(#logo-holo)" strokeWidth="5" />
        </svg>
      </span>
    </span>
  );
}
