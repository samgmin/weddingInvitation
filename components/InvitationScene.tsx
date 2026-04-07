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
  const overlayWidth = "89.8%";
  const invi02WidthByOriginalRatio = "79.9%";

  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showInvi02, setShowInvi02] = useState(false);
  const [showInvi03, setShowInvi03] = useState(false);
  const [showInvi04, setShowInvi04] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [showWeddingInfo, setShowWeddingInfo] = useState(false);
  const invitationText = invitationMessage.join("\n");

  useEffect(() => {
    if (!wrapRef.current || entered) return;
    const node = wrapRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [entered]);

  useEffect(() => {
    if (!sectionRef.current || revealed) return;
    const node = sectionRef.current;
    const triggerReveal = () => {
      const rect = node.getBoundingClientRect();
      // invitation 섹션의 상단이 화면 상단에 닿는 순간부터 시퀀스 시작
      if (rect.top <= 4) setRevealed(true);
    };
    triggerReveal();
    window.addEventListener("scroll", triggerReveal, { passive: true });
    window.addEventListener("resize", triggerReveal);
    return () => {
      window.removeEventListener("scroll", triggerReveal);
      window.removeEventListener("resize", triggerReveal);
    };
  }, [revealed]);

  useEffect(() => {
    if (!entered) return;
    const t1 = window.setTimeout(() => setShowInvi02(true), 40);
    return () => {
      window.clearTimeout(t1);
    };
  }, [entered]);

  useEffect(() => {
    if (!revealed) return;
    const t2 = window.setTimeout(() => setShowInvi03(true), 480);
    const t3 = window.setTimeout(() => setShowInvi04(true), 1880);
    return () => {
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [revealed]);

  useEffect(() => {
    if (!showInvi04) return;
    setTypedChars(0);
    setShowWeddingInfo(false);

    const totalChars = invitationText.length;
    let doneTimer: number | null = null;
    const typer = window.setInterval(() => {
      setTypedChars((prev) => {
        const next = Math.min(prev + 1, totalChars);
        if (next >= totalChars) {
          window.clearInterval(typer);
          doneTimer = window.setTimeout(() => setShowWeddingInfo(true), 260);
        }
        return next;
      });
    }, 46);

    return () => {
      window.clearInterval(typer);
      if (doneTimer) window.clearTimeout(doneTimer);
    };
  }, [showInvi04, invitationText]);

  return (
    <section
      ref={sectionRef}
      id="invitation"
      className="-mx-3 w-[calc(100%+1.5rem)] bg-[#C9BF83] pb-4 pt-5"
    >
      <div ref={wrapRef} className="px-10 pt-16">
        <div className="relative mx-auto w-[70%]">
          <Image
            src="https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775486466/invi01_nqy8e7.png"
            alt="Invitation base"
            width={1200}
            height={1600}
            className="h-auto w-full translate-y-[7.4%] object-contain"
            sizes="(max-width: 480px) 100vw, 480px"
            priority
          />

          <Image
            src="https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775483471/invi02_o1rk0w.png"
            alt="Invitation letter overlay"
            width={1200}
            height={1600}
            className={`pointer-events-none absolute left-1/2 top-[19.8%] h-auto -translate-x-1/2 object-contain transition-all ease-out ${
              !showInvi02
                ? "-translate-y-10 opacity-0"
                : showInvi03
                  ? "duration-[2200ms] translate-y-2 opacity-0"
                  : "duration-[450ms] translate-y-0 opacity-100"
            }`}
            style={{ width: invi02WidthByOriginalRatio }}
            sizes="(max-width: 480px) 75vw, 360px"
          />

          <Image
            src="https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775483477/invi03_vwhcqb.png"
            alt="Envelope opening"
            width={1200}
            height={900}
            className={`pointer-events-none absolute -bottom-[3.1%] left-1/2 h-auto -translate-x-1/2 object-contain transition-all duration-[2200ms] ease-out ${
              showInvi03 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ width: overlayWidth }}
            sizes="(max-width: 480px) 84vw, 400px"
          />
        </div>
      </div>

      <div className="relative mt-20">
        <Image
          src="https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775483482/invi04_tlidrh.png"
          alt="Invitation paper"
          width={1400}
          height={1800}
          className={`-mb-[25%] mx-auto h-auto w-[calc(100%-5rem)] object-cover [clip-path:inset(0_0_25%_0)] transition-all duration-[2500ms] ease-out ${
            showInvi04 ? "translate-y-0 opacity-100" : "-translate-y-14 opacity-0"
          }`}
          sizes="(max-width: 480px) 100vw, 480px"
        />

        <div
          className={`absolute inset-x-0 top-0 flex h-[75%] flex-col items-center justify-center px-11 text-center transition-opacity duration-[2200ms] ${
            showInvi04 ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="[font-family:var(--font-sans)] text-[20px] font-semibold text-[#8d785b]">
            초대합니다
          </p>
          <div className="mt-8 text-[13px] leading-[1.85] text-[#4a3f32] whitespace-pre-line">
            {invitationText.slice(0, typedChars)}
          </div>
          <div
            className={`mt-10 space-y-1 text-[12px] text-[#6e6150] transition-opacity duration-500 ${
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
        className="relative z-[2] -mt-1 h-8 w-full bg-gradient-to-b from-[#C9BF83] via-[#D3A6A7]/55 to-[#d2a7a7]"
      />
    </section>
  );
}

