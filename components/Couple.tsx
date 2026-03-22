import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

export function Couple({
  groom,
  bride,
}: {
  groom: { name: string; image: string };
  bride: { name: string; image: string };
}) {
  return (
    <SectionShell>
      <SectionHeading title="Couple" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {[{ label: "Groom", ...groom }, { label: "Bride", ...bride }].map((p) => (
          <div key={p.label} className="text-center">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </div>
            <p className="mt-2 text-xs text-zinc-500">{p.label}</p>
            <p className="font-semibold text-zinc-800">{p.name}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
