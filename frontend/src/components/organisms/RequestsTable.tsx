import { useState } from "react";
import type { CabinetRequest } from "../../api/types";
import StatusBadge from "../atoms/StatusBadge";
import Icon from "../atoms/Icon";

const typeIcon = { air: "plane", auto: "truck", sea: "ship" } as const;

type SortOrder = "newest" | "oldest";

function parseSentDate(value: string): number {
  const [day, month, year] = value.split(".").map(Number);
  if (!day || !month || !year) return 0;
  return new Date(2000 + year, month - 1, day).getTime();
}

export default function RequestsTable({
  requests,
  filters,
  selectedId,
  onSelect,
}: {
  requests: CabinetRequest[];
  filters: { id: string; label: string }[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOrder>("newest");

  const filtered = requests
    .filter((r) => {
      if (filter === "all") return true;
      if (filter === "in-transit") return r.statusLabel === "В пути";
      if (filter === "processing") return r.statusLabel === "Оформление";
      if (filter === "customs") return r.statusLabel === "На таможне";
      if (filter === "delivered") return r.statusLabel === "Доставлен";
      return true;
    })
    .filter((r) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        r.id.toLowerCase().includes(q) ||
        r.route.toLowerCase().includes(q) ||
        r.cargoInfo.toLowerCase().includes(q) ||
        r.statusLabel.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const diff = parseSentDate(a.sentDate) - parseSentDate(b.sentDate);
      return sort === "newest" ? -diff : diff;
    });

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex flex-none flex-wrap items-center justify-between gap-2 border-b border-line px-4.5 py-3.5">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                filter === f.id ? "bg-navy text-white" : "bg-mist text-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex h-7.5 items-center gap-1.5 rounded-lg border border-line bg-mist-2 px-2.5">
            <Icon name="search" size={13} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по №, маршруту, грузу…"
              className="h-full w-44 bg-transparent text-xs text-ink placeholder:text-[#9aa6c8] focus:outline-none"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
            className="h-7.5 rounded-lg border border-line bg-mist-2 px-2 text-xs font-semibold text-ink focus:outline-none"
          >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
          </select>
        </div>
      </div>

      <div className="grid flex-none grid-cols-6 gap-2 border-b border-line bg-mist-2 px-4.5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wide text-[#9aaac8]">
        <span>№</span>
        <span>Маршрут</span>
        <span>Тип</span>
        <span>Статус</span>
        <span>Отправлен</span>
        <span>Прибытие</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="px-4.5 py-6 text-center text-sm text-muted">Ничего не найдено</div>
        )}
        {filtered.map((r) => {
          const selected = r.id === selectedId;
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              className={`grid w-full grid-cols-6 items-center gap-2 border-b border-line px-4.5 py-3 text-left text-[13px] ${
                selected ? "border-l-[3px] border-l-orange bg-[#fff8f4]" : "border-l-[3px] border-l-transparent"
              }`}
            >
              <span className="font-mono font-bold text-navy">{r.id}</span>
              <span className="text-ink">
                {r.route}
                <span className="block text-[11px] text-muted">{r.cargoInfo}</span>
              </span>
              <span className="flex items-center gap-1.5 text-blue">
                <Icon name={typeIcon[r.type]} size={14} />
                {r.typeLabel}
              </span>
              <StatusBadge status={r.status} label={r.statusLabel} />
              <span className="text-muted">{r.sentDate}</span>
              <span className={r.arrivalDone ? "font-bold text-ok" : "font-bold text-navy"}>
                {r.arrivalDate} {r.arrivalDone && "✓"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
