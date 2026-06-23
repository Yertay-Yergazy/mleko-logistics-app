import type { ReactNode } from "react";

export default function ContactCard({
  icon,
  label,
  value,
  href,
  tone = "default",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  tone?: "default" | "green";
}) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className="flex min-w-[210px] items-center gap-3.5 rounded-2xl border border-line bg-white px-4.5 py-4 no-underline"
    >
      <span
        className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${
          tone === "green" ? "bg-[#e4f5ec] text-ok" : "bg-mist text-blue"
        }`}
      >
        {icon}
      </span>
      <div>
        <div
          className={`font-display text-[11px] font-bold uppercase tracking-wide ${
            tone === "green" ? "text-ok" : "text-muted"
          }`}
        >
          {label}
        </div>
        <div className="text-[15px] font-bold text-navy">{value}</div>
      </div>
    </Wrapper>
  );
}
