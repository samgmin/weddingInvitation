"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { RsvpReminderData } from "@/data/weddingData";

const OPEN_RSVP_EVENT = "open-rsvp-modal";
const OPEN_RSVP_DIRECT = "__openRsvpModal";

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function RsvpReminderPopup({ reminder }: { reminder: RsvpReminderData }) {
  const [open, setOpen] = useState(false);
  const [dismissForToday, setDismissForToday] = useState(false);

  const storageKey = useMemo(() => "rsvp-reminder-dismissed-date-v2", []);

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (dismissed === todayKey()) return;

    let opened = false;
    let timerId: number | null = null;
    let pollId: number | null = null;
    const delayMs = Math.max(0, reminder.delaySeconds) * 1000;

    const onScroll = () => {
      if (opened) return;
      const invitationEl = document.getElementById("invitation");
      if (!invitationEl) return;
      const rect = invitationEl.getBoundingClientRect();
      // invitation 섹션이 절반 이상 지나가면(다음 섹션 진입 시점) 팝업 노출
      if (rect.bottom < window.innerHeight * 0.5) {
        opened = true;
        if (delayMs > 0) {
          timerId = window.setTimeout(() => setOpen(true), delayMs);
        } else {
          setOpen(true);
        }
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (pollId) window.clearInterval(pollId);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    pollId = window.setInterval(onScroll, 500);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (timerId) window.clearTimeout(timerId);
      if (pollId) window.clearInterval(pollId);
    };
  }, [storageKey, reminder.delaySeconds]);

  const close = () => {
    if (dismissForToday) {
      localStorage.setItem(storageKey, todayKey());
    }
    setOpen(false);
  };

  const openRsvp = () => {
    const directOpen = (window as Window & { [OPEN_RSVP_DIRECT]?: () => void })[OPEN_RSVP_DIRECT];
    if (typeof directOpen === "function") directOpen();
    window.dispatchEvent(new CustomEvent(OPEN_RSVP_EVENT));
    document.dispatchEvent(new CustomEvent(OPEN_RSVP_EVENT));
    close();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4"
          style={{ backdropFilter: "grayscale(100%)" }}
          onClick={close}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full max-w-md rounded-2xl border border-[#dfd3c1] bg-[#fbf7f1] p-5 shadow-2xl [font-family:var(--font-sans)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="ml-auto block text-2xl leading-none text-zinc-400/90"
              aria-label="팝업 닫기"
            >
              ×
            </button>

            <h3 className="mt-1 text-center text-2xl text-[#3F3529]">
              {reminder.title}
            </h3>

            <p className="mt-4 whitespace-pre-line text-center text-base leading-8 text-[#6B5F50]">
              {reminder.messageLines.join("\n")}
            </p>

            <div className="my-5 border-t border-dashed border-[#d9d2c4]" />

            <div className="space-y-1.5 text-center text-base text-[#5A4E40]">
              <p>{reminder.namesLine}</p>
              <p>{reminder.dateLine}</p>
              <p>{reminder.venueLine}</p>
            </div>

            <button
              type="button"
              onClick={openRsvp}
              className="mt-7 w-full rounded-lg bg-[#C9BF83] py-2.5 text-sm font-medium text-[#3F3529]"
            >
              {reminder.ctaLabel}
            </button>

            <label className="mt-5 flex items-center justify-center gap-2 text-sm text-[#8a7d6d]">
              <input
                type="checkbox"
                checked={dismissForToday}
                onChange={(e) => setDismissForToday(e.target.checked)}
              />
              {reminder.dismissForTodayLabel}
            </label>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

