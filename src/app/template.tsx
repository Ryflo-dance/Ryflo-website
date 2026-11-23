"use client";

import { motion, useReducedMotion } from "motion/react";
import { Hoop } from "@/components/ui/Hoop";

/** Lightweight page transition: a tiny hoop spins out while the page lifts in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-1/2 z-[60] w-16 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 1, scale: 1, rotate: 0 }}
        animate={{ opacity: 0, scale: 2.4, rotate: 180 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hoop speed={0.8} thickness={14} seams={false} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        {children}
      </motion.div>
    </>
  );
}
