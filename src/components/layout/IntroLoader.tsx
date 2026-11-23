"use client";

import { useEffect, useState } from "react";
import { Hoop } from "@/components/ui/Hoop";
import { Logo } from "@/components/ui/Logo";
import { Sparkles } from "@/components/ui/Sparkles";

export const INTRO_KEY = "ryflo-intro-seen";
export const INTRO_EVENT = "ryflo:intro-open";

/** True once the intro overlay is opening (or immediately if it was skipped). */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only state read after hydration
    if (document.documentElement.dataset.intro === "done") return setDone(true);
    const on = () => setDone(true);
    window.addEventListener(INTRO_EVENT, on);
    return () => window.removeEventListener(INTRO_EVENT, on);
  }, []);
  return done;
}

/**
 * Inline script (runs before paint) that marks the intro as done for returning
 * visitors or reduced-motion users, so the overlay never flashes for them.
 */
export const introBootScript = `try{if(localStorage.getItem('${INTRO_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.intro='done'}}catch(e){document.documentElement.dataset.intro='done'}`;

/**
 * First-visit branded intro: a spinning holographic hoop, then the page is revealed
 * through an expanding circle — like stepping through the hoop.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<"show" | "open" | "gone">("show");

  useEffect(() => {
    if (document.documentElement.dataset.intro === "done") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only state read after hydration
      setPhase("gone");
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const finish = () => {
      setPhase("open");
      try {
        localStorage.setItem(INTRO_KEY, "1");
      } catch {}
    };
    // Open as soon as the page has loaded, but keep the moment brief either way.
    const minShow = new Promise((r) => setTimeout(r, 1300));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r(null) : window.addEventListener("load", () => r(null), { once: true })));
    const cap = new Promise((r) => setTimeout(r, 2600));
    let cancelled = false;
    Promise.race([Promise.all([minShow, loaded]), cap]).then(() => !cancelled && finish());
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    const t = setTimeout(() => {
      setPhase("gone");
      document.documentElement.style.overflow = "";
      document.documentElement.dataset.intro = "done";
    }, 950);
    // let the page start its entrance as the hoop opens
    const t2 = setTimeout(() => window.dispatchEvent(new Event(INTRO_EVENT)), 250);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div className="intro-overlay" data-phase={phase} role="status" aria-label="Loading Ryflo">
      <div className="intro-inner">
        <div className="relative w-[min(56vw,260px)] animate-[intro-bounce_1.4s_var(--ease-flow)_infinite]">
          <Sparkles color="text-wine" />
          <Hoop speed={1.6} thickness={11} tilt={58} />
        </div>
        <Logo className="mt-2 text-[clamp(3.2rem,10vw,5.2rem)] text-wine" />
        <p className="mt-3 font-serif text-lg italic text-wine/80">Finding your flow…</p>
      </div>
    </div>
  );
}
