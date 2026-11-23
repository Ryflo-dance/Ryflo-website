import { Reveal, StaggerWords } from "@/components/ui/Reveal";
import { Hoop } from "@/components/ui/Hoop";
import { Star } from "@/components/ui/Sparkles";

const points = [
  {
    title: "Movement-first perspective",
    text: "Ryflo comes from someone who understands how hoops feel and move during a performance.",
  },
  {
    title: "An artist's eye",
    text: "Ryana's dance background shapes her love of expression, colour, beauty and movement.",
  },
  {
    title: "Rooted in real experience",
    text: "Her professional hooping journey informs every choice behind the brand.",
  },
  {
    title: "Created for individuality",
    text: "Ryflo is an invitation to express yourself through the hoop you carry and perform with.",
  },
];

export function WhyRyflo() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-36" aria-labelledby="why-title">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 w-[560px] -translate-y-1/2 opacity-40 md:-left-60 md:w-[760px]">
        <Hoop thickness={2.2} speed={24} seams={false} />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow text-rose">Why Ryflo?</p>
            </Reveal>
            <h2 id="why-title" className="display mt-5 text-[clamp(2.8rem,6.5vw,5.8rem)]">
              <StaggerWords text="Made by a hooper." />
              <br />
              <em><StaggerWords text="For the love of hooping." delay={0.25} /></em>
            </h2>
          </div>
          <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="relative border-t border-wine/20 pt-6">
                  <Star className="absolute -top-2 left-0 h-4 w-4 bg-cream text-rose" />
                  <span className="eyebrow text-wine/40">0{i + 1}</span>
                  <h3 className="display mt-3 text-3xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-wine/75">{p.text}</p>
                </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
