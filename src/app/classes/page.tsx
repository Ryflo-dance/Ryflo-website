import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { classOfferings, studentGallery } from "@/content/services";
import { videos } from "@/content/media";
import { Reveal, CircleReveal } from "@/components/ui/Reveal";
import { VideoTile } from "@/components/ui/VideoTile";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Hula Hoop Classes & Workshops",
  description:
    "Learn to hula hoop with Ryana Singh — beginner and advanced classes, private sessions and group workshops, shaped by a performer's experience and a Bharatanatyam foundation.",
};

const approach = [
  { title: "Performer's experience", text: "Learn from someone who hoops on stage — tricks that work in real routines, not just in practice." },
  { title: "Classical foundation", text: "Bharatanatyam taught Ryana rhythm and expression; she brings that musicality into every lesson." },
  { title: "Movement as art", text: "Hooping as self-expression: posture, lines, flow and the joy of finding your own style." },
  { title: "Patient & playful", text: "From a very first spin to a full routine, at a pace that keeps it fun." },
];

export default function ClassesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Classes & workshops"
        title="Your flow"
        accent="starts here."
        intro="Whether you're picking up a hoop for the first time or finding your next move, discover the joy of hooping with Ryana."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#enquire" size="lg">
            Learn with Ryana
          </ButtonLink>
          <ButtonLink href="#offerings" size="lg" variant="outline">
            See the classes
          </ButtonLink>
        </div>
      </PageHeader>

      <section id="offerings" className="bg-ivory py-24 md:py-32" aria-label="Class types">
        <div className="mx-auto max-w-[1440px] space-y-24 px-4 sm:px-6 md:space-y-32 lg:px-10">
          {classOfferings.map((c, i) => (
            <article key={c.id} className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
              <CircleReveal
                className={cn(
                  "relative aspect-square overflow-hidden bg-blush",
                  i % 2 ? "rounded-[3rem] rounded-tl-full md:order-2" : "rounded-full",
                )}
              >
                <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width:768px) 45vw, 92vw" className="h-full w-full object-cover" />
              </CircleReveal>
              <Reveal>
                <p className="eyebrow text-rose">0{i + 1} · {c.for}</p>
                <h2 className="display mt-4 text-[clamp(2.6rem,6vw,5rem)]">{c.title}</h2>
                <p className="mt-5 max-w-md text-lg text-wine/75">{c.blurb}</p>
                <ButtonLink href={`/classes?type=${c.id}#enquire`} variant="outline" className="mt-8">
                  Enquire about this
                </ButtonLink>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <Marquee className="bg-wine text-blush" items={["Spin", "Flow", "Isolate", "Break", "Repeat", "Shine"]} />

      <section className="bg-cream py-24 md:py-32" aria-labelledby="approach-title">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <div>
            <p className="eyebrow text-rose">How Ryana teaches</p>
            <h2 id="approach-title" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]">
              A dancer&apos;s ear, <em>a hooper&apos;s heart.</em>
            </h2>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2">
              {approach.map((a) => (
                <li key={a.title} className="border-t border-wine/20 pt-5">
                  <h3 className="display text-2xl">{a.title}</h3>
                  <p className="mt-2 text-wine/75">{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="row-span-2 overflow-hidden rounded-t-full rounded-b-[2rem]">
              <VideoTile video={videos.online2} />
            </div>
            {studentGallery.slice(0, 2).map((s, i) => (
              <div key={s.src} className={cn("aspect-square overflow-hidden", i ? "rounded-[2rem]" : "rounded-full")}>
                <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="25vw" className="h-full w-full object-cover" />
              </div>
            ))}
            <p className="col-span-2 text-xs italic text-wine/55">Moments from Ryana&apos;s studio and online classes.</p>
          </div>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-20 bg-ivory py-24 md:py-32" aria-labelledby="enquire-title">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="eyebrow text-rose">Class enquiry</p>
            <h2 id="enquire-title" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]">
              Learn <em>with Ryana.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg text-wine/75">
              Tell Ryana a little about yourself and what you&apos;d love to learn. She&apos;ll come back to you with
              available formats, timings and fees.
            </p>
          </div>
          <EnquiryForm kind="class" queryDefaults={{ type: "classType" }} />
        </div>
      </section>
    </>
  );
}
