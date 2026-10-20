export interface BrandLogo {
  name: string;
  src: string;
  href: string;
}

const CDN = "https://www.vapestore.co.uk/cdn/shop/files";

export const BRAND_LOGOS: BrandLogo[] = [
  { name: "Avomi", src: `${CDN}/avomi-logo.png?v=1733344452&width=228`, href: "/shop/prefilled-pods" },
  { name: "Lost Mary", src: `${CDN}/scroll-logos-lostmary.webp?v=1775722669&width=228`, href: "/shop/prefilled-pods" },
  { name: "Vampire Vape", src: `${CDN}/vampire-vape-black-white-100.png?v=1733399171&width=228`, href: "/shop/e-liquid" },
  { name: "Vapouriz", src: `${CDN}/Vapouriz-logo.png?v=1733394827&width=228`, href: "/shop/vape-kits" },
  { name: "IVG", src: `${CDN}/scroll-logos-ivg.webp?v=1785511216&width=228`, href: "/shop/e-liquid" },
  { name: "Vaporesso", src: `${CDN}/Vaporesso-logo.png?v=1733399029&width=228`, href: "/shop/vape-kits" },
  { name: "Elf Bar", src: `${CDN}/scroll-logos-elfbar.webp?v=1775722669&width=228`, href: "/shop/prefilled-pods" },
  { name: "Double Drip", src: `${CDN}/5for10_March_24_logo_2.png?v=1733357087&width=228`, href: "/shop/e-liquid" },
  { name: "Bar Juice", src: `${CDN}/scroll-logos-barjuice.webp?v=1775722670&width=228`, href: "/shop/e-liquid" },
  { name: "Riot Squad", src: `${CDN}/Riot-logo.png?v=1733396422&width=228`, href: "/shop/e-liquid" },
  { name: "OXVA", src: `${CDN}/scroll-logos-oxva.webp?v=1745834329&width=228`, href: "/shop/vape-kits" },
  { name: "Hayati", src: `${CDN}/scroll-logos-hayati.webp?v=1745834313&width=228`, href: "/shop/prefilled-pods" },
];
