import type { Service } from "../../api/types";
import Pill from "../atoms/Pill";
import Button from "../atoms/Button";

export default function ServiceCard({
  service,
  layout = "vertical",
}: {
  service: Service;
  layout?: "vertical" | "horizontal";
}) {
  if (layout === "horizontal") {
    return (
      <div className="flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-[0_6px_16px_rgba(22,32,92,.05)]">
        <div className="h-24 w-24 flex-none rounded-xl bg-[repeating-linear-gradient(135deg,#dbe6f4_0_14px,#cfddef_14px_28px)]" />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="font-display text-base font-extrabold text-navy">{service.title}</div>
          <p className="flex-1 text-[12.5px] leading-relaxed text-muted">{service.description}</p>
          <Button size="sm" className="self-start">
            {service.ctaLabel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_6px_16px_rgba(22,32,92,.05)]">
      <div className="h-[120px] bg-[repeating-linear-gradient(135deg,#dbe6f4_0_14px,#cfddef_14px_28px)]" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Pill tone={service.badge.tone}>{service.badge.label}</Pill>
        <div className="font-display text-[17px] font-extrabold text-navy">{service.title}</div>
        <p className="flex-1 text-[12.5px] leading-relaxed text-muted">{service.description}</p>
        <div className="mt-1 flex items-center justify-between">
          <div className="font-mono text-[11px] text-muted">
            <b className="block font-display text-[17px] text-navy">{service.priceFrom}</b>
          </div>
          <Button size="sm">{service.ctaLabel}</Button>
        </div>
      </div>
    </div>
  );
}
