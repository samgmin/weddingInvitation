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
      <SectionHeading title="Our Parents" className={embedded ? "mt-0" : undefined} />
      <p className="mt-4 whitespace-pre-line text-center text-sm leading-7 text-[#5e5243]">
        {`저희 두 사람을 사랑으로 키워주신
 존경하는 부모님을 소개합니다.
🌳
"아빠의 겨울에 나는 녹음이 되었다.
그들의 푸름을 다 먹고 내가 나무가 되었다."
<폭싹 속았수다> 中`}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center border-b border-[#b7a68d]/25 pb-3 text-center">
          <div className="aspect-[3/4] w-full max-w-[200px] rounded-xl border border-[#c9b79f] bg-[#e8ddd0] p-2">
            <div className="relative h-full w-full overflow-hidden rounded-lg border border-dashed border-[#b7a68d]">
              {groom[0]?.image ? (
                <Image
                  src={groom[0].image}
                  alt={groom[0].imageAlt || "신랑측 부모님 사진"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-[#877865]">
                  신랑측 부모님 사진
                </div>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs tracking-[0.12em] text-[#8f7b61]">신랑|상민의 부모님</p>
          <p className="mt-1 text-sm text-[#4c4134]">
            {groom.map((p) => p.name).join("❤️")}
          </p>
        </div>
        <div className="flex flex-col items-center border-b border-[#b7a68d]/25 pb-3 text-center">
          <div className="aspect-[3/4] w-full max-w-[200px] rounded-xl border border-[#c9b79f] bg-[#e8ddd0] p-2">
            <div className="relative h-full w-full overflow-hidden rounded-lg border border-dashed border-[#b7a68d]">
              {bride[0]?.image ? (
                <Image
                  src={bride[0].image}
                  alt={bride[0].imageAlt || "신부측 부모님 사진"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-[#877865]">
                  신부측 부모님 사진
                </div>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs tracking-[0.12em] text-[#8f7b61]">신부|혜림의 부모님</p>
          <p className="mt-1 text-sm text-[#4c4134]">
            {bride.map((p) => p.name).join("❤️")}
          </p>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div id="parents" className="mt-10">
        {inner}
      </div>
    );
  }

  return <SectionShell id="parents">{inner}</SectionShell>;
}
