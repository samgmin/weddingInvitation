import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 섹션 제목: 가운데 정렬 + 본문과 구분되는 옅은 하단 선 */
export function SectionHeading({
  title,
  description,
  className,
  titleClassName,
}: {
  title: string;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  const hasKorean = /[가-힣]/.test(title);

  return (
    <header
      className={cn(
        "border-b border-[#b7a68d]/35 pb-4 text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "text-[19px] font-semibold text-[#3a3024]",
          hasKorean && "[font-family:var(--font-sans)]",
          !hasKorean && "[font-family:var(--font-uhbee-keongkeong)]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <div className="mt-2 text-[13px] leading-6 text-[#6f6455]">{description}</div>
      ) : null}
    </header>
  );
}
