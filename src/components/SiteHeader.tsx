import Image from "next/image";
import Link from "next/link";
import { getCategories, getNavSections } from "@/lib/catalog";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { MobileNav } from "./MobileNav";
import { NavMenu } from "./NavMenu";
import { NavSearch, type SearchCategory } from "./NavSearch";
import { UspBar } from "./UspBar";
import { FavouritesNavIcon } from "./FavouritesNavIcon";
import { CartNavIcon } from "./CartNavIcon";

export async function SiteHeader() {
  const [categories, menu] = await Promise.all([getCategories(), getNavSections()]);

  const searchCategories: SearchCategory[] = categories.map((category) => ({
    slug: category.slug,
    label: category.label,
    count: category.count,
  }));

  return (
    <div className="sticky top-0 z-[100]">
      <div className="border-b border-[#1f2935] bg-[#111f2a]">
        <div className="container-vapestore flex items-center justify-center gap-2 py-2">
          <p className="text-[12px] font-bold text-white">
            Black Market Friday &mdash; 10% discount with code{" "}
            <span className="text-[#91f974]">VS10</span>
          </p>
        </div>
      </div>

      <header className="bg-[#080f15]">
        <div className="container-vapestore flex items-center justify-between gap-x-4 py-3">
          <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-4">
            <MobileNav categories={categories} />
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/noface.png"
                alt="nofacetrap"
                width={60}
                height={60}
                className="h-11 w-11 rounded-full sm:h-[60px] sm:w-[60px]"
                priority
              />
              <span className="font-display hidden text-2xl font-extrabold text-white sm:inline">
                nofacetrap
              </span>
            </Link>
          </div>

          <NavSearch categories={searchCategories} />

          <div className="flex shrink-0 items-center gap-4">
            <CurrencyDropdown />
            <div aria-hidden="true" className="h-9 w-px bg-[#1b374c]" />
            <FavouritesNavIcon />
            <CartNavIcon />
          </div>
        </div>

        <NavMenu menu={menu} />
      </header>

      <UspBar />
    </div>
  );
}
