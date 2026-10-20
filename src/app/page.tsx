import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { BentoBox } from "@/components/sections/BentoBox";
import { TrendingSection } from "@/components/sections/TrendingSection";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col">
        <HeroSection />
        <BrandMarquee />
        <BentoBox />
        <TrendingSection />
        <NewsletterSection />
        <ReviewsSection />
      </main>
      <SiteFooter />
    </>
  );
}