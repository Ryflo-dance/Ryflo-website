"use client";

import { useEffect, useRef } from "react";

/**
 * A small hoop that trails the native cursor on desktop. It never replaces the
 * native cursor, and it fades away over form fields and text inputs.
 */
export function HoopCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduce || !el) return;

    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      const overField = !!t.closest("input, textarea, select, [contenteditable], video");
      const overLink = !!t.closest("a, button, [role=button], label");
      el.dataset.state = overField ? "hidden" : overLink ? "active" : "idle";
    };
    const leave = () => (el.dataset.state = "hidden");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    el.style.display = "block";
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-state="hidden"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden"
      style={{ willChange: "transform" }}
    >
      <div className="hoop-cursor -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
