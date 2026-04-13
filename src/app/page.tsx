import { Hero } from "@/components/home/hero";
import { FeaturedDrops } from "@/components/home/featured-drops";
import { TeamPreview } from "@/components/home/team-preview";
import { MissionSection } from "@/components/home/mission-section";
import { TournamentsStrip } from "@/components/home/tournaments-strip";
import { CustomGearCTA } from "@/components/home/custom-gear-cta";
import { ContactBand } from "@/components/home/contact-band";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDrops />
      <TeamPreview />
      <MissionSection />
      <TournamentsStrip />
      <CustomGearCTA />
      <ContactBand />
    </>
  );
}
