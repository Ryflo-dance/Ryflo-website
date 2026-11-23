"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { categories, filterProducts, type CategoryId } from "@/content/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/format";

export function ShopGrid() {
  const [cat, setCat] = useState<CategoryId>("all");
  const reduce = useReducedMotion();
  const list = filterProducts(cat);
  return (
    <>
      <div role="tablist" aria-label="Product collections" className="flex flex-wrap gap-2">
        <LayoutGroup>
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => setCat(c.id)}
              className={cn("relative rounded-full px-5 py-2.5 text-sm font-semibold transition", cat === c.id ? "text-blush" : "text-wine hover:bg-wine/5")}
            >
              {cat === c.id && <motion.span layoutId="shop-filter" className="absolute inset-0 rounded-full bg-wine" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{c.label}</span>
            </button>
          ))}
        </LayoutGroup>
      </div>
      <motion.ul layout={!reduce} className="mt-16 grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
              className={cn("mx-auto w-full max-w-[340px]", i % 2 === 1 && "lg:translate-y-14")}
            >
              <ProductCard product={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && <p className="mt-10 text-wine/70">Nothing here yet — new pieces are on the way.</p>}
    </>
  );
}
