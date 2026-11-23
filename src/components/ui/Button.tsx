"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/format";
import { Star } from "./Sparkles";

type Variant = "solid" | "outline" | "outline-light" | "holo" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-[transform,background-color,color,box-shadow] duration-300 ease-[var(--ease-flow)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 select-none";
const sizes = { md: "h-12 px-7 text-[0.92rem]", lg: "h-14 px-9 text-base", sm: "h-10 px-5 text-sm" };
const variants: Record<Variant, string> = {
  solid: "bg-wine text-blush hover:bg-ink hover:shadow-[0_12px_30px_-12px_rgba(88,11,29,0.7)]",
  outline: "border-[1.5px] border-wine text-wine hover:bg-wine hover:text-blush",
  holo: "holo-surface text-wine shadow-[inset_0_0_0_1.5px_rgba(88,11,29,0.25)] hover:shadow-[inset_0_0_0_1.5px_rgba(88,11,29,0.6),0_14px_30px_-14px_rgba(160,60,140,0.6)]",
  "outline-light": "border-[1.5px] border-blush text-blush hover:bg-blush hover:text-wine",
  ghost: "text-wine hover:bg-wine/5",
};

type Burst = { id: number; x: number; y: number };

function useBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const fire = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const b = { id: Date.now() + Math.random(), x: e.clientX - r.left, y: e.clientY - r.top };
    setBursts((s) => [...s, b]);
    setTimeout(() => setBursts((s) => s.filter((x) => x.id !== b.id)), 700);
  };
  const layer = (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {/* hover sparkles */}
      <Star className="absolute -top-1.5 right-4 h-3 w-3 scale-0 text-rose opacity-0 transition duration-500 group-hover:scale-100 group-hover:rotate-45 group-hover:opacity-100" />
      <Star className="absolute -bottom-1 left-5 h-2 w-2 scale-0 text-rose opacity-0 transition delay-75 duration-500 group-hover:scale-100 group-hover:opacity-100" />
      {bursts.map((b) =>
        [0, 60, 120, 180, 240, 300].map((deg) => (
          <Star
            key={`${b.id}-${deg}`}
            className="absolute h-2.5 w-2.5 text-rose"
            style={{
              left: b.x - 5,
              top: b.y - 5,
              animation: "burst 650ms var(--ease-flow) forwards",
              ["--dx" as string]: `${Math.cos((deg * Math.PI) / 180) * 34}px`,
              ["--dy" as string]: `${Math.sin((deg * Math.PI) / 180) * 34}px`,
            }}
          />
        )),
      )}
    </span>
  );
  return { fire, layer };
}

type Common = { variant?: Variant; size?: keyof typeof sizes; className?: string; children: React.ReactNode };

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className">) {
  const { fire, layer } = useBurst();
  const external = typeof href === "string" && /^https?:/.test(href);
  return (
    <Link
      href={href}
      onClick={fire}
      className={cn(base, sizes[size], variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {layer}
      <span className="relative">{children}</span>
    </Link>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  onClick,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className">) {
  const { fire, layer } = useBurst();
  return (
    <button
      onClick={(e) => {
        if (!rest.disabled) fire(e);
        onClick?.(e);
      }}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {layer}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
