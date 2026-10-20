import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import { getCategories, groupLabel, imageSrc } from "@/lib/catalog";
import type { ShopCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop by Category",
};

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const PAGE_SIZE = 12;

type SortKey = "default" | "az" | "count";
const SORT_CYCLE: SortKey[] = ["default", "az", "count"];
const SORT_LABEL: Record<SortKey, string> = {
  default: "Featured",
  az: "A to Z",
  count: "Most products",
};

interface CategoryGroup {
  title: string;
  slug: string;
  categories: ShopCategory[];
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function buildGroups(categories: ShopCategory[]): CategoryGroup[] {
  const groups: CategoryGroup[] = [];
  let current: CategoryGroup | null = null;
  for (const category of categories) {
    const key = category.section ?? groupLabel(category.group);
    if (!current || current.title !== key) {
      current = { title: key, slug: slugify(key), categories: [] };
      groups.push(current);
    }
    current.categories.push(category);
  }
  return groups;
}

function href(params: { group?: string; sort?: string; page?: number }) {
  const q = new URLSearchParams();
  if (params.group && params.group !== "all") q.set("group", params.group);
  if (params.sort && params.sort !== "default") q.set("sort", params.sort);
  if (params.page && params.page > 1) q.set("page", String(params.page));
  const s = q.toString();
  return s ? `/shop?${s}` : "/shop";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string; sort?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const categories = await getCategories();
  const groups = buildGroups(categories);
  const totalProducts = categories.reduce((n, c) => n + c.count, 0);

  const activeGroup = groups.some((g) => g.slug === sp.group) ? sp.group! : "all";
  const sort: SortKey = SORT_CYCLE.includes(sp.sort as SortKey)
    ? (sp.sort as SortKey)
    : "default";

  // filter -> sort -> paginate
  let visible =
    activeGroup === "all"
      ? categories
      : groups.find((g) => g.slug === activeGroup)!.categories;

  if (sort === "az") {
    visible = [...visible].sort((a, b) => a.label.localeCompare(b.label));
  } else if (sort === "count") {
    visible = [...visible].sort((a, b) => b.count - a.count);
  }

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const page = Math.min(Math.max(parseInt(sp.page ?? "1", 10) || 1, 1), pageCount);
  const pageItems = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const nextSort = SORT_CYCLE[(SORT_CYCLE.indexOf(sort) + 1) % SORT_CYCLE.length];

  const tabs = [
    { slug: "all", title: "Show all", count: categories.length },
    ...groups.map((g) => ({ slug: g.slug, title: g.title, count: g.categories.length })),
  ];

  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore pb-10 pt-5 sm:pt-14">
        {/* Title */}
        {/* <header className="text-center">
          <h1
            className={`${serif.className} text-[44px] leading-none tracking-tight text-[var(--color-text-primary)] sm:text-[64px]`}
          >
            Catalog
          </h1>
          <p className={`${mono.className} mt-3 text-[12px] text-[var(--color-text-muted)]`}>
            {totalProducts.toLocaleString()} products in {categories.length} categories
          </p>
        </header> */}

        {/* Filter row */}
        <div
          className={`${mono.className} mt-10 flex items-start justify-between gap-4 border-b border-[var(--color-border)] pb-3`}
        >
          <nav
            aria-label="Filter categories"
            className="-mb-1 flex gap-x-5 overflow-x-auto pb-1 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => {
              const active = tab.slug === activeGroup;
              return (
                <Link
                  key={tab.slug}
                  href={href({ group: tab.slug, sort })}
                  scroll={false}
                  aria-current={active ? "page" : undefined}
                  className={`relative shrink-0 whitespace-nowrap rounded-[var(--radius-4)] text-[11px] font-medium uppercase tracking-[0.04em] outline-offset-4 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] ${
                    active
                      ? "text-[var(--color-text-primary)] underline decoration-1 underline-offset-[6px]"
                      : "text-[var(--color-gray-dark)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {tab.title}
                  <sup className="ml-0.5 text-[9px] font-medium text-[var(--color-gray-dark)]">
                    {tab.count}
                  </sup>
                </Link>
              );
            })}
          </nav>

          <Link
            href={href({ group: activeGroup, sort: nextSort })}
            scroll={false}
            aria-label={`Sorted by ${SORT_LABEL[sort]}. Switch to ${SORT_LABEL[nextSort]}`}
            title={`Sort: ${SORT_LABEL[sort]}`}
            className="mt-1.5 flex shrink-0 items-center gap-1.5 rounded-[var(--radius-4)] text-[12px] text-[var(--color-text-muted)] outline-offset-4 transition-colors duration-150 hover:text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            <span className="hidden sm:inline">{SORT_LABEL[sort]}</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 20V4M8 4 4 8M8 4l4 4M16 4v16M16 20l-4-4M16 20l4-4" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        {pageItems.length ? (
          <>
            <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-y-10">
              {pageItems.map((category) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                />
              ))}
            </div>

            {pageCount > 1 ? (
              <nav
                aria-label="Pagination"
                className={`${mono.className} mt-14 flex items-center justify-center gap-1 text-[13px]`}
              >
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <Link
                    key={n}
                    href={href({ group: activeGroup, sort, page: n })}
                    aria-current={n === page ? "page" : undefined}
                    className={`grid h-9 min-w-9 place-items-center rounded-[var(--radius-pill)] px-2 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] ${
                      n === page
                        ? "bg-[var(--color-accent)] font-bold text-white"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)]"
                    }`}
                  >
                    {n}
                  </Link>
                ))}
              </nav>
            ) : null}
          </>
        ) : (
          <div className="mt-10 rounded-[var(--radius-12)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] px-6 py-12 text-center">
            <p className="text-sm font-bold text-[var(--color-text-primary)]">
              The catalogue is empty.
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Run the server first so products show up here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Category card
// ---------------------------------------------------------------------------

function CategoryCard({ category }: { category: ShopCategory }) {
  return (
    <Link
      href={`/shop/${category.slug}`}
      className="group block overflow-hidden rounded-[var(--radius-12)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] outline-offset-4 transition-colors duration-150 hover:border-[var(--color-border-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
    >
      <div className="relative aspect-square">
        {category.coverFile ? (
          <Image
            src={imageSrc(category.coverFile)}
            alt={category.label}
            fill
            unoptimized
            sizes="(min-width: 1000px) 320px, (min-width: 768px) 33vw, 50vw"
            // For full-bleed photos, swap `object-contain p-[6%] mix-blend-multiply` for `object-cover`.
            className="object-contain p-[6%] mix-blend-multiply motion-safe:transition-transform motion-safe:duration-[var(--duration-moderate)] motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center bg-[var(--color-green-light)] text-6xl text-[var(--color-green-dark)]"
          >
            {category.label.charAt(0)}
          </span>
        )}
      </div>

      <div
        className={`${mono.className} flex items-baseline justify-between gap-3 px-3 pb-3 pt-1 text-[11px] uppercase tracking-[0.03em]`}
      >
        <span className="min-w-0 break-words font-medium leading-snug text-[var(--color-text-primary)]">
          {category.label}
        </span>
        <span className="shrink-0 tabular-nums text-[var(--color-text-muted)]">
          {category.count.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}