"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

type Person = { relation: string; name: string; phone: string };

export function ContactSection({
  groomSide,
  brideSide,
}: {
  groomSide: Person[];
  brideSide: Person[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <SectionShell>
      <SectionHeading title="연락처" />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 rounded-full bg-[#d8e592] px-6 py-2.5 text-sm font-semibold text-[#2f3325]"
      >
        연락하기
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="mx-auto mt-16 max-w-md rounded-2xl border border-[#d8e592]/35 bg-[#2b2f24] p-5 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#f1f4e0]">연락처</h3>
                <button type="button" onClick={() => setOpen(false)} className="text-[#d8e592]">
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#d8e592]">신랑측</p>
                  <div className="space-y-3">
                    {groomSide.map((p) => (
                      <PersonRow key={`${p.relation}-${p.phone}`} person={p} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#d8e592]">신부측</p>
                  <div className="space-y-3">
                    {brideSide.map((p) => (
                      <PersonRow key={`${p.relation}-${p.phone}`} person={p} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionShell>
  );
}

function PersonRow({ person }: { person: Person }) {
  return (
    <div className="rounded-lg border border-[#d8e592]/25 p-2">
      <p className="text-xs text-[#d8e592]">{person.relation}</p>
      <p className="text-sm text-[#f1f4e0]">{person.name}</p>
      <div className="mt-1 flex gap-2 text-sm">
        <a href={`tel:${person.phone}`} className="rounded bg-[#d8e592] px-2 py-1 text-[#2f3325]">
          ☎
        </a>
        <a href={`sms:${person.phone}`} className="rounded bg-[#d8e592] px-2 py-1 text-[#2f3325]">
          ✉
        </a>
      </div>
    </div>
  );
}

