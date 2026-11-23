"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus, Truck } from "lucide-react";
import { purchasable, statusLabel, type Product } from "@/content/products";
import { site } from "@/content/site";
import { formatINR, cn } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/Button";
import { Hoop } from "@/components/ui/Hoop";
import { Sparkles } from "@/components/ui/Sparkles";

export function ProductDetail({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [option, setOption] = useState(product.options?.[0]?.values[0]);
  const { add } = useCart();
  const canBuy = purchasable(product);
  const image = product.images[active];

  return (
    <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      {/* media */}
      <div className="relative">
        <div className="relative mx-auto aspect-square w-full max-w-[640px]">
          <div className="absolute inset-[-5%]">
            <Hoop finish={product.finish} thickness={4} speed={5} />
          </div>
          <div className="absolute inset-[3%] overflow-hidden rounded-full bg-blush">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={image.src}
                className="absolute inset-0"
                initial={{ clipPath: "circle(0% at 50% 50%)", rotate: -8 }}
                animate={{ clipPath: "circle(75% at 50% 50%)", rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
              >
                <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width:1024px) 45vw, 92vw" priority className="h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <Sparkles />
        </div>
        {product.images.length > 1 && (
          <div className="mt-8 flex justify-center gap-3" role="group" aria-label="Product images">
            {product.images.map((im, i) => (
              <button
                key={im.src}
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={i === active}
                className={cn("h-20 w-20 overflow-hidden rounded-full ring-offset-4 ring-offset-ivory transition", i === active ? "ring-2 ring-wine" : "opacity-70 hover:opacity-100")}
              >
                <Image src={im.src} alt="" width={im.width} height={im.height} sizes="80px" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* info */}
      <div className="lg:pt-8">
        <p className="eyebrow text-rose">{product.category === "tapes" ? "Holographic hoop tape" : "Hula hoop"}</p>
        <h1 className="display mt-4 text-[clamp(3.2rem,7vw,6rem)]">{product.name}</h1>
        <p className="mt-3 font-serif text-2xl italic text-wine/75">{product.tagline}</p>
        <div className="mt-8 flex items-center gap-4">
          <p className="text-3xl font-semibold">{formatINR(product.price)}</p>
          <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", canBuy ? "bg-blush text-wine" : "bg-wine/10 text-wine/70")}>{statusLabel[product.status]}</span>
        </div>
        {product.price !== null && <p className="mt-1 text-sm text-wine/60">Shipping confirmed at checkout</p>}

        <p className="mt-8 max-w-lg text-lg leading-relaxed text-wine/80">{product.description}</p>

        {product.options?.map((o) => (
          <fieldset key={o.name} className="mt-8">
            <legend className="eyebrow text-wine/70">{o.name}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {o.values.map((v) => (
                <label key={v} className="cursor-pointer">
                  <input type="radio" name={o.name} value={v} checked={option === v} onChange={() => setOption(v)} className="peer sr-only" />
                  <span className="block rounded-full border border-wine/25 px-4 py-2 text-sm peer-checked:border-wine peer-checked:bg-wine peer-checked:text-blush peer-focus-visible:ring-2 peer-focus-visible:ring-wine">{v}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        {canBuy ? (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex h-14 items-center rounded-full border-[1.5px] border-wine/30" role="group" aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-full w-12 place-items-center rounded-l-full hover:bg-wine/5">
                <Minus className="h-4 w-4" />
              </button>
              <output aria-live="polite" className="w-8 text-center font-semibold">{qty}</output>
              <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity" className="grid h-full w-12 place-items-center rounded-r-full hover:bg-wine/5">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              onClick={() => {
                add(product.slug, qty, option);
                setAdded(true);
              }}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : (
                "Add to cart"
              )}
            </Button>
            {added && (
              <Link href="/cart" className="font-medium underline underline-offset-4">
                View cart
              </Link>
            )}
          </div>
        ) : (
          <div className="mt-10">
            <Link href="/contact" className="inline-flex h-14 items-center rounded-full bg-wine px-9 font-semibold text-blush hover:bg-ink">
              Enquire about this
            </Link>
          </div>
        )}

        <dl className="mt-12 divide-y divide-wine/15 border-y border-wine/15">
          {product.specs?.map((s) => (
            <div key={s.label} className="flex justify-between gap-6 py-4">
              <dt className="text-wine/60">{s.label}</dt>
              <dd className="text-right font-medium">{s.value}</dd>
            </div>
          ))}
          <div className="flex gap-4 py-5">
            <dt className="sr-only">Shipping</dt>
            <Truck className="mt-0.5 h-5 w-5 shrink-0" />
            <dd className="text-wine/75">{site.shipping.note}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
