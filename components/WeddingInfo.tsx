import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";

export function WeddingInfo({
  date,
  time,
  venue,
}: {
  date: string;
  time: string;
  venue: string;
}) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells = ["", "", "", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

  return (
    <SectionShell>
      <SectionHeading title="Wedding Info" />
      <div className="mt-4 space-y-1 text-sm text-zinc-700">
        <p>{date}</p>
        <p>{time}</p>
        <p>{venue}</p>
      </div>

      <div className="mt-5 rounded-2xl border border-[#ece6d8] bg-[#fffdf8] p-3">
        <div className="grid grid-cols-7 text-center text-[11px] text-coral">
          {days.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-y-2 text-center text-sm text-zinc-700">
          {cells.map((d, idx) => (
            <span
              key={`${d}-${idx}`}
              className={d === "24" ? "mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-coral text-white" : ""}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
