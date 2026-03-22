import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 섹션 제목: 가운데 정렬 + 본문과 구분되는 옅은 하단 선 */
export function SectionHeading({
  title,
  description,
  className,
}: {
  title: string;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "border-b border-[#e8e3da]/90 pb-4 text-center",
        className,
      )}
    >
      <h2 className="font-[var(--font-serif)] text-2xl text-forest">{title}</h2>
      {description ? (
        <div className="mt-2 text-sm text-zinc-600">{description}</div>
      ) : null}
    </header>
  );
}
