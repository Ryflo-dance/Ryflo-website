import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { FindYourShine } from "@/components/shop/FindYourShine";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Shop Holographic Hula Hoop Tapes",
  description: "Holographic, reflective hula hoop tapes chosen by performer Ryana Singh. Lilac, Bubblegum Pink, Neon Lemon and more — shipped across India.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Ryflo Shop"
        title="Your hoop deserves"
        accent="a little sparkle."
        intro="Discover tapes and hoops made to move, shine, and stand out."
      />
      <Marquee className="holo-surface text-wine" items={["Lilac", "Bubblegum Pink", "Cotton Candy", "Kiwi Gold", "Rainbow", "Orange Pop", "Neon Lemon"]} />
      <section className="bg-ivory pb-28 pt-20 md:pb-40" aria-label="Products">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <ShopGrid />
        </div>
      </section>
      <section className="bg-ivory pb-28" aria-label="Find your shine">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <FindYourShine />
        </div>
      </section>
    </>
  );
}
