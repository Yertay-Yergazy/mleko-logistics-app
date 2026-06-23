import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../components/molecules/Breadcrumb";
import ServiceCard from "../components/organisms/ServiceCard";
import Icon from "../components/atoms/Icon";
import { getServiceFilters, getServices } from "../api/servicesApi";
import type { Service } from "../api/types";

export default function CatalogPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState<{ id: string; label: string }[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getServices().then(setServices);
    getServiceFilters().then((f) => setFilters([...f]));
  }, []);

  const filtered = useMemo(
    () =>
      services.filter((s) => {
        const matchesFilter = activeFilter === "all" || s.category === activeFilter;
        const matchesQuery = s.title.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [services, activeFilter, query],
  );

  return (
    <div className="bg-mist-2 px-6 py-10 lg:px-16">
      <Breadcrumb current="Каталог услуг" />
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-[32px] font-extrabold uppercase italic text-navy">
          Каталог <span className="text-orange">услуг</span>
        </h1>
        <div className="flex gap-2">
          <div className="flex h-10 w-60 items-center gap-2 rounded-lg border border-line bg-white px-3">
            <Icon name="search" size={15} className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск услуги…"
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`rounded-full px-4 py-2 font-mono text-xs font-bold uppercase ${
              activeFilter === f.id ? "bg-orange text-white" : "bg-white text-muted border border-line"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
