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

export function Countdown({ dateIso }: { dateIso: string }) {
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

  const items = [
    { label: "일", value: remaining.days },
    { label: "시간", value: remaining.hours },
    { label: "분", value: remaining.minutes },
    { label: "초", value: remaining.seconds },
  ];

  return (
    <SectionShell>
      <SectionHeading
        title="D-Day"
        description="결혼식까지 남은 시간 (초 단위로 갱신됩니다)"
      />
      <div className="mt-4 grid grid-cols-4 gap-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl bg-[#f4f0e8] p-3 text-center">
            <p className="text-xl font-semibold text-forest">{mounted ? item.value : "-"}</p>
            <p className="text-[11px] text-zinc-500">{item.label}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
