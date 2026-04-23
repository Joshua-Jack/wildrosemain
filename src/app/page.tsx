import { Hero } from "@/components/home/hero";
import { AboutSection } from "@/components/home/about-section";
import { FeaturedProducts } from "@/components/home/featured-products";
// import { FeatureCards } from "@/components/home/feature-cards";
// import { ContactCTA } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <div data-hero-end aria-hidden className="h-px w-full" />
      <AboutSection />
      <FeaturedProducts />
      {/* <FeatureCards /> */}
      {/* <ContactCTA /> */}
    </>
  );
}
