"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

interface Review {
  name: string;
  role: string;
  sub: string;
  initials: string;
  tone: string;
  avatar?: string;
  quote: string;
}

const reviews: Review[] = [
  {
    name: "James M.",
    role: "Manchester",
    sub: "Verified purchase \u00b7 2 days ago",
    initials: "JM",
    tone: "#f2b8a2",
    avatar: "/avatars/james-mitchell.jpg",
    quote:
      "Spot on advice for a first pod kit. Customer service were really helpful explaining the products and pods, and exactly right on the strength of liquid I needed.",
  },
  {
    name: "Sophie T.",
    role: "Birmingham",
    sub: "Verified purchase \u00b7 1 week ago",
    initials: "ST",
    tone: "#e9a07c",
    avatar: "/avatars/sophie-turner.jpg",
    quote:
      "I've been buying liquids, vapes and pods from here for nearly two years. They always have good deals and once I ordered a vape it came the very next day.",
  },
  {
    name: "Daniel O.",
    role: "London",
    sub: "Verified purchase \u00b7 1 week ago",
    initials: "DO",
    tone: "#c9b6a6",
    avatar: "/avatars/daniel-okafor.jpg",
    quote:
      "Everything arrived sealed and exactly as described. Ordered on a Friday afternoon and had it Saturday morning. The prices beat my local shop by a mile.",
  },
  {
    name: "Aisha K.",
    role: "Leeds",
    sub: "Verified purchase \u00b7 2 weeks ago",
    initials: "AK",
    tone: "#e4b7a0",
    avatar: "/avatars/aisha-khan.jpg",
    quote:
      "Huge choice of flavours I couldn't find anywhere else. One item was out of stock so they emailed straight away and swapped it for an upgrade at no extra cost.",
  },
  {
    name: "Callum R.",
    role: "Glasgow",
    sub: "Verified purchase \u00b7 3 weeks ago",
    initials: "CR",
    tone: "#d6c0b3",
    avatar: "/avatars/callum-reid.jpg",
    quote:
      "My go-to shop now. Coils, liquid and kits are all genuine and the delivery tracking is spot on. I've never had a single issue and would highly recommend.",
  },
  {
    name: "Priya S.",
    role: "Bristol",
    sub: "Verified purchase \u00b7 1 month ago",
    initials: "PS",
    tone: "#caa79a",
    avatar: "/avatars/priya-sharma.jpg",
    quote:
      "I had a question about which coil suited my tank and they replied within minutes with a really clear explanation. Rare to get that level of service online.",
  },
];

const css = `
.rv{--ink:#0d0c14;--muted:#8b8d98;--accent:#5eb047;--w:340px;--shift:372px;
  position:relative;overflow:hidden;padding:72px 16px 64px;text-align:center;
  font-family:var(--font-sans),system-ui,sans-serif;color:var(--ink);
  background:radial-gradient(120% 80% at 50% 0%,#fff 0%,#f4f4f5 60%,#ededee 100%)}
.rv-title{margin:0 auto;max-width:560px;font-family:var(--font-display),system-ui,sans-serif;
  font-size:clamp(26px,3.3vw,36px);line-height:1.15;font-weight:700;letter-spacing:-.02em}
.rv-spark{position:absolute;color:var(--ink)}
.rv-stage{position:relative;height:370px;margin:44px auto 0;max-width:1200px}
.rv-card{position:absolute;top:0;left:50%;width:var(--w);margin-left:calc(var(--w)/-2);
  height:262px;padding:22px 24px;box-sizing:border-box;background:#fff;border-radius:28px;
  display:flex;flex-direction:column;align-items:center;cursor:pointer;
  box-shadow:0 1px 0 #fff inset,0 18px 40px -18px rgba(20,20,40,.18);
  transform:translate(calc(var(--o)*var(--shift) + var(--drag,0px)),var(--y)) rotate(var(--r));
  transition:transform .7s cubic-bezier(.22,1,.36,1),opacity .5s,box-shadow .6s;will-change:transform;
  border:0;font:inherit;color:inherit;text-align:center}
.rv-card[data-pos="0"]{z-index:3;cursor:default;box-shadow:0 24px 50px -20px rgba(20,20,40,.25)}
.rv-card[data-pos="-1"],.rv-card[data-pos="1"]{z-index:2}
.rv-card[data-pos="h"]{z-index:1;opacity:0;pointer-events:none}
.rv-stage{touch-action:pan-y;cursor:grab;user-select:none}
.rv-stage.dragging{cursor:grabbing}
.rv-stage.dragging .rv-card{transition:none}
.rv-avatar-wrap{position:relative;display:inline-block;margin-bottom:12px}
.rv-avatar{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;
  font-size:10px;font-weight:700;color:#fff;
  box-shadow:0 0 0 2px #fff,0 0 0 3px #e6e6ea}
.rv-avatar-img{width:30px;height:30px;border-radius:50%;object-fit:cover;
  display:block;box-shadow:0 0 0 2px #fff,0 0 0 3px #e6e6ea}
.rv-verified-tick{position:absolute;right:-4px;bottom:-4px;width:16px;height:16px;
  border-radius:50%;background:#5fa4e8ff;border:1px solid #fff;display:grid;place-items:center}
.rv-verified-tick svg{width:9px;height:9px;fill:none;stroke:#fff;stroke-width:3;
  stroke-linecap:round;stroke-linejoin:round}
.rv-name{display:block;margin:0;font-size:15px;font-weight:600;letter-spacing:-.01em}
.rv-sub{display:block;margin:6px 0 0;max-width:210px;font-size:11.5px;line-height:1.45;color:var(--muted)}
.rv-rate{margin-top:auto;display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700}
.rv-rate svg{width:13px;height:13px;fill:#facc15}
.rv-rate span{margin-left:4px}
.rv-quote{margin:10px 0 0;font-size:12px;line-height:1.55;font-weight:500;letter-spacing:-.005em;
  display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden}
.rv-nav{display:flex;flex-direction:column;align-items:center;gap:22px;margin-top:6px}
.rv-dots{display:flex;gap:6px}
.rv-dot{width:5px;height:5px;border-radius:99px;border:0;padding:0;background:#c9cad1;
  transition:width .35s,background .35s;cursor:pointer}
.rv-dot[aria-current="true"]{width:18px;background:var(--accent)}
.rv-arrows{display:flex;gap:14px}
.rv-arrow{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;cursor:pointer;
  border:1px solid #cfd0d6;background:#fff;color:var(--ink);transition:transform .2s,background .2s}
.rv-arrow.dark{background:var(--ink);border-color:var(--ink);color:#fff}
.rv-arrow:hover{transform:scale(1.07)}
.rv-arrow:active{transform:scale(.96)}
.rv-arrow svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;
  stroke-linecap:round;stroke-linejoin:round}
.rv button:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media (max-width:820px){.rv{--w:min(300px,78vw);--shift:min(250px,64vw)}
  .rv-card[data-pos="-1"],.rv-card[data-pos="1"]{opacity:.55}}
@media (prefers-reduced-motion:reduce){.rv-card{transition-duration:.4s,.3s,.3s}}
`;

function Star() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.5l2.5 5.6 6 .6-4.5 4 1.3 6L10 14.6 4.7 17.7 6 11.7 1.5 7.7l6-.6z" />
    </svg>
  );
}

function VerifiedTick() {
  return (
    <span className="rv-verified-tick" role="img" aria-label="Verified buyer">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function Spark({ size, style }: { size: number; style: CSSProperties }) {
  return (
    <svg className="rv-spark" width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0c.7 6.6 4.7 10.8 12 12-7.3 1.2-11.3 5.4-12 12-.7-6.6-4.7-10.8-12-12C7.3 10.8 11.3 6.6 12 0z"
      />
    </svg>
  );
}

export function ReviewsSection() {
  const n = reviews.length;
  const deck = [...reviews, ...reviews];
  const N = deck.length;
  const [step, setStep] = useState(1);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef(0);
  const moved = useRef(false);

  const mod = (a: number, m: number) => ((a % m) + m) % m;
  const active = mod(step, n);
  const offsetOf = (i: number) => {
    const d = mod(i - step, N);
    return d <= 2 ? d : d - N;
  };
  const goTo = (review: number) => {
    const diff = mod(review - active, n);
    setStep(step + (diff === 2 ? -1 : diff));
  };

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    start.current = e.clientX;
    moved.current = false;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - start.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDrag(dx);
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (drag < -50) setStep(step + 1);
    else if (drag > 50) setStep(step - 1);
    setDrag(0);
  };

  return (
    <section className="rv" aria-roledescription="carousel" aria-label="Customer reviews">
      <style>{css}</style>

      <Spark size={26} style={{ left: "17%", top: 38 }} />
      <Spark size={14} style={{ right: "28%", top: 88 }} />

      <h2 className="rv-title">Rated excellent by 19,000+ happy customers</h2>

      <div
        className={`rv-stage${dragging ? " dragging" : ""}`}
        style={{ "--drag": `${drag}px` } as CSSProperties}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {deck.map((r, i) => {
          const o = offsetOf(i);
          const pos = o === 0 ? "0" : o === -1 ? "-1" : o === 1 ? "1" : "h";
          const cfg =
            o === 0 ? [40, 0] : o === -1 ? [64, -8] : o === 1 ? [44, 6] : o < 0 ? [64, -10] : [44, 8];
          const oo = Math.max(-2, Math.min(2, o));
          return (
            <button
              key={i}
              type="button"
              className="rv-card"
              data-pos={pos}
              style={{ "--o": oo, "--y": `${cfg[0]}px`, "--r": `${cfg[1]}deg` } as CSSProperties}
              onClick={() => {
                if (!moved.current && (o === -1 || o === 1)) setStep(step + o);
              }}
              aria-hidden={pos === "h"}
              aria-label={o === 0 || pos === "h" ? undefined : `Show review from ${r.name}`}
              tabIndex={o === -1 || o === 1 ? 0 : -1}
            >
              <span className="rv-avatar-wrap">
                {r.avatar ? (
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    width={30}
                    height={30}
                    className="rv-avatar-img"
                  />
                ) : (
                  <span className="rv-avatar" style={{ background: r.tone }}>
                    {r.initials}
                  </span>
                )}
                <VerifiedTick />
              </span>
              <span className="rv-name">
                — {r.name}, {r.role}
              </span>
              <span className="rv-sub">{r.sub}</span>
              <div className="rv-rate" aria-label="Rated 5.0 out of 5">
                {[0, 1, 2, 3, 4].map((k) => (
                  <Star key={k} />
                ))}
                <span>5.0</span>
              </div>
              <span className="rv-quote">&ldquo;{r.quote}&rdquo;</span>
            </button>
          );
        })}
      </div>

      <div className="rv-nav">
        <div className="rv-dots">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              className="rv-dot"
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="rv-arrows">
          <button
            type="button"
            className="rv-arrow"
            aria-label="Previous review"
            onClick={() => setStep(step - 1)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="rv-arrow dark"
            aria-label="Next review"
            onClick={() => setStep(step + 1)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
