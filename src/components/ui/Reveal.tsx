"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades & lifts children into view once. */
export function Reveal({
  delay = 0,
  y = 28,
  as = "div",
  children,
  ...rest
}: { delay?: number; y?: number; as?: "div" | "li" } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  const Comp = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Reveals media through an expanding circular mask — like stepping through a hoop. */
export function CircleReveal({
  children,
  className,
  delay = 0,
  origin = "50% 50%",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  origin?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: `circle(0% at ${origin})` }}
      whileInView={{ clipPath: `circle(75% at ${origin})` }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.4, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Splits a line into words that rise in one after another. */
export function StaggerWords({
  text,
  className,
  delay = 0,
  play,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** When provided, animates on this flag instead of on scroll-into-view. */
  play?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", rotate: 6 }}
            {...(play === undefined
              ? { whileInView: { y: "0%", rotate: 0 }, viewport: { once: true } }
              : { animate: play ? { y: "0%", rotate: 0 } : undefined })}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.07 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
