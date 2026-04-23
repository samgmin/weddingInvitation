import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import type { StoryItem } from "@/data/weddingData";

function storyPhotoList(item: StoryItem): { src: string; alt: string }[] {
  if (item.images?.length) return item.images.map((p) => ({ src: p.src, alt: p.alt }));
  if (item.image) return [{ src: item.image, alt: item.imageAlt ?? item.year }];
  return [];
}

function splitStoryYearAndHeading(raw: string): { year: string; heading: string } {
  const [year, ...rest] = raw.split("|");
  return {
    year: year?.trim() ?? raw,
    heading: rest.join("|").trim(),
  };
}

function StoryPhotos({
  photos,
  firstStory,
  storyIndex,
}: {
  photos: { src: string; alt: string }[];
  firstStory?: boolean;
  storyIndex?: number;
}) {
  if (!photos.length) {
    return (
      <div className="flex h-32 w-full max-w-[200px] items-center justify-center rounded-none bg-[#ece3d7] text-xs text-[#867863]">
        사진
      </div>
    );
  }
  if (photos.length >= 2) {
    const [first, second] = photos;
    const lead = firstStory ? second : first;
    const follow = firstStory ? first : second;
    return (
      <div data-protect-media className="flex w-full min-w-0 flex-col items-center">
        <div className={`relative w-full max-w-[504px] ${firstStory ? "h-[452px]" : "h-[492px]"}`}>
          <img
            src={lead.src}
            alt={lead.alt}
            className={`absolute left-[1%] top-[1%] h-auto max-h-[398px] w-[100%] rounded-none object-contain shadow-[0_8px_16px_rgba(40,28,16,0.16)] rotate-[-5deg] ${
              firstStory ? "z-[3]" : "z-[1]"
            }`}
            loading="lazy"
          />
          <img
            src={follow.src}
            alt={follow.alt}
            className={`absolute right-[1%] z-[2] h-auto max-h-[398px] w-[100%] rounded-none object-contain shadow-[0_8px_16px_rgba(40,28,16,0.18)] rotate-[5deg] ${
              firstStory ? "top-[36%]" : "top-[42%]"
            }`}
            loading="lazy"
          />
        </div>
        {photos.slice(2).map((ph, i) => (
          <img
            key={`${ph.src}-${i + 2}`}
            src={ph.src}
            alt={ph.alt}
            className="mt-2 h-auto max-h-[416px] w-auto max-w-full rounded-none object-contain"
            loading="lazy"
          />
        ))}
      </div>
    );
  }

  return (
    <div data-protect-media className="flex w-full min-w-0 flex-col items-center gap-2">
      {photos.map((ph, i) => (
        <img
          key={`${ph.src}-${i}`}
          src={ph.src}
          alt={ph.alt}
          className={`h-auto max-w-full rounded-none object-contain ${
            storyIndex === 1 || storyIndex === 2
              ? "w-[102%] max-h-[580px]"
              : "w-auto max-w-full max-h-[559px]"
          }`}
          loading="lazy"
        />
      ))}
    </div>
  );
}

export function AboutStorySection({
  items,
}: {
  items: StoryItem[];
}) {
  return (
    <SectionShell className="!pb-[5.4rem]">
      <SectionHeading title="Our Story" titleClassName="!text-[20px]" />

      <div className="relative mt-8 min-h-[120px]">
        <div className="relative z-[2] flex flex-col">
          {items.map((item, idx) => {
            const photos = storyPhotoList(item);
            const photoLeft = idx % 2 !== 0;
            const hasMultiPhotos = photos.length >= 2;
            const { year, heading } = splitStoryYearAndHeading(item.year);

            const textBlock = (
              <div
                className={`mx-auto flex min-w-0 max-w-[190px] flex-col items-center justify-center gap-1.5 px-2 py-2 text-center ${
                  hasMultiPhotos ? (photoLeft ? "pl-2 pr-4" : "pl-4 pr-2") : ""
                }`}
              >
                <p className="text-[14px] font-semibold leading-snug text-[#2c261c] whitespace-nowrap text-center">
                  <span className="mr-1.5 text-[#7b6a57]">•</span>
                  {year}
                </p>
                {heading ? (
                  <p className="text-[13px] font-medium leading-snug text-[#3f3529] whitespace-nowrap text-center">
                    {heading}
                  </p>
                ) : null}
                <p className="text-center text-[13px] leading-relaxed text-[#5e5243] break-keep whitespace-pre-line">
                  {item.text}
                </p>
              </div>
            );

            const photoBlock = (
              <div
                className={`flex min-w-0 flex-col items-center justify-center py-2 ${
                  photoLeft ? "pr-3" : "pl-3"
                }`}
              >
                <StoryPhotos photos={photos} firstStory={idx === 0} storyIndex={idx} />
              </div>
            );

            return (
              <article
                key={`${item.year}-${item.text}`}
                className="grid grid-cols-[minmax(0,1fr)_0.5rem_minmax(0,1fr)] items-center gap-x-0 gap-y-0 pb-0.5 last:pb-0"
                style={{
                  minHeight:
                    idx === 0
                      ? 320
                      : hasMultiPhotos
                        ? 398
                        : idx === 1
                          ? 228
                          : idx === 2
                            ? 300
                            : 302,
                }}
              >
                {photoLeft ? (
                  <>
                    {photoBlock}
                    <div className="w-2" />
                    {textBlock}
                  </>
                ) : (
                  <>
                    {textBlock}
                    <div className="w-2" />
                    {photoBlock}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
