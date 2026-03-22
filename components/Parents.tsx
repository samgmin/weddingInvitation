import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

export function Parents({
  groomParents,
  brideParents,
}: {
  groomParents: Array<{ name: string; image: string }>;
  brideParents: Array<{ name: string; image: string }>;
}) {
  const blocks = [
    { title: "Groom's Parents", items: groomParents },
    { title: "Bride's Parents", items: brideParents },
  ];

  return (
    <SectionShell>
      <SectionHeading title="Parents" />
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {blocks.map((block) => (
          <div key={block.title}>
            <p className="text-xs tracking-[0.12em] text-coral">{block.title}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {block.items.map((p) => (
                <div key={p.name} className="text-center">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <p className="mt-2 text-sm">{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
