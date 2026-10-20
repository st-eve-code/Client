"use client";

import Link from "next/link";

const NEWSLETTER_IMAGE =
  "https://www.vapestore.co.uk/cdn/shop/files/hp-newsletter-img-4.webp?v=1729003112";

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

export function NewsletterSection() {
  return (
    <section className="bg-[#080f15]">
      <div className="mx-auto flex max-w-[1062px] justify-between gap-10 px-4">
        <div className="flex max-w-[664px] flex-col justify-center gap-[33px] py-16 text-center text-white md:py-24 md:text-left">
          <div>
            <h2 className="text-[var(--text-heading-lg)] font-bold leading-[var(--leading-heading-lg)] text-[#91f974]">
              Subscribe to our newsletter!
            </h2>
            <p className="text-white/80">
              Be the first to hear about all of our exciting new arrivals,
              offers, deals and more!
            </p>
          </div>
          <div>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="relative mb-3 flex flex-col rounded-lg p-[5px] md:flex-row md:items-center md:gap-2 md:bg-[#222e36]"
            >
              <div className="relative mb-3 w-full md:mb-0">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14.3333 12.5L9.90474 8.49996M6.09522 8.49996L1.66667 12.5M1.33331 5.16663L6.77659 8.97692C7.21737 9.28547 7.43776 9.43974 7.67749 9.4995C7.88924 9.55228 8.11072 9.55228 8.32247 9.4995C8.5622 9.43974 8.78259 9.28547 9.22337 8.97692L14.6666 5.16663M4.53331 13.8333H11.4666C12.5868 13.8333 13.1468 13.8333 13.5746 13.6153C13.951 13.4236 14.2569 13.1176 14.4487 12.7413C14.6666 12.3135 14.6666 11.7534 14.6666 10.6333V6.36663C14.6666 5.24652 14.6666 4.68647 14.4487 4.25865C14.2569 3.88232 13.951 3.57636 13.5746 3.38461C13.1468 3.16663 12.5868 3.16663 11.4666 3.16663H4.53331C3.41321 3.16663 2.85316 3.16663 2.42533 3.38461C2.04901 3.57636 1.74305 3.88232 1.5513 4.25865C1.33331 4.68647 1.33331 5.24652 1.33331 6.36663V10.6333C1.33331 11.7534 1.33331 12.3135 1.5513 12.7413C1.74305 13.1176 2.04901 13.4236 2.42533 13.6153C2.85316 13.8333 3.41321 13.8333 4.53331 13.8333Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  aria-label="Email address"
                  className="block h-[46px] w-full rounded-lg bg-white py-1 pl-10 pr-1 text-[14px] text-[#111f2a] placeholder:text-[#a1a1aa]"
                />
              </div>
              <button
                type="submit"
                className="hidden cursor-pointer items-center justify-center gap-2 rounded-lg bg-black px-4 text-xs font-bold text-white transition-colors duration-[var(--duration-base)] hover:bg-[#1f2935] md:absolute md:right-2 md:top-1/2 md:flex md:h-[calc(100%-17px)] md:-translate-y-1/2"
              >
                <SendIcon className="h-4 w-4" />
                Submit
              </button>
              <button
                type="submit"
                className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black px-4 text-xs font-bold text-white transition-colors duration-[var(--duration-base)] hover:bg-[#1f2935] md:hidden"
              >
                <SendIcon className="h-4 w-4" />
                Submit
              </button>
            </form>
            <small className="text-white">
              Sign me up for marketing emails from us. It&apos;s optional &amp;
              you can{" "}
              <Link
                href="/policies/direct-marketing-policy#emailm"
                className="text-[#91f974] underline"
              >
                unsubscribe
              </Link>{" "}
              anytime. See our{" "}
              <Link href="/policies/terms-and-conditions" className="text-[#91f974]">
                Terms &amp; Conditions
              </Link>
              ,{" "}
              <Link href="/policies/privacy-policy" className="text-[#91f974]">
                Privacy Policy
              </Link>
              , and{" "}
              <Link href="/policies/direct-marketing-policy" className="text-[#91f974]">
                Direct Marketing Policy
              </Link>
              .
            </small>
          </div>
        </div>
        <div
          className="hidden h-[360px] w-[398px] shrink-0 bg-fixed bg-center md:block"
          style={{ backgroundImage: `url(${NEWSLETTER_IMAGE})` }}
        />
      </div>
    </section>
  );
}
