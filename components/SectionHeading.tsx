import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 섹션 제목: 가운데 정렬 + 본문과 구분되는 옅은 하단 선 */
export function SectionHeading({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  /** true면 제목 바로 아래에 구분선을 두고, 설명·본문은 선 아래에 둡니다 */
  underlineBelowTitle = false,
}: {
  title: string;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  underlineBelowTitle?: boolean;
}) {
  const hasKorean = /[가-힣]/.test(title);

  /** 다른 섹션과 동일한 짧은 구분선 */
  const sectionRuleClass = "mx-auto h-px w-20 bg-[#b7a68d]/35";

  return (
    <header
      className={cn(
        "pb-4 text-center",
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
      {underlineBelowTitle ? (
        <>
          <div aria-hidden className={cn("mt-3", sectionRuleClass)} />
          {description ? (
            <div
              className={cn(
                "mt-4 text-[13px] leading-6 text-[#6f6455]",
                descriptionClassName,
              )}
            >
              {description}
            </div>
          ) : null}
        </>
      ) : (
        <>
          {description ? (
            <div
              className={cn(
                "mt-2 text-[13px] leading-6 text-[#6f6455]",
                descriptionClassName,
              )}
            >
              {description}
            </div>
          ) : null}
          <div aria-hidden className={cn("mt-3", sectionRuleClass)} />
        </>
      )}
    </header>
  );
}
