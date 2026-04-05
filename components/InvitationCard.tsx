import { SectionShell } from "@/components/SectionShell";

export function InvitationCard({
  invitationMessage,
}: {
  invitationMessage: string[];
}) {
  return (
    <SectionShell>
      <div className="space-y-5 text-center text-[#3f3529]">
        <p className="font-[var(--font-uhbee-namsoyoung)] text-[22px] font-semibold text-[#9b886f]">
          초대합니다
        </p>

        <p className="whitespace-pre-line text-[14px] leading-7 text-[#4a3f32]">{invitationMessage.join("\n")}</p>
      </div>
    </SectionShell>
  );
}

