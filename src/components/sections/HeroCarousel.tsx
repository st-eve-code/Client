"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "./hero-slides";

const AUTOPLAY_MS = 5000;
const TRANSITION_MS = 800;
const SWIPE_THRESHOLD = 48;

function renderTitle(title: string, accent: string) {
  return title.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={accent}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const advance = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => advance(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, advance]);

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) advance(delta < 0 ? 1 : -1);
    startX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="-mt-px select-none bg-[var(--color-bg-canvas)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        startX.current = null;
      }}
    >
      <div className="relative overflow-hidden">
        <div
          className="flex will-change-transform"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: `transform ${TRANSITION_MS}ms ease`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              className="relative h-[520px] w-full shrink-0 overflow-hidden md:h-[450px]"
            >
              <Image
                src={slide.imageDesktop}
                alt=""
                fill
                priority={slide.id === slides[0].id}
                sizes="100vw"
                unoptimized
                draggable={false}
                className="hidden object-cover object-center md:block"
              />
              <Image
                src={slide.imageMobile}
                alt=""
                fill
                priority={slide.id === slides[0].id}
                sizes="100vw"
                unoptimized
                draggable={false}
                className="md:hidden object-cover object-top"
              />

              <div className="relative z-10 mx-auto flex h-full max-w-[1285px] flex-col px-4 py-6 md:flex-row-reverse md:items-center md:justify-between">
                <div className="mx-auto mt-0 md:max-w-full" aria-hidden="true" />

                <div className="mb-6 text-center text-white md:mb-10 md:self-center">
                  <div className="mx-auto max-w-xl">
                    {slide.logo ? (
                      <Image
                        src={slide.logo.src}
                        alt={slide.logo.alt}
                        width={slide.logo.width}
                        height={slide.logo.height}
                        unoptimized
                        draggable={false}
                        className="mx-auto h-auto w-full max-w-[260px] object-contain md:w-auto md:max-h-[110px]"
                      />
                    ) : null}

                    {slide.title ? (
                      <p className="mt-4 text-lg font-bold leading-snug md:text-xl">
                        {renderTitle(slide.title, slide.accentClassName ?? "text-[#acf584]")}
                      </p>
                    ) : null}

                    {slide.price ? (
                      <p className="mt-4 text-[40px] font-extrabold leading-none">
                        {slide.price}
                      </p>
                    ) : null}

                    {slide.box ? (
                      <div
                        className={`mx-auto mt-5 w-fit rounded-lg px-5 py-4 text-[42px] font-extrabold leading-none ${slide.box.className ?? ""}`}
                      >
                        {slide.box.text}
                      </div>
                    ) : null}
                  </div>

                  <Link
                    href={slide.cta.href}
                    className={`mt-6 inline-flex items-center gap-1.5 rounded-[var(--radius-8)] px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-90 ${slide.cta.className ?? ""}`}
                  >
                    {slide.cta.label}
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 13 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M5 9l3-3-3-3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10">
          <div className="container-vapestore">
            <div className="flex justify-center gap-2.5 md:justify-start">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`pointer-events-auto h-[10px] w-[10px] rounded-full border transition-colors duration-[var(--duration-base)] ${
                    i === index ? "border-[#91f974] bg-[#91f974]" : "border-white/80 bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}