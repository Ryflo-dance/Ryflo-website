"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { purchasable, statusLabel, type Product } from "@/content/products";
import { formatINR, cn } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Hoop } from "@/components/ui/Hoop";

/** Circular product frame — a hoop in the product's finish spins around it on hover. */
export function ProductCard({ product, className, sizes = "(min-width: 1024px) 22vw, 70vw" }: { product: Product; className?: string; sizes?: string }) {
  const { add } = useCart();
  const canBuy = purchasable(product);
  return (
    <article className={cn("group relative", className)}>
      <Link href={`/shop/${product.slug}`} className="block" aria-label={`${product.name} — ${formatINR(product.price)}`}>
        <div className="relative mx-auto aspect-square w-full">
          <div className="absolute inset-[-7%] scale-90 opacity-0 transition duration-700 ease-[var(--ease-flow)] group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100">
            <Hoop finish={product.finish} thickness={5} speed={3.5} />
          </div>
          <div className="absolute inset-0 overflow-hidden rounded-full bg-blush">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              width={product.images[0].width}
              height={product.images[0].height}
              sizes={sizes}
              className="h-full w-full object-cover transition duration-[1.2s] ease-[var(--ease-flow)] group-hover:rotate-[8deg] group-hover:scale-110"
            />
            {product.images[1] && (
              <Image
                src={product.images[1].src}
                alt=""
                width={product.images[1].width}
                height={product.images[1].height}
                sizes={sizes}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100"
              />
            )}
          </div>
          {product.status !== "in-stock" && (
            <span className="absolute left-[8%] top-[8%] rounded-full bg-ivory px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-wine shadow">
              {statusLabel[product.status]}
            </span>
          )}
        </div>
        <div className="mt-6 text-center">
          <h3 className="display text-[1.9rem]">{product.name}</h3>
          <p className="mt-1 text-sm text-wine/70">{product.tagline}</p>
          <p className="mt-2 font-semibold">{formatINR(product.price)}</p>
        </div>
      </Link>
      {canBuy && (
        <button
          type="button"
          onClick={() => add(product.slug)}
          aria-label={`Add ${product.name} to cart`}
          className="absolute right-[6%] top-[62%] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-wine text-blush shadow-lg transition duration-500 hover:scale-110 hover:bg-ink sm:top-[66%] md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
        >
          <Plus className="h-5 w-5" />
        </button>
      )}
    </article>
  );
}
