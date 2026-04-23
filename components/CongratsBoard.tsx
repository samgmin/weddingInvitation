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

const NOTE_COLORS = [
  "#F8F1DE", // ivory (warm yellow replaced)
  "#F0CFCF", // rose beige
  "#CEE2B4", // sage
  "#C4DFF0", // blue gray (slightly bluer)
  "#DEC9EE", // lavender
  "#F1D2B5", // peach beige
  "#F0E0B6", // oatmeal
  "#C7DCD8", // mint (less saturated)
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

function colorIndexOf(color: string) {
  const idx = NOTE_COLORS.indexOf(color as (typeof NOTE_COLORS)[number]);
  return idx < 0 ? 0 : idx;
}

function fixedColorByName(name: string) {
  const normalized = name.trim();
  if (normalized === "지원") return "#F8F1DE"; // ivory
  if (normalized === "태형") return "#F0E0B6"; // oatmeal
  if (normalized === "너의 락동지 지연이가") return "#F0E0B6"; // oatmeal
  if (normalized === "상민") return "#F0E0B6"; // oatmeal
  return null;
}

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

  const boardItems = useMemo<BoardItem[]>(() => {
    if (items.length > 0) return items;
    const needed = 4;
    const placeholders = Array.from({ length: needed }, (_, idx) => ({
      id: -(idx + 1),
      name: "",
      message: "",
      created_at: "",
      placeholder: true,
    }));
    return placeholders;
  }, [items]);

  const columns = useMemo(() => {
    const left: BoardItem[] = [];
    const right: BoardItem[] = [];
    boardItems.forEach((item, idx) => (idx % 2 === 0 ? left.push(item) : right.push(item)));
    return [left, right];
  }, [boardItems]);

  const noteStyleById = useMemo(() => {
    const map = new Map<number, NoteStyleMeta>();
    const pickedColorIdx = new Map<number, number>();

    boardItems.forEach((item, idx) => {
      if (item.placeholder) return;

      const base = stableNoteStyleForId(item.id);
      const baseIdx = colorIndexOf(base.color);
      const forbidden = new Set<number>();

      // 같은 열의 바로 위 카드와 색상 중복 방지
      const above = boardItems[idx - 2];
      if (above && !above.placeholder) {
        const aboveIdx = pickedColorIdx.get(above.id);
        if (aboveIdx !== undefined) forbidden.add(aboveIdx);
      }

      // 같은 행의 좌우 카드와 색상 중복 방지 (오른쪽 카드 처리 시점)
      if (idx % 2 === 1) {
        const left = boardItems[idx - 1];
        if (left && !left.placeholder) {
          const leftIdx = pickedColorIdx.get(left.id);
          if (leftIdx !== undefined) forbidden.add(leftIdx);
        }
      }

      let chosenIdx = baseIdx;
      const fixedColor = fixedColorByName(item.name);

      // 요청사항: 특정 작성자는 색상 고정
      if (fixedColor) {
        chosenIdx = colorIndexOf(fixedColor);
      }

      if (!fixedColor && forbidden.has(chosenIdx)) {
        const candidates = NOTE_COLORS.map((_, i) => i).filter((i) => !forbidden.has(i));
        if (candidates.length > 0) {
          // baseIdx와 가장 가까운 후보로 이동해 전체 톤 변화를 최소화
          chosenIdx = candidates.reduce((best, cur) => {
            const bestDist = Math.abs(best - baseIdx);
            const curDist = Math.abs(cur - baseIdx);
            return curDist < bestDist ? cur : best;
          }, candidates[0]);
        }
      }

      pickedColorIdx.set(item.id, chosenIdx);
      map.set(item.id, {
        color: NOTE_COLORS[chosenIdx],
        rotate: base.rotate,
      });
    });

    return map;
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
      <SectionHeading title="Message Board" titleClassName="!text-[20px]" />

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
          className="h-[42px] rounded-none bg-[#f1e9df] px-3 text-sm text-[#5a4e40] placeholder:text-[#a79b8d] outline-none ring-0 focus:outline-none focus:ring-2 focus:ring-[#c9bf83]/45"
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="축하 메시지를 남겨주세요"
          maxLength={300}
          className="h-[42px] rounded-none bg-[#f1e9df] px-3 text-sm text-[#5a4e40] placeholder:text-[#a79b8d] outline-none ring-0 focus:outline-none focus:ring-2 focus:ring-[#c9bf83]/45"
        />
        <button
          type="submit"
          disabled={saving}
          className="h-[42px] min-w-[50px] rounded-lg bg-[#d9cfb5] px-2.5 text-xl font-semibold text-[#4f4336] disabled:opacity-60"
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
                : (noteStyleById.get(item.id) ?? stableNoteStyleForId(item.id));
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

      {loading ? <p className="mt-3 text-center text-xs text-[#6e6150]">메시지 불러오는 중...</p> : null}
    </SectionShell>
  );
}

