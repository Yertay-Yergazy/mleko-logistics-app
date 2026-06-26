import { Link } from "react-router-dom";
import Breadcrumb from "../components/molecules/Breadcrumb";
import Button from "../components/atoms/Button";
import StatusBadge from "../components/atoms/StatusBadge";
import Pill from "../components/atoms/Pill";
import Icon from "../components/atoms/Icon";
import { domesticCities } from "../api/mockData/directions";

export default function DomesticPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#182463,#26379a)] px-6 py-12 text-white lg:px-16">
        <div className="text-[#aebbe6]">
          <Breadcrumb current="Перевозки внутри Казахстана" />
        </div>
        <h1 className="mt-3 font-display text-[34px] font-extrabold uppercase italic">
          Перевозки <span className="text-orange">внутри Казахстана</span>
        </h1>
        <p className="mt-2 max-w-xl text-[15px] text-[#c7d2ef]">
          Быстрая доставка авто и авиа между городами Казахстана. Запрос цены — на каждое направление.
        </p>
      </section>

      <section className="px-6 py-10 lg:px-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-xl bg-blue px-4 py-2.5 font-display text-base font-extrabold italic uppercase text-white">
                <Icon name="plane" size={16} /> Авиа
              </span>
              <StatusBadge status="ok" label="Бронь онлайн" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Срочная авиа-доставка между городами Казахстана. Идеально для срочных и ценных грузов.
            </p>
            <div className="mt-5 flex gap-3">
              <Link to="/raschet?transportMode=air"><Button variant="outline" size="sm">Рассчитать</Button></Link>
              <Link to="/raschet?transportMode=air"><Button size="sm">Забронировать</Button></Link>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 font-display text-base font-extrabold italic uppercase text-white">
                <Icon name="truck" size={16} /> Авто
              </span>
              <StatusBadge status="ok" label="Бронь онлайн" />
            </div>
            <div className="mt-3 flex gap-2">
              <span className="flex items-center gap-2 rounded-lg border-[1.6px] border-line px-3 py-2 font-mono text-xs font-bold text-navy">
                Полная машина FTL <span className="rounded bg-[#fdeede] px-1.5 py-0.5 text-[9.5px] text-orange-dark">расчёт</span>
              </span>
              <span className="flex items-center gap-2 rounded-lg border-[1.6px] border-line px-3 py-2 font-mono text-xs font-bold text-navy">
                Сборный груз LTL <span className="rounded bg-[#fdeede] px-1.5 py-0.5 text-[9.5px] text-orange-dark">расчёт</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Полные и сборные загрузки автотранспортом по всей территории страны.
            </p>
            <div className="mt-5 flex gap-3">
              <Link to="/raschet?transportMode=auto"><Button variant="outline" size="sm">Рассчитать</Button></Link>
              <Link to="/raschet?transportMode=auto"><Button size="sm">Забронировать</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist-2 px-6 py-10 lg:px-16">
        <div className="font-mono text-xs font-medium uppercase tracking-widest text-blue">Дверная доставка</div>
        <div className="mt-2 flex items-center gap-3">
          <h2 className="font-display text-2xl font-extrabold uppercase italic text-navy">
            Доставка <span className="text-orange">внутри городов</span>
          </h2>
          <Pill tone="orange">Запрос цены на каждый город</Pill>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {domesticCities.map((c) => (
            <span
              key={c.city}
              className="flex items-center justify-between gap-2 rounded-lg border-[1.6px] border-line bg-white px-3.5 py-2.5 font-mono text-xs font-bold text-navy"
            >
              {c.city}
              <span className="rounded bg-[#fdeede] px-1.5 py-0.5 text-[9.5px] text-orange-dark">{c.price}</span>
            </span>
          ))}
          <span className="flex items-center justify-center rounded-lg bg-mist px-3.5 py-2.5 font-mono text-xs font-bold text-muted">
            + другие города
          </span>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <span className="inline-flex items-center gap-2 rounded-xl bg-blue px-4 py-2.5 font-display text-sm font-extrabold italic uppercase text-white">
              Услуги грузчиков
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Погрузка и разгрузка в любом городе. Запрос цены на пункт.
            </p>
          </div>
          <div className="rounded-2xl bg-[linear-gradient(135deg,#f3852b,#e0701a)] p-6 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 font-bold">!</div>
            <h3 className="mt-3 font-display text-base font-extrabold">Онлайн-бронирование — тестовый период</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              Сейчас бронирование доступно только для <b>авто</b> и <b>авиа</b>. Остальные виды — по запросу.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
