import type { Metadata } from "next";
import { CheckoutView } from "@/components/shop/CheckoutView";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="min-h-[80vh] bg-ivory pb-28 pt-32 md:pt-40">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <CheckoutView />
      </div>
    </section>
  );
}
