import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

export function Message({ lines }: { lines: string[] }) {
  return (
    <SectionShell>
      <SectionHeading title="Invitation" />
      <p className="mt-4 whitespace-pre-line text-center leading-8 text-zinc-700">
        {lines.join("\n")}
      </p>
    </SectionShell>
  );
}
