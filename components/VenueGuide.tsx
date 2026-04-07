import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

type Guide = { title: string; description: string };

export function VenueGuide({ guides }: { guides: Guide[] }) {
  return (
    <SectionShell className="px-11 py-10">
      <SectionHeading
        title="Information"
        titleClassName="![font-family:var(--font-sans)] !text-[16px] !font-normal"
      />
      <div className="mt-4 space-y-3">
        {guides.map((g) => {
          const isFlowerGuide = g.title.includes("화환");
          return (
            <article
              key={g.title}
              className={`border-b border-[#b7a68d]/25 pb-3 text-left ${
                isFlowerGuide
                  ? "rounded-lg border-l-4 border-[#b08652] bg-[#efe0cf] px-3 py-2 shadow-[0_5px_14px_rgba(80,62,44,0.10)]"
                  : ""
              }`}
            >
              {isFlowerGuide ? (
                <>
                  <p className="text-center text-[15px] font-bold text-[#3f3529]">{g.title}</p>
                  <p className="mt-1 whitespace-pre-line text-center text-sm leading-6 text-[#5a4e40]">
                    {g.description}
                  </p>
                </>
              ) : (
                <p className="truncate whitespace-nowrap text-sm text-[#5a4e40]" title={`${g.title} ${g.description}`}>
                  <span className="font-semibold text-[#3f3529]">{g.title}</span>
                  <span className="mx-1 text-[#8b7a66]">·</span>
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

