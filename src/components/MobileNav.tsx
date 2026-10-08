"use client";

import { useState } from "react";
import Link from "next/link";
import type { ShopCategory } from "@/lib/catalog";

interface Section {
  title: string;
  items: ShopCategory[];
}

function buildSections(categories: ShopCategory[]): Section[] {
  const sections: Section[] = [];
  for (const category of categories) {
    const title = category.section ?? "Products";
    const section = sections.find((s) => s.title === title);
    if (section) section.items.push(category);
    else sections.push({ title, items: [category] });
  }
  return sections;
}

export function MobileNav({ categories }: { categories: ShopCategory[] }) {
  const [open, setOpen] = useState(false);

  const vapestore = categories.filter((c) => c.group === "vapestore");
  const weedmaps = categories.filter((c) => c.group === "weedmaps");

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-8)] text-white hover:bg-white/10 transition-colors duration-[var(--duration-base)]"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-[95px] z-[99] border-t border-[var(--color-border)] bg-white shadow-[var(--shadow-lg)]">
          <div className="max-h-[calc(100vh-95px)] overflow-y-auto p-5">
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="block rounded-[var(--radius-8)] bg-[#111f2a] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Shop all categories
            </Link>
            <div className="mt-5 space-y-6">
              {vapestore.length ? (
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-gray-dark)]">
                    Vape Store
                  </p>
                  <div className="space-y-4">
                    {buildSections(vapestore).map((section) => (
                      <div key={section.title}>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                          {section.title}
                        </p>
                        <ul className="space-y-1">
                          {section.items.map((category) => (
                            <li key={category.slug}>
                              <Link
                                href={`/shop/${category.slug}`}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between gap-3 rounded-[var(--radius-8)] px-2 py-2 text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] transition-colors duration-[var(--duration-base)]"
                              >
                                <span>{category.label}</span>
                                <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-surface)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-text-muted)]">
                                  {category.count}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {weedmaps.length ? (
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-gray-dark)]">
                    Cannabis
                  </p>
                  <ul className="space-y-1">
                    {weedmaps.map((category) => (
                      <li key={category.slug}>
                        <Link
                          href={`/shop/${category.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between gap-3 rounded-[var(--radius-8)] px-2 py-2 text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] transition-colors duration-[var(--duration-base)]"
                        >
                          <span>{category.label}</span>
                          <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-surface)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-text-muted)]">
                            {category.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}