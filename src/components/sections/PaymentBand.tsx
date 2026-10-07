const PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "Amex",
  "PayPal",
  "Apple Pay",
];

const TRUST_LINES = [
  "Age 18+ verification",
  "Secure checkout",
  "30-day returns",
  "Next-day dispatch",
  "Tracked delivery",
];

export function PaymentBand() {
  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="mx-auto max-w-[670px] px-4 py-10">
        <div className="text-center mb-6">
          <h2 className="text-[var(--text-subheading)] font-extrabold text-[var(--color-text-primary)] mb-2">
            Ways to pay
          </h2>
          <p className="text-xs text-[var(--color-text-muted)]">
            Checkout is quick, secure and verified.
          </p>
        </div>

        <ul className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <li
              key={method}
              className="flex items-center justify-center rounded-[var(--radius-8)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-4 text-sm font-extrabold text-[#3f3f46]"
            >
              {method}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {TRUST_LINES.map((line) => (
            <li
              key={line}
              className="flex items-center gap-1.5 text-xs font-bold text-[#5eb047]"
            >
              <span aria-hidden="true">✓</span>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}