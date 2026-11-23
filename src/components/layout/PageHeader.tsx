import { Hoop } from "@/components/ui/Hoop";
import { Ribbon } from "@/components/ui/Ribbon";
import { Sparkles } from "@/components/ui/Sparkles";
import { StaggerWords, Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/format";

/** Editorial header used across inner pages. */
export function PageHeader({
  eyebrow,
  title,
  accent,
  intro,
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("grain relative isolate overflow-hidden bg-blush pb-20 pt-36 md:pb-28 md:pt-44", className)}>
      <Ribbon variant="swirl" className="-right-40 top-24 w-[560px] opacity-70" rotate={10} width={16} />
      <div aria-hidden className="absolute -bottom-40 -left-32 -z-10 w-[420px] opacity-60 md:w-[560px]">
        <Hoop thickness={3} speed={14} tilt={40} />
      </div>
      <Sparkles />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow text-rose">{eyebrow}</p>
        </Reveal>
        <h1 className="display mt-5 max-w-5xl text-[clamp(3rem,9vw,8rem)]">
          <StaggerWords text={title} />
          {accent && (
            <>
              <br />
              <em>
                <StaggerWords text={accent} delay={0.2} />
              </em>
            </>
          )}
        </h1>
        {intro && (
          <Reveal delay={0.25}>
            <p className="mt-7 max-w-xl text-lg text-wine/75">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
