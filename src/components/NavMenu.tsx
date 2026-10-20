import Link from "next/link";
import type { NavSectionData } from "@/lib/catalog";

export function NavMenu({ menu }: { menu: NavSectionData[] }) {
  return (
    <nav className="relative hidden lg:block" aria-label="Shop by category">
      <div className="container-vapestore flex items-center justify-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {menu.map((section) => (
          <div key={section.label} className="group static">
            <Link
              href={section.href}
              className="flex h-[54px] items-center whitespace-nowrap border-b-2 border-transparent px-3.5 text-xs font-bold text-[#91f974] transition-colors duration-[var(--duration-base)] hover:border-[#91f974] hover:bg-white/5 hover:text-white group-hover:border-[#91f974] group-hover:bg-white/5 group-hover:text-white"
            >
              {section.label}
            </Link>

            <div className="invisible absolute inset-x-0 top-full z-50 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border-t border-[#1f2935] bg-white shadow-[var(--shadow-lg)]">
                <div className="container-vapestore py-6">
                  {section.products.length ? (
                    <ul className="grid grid-cols-2 gap-x-5 gap-y-0.5 md:grid-cols-3 lg:grid-cols-5">
                      {section.products.map((product) => (
                        <li key={product.href}>
                          <Link
                            href={product.href}
                            className="block truncate rounded-[var(--radius-8)] px-2.5 py-2 text-sm font-bold text-[#111f2a] transition-colors duration-[var(--duration-base)] hover:bg-[#E9FEE3]"
                          >
                            {product.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-2.5 py-2 text-sm text-[var(--color-text-muted)]">
                      No products yet.
                    </p>
                  )}

                  <Link
                    href={section.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5eb047] transition-colors duration-[var(--duration-base)] hover:text-[#111f2a]"
                  >
                    View all {section.total.toLocaleString()} products
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 13 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M5 9l3-3-3-3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
