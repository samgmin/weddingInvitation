"use client";

import { useCallback, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized?: () => boolean;
      Share?: {
        sendDefault: (opts: Record<string, unknown>) => void;
      };
    };
    __kakaoSdkInited?: boolean;
  }
}

const KAKAO_SDK_URL =
  "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
/** 스크립트 실행 후 window.Kakao 붙을 때까지 */
const WAIT_FOR_KAKAO_MS = 12_000;
const POLL_MS = 50;
const INJECT_MAX_RETRIES = 3;
const RETRY_DELAY_MS = 600;

function kakaoDebug(...args: unknown[]) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console -- intentional SDK diagnostics
    console.debug("[Kakao SDK]", ...args);
  }
}

function getKakaoSnapshot() {
  const K = typeof window !== "undefined" ? window.Kakao : undefined;
  const initialized =
    K && typeof K.isInitialized === "function" ? K.isInitialized() : undefined;
  return {
    hasWindowKakao: Boolean(K),
    kakaoKeys: K && typeof K === "object" ? Object.keys(K) : [],
    hasShare: Boolean(K?.Share),
    isInitialized: initialized,
  };
}

/**
 * 스크립트가 실행되어 window.Kakao 가 생길 때까지 대기
 * (Kakao.Share 는 init 이후에 붙는 경우가 많아 여기서는 기다리지 않음)
 */
async function waitForKakaoObject(timeoutMs: number): Promise<void> {
  const start = Date.now();
  let lastLog = start;
  while (Date.now() - start < timeoutMs) {
    if (window.Kakao) {
      kakaoDebug("window.Kakao ready", getKakaoSnapshot());
      return;
    }
    if (process.env.NODE_ENV === "development" && Date.now() - lastLog > 1000) {
      lastLog = Date.now();
      kakaoDebug("still waiting for window.Kakao…", {
        elapsedMs: Date.now() - start,
        ...getKakaoSnapshot(),
      });
    }
    await new Promise((r) => setTimeout(r, POLL_MS));
  }
  kakaoDebug("timeout waiting for window.Kakao", getKakaoSnapshot());
  throw new Error(
    `window.Kakao not available after ${timeoutMs}ms (script blocked or failed to run)`,
  );
}

function injectScriptOnce(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    // crossOrigin 은 일부 환경에서 스크립트 실행 타이밍/노출에 영향을 줄 수 있어 제거
    script.onload = () => {
      kakaoDebug("script onload fired", KAKAO_SDK_URL);
      // 스크립트 본문이 window.Kakao 를 붙일 때까지 한 틱 양보
      queueMicrotask(() => {
        setTimeout(() => resolve(), 0);
      });
    };
    script.onerror = () => {
      kakaoDebug("script onerror (network / blocked / CORS)");
      reject(new Error("Kakao SDK script onerror"));
    };
    document.head.appendChild(script);
  });
}

/**
 * 스크립트 주입 재시도 + window.Kakao 준비까지 대기
 */
async function injectWithRetries(): Promise<void> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= INJECT_MAX_RETRIES; attempt++) {
    try {
      kakaoDebug(`inject attempt ${attempt}/${INJECT_MAX_RETRIES}`);
      await injectScriptOnce();
      await waitForKakaoObject(WAIT_FOR_KAKAO_MS);
      return;
    } catch (e) {
      lastErr = e;
      kakaoDebug(`attempt ${attempt} failed`, e);
      if (attempt < INJECT_MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

/**
 * 카카오 JS SDK 스크립트 로드 + window.Kakao 존재까지
 * (Share 사용은 Kakao.init 이후 shareKakao 에서)
 */
async function loadKakaoScript(): Promise<void> {
  if (typeof window === "undefined") return;

  if (window.Kakao) {
    kakaoDebug("already have window.Kakao", getKakaoSnapshot());
    return;
  }

  kakaoDebug("loadKakaoScript start", getKakaoSnapshot());

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src*="kakao_js_sdk"]',
  );

  if (existing) {
    kakaoDebug("existing <script> found, waiting for window.Kakao", existing.src);
    try {
      await waitForKakaoObject(WAIT_FOR_KAKAO_MS);
      return;
    } catch (e) {
      kakaoDebug(
        "existing script did not expose window.Kakao in time — removing stale tag and re-injecting",
        e,
      );
      existing.remove();
    }
  }

  await injectWithRetries();
  kakaoDebug("loadKakaoScript done", getKakaoSnapshot());
}

function initKakao(key: string) {
  const Kakao = window.Kakao;
  if (!Kakao) return;
  try {
    if (typeof Kakao.isInitialized === "function") {
      if (!Kakao.isInitialized()) Kakao.init(key);
    } else if (!window.__kakaoSdkInited) {
      Kakao.init(key);
      window.__kakaoSdkInited = true;
    }
  } catch {
    /* 이미 초기화 등 */
  }
  kakaoDebug("after Kakao.init", getKakaoSnapshot());
}

export function ShareActions({
  shareTitle,
  shareDescription,
  imageUrl,
}: {
  shareTitle: string;
  shareDescription: string;
  /** 카카오 공유용: HTTPS 절대 URL 권장 (미설정 시 텍스트만 공유에 가깝게 동작) */
  imageUrl?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [kakaoError, setKakaoError] = useState<string | null>(null);

  const copyLink = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  const shareKakao = useCallback(async () => {
    setKakaoError(null);
    const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!key) {
      setKakaoError("Kakao JS 키가 없습니다 (.env에 NEXT_PUBLIC_KAKAO_JS_KEY)");
      return;
    }

    try {
      await loadKakaoScript();
      const Kakao = window.Kakao;
      if (!Kakao) {
        kakaoDebug("no window.Kakao after load", getKakaoSnapshot());
        setKakaoError("카카오 SDK를 불러오지 못했습니다.");
        return;
      }

      initKakao(key);

      if (!Kakao.Share?.sendDefault) {
        kakaoDebug("no Kakao.Share.sendDefault after init", getKakaoSnapshot());
        setKakaoError(
          "카카오 공유 API(Kakao.Share)를 쓸 수 없습니다. 앱 키·도메인 등록·SDK 버전을 확인해 주세요.",
        );
        return;
      }

      const linkUrl =
        typeof window !== "undefined" ? window.location.href : "";
      const defaultImage =
        imageUrl ||
        (typeof window !== "undefined"
          ? `${window.location.origin}/hero.svg`
          : "");

      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: shareTitle,
          description: shareDescription,
          imageUrl: defaultImage,
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
        buttons: [
          {
            title: "청첩장 보기",
            link: {
              mobileWebUrl: linkUrl,
              webUrl: linkUrl,
            },
          },
        ],
      });
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console -- intentional
        console.error("[Kakao SDK] shareKakao error", e, getKakaoSnapshot());
      }
      setKakaoError(
        e instanceof Error ? e.message : "공유에 실패했습니다.",
      );
    }
  }, [shareTitle, shareDescription, imageUrl]);

  return (
    <SectionShell>
      <SectionHeading
        title="공유하기"
        description="카카오톡으로 초대장을 보내거나 링크를 복사해 주세요."
      />
      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={shareKakao}
          className="w-full rounded-full bg-[#fee500] py-3 text-sm font-semibold text-[#3c1e1e]"
        >
          카카오톡 공유하기
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="w-full rounded-full border border-[#e3dece] bg-white py-3 text-sm font-medium text-forest"
        >
          {copied ? "복사되었습니다!" : "모바일청첩장 링크 복사"}
        </button>
        {kakaoError ? (
          <p className="text-center text-xs text-coral">{kakaoError}</p>
        ) : null}
      </div>
    </SectionShell>
  );
}
