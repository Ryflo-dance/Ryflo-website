"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { gallery, galleryFilters, type GalleryItem } from "@/content/gallery";
import { cn } from "@/lib/format";

function Thumb({ item }: { item: GalleryItem }) {
  if (item.kind === "image")
    return (
      <Image
        src={item.image.src}
        alt={item.image.alt}
        width={item.image.width}
        height={item.image.height}
        sizes="(min-width:1280px) 24vw, (min-width:768px) 32vw, 48vw"
        className="h-full w-full object-cover transition duration-[1.2s] ease-[var(--ease-flow)] group-hover:scale-105"
      />
    );
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.video.poster} alt={item.video.title} loading="lazy" className="h-full w-full object-cover transition duration-[1.2s] ease-[var(--ease-flow)] group-hover:scale-105" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-ivory/85 text-wine shadow-lg backdrop-blur transition group-hover:scale-110">
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        </span>
      </span>
    </>
  );
}

const shapeClass = (item: GalleryItem) => {
  if (item.shape === "circle") return "aspect-square rounded-full";
  if (item.shape === "tall" || item.kind === "video") return "aspect-[9/14] rounded-[999px_999px_1.5rem_1.5rem]";
  if (item.shape === "wide") return "aspect-[4/3] rounded-[2rem]";
  if (item.kind === "image" && item.image.height > item.image.width) return "aspect-[3/4] rounded-[2rem]";
  return "aspect-[4/3] rounded-[2rem]";
};

export function Gallery() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]["id"]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const items = useMemo(() => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);
  const lastFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open !== null ? items[open] : null;

  return (
    <>
      <div role="tablist" aria-label="Filter gallery" className="flex flex-wrap gap-2">
        <LayoutGroup>
          {galleryFilters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-semibold transition",
                filter === f.id ? "text-blush" : "text-wine hover:bg-wine/5",
              )}
            >
              {filter === f.id && (
                <motion.span layoutId="gallery-filter" className="absolute inset-0 rounded-full bg-wine" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </LayoutGroup>
      </div>

      <motion.ul layout={!reduce} className="mt-12 columns-2 gap-4 md:columns-3 md:gap-6 xl:columns-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 break-inside-avoid md:mb-6"
            >
              <button
                type="button"
                onClick={(e) => {
                  lastFocus.current = e.currentTarget;
                  setOpen(i);
                }}
                className={cn("group relative block w-full overflow-hidden bg-blush", shapeClass(item))}
                aria-label={`Open ${item.kind === "image" ? item.image.alt : item.video.title}`}
              >
                <Thumb item={item} />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery viewer"
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 p-4 outline-none md:p-10"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 50% 50%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(100% at 50% 50%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <button onClick={close} aria-label="Close viewer" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-ivory/10 text-blush transition hover:bg-ivory/20">
              <X className="h-6 w-6" />
            </button>
            <button onClick={() => step(-1)} aria-label="Previous" className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-blush transition hover:bg-ivory/20 md:left-6">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={() => step(1)} aria-label="Next" className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-blush transition hover:bg-ivory/20 md:right-6">
              <ChevronRight className="h-6 w-6" />
            </button>
            <figure className="flex max-h-full max-w-5xl flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.div key={current.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  {current.kind === "image" ? (
                    // full-quality original from /public — no resizing
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={current.image.src} alt={current.image.alt} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
                  ) : (
                    <video
                      src={current.video.src}
                      poster={current.video.poster}
                      controls
                      autoPlay={!reduce}
                      playsInline
                      className="max-h-[80vh] w-auto rounded-2xl"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              <figcaption className="mt-4 text-center font-serif text-lg italic text-blush/80">
                {current.kind === "image" ? current.image.alt : current.video.title}
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
