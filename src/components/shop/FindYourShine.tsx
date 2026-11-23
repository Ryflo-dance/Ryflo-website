"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { products, purchasable } from "@/content/products";
import { formatINR, cn } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Hoop } from "@/components/ui/Hoop";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "@/components/ui/Sparkles";

const tapes = products.filter((p) => p.category === "tapes");

/** "Find Your Shine" — preview each tape finish on a spinning hoop. */
export function FindYourShine({ initial = tapes[0].slug }: { initial?: string }) {
  const [slug, setSlug] = useState(initial);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const product = tapes.find((t) => t.slug === slug) ?? tapes[0];
  const swatch = (p: (typeof tapes)[number]) =>
    `conic-gradient(from 30deg, ${[...p.finish.palette, p.finish.palette[0]].join(",")})`;

  return (
    <div className="relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-cream px-5 py-12 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:rounded-[4rem] lg:px-16 lg:py-20">
      <div className="relative mx-auto w-full max-w-[520px]">
        <Sparkles />
        {/* soft coloured light cast by the tape */}
        <div
          aria-hidden
          className="absolute inset-[12%] rounded-full opacity-50 blur-3xl transition-[background] duration-700"
          style={{ background: swatch(product) }}
        />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, rotate: -40, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          >
            <Hoop finish={product.finish} thickness={11} speed={2.6} tilt={18} />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-[30%] overflow-hidden rounded-full border-4 border-ivory shadow-xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={product.slug}
              className="h-full w-full"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                width={product.images[0].width}
                height={product.images[0].height}
                sizes="240px"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div>
        <p className="eyebrow text-rose">Find your shine</p>
        <h3 className="display mt-4 text-[clamp(2.6rem,6vw,4.4rem)]">
          Try every finish <em>on the hoop.</em>
        </h3>
        <p className="mt-4 max-w-md text-wine/75">
          Pick a tape and watch it spin. The preview is a playful representation — real holographic tape shifts even more
          with light and movement.
        </p>

        <fieldset className="mt-8">
          <legend className="sr-only">Choose a tape finish</legend>
          <div className="flex flex-wrap gap-3">
            {tapes.map((t) => (
              <label key={t.slug} className="group relative cursor-pointer" title={t.name}>
                <input
                  type="radio"
                  name="finish"
                  value={t.slug}
                  checked={t.slug === slug}
                  onChange={() => {
                    setSlug(t.slug);
                    setAdded(false);
                  }}
                  className="peer sr-only"
                />
                <span
                  className="block h-12 w-12 rounded-full shadow-[inset_0_0_0_3px_rgba(255,255,255,0.7)] transition duration-300 peer-checked:scale-110 peer-checked:ring-2 peer-checked:ring-wine peer-checked:ring-offset-4 peer-checked:ring-offset-cream peer-focus-visible:ring-2 peer-focus-visible:ring-wine group-hover:scale-110"
                  style={{ background: swatch(t) }}
                />
                <span className="sr-only">{t.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 border-t border-wine/15 pt-6" aria-live="polite">
          <div className="flex items-baseline justify-between gap-4">
            <p className="display text-4xl">{product.name}</p>
            <p className="text-xl font-semibold">{formatINR(product.price)}</p>
          </div>
          <p className="mt-2 text-wine/70">{product.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              disabled={!purchasable(product)}
              onClick={() => {
                add(product.slug);
                setAdded(true);
              }}
            >
              {added ? "Added — add another?" : "Add to cart"}
            </Button>
            <Link href={`/shop/${product.slug}`} className={cn("px-3 py-2 font-medium underline underline-offset-4")}>
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
