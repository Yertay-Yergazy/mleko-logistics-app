import type { CabinetStat } from "../../api/types";

const toneText: Record<string, string> = {
  navy: "text-navy",
  orange: "text-orange",
  green: "text-ok",
  blue: "text-blue",
};

export default function StatCard({ stat }: { stat: CabinetStat }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-4.5 py-4">
      <div className={`font-display text-3xl font-extrabold ${toneText[stat.tone]}`}>{stat.value}</div>
      <div className="mt-1 text-xs font-semibold text-ink">{stat.label}</div>
      <div className="mt-0.5 text-[11px] text-[#7a8ab8]">{stat.trend}</div>
    </div>
  );
}
