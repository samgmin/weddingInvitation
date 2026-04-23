import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

export function DressCode({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  const palette = [
    { label: "White", swatch: "#ffffff" },
    { label: "Ivory", swatch: "#fcf8ee" },
    { label: "Pink", swatch: "#f3d5db" },
    { label: "Pastel Blue", swatch: "#d8e6f5" },
  ] as const;

  return (
    <SectionShell className="px-11">
      <SectionHeading
        title={title}
        titleClassName="![font-family:var(--font-sans)] !text-[17.5px] !font-normal"
      />
      <div className="mt-4 rounded-none bg-[#f6ebe3] px-4 py-4 text-center shadow-[0_2px_8px_rgba(84,66,44,0.06)]">
        {lines.map((line, idx) => (
          <p
            key={line}
            className={`text-[13px] leading-[1.72] text-[#6B5F50] ${idx === 0 ? "font-semibold" : ""} ${
              idx > 2 ? "mt-0.5" : ""
            }`}
          >
            {line}
          </p>
        ))}
        <div className="mt-4 grid grid-cols-4 gap-1">
          {palette.map((item) => (
            <div key={item.label} className="space-y-1">
              <div
                aria-hidden
                className="mx-auto h-9 w-[88%] rounded-none shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
                style={{ backgroundColor: item.swatch }}
              />
              <p className="text-[11px] tracking-[0.01em] text-[#746556]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
