"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import type { GalleryImage, GallerySnap } from "@/data/weddingData";

function optimizeCloudinaryUrl(src: string, width = 1200) {
  if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) return src;
  if (src.includes("/upload/q_auto,f_auto,dpr_auto,w_")) return src;
  return src.replace("/upload/", `/upload/q_auto,f_auto,dpr_auto,w_${width}/`);
}

export function Gallery({ snaps }: { snaps: GallerySnap[] }) {
  const coverLabelBySnapId: Record<string, string> = {
    "snap-1": "2월 스튜디오\n하얀 배경과 빛 - 많은 카메라",
    "snap-2": "8월 런던\nBig Ben, Westminster\n- 여름 오후의 흐린 노을 빛",
    "snap-3": "1월 동해\n속초 켄싱턴호텔, 고성 삼포해변\n- 정신을 쏙 빼놓은 바닷바람",
    "snap-4": "5월 경주\n국립경주박물관, 첨성대 가는 길, 황리단길\n- 부슬부슬 내리던 비",
  };
  const [activeId, setActiveId] = useState(snaps[0]?.id ?? "");
  const activeSnap = snaps.find((snap) => snap.id === activeId) ?? snaps[0];
  const coverLabel = coverLabelBySnapId[activeSnap?.id ?? ""] ?? `${activeSnap?.label ?? "SNAP"}\n`;
  const [coverTitle, ...coverDetailParts] = coverLabel.split("\n");
  const coverDetail = coverDetailParts.join("\n");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const lockedScrollYRef = useRef<number | null>(null);
  const preloadedModalSrcsRef = useRef<Set<string>>(new Set());

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

  useLayoutEffect(() => {
    if (!lightboxOpen) return;
    if (lockedScrollYRef.current == null) {
      lockedScrollYRef.current = window.scrollY;
    }
    const scrollY = lockedScrollYRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      window.removeEventListener("keydown", onKey);
      const restoreY =
        lockedScrollYRef.current ??
        Math.abs(Number.parseInt(document.body.style.top || "0", 10));
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      const prevScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, restoreY);
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
      lockedScrollYRef.current = null;
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
  const currentLightboxSrc = currentLightbox?.src ? optimizeCloudinaryUrl(currentLightbox.src, 1400) : undefined;

  const preloadImage = useCallback((src: string) => {
    return new Promise<void>((resolve) => {
      if (typeof window === "undefined" || !src) {
        resolve();
        return;
      }
      const optimizedSrc = optimizeCloudinaryUrl(src, 1400);
      if (preloadedModalSrcsRef.current.has(optimizedSrc)) {
        resolve();
        return;
      }
      preloadedModalSrcsRef.current.add(optimizedSrc);
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = optimizedSrc;
    });
  }, []);

  useEffect(() => {
    if (!lightboxOpen || photos.length < 2) return;
    const next = photos[(lightboxIndex + 1) % photos.length];
    const prev = photos[(lightboxIndex - 1 + photos.length) % photos.length];
    [next?.src, prev?.src].forEach((src) => {
      if (!src || typeof window === "undefined") return;
      const img = new window.Image();
      img.src = optimizeCloudinaryUrl(src, 1400);
    });
  }, [lightboxOpen, lightboxIndex, photos]);

  useEffect(() => {
    if (typeof window === "undefined" || !snaps.length) return;

    let cancelled = false;
    const active = snaps.find((snap) => snap.id === activeId) ?? snaps[0];
    const activeSources = (active?.photos ?? []).map((photo) => photo.src).filter(Boolean);
    const otherSources = snaps
      .filter((snap) => snap.id !== active?.id)
      .flatMap((snap) => snap.photos.map((photo) => photo.src).filter(Boolean));

    const runSequentialPreload = async (sources: string[]) => {
      for (const src of sources) {
        if (cancelled) return;
        await preloadImage(src);
      }
    };

    // 1) Active snap first for immediate user interaction.
    void runSequentialPreload(activeSources).then(() => {
      if (cancelled) return;

      // 2) Others in idle/background for smoother network usage.
      const win = window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
      };
      if (typeof win.requestIdleCallback === "function") {
        win.requestIdleCallback(() => {
          if (!cancelled) void runSequentialPreload(otherSources);
        });
      } else {
        window.setTimeout(() => {
          if (!cancelled) void runSequentialPreload(otherSources);
        }, 200);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [snaps, activeId, preloadImage]);

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
              data-protect-media
              className="relative h-full w-full max-h-[min(62dvh,calc(100vh-14rem))] min-h-[180px] max-w-[min(100%,480px)]"
              onClick={(e) => e.stopPropagation()}
            >
              {currentLightbox?.src ? (
                <Image
                  src={currentLightboxSrc ?? currentLightbox.src}
                  alt={currentLightbox.alt}
                  fill
                  className="object-contain drop-shadow-sm"
                  sizes="100vw"
                  priority
                  fetchPriority="high"
                  loading="eager"
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
                  className="flex h-12 w-12 items-center justify-center text-[2.1rem] font-bold leading-none text-[#2e271f] transition-colors active:scale-[0.98] [font-family:var(--font-sans)]"
                  aria-label="이전 사진"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-12 w-12 items-center justify-center text-[2.1rem] font-bold leading-none text-[#2e271f] transition-colors active:scale-[0.98] [font-family:var(--font-sans)]"
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
                    className={`h-2 w-2 shrink-0 rounded-none transition-transform ${
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
                className="rounded-lg bg-[#f6f0e8]/90 px-6 py-2 text-xs text-[#3d352b] shadow-sm transition-colors active:scale-[0.99] [font-family:var(--font-sans)]"
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
    <SectionShell animateChildrenInView className="mx-0 w-full bg-[#d2c3ad]/65">
      {lightboxPortal}

      <SectionHeading title="Gallery" titleClassName="!text-[20px]" />

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
              <div data-protect-media className="relative h-[248px] w-[188px] overflow-hidden">
                {thumb?.src ? (
                  <Image
                    src={optimizeCloudinaryUrl(thumb.src, 520)}
                    alt={thumb.alt}
                    fill
                    className={`object-contain transition-[filter,transform,opacity] duration-300 ${
                      active
                        ? "scale-[1.01] opacity-100 saturate-100 brightness-100"
                        : "opacity-90 saturate-[0.82] brightness-[0.95]"
                    }`}
                    sizes="188px"
                  />
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
      <div className="mt-3 flex items-center justify-center gap-2" aria-label="갤러리 캐러셀 인디케이터">
        {snaps.map((snap) => {
          const isActive = activeSnap?.id === snap.id;
          return (
            <span
              key={`snap-indicator-${snap.id}`}
              aria-hidden
              className={`h-1.5 w-9 rounded-none transition-colors duration-200 ${
                isActive ? "bg-[#6f5b45]" : "bg-[#6f5b45]/25"
              }`}
            />
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
                  ? "col-span-2 aspect-[3/4] min-h-[420px] w-full"
                  : idx === 3
                    ? "col-span-2 aspect-[16/10] min-h-[286px] w-full"
                    : idx === 6
                      ? "col-span-2 aspect-[16/10] min-h-[272px] w-full"
                      : idx === gridPhotos.length - 1
                        ? "col-span-2 aspect-[16/10] min-h-[272px] w-full"
                    : "aspect-[3/4] w-full"
                : isSnap2Extended
                  ? idx === 0
                    ? "col-span-2 aspect-[3/4] min-h-[420px] w-full"
                    : idx === 5 || idx === 10 || idx === 11
                      ? "col-span-2 aspect-[16/10] w-full"
                      : "aspect-[3/4] w-full"
                : isSnap3
                  ? idx === 0
                    ? "col-span-2 aspect-[3/4] min-h-[420px] w-full"
                    : idx === 6
                      ? "col-span-2 aspect-[16/10] min-h-[272px] w-full"
                      : idx === 1 || idx === 7
                        ? "col-span-2 aspect-[16/10] w-full"
                        : "aspect-[3/4] w-full"
                : idx === 0
                  ? "col-span-2 aspect-[3/4] min-h-[420px] w-full"
                  : "aspect-[3/4] w-full";

              const isOpenable = Boolean(image.src);

              const mergedClassName = `${className} relative overflow-hidden ${isOpenable ? "cursor-pointer" : ""}`;

              const style = undefined;

              const sizes =
                idx === 0 ||
                (isSnap4Extended && (idx === 3 || idx === 6)) ||
                (isSnap2Extended && (idx === 5 || idx === 10 || idx === 11)) ||
                (isSnap3 && (idx === 1 || idx === 6 || idx === 7))
                  ? "(max-width:480px) 100vw, 480px"
                  : "(max-width:480px) 52vw, 250px";

              const onHeroKeyDown = (e: React.KeyboardEvent) => {
                if (!isOpenable) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(idx);
                }
              };

              const isMainCover = idx === 0;
              const imageBoxClass = `${className.replace("col-span-2 ", "")} relative overflow-hidden ${
                isOpenable ? "cursor-pointer" : ""
              }`;

              if (isMainCover) {
                return (
                  <div key={`${activeSnap?.id}-${image.src}-${idx}`} className="col-span-2">
                    <div
                      data-protect-media
                      className={imageBoxClass}
                      style={style}
                      role={isOpenable ? "button" : undefined}
                      tabIndex={isOpenable ? 0 : undefined}
                      aria-label={isOpenable ? `${idx + 1}번째 사진 전체 보기` : undefined}
                      onClick={() => isOpenable && openLightbox(idx)}
                      onKeyDown={onHeroKeyDown}
                    >
                      {image.src ? (
                        <Image
                          src={optimizeCloudinaryUrl(image.src, 1200)}
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
                    <p className="mb-5 mt-2 mx-auto w-[86%] text-left text-[12px] leading-[1.72] tracking-[0.01em] text-[#6a5d4d] [font-family:var(--font-sans)]">
                      <span className="block font-semibold text-[#5f5141]">{coverTitle}</span>
                      {coverDetail ? <span className="mt-2 block whitespace-pre-line">{coverDetail}</span> : null}
                    </p>
                  </div>
                );
              }

              return (
                <div
                  data-protect-media
                  key={`${activeSnap?.id}-${image.src}-${idx}`}
                  className={mergedClassName}
                  style={style}
                  role={isOpenable ? "button" : undefined}
                  tabIndex={isOpenable ? 0 : undefined}
                  aria-label={isOpenable ? `${idx + 1}번째 사진 전체 보기` : undefined}
                  onClick={() => isOpenable && openLightbox(idx)}
                  onKeyDown={onHeroKeyDown}
                >
                  {image.src ? (
                    <Image
                      src={optimizeCloudinaryUrl(image.src, 1200)}
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
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#f6ede2]/80 text-[#6c5a45] transition-colors hover:bg-[#f1e5d7]"
        >
          <svg
            aria-hidden
            className="h-5 w-5 shrink-0"
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
