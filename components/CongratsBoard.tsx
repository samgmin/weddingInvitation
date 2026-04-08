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

const CARDS_PER_PAGE = 8;
const NOTE_COLORS = [
  "#F2DFAC", // warm wheat
  "#F0CFCF", // rose beige
  "#CEE2B4", // sage
  "#C9E0EA", // blue gray
  "#DEC9EE", // lavender
  "#F1D2B5", // peach beige
  "#F0E0B6", // oatmeal
  "#CCE2C1", // mint
] as const;
const NOTE_ROTATIONS = [-2.8, -2.1, -1.4, -0.8, 0.8, 1.4, 2.1, 2.8] as const;

type NoteStyleMeta = { color: string; rotate: number };

/** DB id 기준으로 항상 같은 색·기울기 (새로고침해도 동일) */
function stableNoteStyleForId(id: number): NoteStyleMeta {
  const h = Math.imul(id ^ 0x9e3779b1, 0x85ebca6b) >>> 0;
  const colorIdx = h % NOTE_COLORS.length;
  const rotIdx = (h >>> 11) % NOTE_ROTATIONS.length;
  return {
    color: NOTE_COLORS[colorIdx],
    rotate: NOTE_ROTATIONS[rotIdx],
  };
}

export function CongratsBoard() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<CongratsItem[]>([]);
  const [page, setPage] = useState(1);
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

  const totalPages = Math.max(1, Math.ceil(items.length / CARDS_PER_PAGE));

  const boardItems = useMemo<BoardItem[]>(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * CARDS_PER_PAGE;
    const pageItems = items.slice(start, start + CARDS_PER_PAGE);
    if (pageItems.length >= CARDS_PER_PAGE) return pageItems;
    const minimumCards = 4;
    const visibleCount = Math.max(minimumCards, pageItems.length);
    const needed = Math.min(CARDS_PER_PAGE, visibleCount) - pageItems.length;
    const placeholders = Array.from({ length: needed }, (_, idx) => ({
        id: -(idx + 1),
        name: "",
        message: "",
        created_at: "",
        placeholder: true,
      }));
    return [...pageItems, ...placeholders];
  }, [items, page, totalPages]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

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

      const newItem = json.item as CongratsItem;
      setItems((prev) => [newItem, ...prev]);
      setPage(1);
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
      <SectionHeading title="MESSAGE BOARD" titleClassName="!text-[20px]" />

      <form
        onSubmit={onSubmit}
        className="mt-4 grid items-center gap-2"
        style={{ gridTemplateColumns: "92px minmax(0, 0.95fr) 50px" }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          maxLength={20}
          className="h-[42px] rounded-md bg-[#f1e9df] px-3 text-sm text-[#5a4e40] placeholder:text-[#a79b8d] outline-none ring-0 focus:outline-none focus:ring-2 focus:ring-[#c9bf83]/45"
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="축하 메시지를 남겨주세요"
          maxLength={300}
          className="h-[42px] rounded-md bg-[#f1e9df] px-3 text-sm text-[#5a4e40] placeholder:text-[#a79b8d] outline-none ring-0 focus:outline-none focus:ring-2 focus:ring-[#c9bf83]/45"
        />
        <button
          type="submit"
          disabled={saving}
          className="h-[42px] min-w-[50px] rounded-md bg-[#d9cfb5] px-2.5 text-xl font-semibold text-[#4f4336] disabled:opacity-60"
          aria-label="축하 메시지 저장"
        >
          ➤
        </button>
      </form>

      {status ? <p className="mt-2 text-center text-xs text-[#6e6150]">{status}</p> : null}

      <div className="mt-5 grid grid-cols-2 gap-3">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="space-y-3">
            {col.map((item) => {
              const meta = item.placeholder
                ? { color: "#F2E4D0", rotate: 0 }
                : stableNoteStyleForId(item.id);
              const d = item.created_at ? new Date(item.created_at) : null;
              const md = d ? `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, "0")}` : "";
              return (
                <article
                  key={item.id}
                  className={`relative overflow-hidden p-4 text-left shadow-[0_6px_14px_rgba(50,37,23,0.18)] ${
                    item.placeholder ? "min-h-[190px] opacity-70" : ""
                  }`}
                  style={{
                    backgroundColor: meta.color,
                    transform: `rotate(${meta.rotate}deg)`,
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.52] mix-blend-multiply"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.5) 0 0.35px, transparent 0.42px), radial-gradient(circle at 78% 82%, rgba(45,32,18,0.16) 0 0.32px, transparent 0.4px), radial-gradient(circle at 40% 55%, rgba(255,255,255,0.35) 0 0.3px, transparent 0.38px), radial-gradient(circle at 55% 30%, rgba(80,60,40,0.06) 0 0.28px, transparent 0.36px)",
                      backgroundSize: "1.2px 1.2px, 1.4px 1.4px, 1.1px 1.1px, 1.3px 1.3px",
                    }}
                  />
                  <p className="relative whitespace-pre-line break-words text-[18px] leading-8 text-[#3f3529] [font-family:var(--font-uhbee-keongkeong)]">
                    {item.message || (item.placeholder ? " " : "")}
                  </p>
                  <div className="relative my-3 h-px bg-[#8b7660]/35" />
                  <p className="relative text-base font-semibold text-[#3f3529] [font-family:var(--font-sans)]">
                    {item.name || (item.placeholder ? " " : "")}
                  </p>
                  <p className="relative text-base text-[#6e6150] [font-family:var(--font-sans)]">
                    {md || (item.placeholder ? " " : "")}
                  </p>
                </article>
              );
            })}
          </div>
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md bg-[#f7f0e6] px-2.5 py-1 text-xs text-[#5b4d3e] disabled:opacity-45"
          >
            이전
          </button>
          <span className="text-xs text-[#6e6150]">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md bg-[#f7f0e6] px-2.5 py-1 text-xs text-[#5b4d3e] disabled:opacity-45"
          >
            다음
          </button>
        </div>
      ) : null}

      {loading ? <p className="mt-3 text-center text-xs text-[#6e6150]">메시지 불러오는 중...</p> : null}
    </SectionShell>
  );
}

