import { useEffect, useState } from "react";
import type { Offer } from "../../api/types";
import HotCard from "./HotCard";
import Icon from "../atoms/Icon";

export default function OffersCarousel({ slides }: { slides: Offer[][] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="font-mono text-[13px] font-medium uppercase tracking-wide text-orange">
          Горячие предложения недели
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Предыдущий слайд"
            onClick={() => setActive((a) => (a - 1 + slides.length) % slides.length)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/30 bg-white/5 text-white"
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 cursor-pointer rounded-full transition-all ${
                  i === active ? "w-7 bg-orange" : "w-3 bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Следующий слайд"
            onClick={() => setActive((a) => (a + 1) % slides.length)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/30 bg-white/5 text-white"
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {slides[active].map((offer) => (
          <HotCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
