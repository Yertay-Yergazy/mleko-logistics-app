import type { Offer } from "../../api/types";
import Button from "../atoms/Button";

export default function HotCard({ offer }: { offer: Offer }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-white/15 bg-white/[0.07] p-4.5 backdrop-blur-sm">
      <span className="self-start rounded-full bg-orange px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wide text-white">
        {offer.badge}
      </span>
      <div className="font-display text-[19px] font-extrabold text-white">{offer.route}</div>
      <p className="text-[13px] leading-relaxed text-[#bcc8ea]">{offer.description}</p>
      <Button size="sm" className="mt-auto self-start">
        {offer.ctaLabel}
      </Button>
    </div>
  );
}
