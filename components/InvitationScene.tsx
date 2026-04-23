"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function InvitationScene({
  invitationMessage,
  simpleWeddingInfo,
}: {
  invitationMessage: string[];
  simpleWeddingInfo: string[];
}) {
  const overlayWidth = "91.2%";
  const invi02WidthByOriginalRatio = "79.9%";

  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [advancedRevealed, setAdvancedRevealed] = useState(false);
  const [showInvi02, setShowInvi02] = useState(false);
  const [showInvi03, setShowInvi03] = useState(false);
  const [showInvi04, setShowInvi04] = useState(false);
  const [typedTitleChars, setTypedTitleChars] = useState(0);
  const [visibleMessageCount, setVisibleMessageCount] = useState(0);
  const [showWeddingInfo, setShowWeddingInfo] = useState(false);
  const titleText = "초대합니다";
  const messageChunkGroups = [
    ["꽃이 피는 5월,", "저희 결혼합니다."],
    ["소중한 분들 앞에서"],
    ["두사람이 서로를 약속하려 합니다."],
    ["저희의 가장 좋은 날에", "함께해주세요"],
    ["오래도록 따뜻한 마음으로", "간직하겠습니다."],
  ] as const;
  const totalMessageChunks = messageChunkGroups.reduce((sum, group) => sum + group.length, 0);

  useEffect(() => {
    if (!sectionRef.current || (revealed && advancedRevealed)) return;
    const node = sectionRef.current;
    const triggerReveal = () => {
      const rect = node.getBoundingClientRect();
      // 첫 시퀀스(헤더 + invi01/02): 섹션이 더 일찍 보이도록 시작 지점 앞당김
      if (rect.top <= window.innerHeight * 0.5) setRevealed(true);
      // 다음 시퀀스(invi03/04): 더 위로 스크롤된 뒤 시작
      if (rect.top <= window.innerHeight * 0.12) setAdvancedRevealed(true);
    };
    triggerReveal();
    window.addEventListener("scroll", triggerReveal, { passive: true });
    window.addEventListener("resize", triggerReveal);
    return () => {
      window.removeEventListener("scroll", triggerReveal);
      window.removeEventListener("resize", triggerReveal);
    };
  }, [revealed, advancedRevealed]);

  useEffect(() => {
    if (!revealed) return;
    const t1 = window.setTimeout(() => setShowInvi02(true), 40);
    return () => {
      window.clearTimeout(t1);
    };
  }, [revealed]);

  useEffect(() => {
    if (!advancedRevealed) return;
    const t2 = window.setTimeout(() => setShowInvi03(true), 140);
    const t3 = window.setTimeout(() => setShowInvi04(true), 140);
    return () => {
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [advancedRevealed]);

  useEffect(() => {
    if (!showInvi04) return;
    setTypedTitleChars(0);
    setVisibleMessageCount(0);
    setShowWeddingInfo(false);

    const totalTitleChars = titleText.length;
    let messageTimer: number | null = null;
    let infoTimer: number | null = null;

    const titleTyper = window.setInterval(() => {
      setTypedTitleChars((prev) => {
        const next = Math.min(prev + 1, totalTitleChars);
        if (next >= totalTitleChars) {
          window.clearInterval(titleTyper);
          let shown = 0;
          messageTimer = window.setInterval(() => {
            shown += 1;
            setVisibleMessageCount(Math.min(shown, totalMessageChunks));
            if (shown >= totalMessageChunks) {
              if (messageTimer) window.clearInterval(messageTimer);
              infoTimer = window.setTimeout(() => setShowWeddingInfo(true), 280);
            }
          }, 270);
        }
        return next;
      });
    }, 135);

    return () => {
      window.clearInterval(titleTyper);
      if (messageTimer) window.clearInterval(messageTimer);
      if (infoTimer) window.clearTimeout(infoTimer);
    };
  }, [showInvi04, totalMessageChunks, titleText]);

  return (
    <section
      ref={sectionRef}
      id="invitation"
      data-protect-media
      className="-mx-3 w-[calc(100%+1.5rem)] bg-[#C9BF83] pb-0 pt-10"
    >
      <p
        className={`pt-2 text-center text-[20px] tracking-[0.04em] text-[#3F3529] [font-family:var(--font-uhbee-keongkeong)] transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          revealed ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[2px]"
        }`}
      >
        Be Our Guest
      </p>
      <div className="px-10 pt-16">
        <div className="relative mx-auto w-[70%]">
          <Image
            src="https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775486466/invi01_nqy8e7.png"
            alt="Invitation base"
            width={1200}
            height={1600}
            className={`h-auto w-full translate-y-[7.4%] object-contain [will-change:transform,opacity] transition-[transform,opacity] duration-[950ms] ease-out ${
              showInvi02 ? "translate-y-[7.4%] opacity-100" : "translate-y-[9%] opacity-0"
            }`}
            sizes="(max-width: 480px) 100vw, 480px"
            priority
          />

          <Image
            src="https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775483471/invi02_o1rk0w.png"
            alt="Invitation letter overlay"
            width={1200}
            height={1600}
            className={`pointer-events-none absolute left-1/2 top-[19.8%] h-auto -translate-x-1/2 object-contain [will-change:transform,opacity] transition-[transform,opacity] ease-out ${
              !showInvi02
                ? "opacity-0"
                : showInvi03
                  ? "duration-[1700ms] opacity-0"
                  : "duration-[700ms] opacity-100"
            }`}
            style={{ width: invi02WidthByOriginalRatio }}
            sizes="(max-width: 480px) 75vw, 360px"
          />

          <Image
            src="https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775483477/invi03_vwhcqb.png"
            alt="Envelope opening"
            width={1200}
            height={900}
            className={`pointer-events-none absolute -bottom-[3.1%] left-1/2 h-auto -translate-x-1/2 object-contain [will-change:transform,opacity] transition-[transform,opacity] duration-[2200ms] ease-out ${
              showInvi03 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ width: overlayWidth }}
            sizes="(max-width: 480px) 84vw, 400px"
          />
        </div>
      </div>

      <div className="relative mt-20 pb-14">
        <Image
          src="https://res.cloudinary.com/dp4u12ke2/image/upload/v1775615911/invi04_iik06r.png"
          alt="Invitation paper"
          width={1400}
          height={1800}
          className={`mx-auto h-auto w-[calc(100%-4.75rem)] object-contain [will-change:transform,opacity] transition-[transform,opacity] duration-[1600ms] ease-out ${
            showInvi04 ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
          }`}
          sizes="(max-width: 480px) 100vw, 480px"
        />

        <div
          className={`absolute inset-x-0 top-0 flex h-[75%] translate-y-[13.5%] flex-col items-center justify-center px-11 text-center transition-opacity duration-500 ${
            showInvi04 ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="[font-family:var(--font-sans)] text-[20px] font-semibold tracking-[0.04em] text-[#8d785b]">
            {titleText.slice(0, typedTitleChars)}
            {typedTitleChars < titleText.length ? <span className="ml-0.5 animate-pulse">|</span> : null}
          </p>
          <div className="mt-9 space-y-1.5 text-[13px] leading-[1.82] tracking-[0.02em] text-[#4a3f32]">
            {messageChunkGroups.map((group, groupIdx) => {
              const groupStartIndex = messageChunkGroups
                .slice(0, groupIdx)
                .reduce((sum, chunks) => sum + chunks.length, 0);
              return (
                <p key={`line-${groupIdx}`} className="whitespace-pre-line">
                  {group.map((chunk, chunkIdx) => {
                    const chunkGlobalIndex = groupStartIndex + chunkIdx;
                    const visible = chunkGlobalIndex < visibleMessageCount;
                    return (
                      <span
                        key={`${chunk}-${chunkIdx}`}
                        className={`inline-block transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          visible
                            ? "translate-y-0 opacity-100 blur-0 text-[#4a3f32]"
                            : "translate-y-3 opacity-0 blur-[2px] text-[#4a3f32]/18"
                        } ${chunkIdx < group.length - 1 ? "mr-[0.32em]" : ""}`}
                      >
                        {chunk}
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </div>
          <div
            className={`mt-12 space-y-1.5 text-[12px] tracking-[0.015em] text-[#6e6150] transition-opacity duration-500 ${
              showWeddingInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            {simpleWeddingInfo.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Invitation ↔ Groom&Bride 경계: 섹션 문서 끝에 고정 (invi04 음수 마진으로 겹침 보정) */}
      <div
        aria-hidden
        className="relative z-[2] h-14 w-full bg-gradient-to-b from-[#C9BF83] via-[#D3A6A7]/62 to-[#d2a7a7]"
      />
    </section>
  );
}

