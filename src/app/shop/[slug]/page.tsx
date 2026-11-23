import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct, products } from "@/content/products";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { ProductCard } from "@/components/shop/ProductCard";
import { site } from "@/content/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.category === "tapes" ? "Holographic Hoop Tape" : "Hula Hoop"}`,
    description: `${p.tagline} ${p.description}`.slice(0, 160),
    openGraph: { images: [{ url: p.images[0].src }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Ryflo ${product.name}`,
    description: product.description,
    image: product.images.map((i) => `${site.url}${i.src}`),
    brand: { "@type": "Brand", name: "Ryflo" },
    ...(product.price !== null && {
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: product.price,
        availability: product.status === "in-stock" || product.status === "low-stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="overflow-x-clip bg-ivory pb-24 pt-28 md:pt-36">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Link href="/shop" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-wine/70 hover:text-wine">
            <ArrowLeft className="h-4 w-4" /> Back to the shop
          </Link>
          <ProductDetail product={product} />
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-cream py-24" aria-labelledby="related-title">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <h2 id="related-title" className="display text-[clamp(2.4rem,5vw,4rem)]">
              More <em>shine.</em>
            </h2>
            <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug} className="mx-auto w-full max-w-[320px]">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
