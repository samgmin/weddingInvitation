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
        "border-b border-[#b7a68d]/35 pb-4 text-center",
        className,
      )}
    >
      <h2 className="text-[19px] font-semibold text-[#3a3024]">{title}</h2>
      {description ? (
        <div className="mt-2 text-[13px] leading-6 text-[#6f6455]">{description}</div>
      ) : null}
    </header>
  );
}
