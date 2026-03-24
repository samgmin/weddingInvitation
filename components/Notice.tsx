import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

export function Notice({ text }: { text: string }) {
  const [headline, ...rest] = text.split("\n");
  const body = rest.join("\n");

  return (
    <SectionShell>
      <SectionHeading title="안내 정보" />
      <p className="mt-4 text-center text-base font-semibold text-forest">{headline}</p>
      {body ? (
        <p className="mt-2 whitespace-pre-line text-center text-sm leading-7 text-zinc-700">{body}</p>
      ) : null}
    </SectionShell>
  );
}
