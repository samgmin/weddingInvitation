"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import type { GalleryCategory, GalleryImage } from "@/data/weddingData";

const labels: Record<GalleryCategory, string> = {
  ceremony: "Ceremony",
  snap: "Snap",
  daily: "Daily",
};

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [category, setCategory] = useState<GalleryCategory>("ceremony");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => images.filter((image) => image.category === category),
    [images, category],
  );

  const open = activeIndex !== null && filtered[activeIndex];

  return (
    <SectionShell>
      <SectionHeading title="Gallery" />
      <div className="mt-4 flex gap-2">
        {(Object.keys(labels) as GalleryCategory[]).map((key) => (
          <button
            key={key}
            onClick={() => {
              setCategory(key);
              setActiveIndex(null);
            }}
            className={`rounded-full px-3 py-1 text-xs transition ${
              category === key ? "bg-forest text-white" : "bg-[#f3efe6] text-zinc-600"
            }`}
          >
            {labels[key]}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {filtered.map((image, idx) => (
          <button
            key={`${image.src}-${idx}`}
            onClick={() => setActiveIndex(idx)}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <div
              className="mx-auto mt-14 max-w-md rounded-2xl bg-white p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={filtered[activeIndex].src}
                  alt={filtered[activeIndex].alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <button
                  className="rounded-full border px-3 py-1 text-xs"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === null ? 0 : (prev - 1 + filtered.length) % filtered.length,
                    )
                  }
                >
                  Prev
                </button>
                <p className="text-xs text-zinc-500">
                  {activeIndex + 1} / {filtered.length}
                </p>
                <button
                  className="rounded-full border px-3 py-1 text-xs"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % filtered.length,
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionShell>
  );
}
