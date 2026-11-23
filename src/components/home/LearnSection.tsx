"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { classOfferings } from "@/content/services";
import { Reveal, StaggerWords } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Hoop } from "@/components/ui/Hoop";
import { CircularText } from "@/components/ui/CircularText";
import { cn } from "@/lib/format";

export function LearnSection() {
  const [active, setActive] = useState(0);
  const current = classOfferings[active];
  return (
    <section className="relative overflow-hidden bg-blush py-24 md:py-36" aria-labelledby="learn-title">
      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-24 lg:px-10">
        {/* layered, circular image stage */}
        <div className="relative order-2 hidden lg:order-1 lg:block">
          <div className="sticky top-28">
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <div className="absolute inset-[-4%]">
                <Hoop thickness={3} speed={9} />
              </div>
              <div className="absolute inset-[3%] overflow-hidden rounded-full bg-ivory">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.id}
                    className="absolute inset-0"
                    initial={{ clipPath: "circle(0% at 50% 50%)" }}
                    animate={{ clipPath: "circle(75% at 50% 50%)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
                  >
                    <Image
                      src={current.image.src}
                      alt={current.image.alt}
                      width={current.image.width}
                      height={current.image.height}
                      sizes="560px"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute -right-6 bottom-6 w-36 rounded-full bg-wine p-1 text-blush shadow-xl">
                <CircularText text="LEARN THE FLOW • LEARN THE FLOW • " duration={16}>
                  <span className="display text-3xl italic">R</span>
                </CircularText>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-rose">Learn to hoop with Ryana</p>
          </Reveal>
          <h2 id="learn-title" className="display mt-5 text-[clamp(2.8rem,7.5vw,6.6rem)]">
            <StaggerWords text="Your flow" />
            <br />
            <em><StaggerWords text="starts here." delay={0.2} /></em>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-wine/75">
              Whether you&apos;re picking up a hoop for the first time or finding your next move, discover the joy of
              hooping with Ryana — taught with a performer&apos;s experience and a classical dancer&apos;s sense of rhythm.
            </p>
          </Reveal>

          <ul className="mt-12 border-t border-wine/15">
            {classOfferings.map((c, i) => (
              <li key={c.id} className="border-b border-wine/15">
                <a
                  href={`/classes?type=${c.id}#enquire`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-7"
                >
                  <span className="eyebrow pt-3 text-wine/40">0{i + 1}</span>
                  <span>
                    <span className={cn("display block text-[clamp(1.9rem,3.6vw,2.9rem)] transition", active === i && "italic")}>
                      {c.title}
                    </span>
                    <span className="mt-2 block max-w-md text-wine/70">{c.blurb}</span>
                    <span className="mt-3 inline-block rounded-full border border-wine/20 px-3 py-1 text-xs font-semibold">
                      {c.for}
                    </span>
                    {/* image inline on small screens */}
                    <span className="mt-5 block aspect-[16/10] overflow-hidden rounded-[2rem] lg:hidden">
                      <Image
                        src={c.image.src}
                        alt={c.image.alt}
                        width={c.image.width}
                        height={c.image.height}
                        sizes="90vw"
                        className="h-full w-full object-cover"
                      />
                    </span>
                  </span>
                  <span className="mt-2 grid h-12 w-12 place-items-center rounded-full border border-wine/25 transition duration-500 group-hover:rotate-45 group-hover:bg-wine group-hover:text-blush">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Reveal className="mt-10">
            <ButtonLink href="/classes#enquire" size="lg">
              Learn with Ryana
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
