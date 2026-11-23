import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { eventTypes, performanceReel } from "@/content/services";
import { videos } from "@/content/media";
import { VideoTile } from "@/components/ui/VideoTile";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CircularText } from "@/components/ui/CircularText";
import { Star } from "@/components/ui/Sparkles";
import { RecordShowcase } from "@/components/home/RecordShowcase";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Book Ryana — Hula Hoop Performances",
  description:
    "Book Ryana Singh, India Book of Records holder, for live hula hoop performances at private, corporate and cultural events, workshops and collaborations.",
};

export default function PerformancesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Performances & bookings"
        title="Let the hoops"
        accent="steal the show."
        intro="Bring movement, energy, and something unforgettable to your next event."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#book" size="lg">
            Book Ryana
          </ButtonLink>
        </div>
      </PageHeader>

      {/* spotlight feature */}
      <section className="relative isolate overflow-hidden bg-ink py-24 text-blush md:py-32" aria-labelledby="showreel-title">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(35%_60%_at_30%_0%,rgba(255,220,240,0.28),transparent_70%)]" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-10">
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="aspect-[9/16] overflow-hidden rounded-[999px_999px_2.5rem_2.5rem] shadow-[0_0_120px_-20px_rgba(246,185,216,0.45)]">
              <VideoTile video={videos.rooftop} />
            </div>
            <div className="absolute -right-8 top-1/3 w-32 text-blush">
              <CircularText text="BOOK RYANA • BOOK RYANA • " duration={14}>
                <Star className="h-5 w-5 text-blush-deep" />
              </CircularText>
            </div>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow text-blush-deep">On stage</p>
              <h2 id="showreel-title" className="display mt-5 text-[clamp(2.6rem,6vw,5.4rem)]">
                Hoop flow, <em>with a classical soul.</em>
              </h2>
              <p className="mt-6 max-w-lg text-lg text-blush/80">
                Ryana blends hula hoop flow with the expressiveness of classical dance — multi-hoop sequences, spins and
                isolations shaped to the music and the moment.
              </p>
              <p className="eyebrow mt-10 text-blush/50">Available for</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {eventTypes.slice(0, 5).map((e) => (
                  <li key={e} className="rounded-full border border-blush/25 px-4 py-2 text-sm">
                    {e}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <h3 className="eyebrow text-blush/60">Highlights</h3>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {performanceReel.slice(1).map((v, i) => (
              <li key={v.src} className={cn("relative aspect-[9/16] overflow-hidden rounded-[2rem]", i % 2 === 1 && "lg:mt-12")}>
                <VideoTile video={v} mode="hover" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-14 font-serif italic">
                  {v.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RecordShowcase />

      <section id="book" className="scroll-mt-20 bg-ivory py-24 md:py-32" aria-labelledby="book-title">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="eyebrow text-rose">Booking enquiry</p>
            <h2 id="book-title" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]">
              Book <em>Ryana.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg text-wine/75">
              Share a few details about your event and Ryana will get back to you about availability, format and fees.
            </p>
          </div>
          <EnquiryForm kind="booking" queryDefaults={{ event: "eventType" }} />
        </div>
      </section>
    </>
  );
}
