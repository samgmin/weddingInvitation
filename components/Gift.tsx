"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

type Account = {
  role: string;
  name: string;
  bank: string;
  number: string;
};

export function Gift({ accounts }: { accounts: Account[] }) {
  const [openSections, setOpenSections] = useState({ groom: false, bride: false });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const groom = accounts.filter((a) => a.role.includes("신랑"));
    const bride = accounts.filter((a) => a.role.includes("신부"));
    return { groom, bride };
  }, [accounts]);

  const toggle = (side: "groom" | "bride") => {
    setOpenSections((prev) => ({ ...prev, [side]: !prev[side] }));
  };

  const copyAccount = async (account: Account) => {
    const text = `${account.bank} ${account.number} ${account.name}`;
    try {
      await navigator.clipboard.writeText(text);
      const key = `${account.role}-${account.number}`;
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 1400);
    } catch {
      window.alert("복사에 실패했습니다. 길게 눌러 직접 복사해 주세요.");
    }
  };

  const renderRows = (side: "groom" | "bride", list: Account[]) => {
    const isOpen = openSections[side];
    return (
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-[#efe9dc] border-t border-[#ece6d8]">
              {list.map((account) => {
                const key = `${account.role}-${account.number}`;
                const copied = copiedKey === key;
                return (
                  <div key={key} className="grid grid-cols-[1fr_auto] gap-3 px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-zinc-700">{account.role}</p>
                      <p className="mt-2 text-xl tracking-wide text-zinc-800">{account.number}</p>
                      <p className="mt-1 text-base text-zinc-600">
                        {account.bank} {account.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyAccount(account)}
                      className="h-10 rounded-md border border-[#ded8cc] bg-white px-4 text-sm font-medium text-zinc-700"
                    >
                      {copied ? "복사됨" : "복사"}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  };

  const caret = (isOpen: boolean) => (
    <span
      className={`text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
      aria-hidden
    >
      ⌄
    </span>
  );

  return (
    <SectionShell>
      <SectionHeading
        title="마음 전하실 곳"
      />
      <div className="mt-4 space-y-4">
        <div className="overflow-hidden rounded-2xl border border-[#ece6d8] bg-[#fffdf8]">
          <button
            type="button"
            onClick={() => toggle("groom")}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
            aria-expanded={openSections.groom}
          >
            <span className="text-lg font-semibold text-forest">신랑측</span>
            {caret(openSections.groom)}
          </button>
          {renderRows("groom", grouped.groom)}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#ece6d8] bg-[#fffdf8]">
          <button
            type="button"
            onClick={() => toggle("bride")}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
            aria-expanded={openSections.bride}
          >
            <span className="text-lg font-semibold text-forest">신부측</span>
            {caret(openSections.bride)}
          </button>
          {renderRows("bride", grouped.bride)}
        </div>
      </div>
    </SectionShell>
  );
}
