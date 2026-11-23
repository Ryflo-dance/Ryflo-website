"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { videos } from "@/content/media";
import { Hoop } from "@/components/ui/Hoop";
import { CircularText } from "@/components/ui/CircularText";
import { Ribbon } from "@/components/ui/Ribbon";
import { Sparkles, Star } from "@/components/ui/Sparkles";
import { ButtonLink } from "@/components/ui/Button";
import { StaggerWords } from "@/components/ui/Reveal";
import { VideoTile } from "@/components/ui/VideoTile";
import { useIntroDone } from "@/components/layout/IntroLoader";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const go = useIntroDone();

  // cursor depth (desktop only, restrained)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const near = { x: useTransform(sx, (v) => v * 18), y: useTransform(sy, (v) => v * 14) };
  const far = { x: useTransform(sx, (v) => v * -10), y: useTransform(sy, (v) => v * -8) };

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  // scroll: the stage drifts and the hoop keeps turning as you leave the hero
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const hoopRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-25%"]);

  return (
    <section
      ref={ref}
      className="grain relative isolate overflow-hidden bg-blush pt-24 md:pt-28"
      aria-labelledby="hero-title"
    >
      {/* atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_75%_45%,#fff6fb_0%,transparent_70%),radial-gradient(45%_40%_at_10%_90%,#f6b9d8_0%,transparent_70%)]" />
      <Ribbon variant="loop" className="-left-24 top-[58%] w-[540px] opacity-80 md:w-[700px]" rotate={-8} />
      <Ribbon variant="swirl" className="-right-40 top-24 w-[520px] opacity-70" rotate={14} width={16} delay={1.5} />

      <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1440px] items-center gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:px-10">
        {/* copy */}
        <motion.div style={{ y: textY }} className="relative z-10 order-2 lg:order-1">
          <motion.p
            className="eyebrow flex items-center gap-3 text-wine/70"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <Star className="h-3 w-3 text-rose" /> Ryflo · by Ryana Singh
          </motion.p>
          <h1 id="hero-title" className="display mt-5 text-[clamp(3.4rem,10.5vw,9.4rem)] text-wine">
            <StaggerWords text="Life's better" delay={0.25} play={go} />
            <br />
            <span className="sm:whitespace-nowrap">
              <StaggerWords text="in a" delay={0.45} play={go} />{" "}
              <em className="holo-text pr-2">
                <StaggerWords text="little spin." delay={0.6} play={go} />
              </em>
            </span>
          </h1>
          <motion.p
            className="mt-7 max-w-[30rem] text-[1.06rem] leading-relaxed text-wine/80 md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
          >
            Welcome to Ryflo. A world of movement, expression, and hoops that shine as brightly as you do.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 1.05 }}
          >
            <ButtonLink href="/shop" size="lg">
              Explore Ryflo
            </ButtonLink>
            <ButtonLink href="/about" size="lg" variant="outline">
              Meet Ryana
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* stage: Ryana performing inside the page */}
        <motion.div style={{ y: stageY }} className="relative order-1 mx-auto w-full max-w-[640px] lg:order-2">
          <div className="relative mx-auto aspect-square w-[88%] sm:w-[78%] lg:w-[92%]">
            {/* back half of the big hoop (behind Ryana) */}
            <motion.div style={{ ...far, rotate: hoopRotate }} className="absolute inset-[-12%] -z-0">
              <Hoop thickness={3.2} speed={7} tilt={66} />
            </motion.div>

            <motion.div
              className="absolute inset-0 overflow-hidden rounded-full bg-wine/10 shadow-[0_40px_80px_-30px_rgba(88,11,29,0.55)]"
              initial={reduce ? false : { clipPath: "circle(0% at 50% 50%)" }}
              animate={go ? { clipPath: "circle(50% at 50% 50%)" } : undefined}
              transition={{ duration: 1.5, ease: [0.7, 0, 0.2, 1], delay: 0.1 }}
            >
              <VideoTile video={videos.heroLoop} priority className="scale-[1.02]" />
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_30%,transparent_55%,rgba(88,11,29,0.25))]" />
            </motion.div>

            {/* front half of the hoop — passes in front of the frame */}
            <motion.div
              style={{ ...far, rotate: hoopRotate, clipPath: "inset(52% -20% -20% -20%)" }}
              className="pointer-events-none absolute inset-[-12%]"
            >
              <Hoop thickness={3.2} speed={7} tilt={66} />
            </motion.div>

            <motion.div style={near} className="absolute -left-4 bottom-[4%] w-[30%] text-wine sm:-left-8">
              <div className="rounded-full bg-ivory/85 p-1.5 shadow-lg backdrop-blur">
                <CircularText>
                  <Star className="h-6 w-6 text-rose" />
                </CircularText>
              </div>
            </motion.div>

            <motion.div style={near} className="absolute -right-2 top-[6%] rounded-full bg-ivory/90 px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur sm:-right-6 sm:text-sm">
              <span className="text-rose">★</span> India Book of Records holder
            </motion.div>
            <Sparkles className="-inset-10" />
          </div>
        </motion.div>
      </div>

      <a
        href="#story"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-wine/60 transition hover:text-wine md:flex"
      >
        Step into the story
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
