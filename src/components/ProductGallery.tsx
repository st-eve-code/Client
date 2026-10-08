"use client";

import { useState } from "react";
import Image from "next/image";
import { imageSrc } from "@/lib/image";

export interface GalleryImage {
  file: string;
  alt: string;
}

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const main = images[active];

  if (!main) {
    return <div className="aspect-square w-full rounded-[var(--radius-12)] bg-[var(--color-bg-surface)]" />;
  }

  return (
    <div>
      <div className="overflow-hidden rounded-[var(--radius-12)] border border-[var(--color-border)] bg-white">
        <Image
          src={imageSrc(main.file)}
          alt={main.alt}
          width={800}
          height={800}
          className="aspect-square w-full object-cover"
          unoptimized
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <button
              key={image.file}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`shrink-0 overflow-hidden rounded-[var(--radius-8)] border transition-colors duration-[var(--duration-base)] ${
                i === active
                  ? "border-[#5eb047] ring-2 ring-[#d3fdc7]"
                  : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
              }`}
            >
              <Image
                src={imageSrc(image.file)}
                alt={image.alt}
                width={120}
                height={120}
                className="aspect-square w-16 object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}