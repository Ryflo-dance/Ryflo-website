"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { nav } from "@/content/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/format";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Hoop } from "@/components/ui/Hoop";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, lastAdded } = useCart();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu whenever the route changes
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled || open ? "bg-ivory/80 shadow-[0_1px_0_rgba(88,11,29,0.08)] backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 md:h-20 lg:px-10">
          <Link href="/" aria-label="Ryflo — home" className="relative z-10 text-[2rem] text-wine md:text-[2.3rem]">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-wine/80 transition hover:text-wine",
                      isActive(item.href) && "text-wine",
                    )}
                  >
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-wine/25"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <Link
              href="/cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative grid h-11 w-11 place-items-center rounded-full text-wine transition hover:bg-wine/5"
            >
              <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.6} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={lastAdded}
                    initial={reduce ? false : { scale: 0.3, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-wine px-1 text-[0.68rem] font-bold text-blush"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <span className="hidden sm:block">
              <ButtonLink href="/performances#book" size="sm">
                Book Ryana
              </ButtonLink>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-wine/20 text-wine transition hover:bg-wine hover:text-blush xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 overflow-y-auto bg-blush xl:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
          >
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] opacity-70">
              <Hoop thickness={6} speed={10} />
            </div>
            <nav aria-label="Mobile" className="relative flex min-h-full flex-col justify-center px-6 pb-12 pt-24">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="display group flex items-baseline gap-4 py-1.5 text-[clamp(2.4rem,9vw,3.6rem)] text-wine"
                    >
                      <span className="eyebrow w-6 font-sans text-wine/40">0{i + 1}</span>
                      <span className={cn("transition group-hover:italic", isActive(item.href) && "italic")}>{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/performances#book">Book Ryana</ButtonLink>
                <ButtonLink href="/shop" variant="outline">
                  Shop the Flow
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
