"use client";

import { useState } from "react";
import Link from "next/link";
import type { ShopCategory } from "@/lib/catalog";

type GroupKey = "vapes" | "cannabis" | "recreational";

interface Section {
  title: string;
  items: ShopCategory[];
}

const GROUPS: { key: GroupKey; label: string }[] = [
  { key: "vapes", label: "Vape Store" },
  { key: "cannabis", label: "Cannabis" },
  { key: "recreational", label: "Recreational" },
];

function buildSections(categories: ShopCategory[], group: GroupKey): Section[] {
  const sections: Section[] = [];
  for (const category of categories) {
    if (category.group !== group) continue;
    const title = category.section ?? "More";
    const section = sections.find((s) => s.title === title);
    if (section) section.items.push(category);
    else sections.push({ title, items: [category] });
  }
  return sections;
}

export function MobileNav({ categories }: { categories: ShopCategory[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-8)] text-white transition-colors duration-[var(--duration-base)] hover:bg-white/10"
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
        <div className="absolute inset-x-0 top-full z-[99] border-t border-[#1f2935] bg-white shadow-[var(--shadow-lg)]">
          <div className="max-h-[75vh] overflow-y-auto px-4 py-4">
            <Link
              href="/shop"
              onClick={close}
              className="flex min-h-[48px] items-center justify-center rounded-[var(--radius-8)] border border-[#5eb047] bg-[#d3fdc7] px-4 text-sm font-bold text-[#111f2a] transition-colors duration-[var(--duration-base)] hover:bg-[#91f974]"
            >
              Shop all categories
            </Link>

            <div className="mt-6 space-y-7">
              {GROUPS.map((group) => {
                const sections = buildSections(categories, group.key);
                if (!sections.length) return null;
                return (
                  <div key={group.key}>
                    <p className="mb-3 text-xs font-semibold text-[#5eb047]">
                      {group.label}
                    </p>
                    <div className="space-y-4">
                      {sections.map((section) => (
                        <div key={section.title}>
                          <p className="mb-1.5 px-1 text-xs font-semibold text-[#a1a1aa]">
                            {section.title}
                          </p>
                          <ul className="divide-y divide-[var(--color-border)] overflow-hidden rounded-[var(--radius-12)] border border-[var(--color-border)]">
                            {section.items.map((category) => (
                              <li key={category.slug}>
                                <Link
                                  href={`/shop/${category.slug}`}
                                  onClick={close}
                                  className="flex min-h-[52px] items-center justify-between gap-3 bg-white px-3.5 text-[15px] font-bold text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-bg-surface)]"
                                >
                                  <span>{category.label}</span>
                                  <span className="tabular rounded-[var(--radius-pill)] bg-[var(--color-bg-surface)] px-2 py-0.5 text-xs font-semibold text-[var(--color-text-muted)]">
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
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}