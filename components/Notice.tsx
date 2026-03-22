import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

export function Notice({ text }: { text: string }) {
  return (
    <SectionShell>
      <SectionHeading title="안내 정보" />
      <p className="mt-4 text-sm leading-7 text-zinc-700">{text}</p>
    </SectionShell>
  );
}
