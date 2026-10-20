import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPolicy, getPolicySlugs, policies } from "@/lib/policies";

export function generateStaticParams() {
  return getPolicySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  return policy
    ? { title: policy.title, description: policy.summary }
    : { title: "Policy" };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) {
    notFound();
  }

  const others = policies.filter((item) => item.slug !== policy.slug);

  return (
    <section
      className="relative bg-[#080f15] bg-cover bg-center md:bg-fixed"
      style={{ backgroundImage: `url("${policy.image}")` }}
    >
      <div className="absolute inset-0 bg-[#080f15]/70" />

      <div className="container-vapestore relative py-14 md:py-20">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-white/60"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                href="/"
                className="transition-colors duration-[var(--duration-base)] hover:text-white"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <svg
                className="h-3 w-3 text-white/40"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M6 4l4 4-4 4" />
              </svg>
            </li>
            <li>
              <Link
                href="/policies"
                className="transition-colors duration-[var(--duration-base)] hover:text-white"
              >
                Policies
              </Link>
            </li>
            <li aria-hidden="true">
              <svg
                className="h-3 w-3 text-white/40"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M6 4l4 4-4 4" />
              </svg>
            </li>
            <li className="font-bold text-white">{policy.title}</li>
          </ol>
        </nav>

        <h1 className="mt-5 max-w-3xl text-[var(--text-display)] leading-[var(--leading-display)] font-extrabold tracking-[var(--tracking-display)] text-white">
          {policy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--text-body)] leading-[var(--leading-body)] text-white/75">
          {policy.summary}
        </p>
        <p className="mt-6 text-xs font-medium tracking-wide text-white/50">
          Last updated {policy.updated}
        </p>

        <article className="mt-10 rounded-[var(--radius-16)] bg-white p-6 shadow-[var(--shadow-lg)] md:p-10">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {policy.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[var(--text-body)] leading-[var(--leading-body)] text-[var(--color-text-primary)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 space-y-9">
              {policy.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-[var(--text-heading)] font-bold leading-[var(--leading-heading)] text-[var(--color-text-primary)]">
                    {section.heading}
                  </h2>
                  {section.body?.length ? (
                    <div className="mt-3 space-y-3">
                      {section.body.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-[var(--text-body)] leading-[var(--leading-body)] text-[var(--color-text-muted)]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {section.list?.length ? (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[var(--text-body)] leading-[var(--leading-body)] text-[var(--color-text-muted)]"
                        >
                          <svg
                            className="mt-[0.35em] h-4 w-4 shrink-0 text-[var(--color-green-dark)]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </article>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/policies/${item.slug}`}
              className="rounded-[var(--radius-pill)] border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur transition-colors duration-[var(--duration-base)] hover:bg-white hover:text-[var(--color-text-primary)]"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
