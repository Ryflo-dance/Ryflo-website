import type { Metadata } from "next";
import { Hoop } from "@/components/ui/Hoop";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center bg-blush px-4 pt-24 text-center">
      <div className="w-40">
        <Hoop speed={3} thickness={12} tilt={55} />
      </div>
      <h1 className="display mt-8 text-[clamp(2.8rem,7vw,5rem)]">
        This page <em>spun away.</em>
      </h1>
      <p className="mt-4 text-wine/75">We couldn&apos;t find what you were looking for.</p>
      <ButtonLink href="/" className="mt-8">
        Back home
      </ButtonLink>
    </section>
  );
}
