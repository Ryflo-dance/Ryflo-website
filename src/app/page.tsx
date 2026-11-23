import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { RecordShowcase } from "@/components/home/RecordShowcase";
import { ShopSection } from "@/components/home/ShopSection";
import { LearnSection } from "@/components/home/LearnSection";
import { BookSection } from "@/components/home/BookSection";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { WhyRyflo } from "@/components/home/WhyRyflo";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee
        className="holo-surface text-wine"
        items={["Find your flow", "Holographic hoop tapes", "Classes with Ryana", "Live performances", "India Book of Records holder"]}
      />
      <Story />
      <RecordShowcase />
      <ShopSection />
      <LearnSection />
      <BookSection />
      <GalleryTeaser />
      <WhyRyflo />
      <FinalCTA />
    </>
  );
}
