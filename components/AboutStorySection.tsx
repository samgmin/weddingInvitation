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
}: {
  photos: { src: string; alt: string }[];
  firstStory?: boolean;
}) {
  if (!photos.length) {
    return (
      <div className="flex h-32 w-full max-w-[200px] items-center justify-center rounded-2xl bg-[#ece3d7] text-xs text-[#867863]">
        사진
      </div>
    );
  }
  if (photos.length >= 2) {
    const [first, second] = photos;
    const lead = firstStory ? second : first;
    const follow = firstStory ? first : second;
    return (
      <div className="flex w-full min-w-0 flex-col items-center">
        <div className="relative h-[378px] w-full max-w-[388px]">
          <img
            src={lead.src}
            alt={lead.alt}
            className={`absolute left-[1%] top-[1%] h-auto max-h-[305px] w-[82%] rounded-xl object-contain shadow-[0_8px_16px_rgba(40,28,16,0.16)] rotate-[-5deg] ${
              firstStory ? "z-[3]" : "z-[1]"
            }`}
            loading="lazy"
          />
          <img
            src={follow.src}
            alt={follow.alt}
            className={`absolute right-[1%] z-[2] h-auto max-h-[305px] w-[82%] rounded-xl object-contain shadow-[0_8px_16px_rgba(40,28,16,0.18)] rotate-[5deg] ${
              firstStory ? "top-[36%]" : "top-[40%]"
            }`}
            loading="lazy"
          />
        </div>
        {photos.slice(2).map((ph, i) => (
          <img
            key={`${ph.src}-${i + 2}`}
            src={ph.src}
            alt={ph.alt}
            className="mt-2 h-auto max-h-[320px] w-auto max-w-full rounded-xl object-contain"
            loading="lazy"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-center gap-2">
      {photos.map((ph, i) => (
        <img
          key={`${ph.src}-${i}`}
          src={ph.src}
          alt={ph.alt}
          className="h-auto max-h-[430px] w-auto max-w-full rounded-xl object-contain"
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
    <SectionShell>
      <SectionHeading title="Our Story" />

      <div className="relative mt-8 min-h-[120px]">
        <div className="relative z-[2] flex flex-col">
          {items.map((item, idx) => {
            const photos = storyPhotoList(item);
            const photoLeft = idx % 2 !== 0;
            const hasMultiPhotos = photos.length >= 2;
            const { year, heading } = splitStoryYearAndHeading(item.year);

            const textBlock = (
              <div
                className={`flex min-w-0 max-w-[190px] flex-col justify-center gap-1.5 px-2 py-2 ${
                  photoLeft ? "ml-auto items-end text-right" : "mr-auto items-start text-left"
                } ${
                  hasMultiPhotos ? (photoLeft ? "pl-2 pr-8" : "pl-8 pr-2") : ""
                }`}
              >
                <p className="text-[13px] font-semibold leading-snug text-[#2c261c] whitespace-nowrap">
                  <span className="mr-1.5 text-[#7b6a57]">•</span>
                  {year}
                </p>
                {heading ? (
                  <p className="text-[12px] font-medium leading-snug text-[#3f3529] whitespace-nowrap">
                    {heading}
                  </p>
                ) : null}
                <p className="text-xs leading-relaxed text-[#5e5243] break-keep whitespace-pre-line">
                  {item.text}
                </p>
              </div>
            );

            const photoBlock = (
              <div
                className={`flex min-w-0 flex-col items-center justify-center py-2 ${
                  photoLeft ? "pr-6" : "pl-6"
                }`}
              >
                <StoryPhotos photos={photos} firstStory={idx === 0} />
              </div>
            );

            return (
              <article
                key={`${item.year}-${item.text}`}
                className="grid grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] items-center gap-x-0 gap-y-0 pb-0.5 last:pb-0"
                style={{ minHeight: idx === 0 ? 286 : hasMultiPhotos ? 306 : 232 }}
              >
                {photoLeft ? (
                  <>
                    {photoBlock}
                    <div className="w-7" />
                    {textBlock}
                  </>
                ) : (
                  <>
                    {textBlock}
                    <div className="w-7" />
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
