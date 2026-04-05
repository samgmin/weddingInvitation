import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

type TimelineItem = {
  year: string;
  image: string;
  description: string;
};

export function Story({ items }: { items: TimelineItem[] }) {
  return (
    <SectionShell>
      <SectionHeading title="Our Story" />
      <div className="relative mt-5 space-y-6 before:absolute before:bottom-0 before:left-3 before:top-0 before:w-px before:bg-[#ddd4c3]">
        {items.map((item) => (
          <div key={item.year + item.description} className="relative pl-9">
            <span className="absolute left-[7px] top-1.5 h-3 w-3 rounded-full bg-coral" />
            <p className="text-xs tracking-[0.16em] text-coral">{item.year}</p>
            <div className="relative mt-2 aspect-[5/3] overflow-hidden rounded-2xl">
              <Image src={item.image} alt={item.year} fill className="object-cover" />
            </div>
            <p className="mt-2 text-sm text-zinc-700">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
