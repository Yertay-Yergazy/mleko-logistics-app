import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import {
  getAdditionalServices,
  getDangerousGoodsClasses,
  getExtraServices,
} from "../api/servicesApi";
import type { AdditionalService } from "../api/mockData/services";

export default function AdditionalServicesPage() {
  const [additional, setAdditional] = useState<AdditionalService[]>([]);
  const [extra, setExtra] = useState<AdditionalService[]>([]);
  const [classes, setClasses] = useState<{ id: number; label: string }[]>([]);

  useEffect(() => {
    getAdditionalServices().then(setAdditional);
    getExtraServices().then(setExtra);
    getDangerousGoodsClasses().then(setClasses);
  }, []);

  return (
    <>
      <section className="px-6 py-12 lg:px-16">
        <div className="font-mono text-xs font-medium uppercase tracking-widest text-blue">Сервис под ключ</div>
        <h1 className="mt-2 font-display text-[32px] font-extrabold uppercase italic text-navy">
          Дополнительные <span className="text-orange">услуги</span>
        </h1>
        <p className="mt-2 max-w-xl text-[15px] text-muted">
          Полный спектр сопровождения груза. Кнопка «запрос цены» — на каждой услуге.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {additional.map((s) => (
            <div key={s.id} className="flex gap-4 rounded-2xl border border-line bg-white p-4">
              <div className="h-24 w-24 flex-none rounded-xl bg-[repeating-linear-gradient(135deg,#dbe6f4_0_14px,#cfddef_14px_28px)]" />
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="font-display text-base font-extrabold text-navy">{s.title}</div>
                <p className="flex-1 text-[12.5px] leading-relaxed text-muted">{s.description}</p>
                <Button size="sm" className="self-start">
                  Запрос цены
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist-2 px-6 py-10 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-extrabold text-navy">Перевозка опасных грузов</h2>
          <Button size="sm">Запрос цены</Button>
        </div>
        <p className="mt-1 text-sm text-muted">Работаем со всеми 9 классами опасности (ADR / IMDG / IATA).</p>
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-9">
          {classes.map((c) => (
            <div key={c.id} className="rounded-xl border border-line bg-white p-3 text-center">
              <div className="font-display text-xl font-extrabold text-navy">{c.id}</div>
              <div className="text-[10.5px] text-muted">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-10 lg:px-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {extra.map((s) => (
            <div key={s.id} className="flex gap-4 rounded-2xl border border-line bg-white p-4">
              <div className="h-24 w-24 flex-none rounded-xl bg-[repeating-linear-gradient(135deg,#dbe6f4_0_14px,#cfddef_14px_28px)]" />
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="font-display text-base font-extrabold text-navy">{s.title}</div>
                <p className="flex-1 text-[12.5px] leading-relaxed text-muted">{s.description}</p>
                <Button size="sm" className="self-start">
                  Запрос цены
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-6 mb-12 flex flex-col gap-5 rounded-2xl bg-[linear-gradient(135deg,#182463,#2b3f9e)] p-8 text-white sm:flex-row sm:items-center sm:justify-between lg:mx-16">
        <div>
          <h3 className="font-display text-xl font-extrabold">Не нашли нужную услугу?</h3>
          <p className="mt-1 text-sm text-[#c7d2ef]">
            Опишите задачу — подберём решение и пришлём расчёт на e-mail / WhatsApp.
          </p>
        </div>
        <Link to="/raschet">
          <Button>Запросить расчёт →</Button>
        </Link>
      </section>
    </>
  );
}
