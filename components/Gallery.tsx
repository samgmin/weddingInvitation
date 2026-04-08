"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import type { GalleryImage, GallerySnap } from "@/data/weddingData";

export function Gallery({ snaps }: { snaps: GallerySnap[] }) {
  const [activeId, setActiveId] = useState(snaps[0]?.id ?? "");
  const activeSnap = snaps.find((snap) => snap.id === activeId) ?? snaps[0];
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const photos = activeSnap?.photos ?? [];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setLightboxOpen(false);
  }, [activeId]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const openLightbox = useCallback((startIndex: number) => {
    if (!photos.length) return;
    setLightboxIndex(Math.min(Math.max(0, startIndex), photos.length - 1));
    setLightboxOpen(true);
  }, [photos.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  const onLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > 56) goPrev();
    else if (dx < -56) goNext();
  };

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

  const currentLightbox = photos[lightboxIndex] as GalleryImage | undefined;

  const lightboxPortal =
    mounted &&
    lightboxOpen &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="갤러리 확대 보기"
        className="fixed inset-0 z-[130] flex flex-col bg-[#2a241c]/28 backdrop-blur-[14px] backdrop-saturate-150"
        onClick={closeLightbox}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div
            className="flex min-h-0 flex-1 touch-pan-y items-center justify-center px-3 pt-4"
            onClick={closeLightbox}
            onTouchStart={onLightboxTouchStart}
            onTouchEnd={onLightboxTouchEnd}
          >
            <div
              className="relative h-full w-full max-h-[min(62dvh,calc(100vh-14rem))] min-h-[180px] max-w-[min(100%,480px)]"
              onClick={(e) => e.stopPropagation()}
            >
              {currentLightbox?.src ? (
                <Image
                  src={currentLightbox.src}
                  alt={currentLightbox.alt}
                  fill
                  className="object-contain drop-shadow-sm"
                  sizes="100vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#5a4e40]/80 [font-family:var(--font-sans)]">
                  이미지 없음
                </div>
              )}
            </div>
          </div>

          <div
            className="shrink-0 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex max-w-md flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-10">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#6b5d4a]/45 bg-[#fbf9f5]/85 text-2xl leading-none text-[#3d352b] shadow-sm transition-colors active:scale-[0.98] [font-family:var(--font-sans)]"
                  aria-label="이전 사진"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#6b5d4a]/45 bg-[#fbf9f5]/85 text-2xl leading-none text-[#3d352b] shadow-sm transition-colors active:scale-[0.98] [font-family:var(--font-sans)]"
                  aria-label="다음 사진"
                >
                  ›
                </button>
              </div>

              <div
                className="no-scrollbar flex max-w-full flex-wrap justify-center gap-2 overflow-x-auto px-1 py-1"
                role="tablist"
                aria-label="사진 선택"
              >
                {photos.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={i === lightboxIndex}
                    aria-label={`${i + 1}번째 사진`}
                    onClick={() => setLightboxIndex(i)}
                    className={`h-2 w-2 shrink-0 rounded-full transition-transform ${
                      i === lightboxIndex
                        ? "scale-125 bg-[#5c4d3d]"
                        : "bg-[#5c4d3d]/30 hover:bg-[#5c4d3d]/50"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs tabular-nums text-[#5a4e40]/90 [font-family:var(--font-sans)]">
                {photos.length ? `${lightboxIndex + 1} / ${photos.length}` : ""}
              </p>

              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-full border border-[#6b5d4a]/40 bg-[#f6f0e8]/90 px-8 py-2.5 text-sm text-[#3d352b] shadow-sm transition-colors active:scale-[0.99] [font-family:var(--font-sans)]"
                aria-label="닫기"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <SectionShell animateChildrenInView className="rounded-xl bg-[#d2c3ad]/65">
      {lightboxPortal}

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
              className={`shrink-0 text-left transition-opacity duration-200 ${active ? "opacity-100" : "opacity-[0.9]"}`}
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
            const gridPhotos = activeSnap?.photos ?? [];
            const isSnap4Extended = activeSnap?.id === "snap-4" && gridPhotos.length >= 7;
            const isSnap2Extended = activeSnap?.id === "snap-2" && gridPhotos.length >= 12;
            const isSnap3 = activeSnap?.id === "snap-3";
            return gridPhotos.map((image, idx) => {
              const className = isSnap4Extended
                ? idx === 0
                  ? "col-span-2 -mx-8 aspect-[3/4] min-h-[420px] w-[calc(100%+4rem)] max-w-[calc(100%+4rem)]"
                  : idx === 3
                    ? "col-span-2 -mx-2 aspect-[16/10] min-h-[286px] w-[calc(100%+1rem)] max-w-[calc(100%+1rem)]"
                    : idx === 6
                      ? "col-span-2 mx-auto aspect-[16/10] min-h-[272px] w-[96%] max-w-[calc(100%-0.125rem)]"
                      : idx === gridPhotos.length - 1
                        ? "col-span-2 mx-auto aspect-[16/10] min-h-[272px] w-[96%] max-w-[calc(100%-0.125rem)]"
                    : "aspect-[3/4] w-[calc(100%+0.6rem)] max-w-none"
                : isSnap2Extended
                  ? idx === 0
                    ? "col-span-2 -mx-8 aspect-[3/4] min-h-[420px] w-[calc(100%+4rem)] max-w-[calc(100%+4rem)]"
                    : idx === 5 || idx === 10 || idx === 11
                      ? "col-span-2 aspect-[16/10]"
                      : "aspect-[3/4] w-[calc(100%+0.6rem)] max-w-none"
                : isSnap3
                  ? idx === 0
                    ? "col-span-2 -mx-8 aspect-[3/4] min-h-[420px] w-[calc(100%+4rem)] max-w-[calc(100%+4rem)]"
                    : idx === 6
                      ? "col-span-2 mx-auto aspect-[16/10] min-h-[272px] w-[96%] max-w-[calc(100%-0.125rem)]"
                      : idx === 1 || idx === 7
                        ? "col-span-2 aspect-[16/10]"
                        : "aspect-[3/4] w-[calc(100%+0.6rem)] max-w-none"
                : idx === 0
                  ? "col-span-2 -mx-8 aspect-[3/4] min-h-[420px] w-[calc(100%+4rem)] max-w-[calc(100%+4rem)]"
                  : "aspect-[3/4] w-[calc(100%+0.6rem)] max-w-none";

              const isHeroOpenable = idx === 0 && Boolean(image.src);

              const mergedClassName = `${className} relative overflow-hidden ${isHeroOpenable ? "cursor-pointer" : ""}`;

              const style =
                idx === 1
                  ? { marginLeft: "-0.3rem" }
                  : idx === 2
                    ? { marginRight: "-0.3rem" }
                    : undefined;

              const sizes =
                idx === 0 ||
                (isSnap4Extended && (idx === 3 || idx === 6)) ||
                (isSnap2Extended && (idx === 5 || idx === 10 || idx === 11)) ||
                (isSnap3 && (idx === 1 || idx === 6 || idx === 7))
                  ? "(max-width:480px) 100vw, 480px"
                  : "(max-width:480px) 52vw, 250px";

              const onHeroKeyDown = (e: React.KeyboardEvent) => {
                if (!isHeroOpenable) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(0);
                }
              };

              return (
                <div
                  key={`${activeSnap?.id}-${image.src}-${idx}`}
                  className={mergedClassName}
                  style={style}
                  role={isHeroOpenable ? "button" : undefined}
                  tabIndex={isHeroOpenable ? 0 : undefined}
                  aria-label={isHeroOpenable ? "전체 사진 보기" : undefined}
                  onClick={() => isHeroOpenable && openLightbox(0)}
                  onKeyDown={onHeroKeyDown}
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#8f7a60]/45 bg-[#f6ede2]/80 text-[#6c5a45] transition-colors hover:bg-[#f1e5d7]"
        >
          <svg
            aria-hidden
            className="h-7 w-7 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 16 12 8l8 8" />
          </svg>
        </button>
      </div>
    </SectionShell>
  );
}
