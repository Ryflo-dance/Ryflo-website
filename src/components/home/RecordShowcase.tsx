"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { record } from "@/content/story";
import { Hoop } from "@/components/ui/Hoop";
import { Reveal, StaggerWords, CircleReveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Sparkles } from "@/components/ui/Sparkles";

const gold = { palette: ["#f6d58a", "#fff1c9", "#d9a84e", "#ffe7a8"], shine: "#ffffff" };

/** India Book of Records — framed certificate with subtle 3D depth. */
export function RecordShowcase({ showCta = true }: { showCta?: boolean }) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(useTransform(ry, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(rx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 14 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !frame.current) return;
    const r = frame.current.getBoundingClientRect();
    rx.set((e.clientX - r.left) / r.width - 0.5);
    ry.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section id="record" className="relative overflow-hidden bg-wine py-24 text-blush md:py-36" aria-labelledby="record-title">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_50%_at_70%_40%,rgba(246,185,216,0.18),transparent_70%)]" />
      <Sparkles color="text-[#f6d58a]" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <Reveal>
              <p className="eyebrow text-[#f6d58a]">{record.publication}</p>
            </Reveal>
            <h2 id="record-title" className="display mt-5 text-[clamp(2.8rem,7vw,6.2rem)]">
              <StaggerWords text="A little flow." />
              <br />
              <span className="sm:whitespace-nowrap">
                <StaggerWords text="A" delay={0.2} /> <em><StaggerWords text="remarkable" delay={0.28} /></em>
              </span>
              <br />
              <StaggerWords text="milestone." delay={0.4} />
            </h2>

            <Reveal delay={0.2} className="mt-10 flex items-end gap-5">
              <span className="display bg-[linear-gradient(100deg,#f6d58a,#fff1c9,#ffb3dc,#f6d58a)] bg-clip-text text-[clamp(6rem,14vw,11rem)] leading-[0.8] text-transparent">
                {record.highlight.value}
              </span>
              <span className="mb-3 max-w-[11rem] font-serif text-xl italic leading-snug text-blush/85">
                {record.highlight.label}
              </span>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="eyebrow mt-10 text-blush/50">India Book of Records holder</p>
              <p className="mt-3 max-w-lg text-xl leading-snug text-blush md:text-2xl">{record.title}.</p>
              {record.date && <p className="mt-2 text-sm text-blush/60">Certified {record.date}</p>}
              {showCta && (
                <div className="mt-10">
                  <ButtonLink href="/about#record" variant="holo" size="lg">
                    Explore the achievement
                  </ButtonLink>
                </div>
              )}
            </Reveal>
          </div>

          <div className="relative" onPointerMove={onMove} onPointerLeave={reset}>
            <div aria-hidden className="absolute inset-[-6%] opacity-90 sm:inset-[-2%]">
              <Hoop finish={gold} thickness={2.6} speed={14} seams={false} />
            </div>
            <div className="relative mx-auto w-[88%]" style={{ perspective: 1200 }}>
              <motion.div
                ref={frame}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative rounded-[1.6rem] bg-[linear-gradient(135deg,#fff1c9,#d9a84e_40%,#fff1c9_60%,#b8872f)] p-2.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]"
              >
                <div className="overflow-hidden rounded-[1.2rem] bg-ivory">
                  <Image
                    src={record.images.hero.src}
                    alt={record.images.hero.alt}
                    width={record.images.hero.width}
                    height={record.images.hero.height}
                    sizes="(min-width: 1024px) 48vw, 90vw"
                    className="h-auto w-full"
                  />
                </div>
              </motion.div>
            </div>
            <CircleReveal className="absolute -bottom-10 -left-2 w-[34%] overflow-hidden rounded-full border-4 border-wine shadow-2xl sm:-left-6">
              <Image
                src={record.images.medal.src}
                alt={record.images.medal.alt}
                width={record.images.medal.width}
                height={record.images.medal.height}
                sizes="(min-width: 1024px) 16vw, 34vw"
                className="aspect-square h-full w-full object-cover object-top"
              />
            </CircleReveal>
            <CircleReveal delay={0.2} className="absolute -right-2 -top-12 w-[28%] overflow-hidden rounded-full border-4 border-wine shadow-2xl sm:-right-4">
              <Image
                src={record.images.kit.src}
                alt={record.images.kit.alt}
                width={record.images.kit.width}
                height={record.images.kit.height}
                sizes="(min-width: 1024px) 14vw, 28vw"
                className="aspect-square h-full w-full object-cover"
              />
            </CircleReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
