"use client";

import { useEffect, useMemo, useState } from "react";
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
      <p className="mt-1 text-sm text-[#5f6160]">
        {namesLabel}의 결혼식이 <span className="text-[#9a6561]">{mounted ? remaining.days : "-"}</span>일 남았습니다
      </p>
      <p className="mt-2 text-xs text-[#7a807c]">
        {`${target.getFullYear()}년 ${target.getMonth() + 1}월 ${target.getDate()}일 오후 ${
          target.getHours() % 12 || 12
        }시 ${String(target.getMinutes()).padStart(2, "0")}분`}
      </p>

      <div className="mt-4 grid grid-cols-4 gap-2 text-[#4f5654]">
        {[
          { label: "일", value: remaining.days },
          { label: "시간", value: remaining.hours },
          { label: "분", value: remaining.minutes },
          { label: "초", value: remaining.seconds },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-[#cfd2ce] bg-[#ece9e2] py-2">
            <p className="text-lg font-semibold tracking-tight text-[#5c6160]">
              {mounted ? value : "-"}
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-[#cfd2ce] bg-[#ece9e2] p-3">
        <div className="grid grid-cols-7 text-center text-[11px] text-[#8d918d]">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-y-1 text-center text-sm text-[#5c6160]">
          {cells.map((d, idx) => (
            <span
              key={`${d}-${idx}`}
              className={
                d === String(weddingDate)
                  ? "mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#d3a6a7] text-[#3b2a2f]"
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

