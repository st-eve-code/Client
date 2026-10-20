import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { policies } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Read our store policies, including terms and conditions, privacy, cookies, age verification, returns and delivery information.",
};

export default function PoliciesIndexPage() {
  return (
    <>
      <section className="bg-[#080f15]">
        <div className="container-vapestore py-12 md:py-16">
          <Breadcrumbs
            crumbs={[{ label: "Home", href: "/" }, { label: "Policies" }]}
          />
          <h1 className="mt-4 text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-extrabold text-white">
            Our Policies
          </h1>
          <p className="mt-3 max-w-2xl text-[var(--text-body)] leading-[var(--leading-body)] text-white/70">
            Everything you need to know about shopping with us, from terms and
            privacy to delivery, returns and age verification.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-bg-canvas)]">
        <div className="container-vapestore py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {policies.map((policy) => (
              <Link
                key={policy.slug}
                href={`/policies/${policy.slug}`}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-16)] border border-[var(--color-border)] bg-white transition-shadow duration-[var(--duration-base)] hover:shadow-[var(--shadow-lg)]"
              >
                <div className="relative h-40 w-full overflow-hidden bg-[#080f15]">
                  <Image
                    src={policy.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-80 transition-transform duration-[var(--duration-moderate)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080f15] to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-[var(--text-heading)] font-bold leading-[var(--leading-heading)] text-[var(--color-text-primary)]">
                    {policy.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-[1.55] text-[var(--color-text-muted)]">
                    {policy.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-green-dark)]">
                    Read more
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
