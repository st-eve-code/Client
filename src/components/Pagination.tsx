import Link from "next/link";

function pageNumbers(current: number, pages: number): Array<number | "..."> {
  if (pages <= 7) {
    return Array.from({ length: pages }, (_, i) => i + 1);
  }
  const set = new Set<number>([1, pages, current - 1, current, current + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const out: Array<number | "..."> = [];
  let prev = 0;
  for (const n of nums) {
    if (n - prev > 1) out.push("...");
    out.push(n);
    prev = n;
  }
  return out;
}

export function Pagination({
  basePath,
  page,
  pages,
}: {
  basePath: string;
  page: number;
  pages: number;
}) {
  if (pages <= 1) return null;

  const linkClass =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-[var(--radius-pill)] px-3 text-sm font-bold transition-colors duration-[var(--duration-base)]";

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={`${basePath}?page=${page - 1}`} className={`${linkClass} border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]`}>
          Previous
        </Link>
      ) : null}

      {pageNumbers(page, pages).map((n, i) =>
        n === "..." ? (
          <span key={`gap-${i}`} className="px-1 text-sm text-[var(--color-gray-dark)]">
            &hellip;
          </span>
        ) : n === page ? (
          <span key={n} className={`${linkClass} bg-[#111f2a] text-white`}>
            {n}
          </span>
        ) : (
          <Link
            key={n}
            href={`${basePath}?page=${n}`}
            className={`${linkClass} border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]`}
          >
            {n}
          </Link>
        )
      )}

      {page < pages ? (
        <Link
          href={`${basePath}?page=${page + 1}`}
          className={`${linkClass} border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]`}
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}