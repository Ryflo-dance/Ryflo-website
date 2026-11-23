"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Video } from "@/content/media";
import { cn } from "@/lib/format";

/**
 * Muted looping video that loads lazily and only plays while on screen
 * (never auto-plays for reduced-motion users). `mode="hover"` plays on hover/focus instead.
 */
export function VideoTile({
  video,
  className,
  mode = "inview",
  priority,
}: {
  video: Video;
  className?: string;
  mode?: "inview" | "hover";
  priority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(!!priority);

  const shouldAutoplay = mode === "inview" && !reduce;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        if (e.isIntersecting) setLoaded(true);
        if (shouldAutoplay) {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { rootMargin: "150px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [shouldAutoplay]);

  useEffect(() => {
    if (loaded && shouldAutoplay && inView.current) ref.current?.play().catch(() => {});
  }, [loaded, shouldAutoplay]);

  const play = () => {
    setLoaded(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };
  const hover =
    mode === "hover" && !reduce
      ? { onMouseEnter: play, onMouseLeave: () => ref.current?.pause(), onFocus: play, onBlur: () => ref.current?.pause() }
      : {};

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      poster={video.poster}
      src={loaded ? video.src : undefined}
      muted
      loop
      playsInline
      preload={loaded ? "auto" : "none"}
      aria-label={video.title}
      {...hover}
    />
  );
}
