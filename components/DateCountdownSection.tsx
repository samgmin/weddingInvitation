"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

function getRemaining(target: Date) {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function DateCountdownSection({
  dateIso,
  namesLabel,
}: {
  dateIso: string;
  namesLabel: string;
}) {
  const target = useMemo(() => new Date(dateIso), [dateIso]);
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(() => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }));

  useEffect(() => {
    setMounted(true);
    setRemaining(getRemaining(target));
    const timer = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  const weddingDate = target.getDate();
  const firstWeekday = new Date(target.getFullYear(), target.getMonth(), 1).getDay();
  const daysInMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: firstWeekday + daysInMonth }, (_, i) =>
    i < firstWeekday ? "" : String(i - firstWeekday + 1),
  );

  return (
    <SectionShell>
      <SectionHeading title="Wedding Day & Countdown" />
      <p className="mt-4 text-sm text-[#5e5243]">
        {namesLabel}의 결혼식이 <span className="text-[#8f7b61]">{mounted ? remaining.days : "-"}</span>일 남았습니다
      </p>
      <p className="mt-2 text-xs text-[#7f7364]">
        {`${target.getFullYear()}년 ${target.getMonth() + 1}월 ${target.getDate()}일 ${target.getHours()}시`}
      </p>

      <div className="mt-4 grid grid-cols-4 gap-2 text-[#3f3529]">
        {[
          ["일", remaining.days],
          ["시", remaining.hours],
          ["분", remaining.minutes],
          ["초", remaining.seconds],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-lg border border-[#cbb9a2] bg-[#f4ecdf] py-2">
            <p className="text-lg font-semibold">{mounted ? value : "-"}</p>
            <p className="text-xs text-[#8f7b61]">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-[#cbb9a2] bg-[#f4ecdf] p-3">
        <div className="grid grid-cols-7 text-center text-[11px] text-[#8f7b61]">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-y-1 text-center text-sm text-[#3f3529]">
          {cells.map((d, idx) => (
            <span
              key={`${d}-${idx}`}
              className={
                d === String(weddingDate)
                  ? "mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#cab498] text-[#2f2418]"
                  : ""
              }
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

