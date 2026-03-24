"use client";

import { useEffect, useRef, useState } from "react";

export function BgmPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.5;
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await el.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "배경음악 정지" : "배경음악 재생"}
        className="fixed right-5 top-5 z-[90] h-11 w-11 rounded-full bg-forest text-white shadow-lg"
      >
        <span aria-hidden className="text-lg leading-none">
          {isPlaying ? "❚❚" : "▶"}
        </span>
      </button>
    </>
  );
}

