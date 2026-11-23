import { products } from "@/content/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { FindYourShine } from "@/components/shop/FindYourShine";
import { Reveal, StaggerWords } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Ribbon } from "@/components/ui/Ribbon";

export function ShopSection() {
  const featured = products.filter((p) => p.collections.includes("featured")).slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-ivory py-24 md:py-36" aria-labelledby="shop-title">
      <Ribbon variant="wave" className="-right-32 top-10 w-[600px] opacity-60" rotate={-6} width={14} />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-rose">The Ryflo Shop</p>
            </Reveal>
            <h2 id="shop-title" className="display mt-5 max-w-4xl text-[clamp(2.8rem,7.5vw,6.6rem)]">
              <StaggerWords text="Your hoop deserves" />
              <br />
              <StaggerWords text="a little" delay={0.2} /> <em className="holo-text pr-2"><StaggerWords text="sparkle." delay={0.3} /></em>
            </h2>
          </div>
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-lg text-wine/75">Discover tapes and hoops made to move, shine, and stand out.</p>
            <ButtonLink href="/shop" variant="outline" className="mt-6">
              Shop all tapes
            </ButtonLink>
          </Reveal>
        </div>

        {/* staggered, off-grid product line-up */}
        <div className="mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6 [scrollbar-width:none] md:mt-24 md:grid md:grid-cols-4 md:gap-10 md:overflow-visible">
          {featured.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.1}
              className="w-[72vw] shrink-0 snap-center sm:w-[44vw] md:w-auto"
              style={{ marginTop: `${[0, 5, 1.5, 7][i]}rem` }}
            >
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20 md:mt-32">
          <FindYourShine />
        </div>
      </div>
    </section>
  );
}
