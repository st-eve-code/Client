const REVIEWS = [
  {
    rating: 5,
    author: "Verified Customer",
    body: "Customer service were really helpful explaining the products & pods. Also exactly correct in advising the strength of pod liquid I would need after I had stated this was my first pod kit.",
  },
  {
    rating: 5,
    author: "Verified Customer",
    body: "I been buying liquids, vapes and vape pods from this website for nearly two years, they have good deals always for vape liquids and once I ordered a vape it came the next day.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-4 w-4 fill-[#91f974]"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="mx-auto max-w-[975px] px-4 py-[36px]">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-bold text-[var(--color-text-primary)] mb-2">
              Latest Vapestore Reviews
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Rated &apos;Excellent&apos; by 19,176+ happy customers on
              Trustpilot
            </p>
          </div>
          <Stars count={5} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REVIEWS.map((review) => (
            <blockquote
              key={review.author + review.body}
              className="rounded-[var(--radius-12)] bg-[var(--color-bg-surface)] p-6"
            >
              <Stars count={review.rating} />
              <p className="mt-4 text-[15px] leading-[1.6] text-[var(--color-text-primary)]">
                &ldquo;{review.body}&rdquo;
              </p>
              <footer className="mt-4 text-xs font-bold text-[var(--color-text-muted)]">
                {review.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}