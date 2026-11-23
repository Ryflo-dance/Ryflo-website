import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Gallery } from "@/components/gallery/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from Ryana's performances, classes, India Book of Records moment and the Ryflo collection.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A little glimpse"
        accent="into the flow."
        intro="Performances, classes, record day, tapes catching the light — a scrapbook from Ryana's world."
      />
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Gallery />
        </div>
      </section>
    </>
  );
}
