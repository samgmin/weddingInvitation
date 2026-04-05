"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { RsvpReminderData } from "@/data/weddingData";

const OPEN_RSVP_EVENT = "open-rsvp-modal";

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

  const storageKey = useMemo(() => "rsvp-reminder-dismissed-date", []);

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (dismissed === todayKey()) return;

    const timer = window.setTimeout(() => setOpen(true), reminder.delaySeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [reminder.delaySeconds, storageKey]);

  const close = () => {
    if (dismissForToday) {
      localStorage.setItem(storageKey, todayKey());
    }
    setOpen(false);
  };

  const openRsvp = () => {
    window.dispatchEvent(new CustomEvent(OPEN_RSVP_EVENT));
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
            className="w-full max-w-md rounded-2xl border border-[#e4dfd4] bg-[#fbfaf6] p-5 shadow-2xl"
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

            <h3 className="mt-1 text-center text-2xl text-[#3c4339]">
              {reminder.title}
            </h3>

            <p className="mt-4 whitespace-pre-line text-center text-base leading-8 text-zinc-700">
              {reminder.messageLines.join("\n")}
            </p>

            <div className="my-5 border-t border-dashed border-[#d9d2c4]" />

            <div className="space-y-1.5 text-center text-base text-zinc-700">
              <p>{reminder.namesLine}</p>
              <p>{reminder.dateLine}</p>
              <p>{reminder.venueLine}</p>
            </div>

            <button
              type="button"
              onClick={openRsvp}
              className="mt-7 w-full rounded-lg bg-forest py-2.5 text-sm font-medium text-white"
            >
              {reminder.ctaLabel}
            </button>

            <label className="mt-5 flex items-center justify-center gap-2 text-sm text-zinc-400">
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

