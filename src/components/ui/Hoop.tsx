import type { CSSProperties } from "react";
import { cn } from "@/lib/format";

export type HoopFinish = { palette: readonly string[]; shine?: string };

export const defaultFinish: HoopFinish = {
  palette: ["#ffb3dc", "#c7b6ff", "#9fe7ff", "#d8ffb8", "#ffe3a3"],
  shine: "#ffffff",
};

type Props = {
  finish?: HoopFinish;
  /** Seconds per rotation. */
  speed?: number;
  /** Ring thickness as a % of radius. */
  thickness?: number;
  /** Tilt the hoop in 3D (degrees on the X axis) — like a hoop around the waist. */
  tilt?: number;
  className?: string;
  style?: CSSProperties;
  paused?: boolean;
  /** Show the spiral seams of wrapped tape. */
  seams?: boolean;
};

/**
 * The Ryflo hoop — the recurring character of the site.
 * Pure CSS: a conic gradient masked into a ring, with a counter-rotating
 * specular streak to simulate light travelling over holographic tape.
 */
export function Hoop({
  finish = defaultFinish,
  speed = 6,
  thickness = 9,
  tilt = 0,
  className,
  style,
  paused,
  seams = true,
}: Props) {
  const p = finish.palette;
  const stops = [...p, p[0]].join(", ");
  const play = paused ? "paused" : "running";
  const ring = { ["--thickness" as string]: `${thickness}%` } as CSSProperties;

  return (
    <div aria-hidden className={cn("relative aspect-square", className)} style={{ perspective: 900, overflow: "clip", overflowClipMargin: "16px", ...style }}>
      <div
        className="absolute inset-0"
        style={{ transform: tilt ? `rotateX(${tilt}deg)` : undefined, transformStyle: "preserve-3d" }}
      >
        {/* soft glow behind the ring */}
        <div
          className="hoop-ring blur-xl opacity-60"
          style={{ ...ring, background: `conic-gradient(from 0deg, ${stops})`, ["--thickness" as string]: `${thickness * 1.6}%` }}
        />
        {/* tape colour */}
        <div
          className="hoop-ring"
          style={{
            ...ring,
            background: `conic-gradient(from 0deg, ${stops})`,
            animation: `spin ${speed}s linear infinite`,
            animationPlayState: play,
          }}
        />
        {/* spiral seams of the wrap */}
        {seams && (
          <div
            className="hoop-ring"
            style={{
              ...ring,
              background:
                "repeating-conic-gradient(from 0deg, rgba(88,11,29,0.16) 0deg 0.5deg, rgba(255,255,255,0.18) 0.5deg 1.1deg, transparent 1.1deg 7.5deg)",
              animation: `spin ${speed}s linear infinite`,
              animationPlayState: play,
            }}
          />
        )}
        {/* tube volume shading */}
        <div
          className="hoop-ring"
          style={{
            ...ring,
            background: `radial-gradient(farthest-side, transparent calc(100% - ${thickness}%), rgba(88,11,29,0.28) calc(100% - ${thickness}% + 1px), rgba(255,255,255,0.35) calc(100% - ${thickness / 2}%), rgba(88,11,29,0.3) 100%)`,
          }}
        />
        {/* travelling specular light */}
        <div
          className="hoop-ring mix-blend-screen"
          style={{
            ...ring,
            background: `conic-gradient(from 0deg, transparent 0deg 30deg, ${finish.shine ?? "#fff"} 48deg, transparent 66deg 200deg, ${finish.shine ?? "#fff"}cc 214deg, transparent 230deg)`,
            animation: `spin-rev ${speed * 1.7}s linear infinite`,
            animationPlayState: play,
          }}
        />
      </div>
    </div>
  );
}
