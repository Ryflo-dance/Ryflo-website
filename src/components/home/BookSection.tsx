import { eventTypes, performanceReel } from "@/content/services";
import { videos } from "@/content/media";
import { VideoTile } from "@/components/ui/VideoTile";
import { Reveal, StaggerWords } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CircularText } from "@/components/ui/CircularText";
import { Star } from "@/components/ui/Sparkles";

/** Cinematic performance showcase with spotlight + reel. */
export function BookSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-blush md:py-36" aria-labelledby="book-title">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-35">
        <VideoTile video={videos.flowArt} />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(40%_55%_at_50%_0%,rgba(255,220,240,0.35),transparent_70%),linear-gradient(180deg,rgba(42,6,16,0.55),rgba(42,6,16,0.92)_70%)]" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="eyebrow text-blush-deep">Book Ryana for events</p>
          </Reveal>
          <h2 id="book-title" className="display mt-5 text-[clamp(3rem,9vw,8rem)]">
            <StaggerWords text="Let the hoops" />
            <br />
            <em><StaggerWords text="steal the show." delay={0.2} /></em>
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-blush/80">
              Bring movement, energy, and something unforgettable to your next event.
            </p>
            <ul className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {eventTypes.slice(0, 5).map((e) => (
                <li key={e} className="rounded-full border border-blush/25 px-4 py-2 text-sm backdrop-blur">
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/performances#book" variant="holo" size="lg">
                Book Ryana
              </ButtonLink>
              <ButtonLink href="/performances" variant="outline-light" size="lg">
                See performances
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* reel — hover to play */}
        <div className="relative mt-20 md:mt-28">
          <div className="absolute -top-16 right-4 z-10 hidden w-32 text-blush md:block">
            <CircularText text="LIVE • ON STAGE • IN FLOW • " duration={14} reverse>
              <Star className="h-5 w-5 text-blush-deep" />
            </CircularText>
          </div>
          <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none]">
            {performanceReel.map((v, i) => (
              <li
                key={v.src}
                className="relative aspect-[9/16] w-[62vw] shrink-0 snap-center overflow-hidden rounded-[999px_999px_2rem_2rem] sm:w-[36vw] md:w-[23%]"
                style={{ marginTop: i % 2 ? "3rem" : 0 }}
              >
                <VideoTile video={v} mode="hover" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-16 font-serif text-lg italic">
                  {v.title}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-xs text-blush/50 md:text-left">Hover or focus a clip to play · scroll sideways for more</p>
        </div>
      </div>
    </section>
  );
}
