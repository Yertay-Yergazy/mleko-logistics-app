import type { StatusTone } from "../../api/types";

const toneClasses: Record<StatusTone, string> = {
  wait: "bg-[#fdf3e0] text-[#b97d12]",
  ok: "bg-[#e4f5ec] text-ok",
  pending: "bg-mist text-blue",
  alert: "bg-[#fdeede] text-orange-dark",
};

export default function StatusBadge({
  status,
  label,
  className = "",
}: {
  status: StatusTone;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-[13px] font-bold ${toneClasses[status]} ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {label}
    </span>
  );
}
