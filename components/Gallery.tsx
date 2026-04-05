"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import type { GallerySnap } from "@/data/weddingData";

export function Gallery({ snaps }: { snaps: GallerySnap[] }) {
  const [activeId, setActiveId] = useState(snaps[0]?.id ?? "");
  const activeSnap = snaps.find((snap) => snap.id === activeId) ?? snaps[0];
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setIsDragging(true);
    setStartX(e.clientX);
    setStartScrollLeft(el.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = e.currentTarget;
    const dx = e.clientX - startX;
    el.scrollLeft = startScrollLeft - dx;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <SectionShell>
      <SectionHeading title="갤러리" />

      <div
        className={`no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {snaps.map((snap) => {
          const active = activeSnap?.id === snap.id;
          const thumb = snap.photos[0];
          return (
            <button
              key={snap.id}
              type="button"
              onClick={() => setActiveId(snap.id)}
              className={`relative h-[220px] w-[170px] shrink-0 overflow-hidden rounded-2xl border p-1 text-left transition ${
                active
                  ? "border-[#8f7b61] bg-[#dcccb9] shadow-[0_6px_14px_rgba(82,62,39,0.18)]"
                  : "border-[#c8b59c] bg-[#efe4d6]"
              }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                {thumb?.src ? (
                  <Image src={thumb.src} alt={thumb.alt} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#dfd2c1] text-[11px] text-[#7f715f]">
                    대표 이미지
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 py-2">
                  <span className="text-xs font-medium text-[#f5f0e8]">{snap.label}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSnap?.id ?? "empty"}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mt-4 grid grid-cols-2 gap-3"
        >
          {(activeSnap?.photos ?? []).map((image, idx) => (
            <div
              key={`${activeSnap?.id}-${image.src}-${idx}`}
              className={`relative overflow-hidden rounded-lg border border-[#cbb9a2] bg-[#e9dfd2] p-1 ${
                idx === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[3/4]"
              }`}
            >
              {image.src ? (
                <div className="relative h-full w-full overflow-hidden rounded-md">
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-md border border-dashed border-[#b7a68d] bg-[#ece3d7] text-[#8a7a66]">
                  <p className="text-xs">gallery placeholder</p>
                </div>
              )}
            </div>
          ))}
          {(activeSnap?.photos ?? []).length === 0 ? (
            <div className="col-span-2 flex h-[220px] items-center justify-center rounded-md border border-dashed border-[#b7a68d] bg-[#ece3d7] text-[#8a7a66]">
              <p className="text-xs">스냅 이미지를 추가해 주세요</p>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </SectionShell>
  );
}
