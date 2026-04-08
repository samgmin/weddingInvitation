import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

type Guide = { title: string; description: string };

export function VenueGuide({ guides }: { guides: Guide[] }) {
  return (
    <SectionShell className="px-11">
      <SectionHeading
        title="INFORMATION"
        titleClassName="![font-family:var(--font-sans)] !text-[16px] !font-normal"
      />
      <div className="mt-4 space-y-3">
        {guides.map((g) => {
          const isFlowerGuide = g.title.includes("화환");
          return (
            <article
              key={g.title}
              className={`pb-3 text-left ${
                isFlowerGuide
                  ? "mb-5 rounded-lg border-x-4 border-[#C9BF83] bg-[#efe6d8] px-3 py-2 shadow-[0_5px_14px_rgba(80,62,44,0.10)]"
                  : "border-b border-[#b7a68d]/25"
              }`}
            >
              {isFlowerGuide ? (
                <>
                  <p className="text-center text-[15px] font-bold text-[#3F3529]">{g.title}</p>
                  <p className="mt-1 whitespace-pre-line text-center text-sm leading-6 text-[#6B5F50]">
                    {g.description}
                  </p>
                </>
              ) : (
                <p className="truncate whitespace-nowrap text-sm text-[#6B5F50]" title={`${g.title} ${g.description}`}>
                  <span className="font-semibold text-[#3F3529]">{g.title}</span>
                  <span className="mx-1 text-[#5A4E40]">·</span>
                  <span>{g.description}</span>
                </p>
              )}
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}

