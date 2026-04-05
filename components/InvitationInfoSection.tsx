import { SectionShell } from "@/components/SectionShell";

export function InvitationInfoSection({ lines }: { lines: string[] }) {
  return (
    <SectionShell id="invitation-info">
      <div className="mt-1 space-y-1 text-center text-sm text-[#6e6150]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </SectionShell>
  );
}
