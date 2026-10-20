import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGOS } from "./brand-logos";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="marquee-row flex shrink-0 items-center"
    >
      {BRAND_LOGOS.map((brand) => (
        <li key={brand.name} className="flex shrink-0 px-2.5 lg:px-3">
          <Link
            href={brand.href}
            className="flex h-[130px] w-[210px] items-center justify-center"
            aria-label={brand.name}
            tabIndex={hidden ? -1 : undefined}
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={228}
              height={200}
              unoptimized
              className="max-h-[96px] w-auto max-w-[190px] object-contain opacity-80 transition-opacity duration-[var(--duration-base)] hover:opacity-100"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function BrandMarquee() {
  return (
    <section className="overflow-hidden bg-[var(--color-bg-canvas)] py-8">
      <div className="marquee group relative">
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
