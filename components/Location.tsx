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
      <p className="mt-4 text-sm font-semibold text-zinc-800">{venueName}</p>
      <p className="text-sm leading-6 text-zinc-600">{address}</p>
      {addressDetail ? (
        <p className="mt-2 text-sm leading-6 text-zinc-600">{addressDetail}</p>
      ) : null}

      <div className="mt-4">
        <NaverMap
          lat={mapLat}
          lng={mapLng}
          clientId={naverClientId}
          searchLabel={`${venueName} ${address}`}
          markerLabel="새마을운동중앙회"
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={handleOpenNaver}
          className="group flex flex-col items-center justify-start gap-1.5 py-1 text-center"
        >
          <span className="overflow-hidden rounded-[15px] shadow-[0_6px_18px_rgba(15,23,42,0.18)] transition-transform duration-200 group-active:scale-95">
            <Image
              src="/brands/naver-map.jpg"
              alt="네이버지도"
              width={56}
              height={56}
              className="h-14 w-14"
            />
          </span>
          <span className="text-[11px] font-medium text-zinc-700">네이버지도</span>
        </button>
        <button
          type="button"
          onClick={handleOpenKakao}
          className="group flex flex-col items-center justify-start gap-1.5 py-1 text-center"
        >
          <span className="overflow-hidden rounded-[15px] shadow-[0_6px_18px_rgba(15,23,42,0.18)] transition-transform duration-200 group-active:scale-95">
            <Image
              src="/brands/kakao-map.jpg"
              alt="카카오맵"
              width={56}
              height={56}
              className="h-14 w-14"
            />
          </span>
          <span className="text-[11px] font-medium text-zinc-700">카카오맵</span>
        </button>
        <button
          type="button"
          onClick={handleOpenTmap}
          className="group flex flex-col items-center justify-start gap-1.5 py-1 text-center"
        >
          <span className="overflow-hidden rounded-[15px] shadow-[0_6px_18px_rgba(15,23,42,0.18)] transition-transform duration-200 group-active:scale-95">
            <Image
              src="/brands/tmap.jpg"
              alt="T맵"
              width={56}
              height={56}
              className="h-14 w-14"
            />
          </span>
          <span className="text-[11px] font-medium text-zinc-700">T맵</span>
        </button>
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
