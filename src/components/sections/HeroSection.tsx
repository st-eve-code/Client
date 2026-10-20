import { HeroCarousel } from "./HeroCarousel";
import { HERO_SLIDES } from "./hero-slides";

export function HeroSection() {
  return (
    <>
      <h1 className="sr-only">nofacetrap - Online Vape Shop</h1>
      <HeroCarousel slides={HERO_SLIDES} />
    </>
  );
}