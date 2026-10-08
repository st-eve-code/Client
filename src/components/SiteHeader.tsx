import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/catalog";
import { CategoryDropdown } from "./CategoryDropdown";
import { MobileNav } from "./MobileNav";

export async function SiteHeader() {
  const categories = await getCategories();
  const quickLinks = [
    { slug: "e-liquid", label: "E-Liquids" },
    { slug: "vape-kits", label: "Vape Kits" },
    { slug: "pod-vape-kits", label: "Pods" },
    { slug: "coils", label: "Coils" },
  ]
    .map((link) => ({
      ...link,
      live: categories.some((c) => c.slug === link.slug),
    }))
    .filter((link) => link.live);

  return (
    <header className="sticky top-0 z-[100] bg-[#080f15]">
      <div className="container-vapestore">
        <div className="h-[95px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/favicon-large.png"
                alt="Vapestore"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
              <span className="hidden sm:inline text-white font-bold text-lg tracking-tight">
                Vapestore
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
              <CategoryDropdown categories={categories} />
              {quickLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={`/shop/${link.slug}`}
                  className="hover:text-white transition-colors duration-[var(--duration-base)] ease-[var(--ease-custom-1)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-white">
            <span className="text-sm hidden sm:inline">Account</span>
            <span className="text-sm">{0}</span>
            <MobileNav categories={categories} />
          </div>
        </div>
      </div>
    </header>
  );
}