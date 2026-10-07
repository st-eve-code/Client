import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { PromoTiles } from "@/components/sections/PromoTiles";
import { TrendingSection } from "@/components/sections/TrendingSection";
import { BannerStrip } from "@/components/sections/BannerStrip";
import { LogoWall } from "@/components/sections/LogoWall";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PaymentBand } from "@/components/sections/PaymentBand";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col">
        <HeroSection />
        <TrustSection />
        <CategoryStrip />
        <PromoTiles />
        <TrendingSection />
        <BannerStrip />
        <LogoWall />
        <NewsletterSection />
        <ReviewsSection />
        <NewsSection />
        <FaqSection />
        <PaymentBand />
      </main>
      <SiteFooter />
    </>
  );
}