import type { ReactNode } from "react";
import type { Tone } from "../../api/types";

const toneClasses: Record<Tone, string> = {
  orange: "bg-[#fdeede] text-orange-dark",
  blue: "bg-mist text-blue",
  green: "bg-[#e4f5ec] text-ok",
  navy: "bg-mist text-navy",
};

export default function Pill({
  tone = "blue",
  children,
  active,
  className = "",
  onClick,
}: {
  tone?: Tone;
  children: ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide";
  const activeClasses = active ? "bg-orange text-white" : toneClasses[tone];
  return (
    <span
      onClick={onClick}
      className={`${base} ${activeClasses} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </span>
  );
}
