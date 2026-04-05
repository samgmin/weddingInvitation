import Image from "next/image";
import { ParentsSection } from "@/components/ParentsSection";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import type { ParentIntroItem, StoryItem } from "@/data/weddingData";

export function AboutStorySection({
  items,
  groomBrideImage,
  groomBrideImageWidth,
  groomBrideImageHeight,
  parents,
}: {
  items: StoryItem[];
  groomBrideImage: string;
  groomBrideImageWidth: number;
  groomBrideImageHeight: number;
  parents: { groom: ParentIntroItem[]; bride: ParentIntroItem[] };
}) {
  return (
    <SectionShell>
      <div className="-mx-5 w-[calc(100%+2.5rem)] max-w-none bg-[#e8ddd0]">
        {groomBrideImage ? (
          <Image
            src={groomBrideImage}
            alt="신랑·신부"
            width={groomBrideImageWidth}
            height={groomBrideImageHeight}
            className="block h-auto w-full object-contain"
            sizes="(max-width: 480px) 100vw, 432px"
            priority
          />
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-xs text-[#877865]">
            Groom & Bride 사진
          </div>
        )}
      </div>

      <ParentsSection groom={parents.groom} bride={parents.bride} embedded />

      <SectionHeading title="Our Story" className="mt-8" />
      <div className="mt-5 space-y-4 text-left">
        {items.map((item) => (
          <article key={`${item.year}-${item.text}`} className="border-b border-[#b7a68d]/25 pb-4">
            <p className="text-xs tracking-[0.14em] text-[#8f7b61]">{item.year}</p>
            <div className="mt-2 rounded-lg border border-[#ccbba3] bg-[#e9dfd2] p-2">
              {item.images && item.images.length > 0 ? (
                <div
                  className={`grid gap-2 ${item.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
                >
                  {item.images.map((img, idx) => (
                    <div
                      key={`${img.src}-${idx}`}
                      className="relative aspect-[4/5] overflow-hidden rounded-md border border-dashed border-[#b7a68d]"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt || item.year}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-dashed border-[#b7a68d]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.year}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-[#867863]">
                      스토리 사진 placeholder
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-[#4c4134]">{item.text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
