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
            <div className="space-y-1 pt-1">
              {list.map((account) => {
                const key = `${account.role}-${account.number}`;
                const copied = copiedKey === key;
                return (
                  <div key={key} className="grid grid-cols-[1fr_auto] gap-2 px-3 py-2.5 text-left">
                    <div className="text-left">
                      <p className="whitespace-nowrap leading-snug">
                        <span className="text-[14.5px] font-medium text-[#3F3529]">{account.name}</span>
                        <span className="ml-2.5 text-[12.5px] font-normal tracking-[0.01em] text-[#6B5F50]">
                          {account.bank} {account.number}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyAccount(account)}
                      className="h-8 w-8 self-center rounded-none bg-[#f8f2eb] text-sm text-[#5A4E40]"
                      aria-label={copied ? "복사 완료" : "계좌 복사"}
                    >
                      {copied ? "✓" : "⧉"}
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
      className={`text-[#3F3529] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
      aria-hidden
    >
      ⌄
    </span>
  );

  return (
    <SectionShell className="px-11 !pb-[5.4rem]">
      <SectionHeading
        title="마음 전하실 곳"
        titleClassName="![font-family:var(--font-sans)] !text-[17.5px] !font-normal"
      />
      <div className="mt-3 space-y-2.5">
        <div className="overflow-hidden rounded-none bg-[#efe6d8] shadow-[0_2px_8px_rgba(84,66,44,0.06)]">
          <button
            type="button"
            onClick={() => toggle("groom")}
            className="flex w-full items-center justify-between px-3.5 py-2.5 text-left transition-colors hover:bg-[#e8decd]"
            aria-expanded={openSections.groom}
          >
            <span className="text-[15.5px] font-semibold text-[#3F3529]">신랑측</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-none bg-[#f8f2eb]">
              {caret(openSections.groom)}
            </span>
          </button>
          {renderRows("groom", grouped.groom)}
        </div>

        <div className="overflow-hidden rounded-none bg-[#efe6d8] shadow-[0_2px_8px_rgba(84,66,44,0.06)]">
          <button
            type="button"
            onClick={() => toggle("bride")}
            className="flex w-full items-center justify-between px-3.5 py-2.5 text-left transition-colors hover:bg-[#e8decd]"
            aria-expanded={openSections.bride}
          >
            <span className="text-[15.5px] font-semibold text-[#3F3529]">신부측</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-none bg-[#f8f2eb]">
              {caret(openSections.bride)}
            </span>
          </button>
          {renderRows("bride", grouped.bride)}
        </div>
      </div>
    </SectionShell>
  );
}
