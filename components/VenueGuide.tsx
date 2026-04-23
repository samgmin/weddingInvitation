import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

type Guide = { title: string; description: string };

export function VenueGuide({ guides }: { guides: Guide[] }) {
  return (
    <SectionShell className="px-11">
      <SectionHeading
        title="Venue Guide"
        titleClassName="![font-family:var(--font-sans)] !text-[18px] !font-normal"
      />
      <div className="mt-4 space-y-3">
        {guides.map((g) => {
          const isFlowerGuide = g.title.includes("화환");
          return (
            <article
              key={g.title}
              className={`pb-3 text-left ${
                isFlowerGuide
                  ? "mb-5 rounded-md bg-[#f6ebe3] px-3 py-2.5 shadow-[0_5px_14px_rgba(80,62,44,0.10)]"
                  : ""
              }`}
            >
              {isFlowerGuide ? (
                <>
                  <p className="text-center text-[14px] font-semibold text-[#4B3F33]">{g.title}</p>
                  <p className="mt-3 whitespace-pre-line text-center text-[13px] leading-[1.68] text-[#746556]">
                    {g.description}
                  </p>
                </>
              ) : (
                <div
                  className="space-y-2.5 text-[#746556]"
                  title={`${g.title} ${g.description}`}
                >
                  <p className="text-[13.5px] font-semibold text-[#4B3F33]">{g.title}</p>
                  <p className="whitespace-pre-line break-keep pl-0.5 text-[13px] leading-[1.68]">{g.description}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}

