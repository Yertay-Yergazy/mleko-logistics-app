import { Link } from "react-router-dom";
import type { Service } from "../../api/types";
import Pill from "../atoms/Pill";
import Button from "../atoms/Button";
import { buildQuoteQuery } from "../../utils/quoteLink";

export default function ServiceCard({
  service,
  layout = "vertical",
}: {
  service: Service;
  layout?: "vertical" | "horizontal";
}) {
  const query = buildQuoteQuery(undefined, {
    comment: service.title,
    ...(service.transportMode ? { transportMode: service.transportMode } : {}),
  });
  const quoteLink = `/raschet?${query}`;

  if (layout === "horizontal") {
    return (
      <div className="flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-[0_6px_16px_rgba(22,32,92,.05)]">
        <div className="h-24 w-24 flex-none overflow-hidden rounded-xl bg-[repeating-linear-gradient(135deg,#dbe6f4_0_14px,#cfddef_14px_28px)]">
          {service.image && (
            <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="font-display text-base font-extrabold text-navy">{service.title}</div>
          <p className="flex-1 text-[12.5px] leading-relaxed text-muted">{service.description}</p>
          <Link to={quoteLink} className="self-start">
            <Button size="sm">{service.ctaLabel}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_6px_16px_rgba(22,32,92,.05)]">
      <div className="h-[120px] overflow-hidden bg-[repeating-linear-gradient(135deg,#dbe6f4_0_14px,#cfddef_14px_28px)]">
        {service.image && (
          <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Pill tone={service.badge.tone}>{service.badge.label}</Pill>
        <div className="font-display text-[17px] font-extrabold text-navy">{service.title}</div>
        <p className="flex-1 text-[12.5px] leading-relaxed text-muted">{service.description}</p>
        <div className="mt-1 flex items-center justify-between">
          <div className="font-mono text-[11px] text-muted">
            <b className="block font-display text-[17px] text-navy">{service.priceFrom}</b>
          </div>
          <Link to={quoteLink}>
            <Button size="sm">{service.ctaLabel}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
