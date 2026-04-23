import { SectionShell } from "@/components/SectionShell";

export function InvitationInfoSection({ lines }: { lines: string[] }) {
  return (
    <SectionShell id="invitation-info">
      <div className="mt-1 space-y-0.5 text-center text-sm leading-[1.55] text-[#746556]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </SectionShell>
  );
}
