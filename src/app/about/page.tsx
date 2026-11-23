import type { Metadata } from "next";
import Image from "next/image";
import { archive, chapters, milestones, record } from "@/content/story";
import { img, videos } from "@/content/media";
import { RecordShowcase } from "@/components/home/RecordShowcase";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hoop } from "@/components/ui/Hoop";
import { CircularText } from "@/components/ui/CircularText";
import { Ribbon } from "@/components/ui/Ribbon";
import { Reveal, StaggerWords, CircleReveal } from "@/components/ui/Reveal";
import { Sparkles, Star } from "@/components/ui/Sparkles";
import { VideoTile } from "@/components/ui/VideoTile";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Meet Ryana — My Story",
  description:
    "The story of Ryana Singh: Bharatanatyam-trained dancer, professional hula hoop performer, India Book of Records holder and founder of Ryflo.",
};

const portrait = record.images.portrait;
const teaching = img("ryana/teaching/ryana-teaching-laugh", "Ryana laughing as she teaches a young student");

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="grain relative isolate overflow-hidden bg-blush pb-24 pt-32 md:pt-40">
        <Ribbon variant="loop" className="-left-24 bottom-10 w-[640px] opacity-70" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div>
            <Reveal>
              <p className="eyebrow text-rose">Meet Ryana</p>
            </Reveal>
            <h1 className="display mt-5 text-[clamp(3rem,7vw,6.8rem)]">
              <StaggerWords text="Before there was Ryflo," />
              <br />
              <em>
                <StaggerWords text="there was Ryana." delay={0.25} />
              </em>
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-7 max-w-xl text-lg text-wine/80">
                An artist, a dancer, a hooper, and someone who believes that movement is its own kind of magic.
              </p>
            </Reveal>
          </div>
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute inset-[-9%]">
              <Hoop thickness={3} speed={8} tilt={62} />
            </div>
            <CircleReveal className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[3rem] bg-ivory shadow-[0_40px_80px_-30px_rgba(88,11,29,0.55)]">
              <Image src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} sizes="(min-width:1024px) 34vw, 90vw" priority className="h-full w-full object-cover object-top" />
            </CircleReveal>
            <div className="absolute -bottom-6 -left-8 w-32 rounded-full bg-wine p-1 text-blush shadow-xl">
              <CircularText text="DANCER • HOOPER • CREATOR • " duration={16}>
                <Star className="h-5 w-5 text-blush-deep" />
              </CircularText>
            </div>
            <Sparkles className="-inset-8" />
          </div>
        </div>
      </section>

      {/* long-form chapters */}
      <section className="bg-ivory py-24 md:py-36" aria-label="Ryana's journey">
        <div className="mx-auto max-w-[1100px] space-y-28 px-4 sm:px-6 md:space-y-40 lg:px-10">
          {chapters.map((c, i) => (
            <article key={c.id} className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
              <CircleReveal
                className={cn(
                  "relative aspect-square overflow-hidden bg-blush",
                  i === 1 ? "rounded-full" : "rounded-[3rem]",
                  i % 2 === 1 && "md:order-2",
                )}
              >
                {"video" in c ? (
                  <VideoTile video={c.video} />
                ) : (
                  <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width:768px) 45vw, 92vw" className="h-full w-full object-cover" />
                )}
              </CircleReveal>
              <Reveal>
                <p className="eyebrow text-rose">Chapter {c.number}</p>
                <h2 className="display mt-4 text-[clamp(2.6rem,6vw,5rem)]">
                  The <em>{c.title.replace("The ", "")}</em>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-wine/80">{c.body}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* pull quote */}
      <section className="relative overflow-hidden bg-wine py-24 text-blush md:py-32">
        <div aria-hidden className="absolute -right-32 top-1/2 w-[520px] -translate-y-1/2 opacity-30">
          <Hoop thickness={3} speed={18} seams={false} />
        </div>
        <Reveal className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="display text-[clamp(2.2rem,5.5vw,4.6rem)] italic">
            &ldquo;After spending years expressing myself through movement, I wanted to help others make their hoops as
            unique as their own flow.&rdquo;
          </p>
          <p className="eyebrow mt-8 text-blush/60">Ryana, founder of Ryflo</p>
        </Reveal>
      </section>

      {/* milestones */}
      <section className="bg-cream py-24 md:py-32" aria-labelledby="milestones-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-rose">Milestones</p>
            <h2 id="milestones-title" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]">
              A journey <em>in circles.</em>
            </h2>
            <div className="mt-10 hidden aspect-[4/3] overflow-hidden rounded-[2.5rem] lg:block">
              <Image src={teaching.src} alt={teaching.alt} width={teaching.width} height={teaching.height} sizes="35vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <ol className="relative border-l-2 border-dashed border-rose/40 pl-10">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.label} delay={i * 0.05} className="relative pb-14 last:pb-0">
                <span aria-hidden className="absolute -left-[3.05rem] top-1 h-5 w-5 rounded-full holo-surface ring-4 ring-cream" />
                <p className="eyebrow text-wine/50">{m.label}</p>
                <p className="display mt-3 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <RecordShowcase showCta={false} />

      {/* archive scrapbook */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="archive-title">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="eyebrow text-rose">From the archive</p>
            <h2 id="archive-title" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]">
              Always <em>on stage.</em>
            </h2>
            <p className="mt-5 text-lg text-wine/75">Pages from school and college yearbooks — a life that has always been about dance and performance.</p>
          </div>
          <ul className="mt-14 columns-2 gap-5 md:columns-3 lg:columns-4">
            {archive.map((a, i) => (
              <li key={a.src} className="mb-5 break-inside-avoid">
                <Reveal delay={(i % 4) * 0.06}>
                  <div className={cn("overflow-hidden bg-blush p-2 shadow-[0_20px_40px_-25px_rgba(88,11,29,0.5)]", i % 3 === 0 ? "rotate-[-1.5deg] rounded-xl" : i % 3 === 1 ? "rotate-[1.2deg] rounded-xl" : "rounded-xl")}>
                    <Image src={a.src} alt={a.alt} width={a.width} height={a.height} sizes="(min-width:1024px) 22vw, 45vw" className="h-auto w-full rounded-lg" />
                  </div>
                </Reveal>
              </li>
            ))}
            <li className="mb-5 break-inside-avoid">
              <div className="aspect-[9/16] overflow-hidden rounded-xl">
                <VideoTile video={videos.studio} />
              </div>
            </li>
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
