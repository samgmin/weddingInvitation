import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import type { ParentIntroItem } from "@/data/weddingData";

export function ParentsSection({
  groom,
  bride,
  embedded = false,
}: {
  groom: ParentIntroItem[];
  bride: ParentIntroItem[];
  /** true면 SectionShell 없이 블록만 (Groom&Bride 아래에 이어 붙일 때) */
  embedded?: boolean;
}) {
  const inner = (
    <>
      <SectionHeading
        title="Our Parents"
        className={embedded ? "mt-0" : undefined}
        titleClassName="!text-[20px]"
      />
      <div className="mt-6 text-center text-[#5e5243]">
        <p className="whitespace-pre-line text-[14px] leading-7.5">
          {`저희 두 사람을 사랑으로 키워주신
존경하는 부모님을 소개합니다.`}
        </p>
        <p className="mt-2 whitespace-pre-line text-sm leading-7">
          {`🌳
"아빠의 겨울에 나는 녹음이 되었다.
그들의 푸름을 다 먹고 내가 나무가 되었다."
<폭싹 속았수다> 中`}
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center pb-3 text-center">
          <div
            data-protect-media
            className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-none-[4px] bg-[#f4ebdf] shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          >
            {groom[0]?.image ? (
              <Image
                src={groom[0].image}
                alt={groom[0].imageAlt || "신랑측 부모님 사진"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[120px] items-center justify-center text-xs text-[#877865]">
                신랑측 부모님 사진
              </div>
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-35 mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 14%, rgba(255,255,255,0.45) 0 0.4px, transparent 0.5px), radial-gradient(circle at 72% 74%, rgba(82,60,38,0.16) 0 0.34px, transparent 0.45px), radial-gradient(circle at 38% 56%, rgba(255,255,255,0.25) 0 0.3px, transparent 0.4px)",
                backgroundSize: "1.3px 1.3px, 1.5px 1.5px, 1.2px 1.2px",
              }}
            />
          </div>
          <p className="mt-2 text-xs tracking-[0.12em] text-[#8f7b61]">신랑 | 상민의 부모님</p>
          <p className="mt-1 text-sm text-[#4c4134]">
            {groom.map((p) => p.name).join(" ❤️ ")}
          </p>
        </div>
        <div className="flex flex-col items-center pb-3 text-center">
          <div
            data-protect-media
            className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-none-[4px] bg-[#f4ebdf] shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          >
            {bride[0]?.image ? (
              <Image
                src={bride[0].image}
                alt={bride[0].imageAlt || "신부측 부모님 사진"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[120px] items-center justify-center text-xs text-[#877865]">
                신부측 부모님 사진
              </div>
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-35 mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 14%, rgba(255,255,255,0.45) 0 0.4px, transparent 0.5px), radial-gradient(circle at 72% 74%, rgba(82,60,38,0.16) 0 0.34px, transparent 0.45px), radial-gradient(circle at 38% 56%, rgba(255,255,255,0.25) 0 0.3px, transparent 0.4px)",
                backgroundSize: "1.3px 1.3px, 1.5px 1.5px, 1.2px 1.2px",
              }}
            />
          </div>
          <p className="mt-2 text-xs tracking-[0.12em] text-[#8f7b61]">신부 | 혜림의 부모님</p>
          <p className="mt-1 text-sm text-[#4c4134]">
            {bride.map((p) => p.name).join(" ❤️ ")}
          </p>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div className="mt-10">
        {inner}
      </div>
    );
  }

  return <SectionShell id="parents">{inner}</SectionShell>;
}
