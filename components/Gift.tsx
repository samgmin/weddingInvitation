import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

type Account = {
  role: string;
  name: string;
  bank: string;
  number: string;
};

export function Gift({ accounts }: { accounts: Account[] }) {
  return (
    <SectionShell>
      <SectionHeading
        title="마음 전하실 곳"
        description="신랑·신부와 양가 부모님 계좌입니다. 필요하신 분들만 이용해 주세요."
      />
      <div className="mt-4 grid gap-3">
        {accounts.map((account) => (
          <div key={`${account.role}-${account.number}`} className="rounded-2xl border border-[#ece6d8] bg-[#fffdf8] p-4">
            <p className="text-xs text-zinc-500">{account.role}</p>
            <p className="mt-1 text-sm font-semibold text-zinc-800">{account.name}</p>
            <p className="mt-1 text-sm text-zinc-600">
              {account.bank} {account.number}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
