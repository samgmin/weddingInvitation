"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

type CongratsItem = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

type BoardItem = CongratsItem & { placeholder?: boolean };

const noteStyles = [
  "bg-[#fff36c] rotate-[-1.4deg]",
  "bg-[#ff97d3] rotate-[1deg]",
  "bg-[#aef0ff] rotate-[-0.9deg]",
  "bg-[#c7b8ff] rotate-[1.2deg]",
  "bg-[#c9ff8d] rotate-[-1deg]",
  "bg-[#ffb08b] rotate-[0.8deg]",
];

export function CongratsBoard() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<CongratsItem[]>([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/congrats", { cache: "no-store" });
        const json = (await res.json()) as { ok: boolean; items?: CongratsItem[] };
        if (json.ok) {
          setItems(json.items ?? []);
        } else {
          setStatus("메시지를 불러오지 못했습니다.");
        }
      } catch {
        setStatus("메시지를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const boardItems = useMemo<BoardItem[]>(
    () => {
      if (items.length >= 4) return items;
      const needed = 4 - items.length;
      const placeholders = Array.from({ length: needed }, (_, idx) => ({
        id: -(idx + 1),
        name: "",
        message: "",
        created_at: "",
        placeholder: true,
      }));
      return [...items, ...placeholders];
    },
    [items],
  );

  const columns = useMemo(() => {
    const left: BoardItem[] = [];
    const right: BoardItem[] = [];
    boardItems.forEach((item, idx) => (idx % 2 === 0 ? left.push(item) : right.push(item)));
    return [left, right];
  }, [boardItems]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setStatus("");

    try {
      const res = await fetch("/api/congrats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const json = (await res.json()) as { ok: boolean; item?: CongratsItem; message?: string };
      if (!json.ok || !json.item) {
        setStatus(json.message ?? "저장에 실패했습니다.");
        return;
      }

      setItems((prev) => [json.item as CongratsItem, ...prev]);
      setName("");
      setMessage("");
      setStatus("축하 메시지가 등록되었습니다!");
    } catch {
      setStatus("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SectionShell>
      <SectionHeading title="축하 메시지" />

      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-[96px_1fr_auto] gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          maxLength={20}
          className="rounded-md border border-[#cbb9a2] bg-[#f7f0e6] px-3 py-2 text-sm text-[#3f3529] placeholder:text-[#9a8c7a]"
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="축하 메시지를 남겨주세요"
          maxLength={300}
          className="rounded-md border border-[#cbb9a2] bg-[#f7f0e6] px-3 py-2 text-sm text-[#3f3529] placeholder:text-[#9a8c7a]"
        />
        <button
          type="submit"
          disabled={saving}
          className="h-[42px] w-[42px] rounded-full border border-[#b99f80] bg-[#eadcc9] text-xl text-[#4a3c2d] disabled:opacity-60"
          aria-label="축하 메시지 저장"
        >
          ➤
        </button>
      </form>

      {status ? <p className="mt-2 text-center text-xs text-[#6e6150]">{status}</p> : null}

      <div className="mt-5 grid grid-cols-2 gap-3">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="space-y-3">
            {col.map((item, idx) => {
              const s = noteStyles[(idx + colIdx) % noteStyles.length];
              const d = item.created_at ? new Date(item.created_at) : null;
              const md = d ? `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, "0")}` : "";
              return (
                <article
                  key={item.id}
                  className={`border border-[#bfa98c] p-4 text-left shadow-[0_6px_14px_rgba(50,37,23,0.18)] ${s} ${
                    item.placeholder ? "min-h-[190px] opacity-70" : ""
                  }`}
                >
                  <p className="whitespace-pre-line break-words text-[18px] leading-8 text-[#3f3529]">
                    {item.message || (item.placeholder ? " " : "")}
                  </p>
                  <div className="my-3 h-px bg-[#8b7660]/35" />
                  <p className="text-base font-semibold text-[#3f3529]">{item.name || (item.placeholder ? " " : "")}</p>
                  <p className="text-base text-[#6e6150]">{md || (item.placeholder ? " " : "")}</p>
                </article>
              );
            })}
          </div>
        ))}
      </div>

      {loading ? <p className="mt-3 text-center text-xs text-[#6e6150]">메시지 불러오는 중...</p> : null}
    </SectionShell>
  );
}

