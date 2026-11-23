import Image from "next/image";
import { img, videos } from "@/content/media";
import { Reveal, StaggerWords, CircleReveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { VideoTile } from "@/components/ui/VideoTile";

const a = img("ryana/portraits/ryana-studio-portrait", "Studio portrait of Ryana");
const b = img("ryana/portraits/ryana-medal-kiss", "Ryana kissing her India Book of Records medal");
const c = img("ryana/teaching/ryana-with-students", "Ryana with her young students");
const d = img("ryana/hooping/student-flow-1", "A student balancing several hoops");

function Pic({ i, sizes, className }: { i: typeof a; sizes: string; className?: string }) {
  return <Image src={i.src} alt={i.alt} width={i.width} height={i.height} sizes={sizes} className={className ?? "h-full w-full object-cover"} />;
}

/** A scrapbook-like, asymmetric peek into the gallery. */
export function GalleryTeaser() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 md:py-36" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow text-rose">Performance gallery</p>
          </Reveal>
          <h2 id="gallery-title" className="display mt-5 text-[clamp(2.8rem,7vw,6rem)]">
            <StaggerWords text="A little glimpse" />
            <br />
            <em><StaggerWords text="into the flow." delay={0.2} /></em>
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-6 gap-3 sm:gap-5 md:mt-24 md:grid-cols-12 md:grid-rows-[repeat(6,minmax(0,5.5rem))] lg:grid-rows-[repeat(6,minmax(0,7rem))]">
          <CircleReveal className="col-span-3 aspect-[3/4] overflow-hidden rounded-t-full rounded-b-3xl md:col-span-3 md:row-span-5 md:aspect-auto">
            <Pic i={a} sizes="(min-width:768px) 25vw, 50vw" />
          </CircleReveal>
          <CircleReveal delay={0.1} className="col-span-3 aspect-[3/4] overflow-hidden rounded-3xl md:col-span-3 md:row-span-6 md:mt-10 md:aspect-auto">
            <VideoTile video={videos.skates} />
          </CircleReveal>
          <CircleReveal delay={0.15} className="col-span-3 aspect-square overflow-hidden rounded-full md:col-span-3 md:row-span-3 md:aspect-auto">
            <Pic i={b} sizes="(min-width:768px) 25vw, 50vw" className="h-full w-full object-cover object-top" />
          </CircleReveal>
          <CircleReveal delay={0.2} className="col-span-3 aspect-square overflow-hidden rounded-3xl rounded-tr-[6rem] md:col-span-3 md:row-span-4 md:aspect-auto">
            <Pic i={d} sizes="(min-width:768px) 25vw, 50vw" />
          </CircleReveal>
          <CircleReveal delay={0.25} className="col-span-6 aspect-[16/9] overflow-hidden rounded-3xl md:col-span-3 md:row-span-3 md:aspect-auto">
            <Pic i={c} sizes="(min-width:768px) 25vw, 100vw" className="h-full w-full object-cover object-[50%_25%]" />
          </CircleReveal>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href="/gallery" variant="outline" size="lg">
            Open the full gallery
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
