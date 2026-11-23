import { useId } from "react";
import { cn } from "@/lib/format";

/** Text set on a circle that slowly rotates. Purely decorative. */
export function CircularText({
  text = "FIND YOUR FLOW • FIND YOUR FLOW • ",
  className,
  duration = 22,
  reverse,
  children,
}: {
  text?: string;
  className?: string;
  duration?: number;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        style={{ animation: `${reverse ? "spin-rev" : "spin"} ${duration}s linear infinite` }}
      >
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fill="currentColor" style={{ fontSize: 15.5, letterSpacing: "0.32em", fontWeight: 600 }}>
          <textPath href={`#${id}`} textLength={485} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      {children && <div className="absolute inset-0 grid place-items-center">{children}</div>}
    </div>
  );
}
