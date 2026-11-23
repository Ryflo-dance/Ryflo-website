import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hoop } from "@/components/ui/Hoop";
import { Reveal, StaggerWords } from "@/components/ui/Reveal";
import { Sparkles } from "@/components/ui/Sparkles";
import { Ribbon } from "@/components/ui/Ribbon";

const paths = [
  { href: "/shop", title: "Shop the Flow", text: "Browse tapes and hoops." },
  { href: "/classes#enquire", title: "Learn the Flow", text: "Enquire about classes." },
  { href: "/performances#book", title: "Bring the Flow", text: "Book Ryana for an event." },
];

export function FinalCTA() {
  return (
    <section className="grain relative isolate overflow-hidden bg-blush py-28 md:py-40" aria-labelledby="final-title">
      <Ribbon variant="loop" className="-left-20 bottom-10 w-[620px] opacity-70" rotate={6} />
      <Ribbon variant="wave" className="-right-24 top-16 w-[520px] opacity-60" rotate={-10} width={14} delay={2} />
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 w-[min(110vw,900px)] -translate-x-1/2 -translate-y-[58%]">
        <Hoop thickness={4} speed={10} tilt={62} />
      </div>
      <Sparkles />
      <div className="relative mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-10">
        <h2 id="final-title" className="display mx-auto max-w-5xl text-[clamp(2.8rem,8vw,7.4rem)]">
          <StaggerWords text="The world is better" />
          <br />
          <em><StaggerWords text="when you find your flow." delay={0.25} /></em>
        </h2>

        <ul className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
          {paths.map((p, i) => (
            <Reveal as="li" key={p.href} delay={i * 0.1}>
                <Link
                  href={p.href}
                  className="group flex items-center justify-between gap-4 rounded-full bg-ivory/80 py-4 pl-7 pr-4 text-left shadow-[0_20px_40px_-25px_rgba(88,11,29,0.5)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:bg-wine hover:text-blush"
                >
                  <span>
                    <span className="display block text-2xl">{p.title}</span>
                    <span className="text-sm opacity-70">{p.text}</span>
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wine text-blush transition group-hover:rotate-[-45deg] group-hover:bg-blush group-hover:text-wine">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Link>
              </Reveal>
          ))}
        </ul>
        <Reveal delay={0.3}>
          <p className="mt-16 font-serif text-3xl italic text-wine/80">With love, Ryana.</p>
        </Reveal>
      </div>
    </section>
  );
}
