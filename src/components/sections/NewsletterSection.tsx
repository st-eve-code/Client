export function NewsletterSection() {
  return (
    <section className="bg-[#080f15]">
      <div className="mx-auto max-w-[664px] px-4 py-14 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#91f974] mb-3">
          Vapestore Plus+
        </p>
        <h2 className="text-[var(--text-heading)] leading-[1.3] font-extrabold text-white mb-4">
          Subscribe to our newsletter!
        </h2>
        <p className="text-sm text-white/70 leading-[1.7] max-w-md mx-auto mb-8">
          Be first to hear about new drops, exclusive deals and our best
          discounts of the month.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          action="#"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            aria-label="Email address"
            className="w-full rounded-[var(--radius-8)] border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors duration-[var(--duration-base)] focus:border-[#91f974]"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-8)] border border-[#5eb047] bg-[#d3fdc7] px-6 py-3 text-base font-bold text-[#111f2a] transition-all duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] hover:bg-[#91f974]"
          >
            Sign Me Up
          </button>
        </form>
        <p className="text-xs text-white/40 mt-4">
          Unsubscribe any time. Marketing emails, age 18+ only.
        </p>
      </div>
    </section>
  );
}