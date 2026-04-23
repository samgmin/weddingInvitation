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
  "rounded-md bg-[#e9e0da] py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]";

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
  const monthLabel = target.toLocaleString("en-US", { month: "short" });
  const weekdayLabel = target.toLocaleString("en-US", { weekday: "short" }).toUpperCase();
  const hour12 = target.getHours() % 12 || 12;
  const meridiem = target.getHours() < 12 ? "AM" : "PM";
  const groomGivenName = groomName.slice(-2);
  const brideGivenName = brideName.slice(-2);
  const firstWeekday = new Date(target.getFullYear(), target.getMonth(), 1).getDay();
  const daysInMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: firstWeekday + daysInMonth }, (_, i) =>
    i < firstWeekday ? "" : String(i - firstWeekday + 1),
  );

  return (
    <SectionShell>
      <p className="mt-1 text-[20px] font-semibold tracking-[0.02em] text-[#3F3529] [font-family:var(--font-uhbee-keongkeong)]">
        {`${target.getFullYear()}.${String(target.getMonth() + 1).padStart(2, "0")}.${String(target.getDate()).padStart(2, "0")}. ${weekdayLabel}`}
      </p>
      <p className="mt-2 text-[15px] font-semibold tracking-[0.04em] text-[#3F3529] [font-family:var(--font-uhbee-keongkeong)]">
        {`${hour12}:${String(target.getMinutes()).padStart(2, "0")} ${meridiem}`}
      </p>

      <div className="mx-auto mt-5 w-[92%] max-w-[320px] rounded-sm bg-[#fbf2f0]/92 px-2 py-5">
        <p className="mb-2.5 text-center text-[14px] font-semibold tracking-[0.2em] text-[#5A4E40] [font-family:var(--font-serif)]">
          {monthLabel}
        </p>
        <div className="grid grid-cols-7 gap-x-0 text-center text-[10px] text-[#5A4E40] [font-family:var(--font-serif)]">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-7 gap-x-0 gap-y-2 text-center text-[13px] text-[#3F3529] [font-family:var(--font-serif)]">
          {cells.map((d, idx) => (
            <span
              key={`${d}-${idx}`}
              className={
                d === String(weddingDate)
                  ? "mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#121014] text-[#f7f1f1]"
                  : "mx-auto flex h-8 w-8 items-center justify-center"
              }
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-5 grid w-[92%] max-w-[330px] grid-cols-4 gap-2 text-[#3F3529]">
        {[
          { label: "DAYS", value: remaining.days },
          { label: "HOURS", value: remaining.hours },
          { label: "MINUTES", value: remaining.minutes },
          { label: "SECONDS", value: remaining.seconds },
        ].map(({ label, value }) => (
          <div key={label} className={PEACH_BEIGE_TILE}>
            <p className="text-lg font-semibold tracking-tight text-[#3F3529]">
              {mounted ? value : "-"}
            </p>
            <p className="mt-1 text-[10px] font-semibold tracking-[0.08em] text-[#6B5F50]">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-[#5A4E40]">
        {groomGivenName}{" "}
        <span className="mx-0.5 inline-block align-[-0.05em] text-[1.02em] leading-none" aria-hidden>
          🤎
        </span>{" "}
        {brideGivenName}이의 결혼식이{" "}
        <span className="font-extrabold text-[#6b4a34]">{mounted ? remaining.days : "-"}</span>일 남았습니다
      </p>
    </SectionShell>
  );
}

