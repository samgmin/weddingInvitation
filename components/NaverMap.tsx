"use client";

import { useEffect, useRef, useState } from "react";

type NaverMaps = {
  maps: {
    Map: new (el: HTMLElement, options: { center: unknown; zoom: number }) => void;
    LatLng: new (lat: number, lng: number) => unknown;
    Marker: new (options: { position: unknown; map: unknown }) => unknown;
    InfoWindow: new (options: {
      content: string;
      borderWidth?: number;
      backgroundColor?: string;
      disableAnchor?: boolean;
    }) => {
      open: (map: unknown, anchor: unknown) => void;
    };
  };
};

declare global {
  interface Window {
    naver?: NaverMaps;
  }
}

function waitForNaverMaps(timeoutMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      if (window.naver?.maps) {
        resolve();
        return;
      }
      if (Date.now() - start >= timeoutMs) {
        reject(new Error("Naver Maps API did not become available in time"));
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}

const SCRIPT_BASES = [
  "https://oapi.map.naver.com/openapi/v3/maps.js",
  "https://openapi.map.naver.com/openapi/v3/maps.js",
] as const;

function appendMapScript(clientId: string, baseUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = `${baseUrl}?ncpKeyId=${encodeURIComponent(clientId)}`;
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${baseUrl}`));
    document.head.appendChild(script);
  });
}

async function ensureNaverMapsLoaded(clientId: string): Promise<void> {
  if (typeof window === "undefined") return;
  if (window.naver?.maps) return;

  const already = document.querySelector<HTMLScriptElement>(
    'script[src*="map.naver.com/openapi/v3/maps.js"]',
  );
  if (already) {
    await waitForNaverMaps(12000);
    if (!window.naver?.maps) {
      throw new Error("Script present but naver.maps missing (Web URL whitelist / Client ID)");
    }
    return;
  }

  let lastErr: unknown;
  for (const base of SCRIPT_BASES) {
    try {
      await appendMapScript(clientId, base);
      await waitForNaverMaps(12000);
      if (window.naver?.maps) return;
      lastErr = new Error("onload fired but naver.maps undefined");
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

function OsmFallbackMap({
  lat,
  lng,
  naverSearchUrl,
}: {
  lat: number;
  lng: number;
  naverSearchUrl: string;
}) {
  const d = 0.012;
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
  const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-[#e9e4d9]">
        <iframe
          title="지도 (OpenStreetMap)"
          src={osmSrc}
          className="h-[240px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          href={naverSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full bg-[#03C75A] py-2.5 text-center text-sm font-semibold text-white"
        >
          네이버 지도에서 보기
        </a>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-[#e3dece] py-2.5 text-center text-sm font-medium text-forest"
        >
          구글 지도에서 보기
        </a>
      </div>
      <p className="text-center text-[11px] leading-relaxed text-zinc-500">
        네이버 Dynamic Map이 막힌 경우(도메인 미등록 등) 위 지도·링크로 안내합니다. 네이버 클라우드에서 Web 서비스 URL에{" "}
        <code className="rounded bg-zinc-100 px-1">http://localhost:3000</code> 등을 등록해 보세요.
      </p>
    </div>
  );
}

export function NaverMap({
  lat,
  lng,
  clientId,
  searchLabel,
  markerLabel,
}: {
  lat: number;
  lng: number;
  clientId: string;
  searchLabel: string;
  markerLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(!!clientId);
  const [useFallback, setUseFallback] = useState(false);
  const mapDoneRef = useRef(false);

  const naverSearchUrl = `https://map.naver.com/p/search/${encodeURIComponent(searchLabel)}`;

  useEffect(() => {
    mapDoneRef.current = false;
    if (!clientId) {
      setLoading(false);
      setUseFallback(false);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    setLoading(true);
    setUseFallback(false);
    el.innerHTML = "";

    (async () => {
      try {
        await ensureNaverMapsLoaded(clientId);
        if (cancelled || !el) return;
        if (!window.naver?.maps) {
          setUseFallback(true);
          setLoading(false);
          return;
        }
        const center = new window.naver.maps.LatLng(lat, lng);
        const map = new window.naver.maps.Map(el, {
          center,
          zoom: 16,
        });
        const marker = new window.naver.maps.Marker({
          position: center,
          map,
        });
        if (markerLabel) {
          const info = new window.naver.maps.InfoWindow({
            content:
              `<div style="padding:6px 10px;border-radius:10px;background:#fff;` +
              `box-shadow:0 2px 10px rgba(15,23,42,0.12);font-size:12px;font-weight:600;` +
              `color:#334155;white-space:nowrap;">${markerLabel}</div>`,
            borderWidth: 0,
            backgroundColor: "transparent",
            disableAnchor: true,
          });
          info.open(map, marker);
        }
        mapDoneRef.current = true;
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) {
          setUseFallback(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      el.innerHTML = "";
    };
  }, [lat, lng, clientId, markerLabel]);

  if (!clientId) {
    return (
      <div className="space-y-3">
        <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-2xl border border-[#e9e4d9] bg-[#f8f5ef] px-4 py-4 text-center text-sm text-zinc-600">
          <p>
            <code className="rounded bg-white px-1">NEXT_PUBLIC_NAVER_MAP_CLIENT_ID</code>가 없어 네이버 지도 대신
            아래 지도를 표시합니다.
          </p>
        </div>
        <OsmFallbackMap lat={lat} lng={lng} naverSearchUrl={naverSearchUrl} />
      </div>
    );
  }

  if (useFallback) {
    return <OsmFallbackMap lat={lat} lng={lng} naverSearchUrl={naverSearchUrl} />;
  }

  return (
    <div className="relative min-h-[240px] w-full">
      <div
        ref={containerRef}
        className="min-h-[240px] w-full overflow-hidden rounded-2xl border border-[#e9e4d9]"
        role="presentation"
      />
      {loading ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-[#faf8f3]/95 text-sm text-zinc-500">
          지도 불러오는 중…
        </div>
      ) : null}
    </div>
  );
}
