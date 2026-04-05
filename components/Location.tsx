"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import { NaverMap } from "@/components/NaverMap";

export function Location({
  venueName,
  address,
  addressDetail,
  mapLat,
  mapLng,
}: {
  venueName: string;
  address: string;
  addressDetail?: string;
  mapLat: number;
  mapLng: number;
}) {
  /** Dynamic Map: 브라우저에는 Client ID만 전달. Secret 불필요. */
  const naverClientId =
    process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID?.trim() ||
    process.env.NAVER_MAP_CLIENT_ID?.trim() ||
    "";
  const mapSearchKeyword = "새마을운동중앙회";
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const urls = useMemo(() => {
    const encodedKeyword = encodeURIComponent(mapSearchKeyword);
    const encodedAppName = encodeURIComponent("com.my-invitation.web");
    return {
      naverApp: `nmap://search?query=${encodedKeyword}&appname=${encodedAppName}`,
      kakaoApp: `kakaomap://search?q=${encodedKeyword}`,
      tmapApp: `tmap://search?name=${encodedKeyword}`,
      naverWeb: `https://map.naver.com/p/search/${encodedKeyword}`,
      kakaoWeb: `https://map.kakao.com/?q=${encodedKeyword}`,
      naverStore:
        "https://apps.apple.com/kr/app/id311867728",
      kakaoStore:
        "https://apps.apple.com/kr/app/id304608425",
      tmapStore:
        "https://apps.apple.com/kr/app/t-map/id431589174",
      naverPlay:
        "https://play.google.com/store/apps/details?id=com.nhn.android.nmap",
      kakaoPlay:
        "https://play.google.com/store/apps/details?id=net.daum.android.map",
      tmapPlay:
        "https://play.google.com/store/apps/details?id=com.skt.tmap.ku",
    };
  }, [mapSearchKeyword]);

  const isMobile = () => {
    if (typeof navigator === "undefined") return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const isIos = () => {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const openAppWithFallback = (appUrl: string, storeUrl: string) => {
    if (typeof window === "undefined") return;
    let didHide = false;
    const onHide = () => {
      didHide = true;
    };
    window.addEventListener("pagehide", onHide, { once: true });
    document.addEventListener("visibilitychange", onHide, { once: true });
    window.location.href = appUrl;
    window.setTimeout(() => {
      if (!didHide) window.location.href = storeUrl;
    }, 1300);
  };

  const handleOpenNaver = () => {
    if (!isMobile()) {
      window.open(urls.naverWeb, "_blank", "noopener,noreferrer");
      return;
    }
    openAppWithFallback(urls.naverApp, isIos() ? urls.naverStore : urls.naverPlay);
  };

  const handleOpenKakao = () => {
    if (!isMobile()) {
      window.open(urls.kakaoWeb, "_blank", "noopener,noreferrer");
      return;
    }
    openAppWithFallback(urls.kakaoApp, isIos() ? urls.kakaoStore : urls.kakaoPlay);
  };

  const handleOpenTmap = () => {
    if (!isMobile()) {
      showToast("T맵은 웹 미지원입니다. 모바일에서 앱으로 열어주세요.");
      return;
    }
    openAppWithFallback(urls.tmapApp, isIos() ? urls.tmapStore : urls.tmapPlay);
  };

  return (
    <SectionShell id="location">
      <SectionHeading title="오시는 길" />
      <p className="mt-4 text-sm font-semibold text-[#3f3529]">{venueName}</p>
      <p className="text-sm leading-6 text-[#6e6150]">{address}</p>

      <div className="mt-4">
        <NaverMap
          lat={mapLat}
          lng={mapLng}
          clientId={naverClientId}
          searchLabel={`${venueName} ${address}`}
          markerLabel="새마을운동중앙회"
        />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={handleOpenNaver}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d9cbb8] bg-[#f8f1e8] px-3 py-3 text-center shadow-[0_4px_10px_rgba(84,66,44,0.08)]"
        >
          <span className="overflow-hidden rounded-md border border-[#e7dccd] bg-white transition-transform duration-200 group-active:scale-95">
            <Image
              src="/brands/naver-map.jpg"
              alt="네이버지도"
              width={28}
              height={28}
              className="h-7 w-7"
            />
          </span>
          <span className="text-[15px] font-semibold text-[#4e4235]">네이버지도</span>
        </button>
        <button
          type="button"
          onClick={handleOpenTmap}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d9cbb8] bg-[#f8f1e8] px-3 py-3 text-center shadow-[0_4px_10px_rgba(84,66,44,0.08)]"
        >
          <span className="overflow-hidden rounded-md border border-[#e7dccd] bg-white transition-transform duration-200 group-active:scale-95">
            <Image
              src="/brands/tmap.jpg"
              alt="T맵"
              width={28}
              height={28}
              className="h-7 w-7"
            />
          </span>
          <span className="text-[15px] font-semibold text-[#4e4235]">T맵</span>
        </button>
        <button
          type="button"
          onClick={handleOpenKakao}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d9cbb8] bg-[#f8f1e8] px-3 py-3 text-center shadow-[0_4px_10px_rgba(84,66,44,0.08)]"
        >
          <span className="overflow-hidden rounded-md border border-[#e7dccd] bg-white transition-transform duration-200 group-active:scale-95">
            <Image
              src="/brands/kakao-map.jpg"
              alt="카카오맵"
              width={28}
              height={28}
              className="h-7 w-7"
            />
          </span>
          <span className="text-[15px] font-semibold text-[#4e4235]">카카오맵</span>
        </button>
      </div>
      <div className="mt-5 space-y-3 p-4 text-left">
        <div className="grid grid-cols-[110px_1fr] items-center gap-x-4 gap-y-0.5">
          <p className="text-left text-sm font-semibold text-[#8f7b61]">🚗 자가용</p>
          <p className="whitespace-pre-line text-left text-sm leading-7 text-[#5a4e40]">
            {"새마을운동중앙회 내부 무료주차 가능"}
          </p>
        </div>
        <div className="h-px bg-[#b7a68d]/25" />
        <div className="grid grid-cols-[110px_1fr] items-center gap-x-4 gap-y-0.5">
          <p className="text-left text-sm font-semibold text-[#8f7b61]">🚌 대중교통</p>
          <p className="whitespace-pre-line text-left text-sm leading-7 text-[#5a4e40]">
            {"[수인분당선 서현역] AK플라자 2층 출구\n육교 맞은편 [누리 2번] 탑승\n'새마을연수원사거리' 하차 후 도보 10분"}
          </p>
        </div>
        <div className="h-px bg-[#b7a68d]/25" />
        <div className="grid grid-cols-[110px_1fr] items-center gap-x-4 gap-y-0.5">
          <p className="text-left text-sm font-semibold text-[#8f7b61]">🚐 셔틀버스</p>
          <p className="whitespace-pre-line text-left text-sm leading-7 text-[#5a4e40]">
            {"[수인분당선 서현역] 2번 출구 앞 탑승\n11:30부터 20분 간격 운행"}
          </p>
        </div>
      </div>
      {toast ? (
        <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
          <p
            role="alert"
            className="rounded-xl bg-zinc-900/90 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur"
          >
            {toast}
          </p>
        </div>
      ) : null}
    </SectionShell>
  );
}
