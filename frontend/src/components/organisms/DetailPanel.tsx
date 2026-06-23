import type { CabinetRequestDetail } from "../../api/types";
import Icon from "../atoms/Icon";
import StatusBadge from "../atoms/StatusBadge";

export default function DetailPanel({ detail }: { detail: CabinetRequestDetail }) {
  return (
    <aside className="flex w-[360px] flex-none flex-col overflow-hidden border-l border-line bg-white">
      <div className="flex-none border-b border-line px-5 pb-3.5 pt-4.5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[15px] font-extrabold text-navy">{detail.id}</span>
          <StatusBadge status="wait" label="В пути" />
        </div>
        <div className="mt-1 text-xs text-[#7a8ab8]">
          {detail.fromCity} ({detail.fromCode}) → {detail.toCity} ({detail.toCode})
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <section className="border-b border-line px-5 py-4.5">
          <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wide text-[#9aaac8]">
            Маршрут · {detail.mode === "air" ? "Авиа" : detail.mode === "auto" ? "Авто" : "Море"}
          </div>
          <div className="flex items-center justify-between text-xs text-muted">
            <div className="text-center">
              <div className="font-display font-bold text-navy">{detail.fromCode}</div>
              <div>{detail.fromCity}</div>
            </div>
            <div className="relative mx-3 h-0.5 flex-1 bg-line">
              <div className="absolute inset-y-0 left-0 bg-orange" style={{ width: `${detail.progressPercent}%` }} />
              <span
                className="absolute -top-5 -translate-x-1/2 whitespace-nowrap font-mono text-[9.5px] font-bold text-orange"
                style={{ left: `${detail.progressPercent}%` }}
              >
                ✈ сейчас здесь
              </span>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-navy">{detail.toCode}</div>
              <div>{detail.toCity}</div>
            </div>
          </div>
        </section>

        <section className="border-b border-line px-5 py-4">
          <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wide text-[#9aaac8]">
            Статусы отправки
          </div>
          <div className="flex flex-col">
            {detail.timeline.map((step, i) => (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-5 w-5 flex-none items-center justify-center rounded-full text-[10px] ${
                      step.state === "done"
                        ? "bg-ok text-white"
                        : step.state === "active"
                          ? "bg-orange text-white"
                          : "border-2 border-line bg-white"
                    }`}
                  >
                    {step.state === "done" ? "✓" : ""}
                  </span>
                  {i < detail.timeline.length - 1 && <span className="my-0.5 w-px flex-1 bg-line" />}
                </div>
                <div className="pb-3.5">
                  <div className={`text-[12.5px] font-semibold ${step.state === "pending" ? "text-muted" : "text-ink"}`}>
                    {step.label}
                  </div>
                  <div className="text-[10.5px] text-[#7a8ab8]">{step.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-line px-5 py-3.5">
          <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wide text-[#9aaac8]">
            Детали груза
          </div>
          <div className="grid grid-cols-2 gap-2 text-[12.5px]">
            <div>
              <span className="text-muted">Вес: </span>
              {detail.weight}
            </div>
            <div>
              <span className="text-muted">Объём: </span>
              {detail.volume}
            </div>
            <div>
              <span className="text-muted">Тип груза: </span>
              {detail.cargoType}
            </div>
            <div>
              <span className="text-muted">Упаковка: </span>
              {detail.packaging}
            </div>
          </div>
        </section>

        <section className="border-b border-line px-5 py-3.5">
          <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wide text-[#9aaac8]">
            Документы
          </div>
          <div className="flex flex-col gap-1.5">
            {detail.documents.map((doc) => (
              <div
                key={doc.name}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                  doc.status === "needs-signature" ? "border border-[#fde0cc] bg-[#fff8f4]" : "bg-mist"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon name="document" size={14} />
                  {doc.name}
                </span>
                <span className={`font-bold ${doc.status === "ready" ? "text-ok" : "text-orange"}`}>
                  {doc.status === "ready" ? "✓ готов" : "⚡ нужна подпись"}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-none gap-2 px-5 py-3.5">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-navy py-2.5 text-xs font-bold text-white">
            <Icon name="download" size={14} />
            Документы
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-orange py-2.5 text-xs font-bold text-orange">
            <Icon name="phone" size={14} />
            Связаться
          </button>
        </section>
      </div>
    </aside>
  );
}
