import type { Metadata } from "next";
import { CartView } from "@/components/shop/CartView";

export const metadata: Metadata = { title: "Your cart", robots: { index: false } };

export default function CartPage() {
  return (
    <section className="min-h-[80vh] bg-ivory pb-28 pt-32 md:pt-40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <CartView />
      </div>
    </section>
  );
}
