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
        {guides.map((g) => (
          <article key={g.title} className="border-b border-[#b7a68d]/25 pb-3 text-left">
            <p className="font-semibold text-[#3f3529]">{g.title}</p>
            <p className="mt-1 text-sm text-[#5a4e40]">{g.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

