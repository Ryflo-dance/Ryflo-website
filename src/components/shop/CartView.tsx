"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { Hoop } from "@/components/ui/Hoop";
import { Sparkles } from "@/components/ui/Sparkles";

export function EmptyCart() {
  return (
    <div className="relative mx-auto flex max-w-xl flex-col items-center py-10 text-center">
      <Sparkles />
      <motion.div className="w-44" animate={{ y: [0, -12, 0], rotate: [0, -6, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
        <Hoop speed={9} thickness={10} tilt={55} />
      </motion.div>
      <h1 className="display mt-8 text-[clamp(2.6rem,6vw,4.4rem)]">
        Your hoop is feeling <em>a little lonely.</em>
      </h1>
      <p className="mt-4 text-wine/70">Nothing in your cart yet — let&apos;s change that.</p>
      <ButtonLink href="/shop" size="lg" className="mt-10">
        Find something shiny
      </ButtonLink>
    </div>
  );
}

export function CartView() {
  const { lines, subtotal, setQty, remove, ready, count } = useCart();

  if (!ready) return <div className="h-[50vh]" aria-busy="true" />;
  if (lines.length === 0) return <EmptyCart />;

  return (
    <>
      <h1 className="display text-[clamp(3rem,8vw,6rem)]">
        Your <em>cart.</em>
      </h1>
      <p className="mt-2 text-wine/60">
        {count} item{count === 1 ? "" : "s"}
      </p>
      <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-[1.5fr_1fr]">
        <ul className="divide-y divide-wine/15 border-y border-wine/15">
          <AnimatePresence initial={false}>
            {lines.map((l) => (
              <motion.li
                key={l.slug + (l.option ?? "")}
                layout
                exit={{ opacity: 0, x: -40, height: 0 }}
                className="flex items-start gap-4 py-6 sm:items-center sm:gap-5"
              >
                <Link href={`/shop/${l.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full sm:h-28 sm:w-28">
                  <Image src={l.product.images[0].src} alt={l.product.images[0].alt} width={l.product.images[0].width} height={l.product.images[0].height} sizes="112px" className="h-full w-full object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/shop/${l.slug}`} className="display text-2xl hover:italic sm:text-3xl">
                    {l.product.name}
                  </Link>
                  {l.option && <p className="text-sm text-wine/60">{l.option}</p>}
                  <p className="mt-1 text-sm text-wine/70">{formatINR(l.product.price)} each</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex h-10 items-center rounded-full border border-wine/25" role="group" aria-label={`Quantity of ${l.product.name}`}>
                      <button onClick={() => setQty(l.slug, l.qty - 1, l.option)} aria-label="Decrease quantity" className="grid h-full w-10 place-items-center rounded-l-full hover:bg-wine/5">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <output aria-live="polite" className="w-7 text-center text-sm font-semibold">{l.qty}</output>
                      <button onClick={() => setQty(l.slug, l.qty + 1, l.option)} aria-label="Increase quantity" className="grid h-full w-10 place-items-center rounded-r-full hover:bg-wine/5">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button onClick={() => remove(l.slug, l.option)} className="inline-flex items-center gap-1.5 text-sm text-wine/60 hover:text-wine" aria-label={`Remove ${l.product.name}`}>
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
                <p className="shrink-0 text-lg font-semibold">{formatINR((l.product.price ?? 0) * l.qty)}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <aside className="h-fit min-w-0 rounded-[2rem] bg-blush p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="display text-3xl">Order summary</h2>
          <dl className="mt-6 space-y-3">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-semibold">{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-wine/70">
              <dt>Shipping</dt>
              <dd>Confirmed at checkout</dd>
            </div>
          </dl>
          <div className="mt-6 flex justify-between border-t border-wine/20 pt-5 text-xl">
            <span>Total</span>
            <span className="font-semibold">{formatINR(subtotal)}</span>
          </div>
          <ButtonLink href="/checkout" size="lg" className="mt-8 w-full">
            Continue to checkout
          </ButtonLink>
          <Link href="/shop" className="mt-4 block text-center text-sm underline underline-offset-4">
            Keep shopping
          </Link>
        </aside>
      </div>
    </>
  );
}
