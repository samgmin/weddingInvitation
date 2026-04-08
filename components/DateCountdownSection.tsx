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

const PEACH_BEIGE_TILE =
  "rounded-lg border border-[#c49a8e]/45 bg-[#f3e0d4] py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]";

export function DateCountdownSection({
  dateIso,
  groomName,
  brideName,
}: {
  dateIso: string;
  groomName: string;
  brideName: string;
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
      <p className="mt-1 text-sm text-[#3f3538]">
        {groomName}{" "}
        <span className="mx-0.5 inline-block align-[-0.05em] text-[1.05em] leading-none" aria-hidden>
          🤎
        </span>{" "}
        {brideName}의 결혼식이{" "}
        <span className="text-[#6b3d42]">{mounted ? remaining.days : "-"}</span>일 남았습니다
      </p>
      <p className="mt-2 text-xs text-[#4a3e41]">
        {`${target.getFullYear()}년 ${target.getMonth() + 1}월 ${target.getDate()}일 오후 ${
          target.getHours() % 12 || 12
        }시 ${String(target.getMinutes()).padStart(2, "0")}분`}
      </p>

      <div className="mt-4 grid grid-cols-4 gap-2 text-[#3f3538]">
        {[
          { label: "일", value: remaining.days },
          { label: "시간", value: remaining.hours },
          { label: "분", value: remaining.minutes },
          { label: "초", value: remaining.seconds },
        ].map(({ label, value }) => (
          <div key={label} className={PEACH_BEIGE_TILE}>
            <p className="text-lg font-semibold tracking-tight text-[#3f3538]">
              {mounted ? value : "-"}
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-[#c49a8e]/45 bg-[#f3e0d4] p-3 shadow-[0_2px_10px_rgba(62,38,42,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]">
        <div className="grid grid-cols-7 text-center text-[11px] text-[#6b5c60]">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-y-1 text-center text-sm text-[#3f3538]">
          {cells.map((d, idx) => (
            <span
              key={`${d}-${idx}`}
              className={
                d === String(weddingDate)
                  ? "mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#8b545c] text-[#fdf8f8]"
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

