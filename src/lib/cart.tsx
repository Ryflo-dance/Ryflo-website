"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { getProduct, purchasable } from "@/content/products";

export type CartLine = { slug: string; qty: number; option?: string };
type State = { lines: CartLine[] };
type Action =
  | { type: "add"; slug: string; qty?: number; option?: string }
  | { type: "set"; slug: string; option?: string; qty: number }
  | { type: "remove"; slug: string; option?: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const MAX_QTY = 20;
const same = (l: CartLine, slug: string, option?: string) => l.slug === slug && l.option === option;

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "hydrate":
      return { lines: a.lines };
    case "add": {
      const qty = a.qty ?? 1;
      const existing = state.lines.find((l) => same(l, a.slug, a.option));
      if (existing)
        return {
          lines: state.lines.map((l) => (l === existing ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l)),
        };
      return { lines: [...state.lines, { slug: a.slug, option: a.option, qty: Math.min(MAX_QTY, qty) }] };
    }
    case "set":
      if (a.qty <= 0) return { lines: state.lines.filter((l) => !same(l, a.slug, a.option)) };
      return {
        lines: state.lines.map((l) => (same(l, a.slug, a.option) ? { ...l, qty: Math.min(MAX_QTY, a.qty) } : l)),
      };
    case "remove":
      return { lines: state.lines.filter((l) => !same(l, a.slug, a.option)) };
    case "clear":
      return { lines: [] };
  }
}

type CartCtx = {
  lines: (CartLine & { product: NonNullable<ReturnType<typeof getProduct>> })[];
  count: number;
  subtotal: number;
  ready: boolean;
  lastAdded: number;
  add: (slug: string, qty?: number, option?: string) => void;
  setQty: (slug: string, qty: number, option?: string) => void;
  remove: (slug: string, option?: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "ryflo-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only state read after hydration
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state.lines));
    } catch {}
  }, [state.lines, ready]);

  const lines = useMemo(
    () =>
      state.lines
        .map((l) => ({ ...l, product: getProduct(l.slug)! }))
        .filter((l) => l.product && purchasable(l.product)),
    [state.lines],
  );

  const add = useCallback((slug: string, qty?: number, option?: string) => {
    dispatch({ type: "add", slug, qty, option });
    setLastAdded(Date.now());
  }, []);

  const value: CartCtx = {
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.qty * (l.product.price ?? 0), 0),
    ready,
    lastAdded,
    add,
    setQty: (slug, qty, option) => dispatch({ type: "set", slug, qty, option }),
    remove: (slug, option) => dispatch({ type: "remove", slug, option }),
    clear: () => dispatch({ type: "clear" }),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}
