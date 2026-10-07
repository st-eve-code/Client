import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = ["Kits", "E-Liquids", "Pods", "Coils", "Brands"];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] bg-[#080f15]">
      <div className="container-vapestore h-[95px] flex items-center justify-between gap-4">
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
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-white transition-colors duration-[var(--duration-base)] ease-[var(--ease-custom-1)]"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-white">
          <span className="text-sm hidden sm:inline">Account</span>
          <span className="text-sm">{0}</span>
        </div>
      </div>
    </header>
  );
}