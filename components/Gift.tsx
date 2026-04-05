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
                  <div key={key} className="grid grid-cols-[1fr_auto] gap-2 px-3 py-3 text-left">
                    <div className="text-left">
                      <p className="text-xs font-semibold tracking-[0.02em] text-[#7f715f]">{account.role}</p>
                      <p className="mt-1 text-base font-medium text-[#3f3529]">{account.name}</p>
                      <p className="mt-1 text-[15px] tracking-wide text-[#5e5243]">
                        {account.bank} {account.number}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyAccount(account)}
                      className="h-9 w-9 self-center rounded-full border border-[#ccb79c] bg-[#f3e9db] text-base text-[#6d5f4d]"
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
      className={`text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
      aria-hidden
    >
      ⌄
    </span>
  );

  return (
    <SectionShell>
      <SectionHeading title="마음 전하실 곳" />
      <div className="mt-3 space-y-2.5">
        <div className="overflow-hidden rounded-xl border border-[#d8ccb9] bg-[#f8f1e7]">
          <button
            type="button"
            onClick={() => toggle("groom")}
            className="flex w-full items-center justify-between px-3 py-2.5 text-left"
            aria-expanded={openSections.groom}
          >
            <span className="text-base font-semibold text-[#4f4336]">신랑측 계좌번호</span>
            {caret(openSections.groom)}
          </button>
          {renderRows("groom", grouped.groom)}
        </div>

        <div className="overflow-hidden rounded-xl border border-[#d8ccb9] bg-[#f8f1e7]">
          <button
            type="button"
            onClick={() => toggle("bride")}
            className="flex w-full items-center justify-between px-3 py-2.5 text-left"
            aria-expanded={openSections.bride}
          >
            <span className="text-base font-semibold text-[#4f4336]">신부측 계좌번호</span>
            {caret(openSections.bride)}
          </button>
          {renderRows("bride", grouped.bride)}
        </div>
      </div>
    </SectionShell>
  );
}
