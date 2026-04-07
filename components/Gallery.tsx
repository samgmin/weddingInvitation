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

  const scrollToGalleryTop = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SectionShell
      className="rounded-xl bg-[#d2c3ad]/65"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22)), repeating-linear-gradient(0deg, rgba(132, 109, 83, 0.08) 0px, rgba(132, 109, 83, 0.08) 1px, transparent 1px, transparent 3px)",
      }}
    >
      <SectionHeading title="Gallery" />

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
          const thumb = snap.cover ?? snap.photos[0];
          return (
            <button
              key={snap.id}
              type="button"
              onClick={() => setActiveId(snap.id)}
              className={`shrink-0 text-left ${active ? "opacity-100" : "opacity-55"}`}
            >
              <div className="relative h-[248px] w-[188px] overflow-hidden">
                {thumb?.src ? (
                  <Image src={thumb.src} alt={thumb.alt} fill className="object-contain" sizes="188px" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#dfd2c1] text-[11px] text-[#7f715f]">
                    대표 이미지
                  </div>
                )}
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
          className="mt-4 grid grid-cols-2 gap-2.5"
        >
          {(() => {
            const photos = activeSnap?.photos ?? [];
            const isSnap4Extended = activeSnap?.id === "snap-4" && photos.length >= 7;
            const isSnap2Extended = activeSnap?.id === "snap-2" && photos.length >= 12;
            return photos.map((image, idx) => {
              const className = isSnap4Extended
                ? idx === 0
                  ? "col-span-2 -mx-8 aspect-[3/4] min-h-[420px] w-[calc(100%+4rem)] max-w-[calc(100%+4rem)]"
                  : idx === 3 || idx === 4
                    ? "col-span-2 aspect-[16/10]"
                    : "aspect-[3/4] w-[calc(100%+0.6rem)] max-w-none"
                : isSnap2Extended
                  ? idx === 0
                    ? "col-span-2 -mx-8 aspect-[3/4] min-h-[420px] w-[calc(100%+4rem)] max-w-[calc(100%+4rem)]"
                    : idx === 5 || idx === 10 || idx === 11
                      ? "col-span-2 aspect-[16/10]"
                      : "aspect-[3/4] w-[calc(100%+0.6rem)] max-w-none"
                : idx === 0
                  ? "col-span-2 -mx-8 aspect-[3/4] min-h-[420px] w-[calc(100%+4rem)] max-w-[calc(100%+4rem)]"
                  : "aspect-[3/4] w-[calc(100%+0.6rem)] max-w-none";

              const style =
                idx === 1
                  ? { marginLeft: "-0.3rem" }
                  : idx === 2
                    ? { marginRight: "-0.3rem" }
                    : undefined;

              const sizes =
                idx === 0 ||
                (isSnap4Extended && (idx === 3 || idx === 4)) ||
                (isSnap2Extended && (idx === 5 || idx === 10 || idx === 11))
                  ? "(max-width:480px) 100vw, 480px"
                  : "(max-width:480px) 52vw, 250px";

              return (
                <div
                  key={`${activeSnap?.id}-${image.src}-${idx}`}
                  className={`relative overflow-hidden ${className}`}
                  style={style}
                >
                  {image.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes={sizes}
                    />
                  ) : (
                    <div className="flex h-full min-h-[140px] items-center justify-center bg-[#ece3d7] text-[#8a7a66]">
                      <p className="text-xs">gallery placeholder</p>
                    </div>
                  )}
                </div>
              );
            });
          })()}
          {(activeSnap?.photos ?? []).length === 0 ? (
            <div className="col-span-2 flex h-[220px] items-center justify-center bg-[#ece3d7] text-[#8a7a66]">
              <p className="text-xs">스냅 이미지를 추가해 주세요</p>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={scrollToGalleryTop}
          aria-label="갤러리 상단으로 이동"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#8f7a60]/45 bg-[#f6ede2]/80 text-[22px] leading-none text-[#6c5a45] transition-colors hover:bg-[#f1e5d7]"
        >
          ˄
        </button>
      </div>
    </SectionShell>
  );
}
