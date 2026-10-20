export interface HeroSlideLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeroSlideCta {
  label: string;
  href: string;
  className?: string;
}

export interface HeroSlide {
  id: string;
  imageDesktop: string;
  imageMobile: string;
  align?: "left" | "center";
  logo?: HeroSlideLogo;
  title?: string;
  accentClassName?: string;
  price?: string;
  box?: { text: string; className?: string };
  cta: HeroSlideCta;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "vortex-5-for-10",
    imageMobile: "https://www.vapestore.co.uk/cdn/shop/files/HP-hero-vortex-5for10-OCT-26-mob.webp?v=1791541335",
    imageDesktop: "https://www.vapestore.co.uk/cdn/shop/files/HP-hero-vortex-5for10-OCT-26.webp?v=1791541335",
    align: "center",
    logo: {
      src: "https://www.vapestore.co.uk/cdn/shop/files/HP-vortex-logo.png?v=1784817827&width=570",
      alt: "Vortex bar series logo",
      width: 570,
      height: 270,
    },
    title: "Increased multibuy",
    box: { text: "5 for £10", className: "bg-white text-[#1c319c]" },
    cta: {
      label: "Shop Now",
      href: "/shop/e-liquid",
      className: "border border-[#54f0ce] bg-[#54f0ce] text-[#012147]",
    },
  },
  {
    id: "lost-mary-5-for-10",
    imageMobile: "https://www.vapestore.co.uk/cdn/shop/files/HP-hero-LM-5for10-OCT-26-mob.webp?v=1790939939",
    imageDesktop: "https://www.vapestore.co.uk/cdn/shop/files/HP-hero-LM-5for10-OCT-26.webp?v=1790939940",
    align: "center",
    logo: {
      src: "https://www.vapestore.co.uk/cdn/shop/files/HP-hero-lm-ns-logo.png?v=1790939940&width=670",
      alt: "Lost Mary nic salts logo",
      width: 670,
      height: 190,
    },
    title: "Increased multibuy",
    box: { text: "5 for £10", className: "bg-white text-[#af25a6]" },
    cta: {
      label: "Shop Now",
      href: "/shop/e-liquid",
      className: "border border-[#ffc7cc] bg-white text-[#af25a6]",
    },
  },
  {
    id: "voopoo-argus-g4",
    imageMobile: "https://www.vapestore.co.uk/cdn/shop/files/HP-hero-argus-g4-bundle-OCT-26-mob.webp?v=1790945094",
    imageDesktop: "https://www.vapestore.co.uk/cdn/shop/files/HP-hero-argus-g4-bundle-OCT-26.webp?v=1790939947",
    align: "left",
    logo: {
      src: "https://www.vapestore.co.uk/cdn/shop/files/HP-hero-argus-g4-bundle-logo.png?v=1790939947&width=700",
      alt: "Voopoo Argus G4 bundle logo",
      width: 700,
      height: 290,
    },
    title: "Buy the new **Argus G4** pod kit & get a **pack of pods** included",
    accentClassName: "text-[#acf584]",
    price: "£25.99",
    cta: {
      label: "Shop Now",
      href: "/shop/vape-kits",
      className: "border border-[#ffc7cc] bg-[#acf584] text-[#001c3d]",
    },
  },
];