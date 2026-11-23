"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { chapters } from "@/content/story";
import { cn } from "@/lib/format";
import { Hoop } from "@/components/ui/Hoop";
import { CircleReveal, Reveal, StaggerWords } from "@/components/ui/Reveal";
import { VideoTile } from "@/components/ui/VideoTile";
import { ButtonLink } from "@/components/ui/Button";

/** "Before there was Ryflo, there was Ryana." — three cinematic chapters joined by a ribbon. */
export function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const ribbon = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);
  // the hoop follows the story, weaving between chapters
  const hoopTop = useTransform(scrollYProgress, [0, 1], ["4%", "92%"]);
  const hoopLeft = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["78%", "6%", "80%", "44%"]);
  const hoopRot = useTransform(scrollYProgress, [0, 1], [0, 540]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-ivory py-24 md:py-36" aria-labelledby="story-title">
      {/* ribbon thread connecting the chapters */}
      <svg aria-hidden viewBox="0 0 100 1000" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[14%] hidden h-[80%] w-full md:block">
        <defs>
          <linearGradient id="story-ribbon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffb3dc" />
            <stop offset=".35" stopColor="#c7b6ff" />
            <stop offset=".65" stopColor="#9fe7ff" />
            <stop offset="1" stopColor="#d77a9c" />
          </linearGradient>
        </defs>
        <motion.path
          d="M78 0 C 78 120, 10 160, 12 330 S 88 520, 86 660 S 40 860, 46 1000"
          fill="none"
          stroke="url(#story-ribbon)"
          strokeWidth="0.9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: ribbon, strokeWidth: 10 }}
        />
      </svg>
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ top: hoopTop, left: hoopLeft, rotate: hoopRot }}
          className="pointer-events-none absolute z-0 hidden w-24 -translate-x-1/2 md:block"
        >
          <Hoop thickness={12} speed={2.4} tilt={55} />
        </motion.div>
      )}

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <header className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow text-rose">Meet Ryana</p>
          </Reveal>
          <h2 id="story-title" className="display mt-5 text-[clamp(2.8rem,8vw,7rem)]">
            <StaggerWords text="Before there was Ryflo," />
            <br />
            <em>
              <StaggerWords text="there was Ryana." delay={0.25} />
            </em>
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-7 max-w-xl text-lg text-wine/75">
              An artist, a dancer, a hooper, and someone who believes that movement is its own kind of magic.
            </p>
          </Reveal>
        </header>

        <div className="mt-20 space-y-28 md:mt-32 md:space-y-44">
          {chapters.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={c.id} className="relative grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
                <div className={cn("relative", flip && "md:order-2")}>
                  <CircleReveal
                    origin={flip ? "30% 40%" : "70% 40%"}
                    className={cn(
                      "relative mx-auto aspect-[4/5] w-[86%] overflow-hidden bg-blush shadow-[0_40px_80px_-40px_rgba(88,11,29,0.6)]",
                      i === 0 && "rounded-t-full rounded-b-[2rem]",
                      i === 1 && "rounded-full !aspect-square",
                      i === 2 && "rounded-[2rem] rounded-br-[12rem]",
                    )}
                  >
                    {"video" in c ? (
                      <VideoTile video={c.video} />
                    ) : (
                      <Image
                        src={c.image.src}
                        alt={c.image.alt}
                        width={c.image.width}
                        height={c.image.height}
                        sizes="(min-width: 768px) 42vw, 86vw"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </CircleReveal>
                  <span
                    aria-hidden
                    className={cn(
                      "display pointer-events-none absolute -top-10 text-[clamp(7rem,18vw,15rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--rose)]",
                      flip ? "-right-2" : "-left-2",
                    )}
                  >
                    {c.number}
                  </span>
                  <p className="mt-4 text-center text-xs italic text-wine/55">{c.caption}</p>
                </div>
                <div className={cn("max-w-lg", flip ? "md:order-1 md:justify-self-end" : "")}>
                  <Reveal>
                    <p className="eyebrow text-rose">Chapter {c.number}</p>
                    <h3 className="display mt-4 text-[clamp(2.6rem,5.5vw,4.8rem)]">
                      The <em>{c.title.replace("The ", "")}</em>
                    </h3>
                    <p className="mt-3 font-serif text-xl italic text-wine/70">{c.kicker}</p>
                    <p className="mt-6 text-[1.05rem] leading-relaxed text-wine/80">{c.body}</p>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

        <Reveal className="mt-24 flex justify-center">
          <ButtonLink href="/about" variant="outline" size="lg">
            Read my story
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
