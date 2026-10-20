"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "nofacetrap-age-verified";

export function AgeVerification() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Start "verified" so SSR and the first client render match (no dialog open).
  // The effect below flips this if the visitor hasn't confirmed this session.
  const [verified, setVerified] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Storage unavailable (private mode) — default to showing the gate.
    }
    if (!seen) setVerified(false);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (!verified && !d.open) d.showModal();
    if (verified && d.open) d.close();
  }, [verified]);

  const accept = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore — gate will simply reappear next visit.
    }
    setVerified(true);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="agegate-title"
      onCancel={(e) => {
        // Block Escape — the gate can only be dismissed by answering.
        e.preventDefault();
      }}
      onClose={() => {
        // If something closed it without verification, reopen.
        if (!verified) dialogRef.current?.showModal();
      }}
      className="agegate-dialog m-auto max-h-[100dvh] w-full max-w-[420px] overflow-y-auto overflow-x-hidden bg-transparent p-4 backdrop:bg-black/50 backdrop:backdrop-blur-[3px]"
    >
      <style>{`
        @keyframes agegate-in { from { opacity: 0; transform: translateY(16px) scale(.98); } to { opacity: 1; transform: none; } }
        @keyframes agegate-fade { from { opacity: 0; } to { opacity: 1; } }
        dialog.agegate-dialog[open] { animation: agegate-in .26s cubic-bezier(.2,.8,.2,1); }
        dialog.agegate-dialog[open]::backdrop { animation: agegate-fade .2s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          dialog.agegate-dialog[open], dialog.agegate-dialog[open]::backdrop { animation: none; }
        }
      `}</style>

      <div className="rounded-[var(--radius-16)] bg-white p-6 text-center text-[var(--color-text-primary)] drop-shadow-[0_20px_36px_rgba(8,15,21,0.3)] sm:p-8">
        {denied ? (
          <>
            <h2 id="agegate-title" className="font-display text-[24px] font-extrabold leading-tight">
              Sorry — you must be 18 or over
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-text-muted)]">
              We can&rsquo;t let you enter nofacetrap. UK law requires you to be 18 or
              older to view and purchase vaping products.
            </p>
            <Link
              href="https://www.nhs.uk/live-well/quit-smoking/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-[13px] font-semibold text-[var(--color-text-secondary)] underline underline-offset-4"
            >
              Help with quitting smoking
            </Link>
          </>
        ) : (
          <>
            <Image
              src="/age-18.png"
              alt="18+"
              width={64}
              height={64}
              className="mx-auto h-16 w-16"
              priority
            />
            <h2 id="agegate-title" className="mt-4 font-display text-[26px] font-extrabold leading-tight">
              Are you 18 or older?
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-text-muted)]">
              You must be 18 or over to enter nofacetrap and to purchase vaping
              products in the UK.
            </p>
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={accept}
                autoFocus
                className="h-12 w-full rounded-[10px] bg-black text-[15px] font-bold text-white transition-colors duration-[var(--duration-moderate)] hover:bg-[#111f2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                Yes, I&rsquo;m 18 or over
              </button>
              <button
                type="button"
                onClick={() => setDenied(true)}
                className="h-12 w-full rounded-[10px] border border-[var(--color-border)] text-[15px] font-semibold text-[var(--color-text-muted)] transition-colors duration-150 hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                No, I&rsquo;m under 18
              </button>
            </div>
            <p className="mt-5 text-[12px] leading-relaxed text-[var(--color-text-muted)]">
              By entering, you confirm you are of legal age to purchase
              age-restricted products.{" "}
              <Link
                href="/policies/age-verification"
                className="font-semibold text-[var(--color-text-primary)] underline underline-offset-4"
              >
                Why we verify age
              </Link>
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}
