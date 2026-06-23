import { Link } from "react-router-dom";
import Breadcrumb from "../components/molecules/Breadcrumb";
import DirectionsTree from "../components/organisms/DirectionsTree";
import DirectionsMarquee from "../components/organisms/DirectionsMarquee";
import ProcessSteps from "../components/organisms/ProcessSteps";
import Button from "../components/atoms/Button";
import { transportTree, outboundDirections, inboundDirections, processSteps } from "../api/mockData/directions";

export default function InternationalPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#182463,#26379a)] px-6 py-12 text-white lg:px-16">
        <div className="text-[#aebbe6]">
          <Breadcrumb current="Международные перевозки" />
        </div>
        <h1 className="mt-3 font-display text-[34px] font-extrabold uppercase italic">
          Международные <span className="text-orange">перевозки</span>
        </h1>
        <p className="mt-2 max-w-xl text-[15px] text-[#c7d2ef]">
          Авиа / Авто / ЖД / Море. Выберите вид транспорта и тип отправки — рассчитаем стоимость и забронируем.
        </p>
      </section>

      <section className="px-6 py-10 lg:px-16">
        <DirectionsTree nodes={transportTree} />
      </section>

      <section className="bg-mist-2 px-6 py-10 lg:px-16">
        <div className="mb-5 font-mono text-xs font-medium uppercase tracking-widest text-blue">
          50+ маршрутов · запрос цены на каждый
        </div>
        <DirectionsMarquee outbound={outboundDirections} inbound={inboundDirections} />
      </section>

      <section className="px-6 py-10 lg:px-16">
        <h2 className="mb-6 font-display text-2xl font-extrabold uppercase italic text-navy">Как мы работаем</h2>
        <ProcessSteps steps={processSteps} />
      </section>

      <section className="mx-6 mb-12 flex flex-col gap-5 rounded-2xl bg-[linear-gradient(135deg,#182463,#2b3f9e)] p-8 text-white sm:flex-row sm:items-center sm:justify-between lg:mx-16">
        <div>
          <h3 className="font-display text-xl font-extrabold">Нужен расчёт по своему маршруту?</h3>
          <p className="mt-1 text-sm text-[#c7d2ef]">Ответим на e-mail и WhatsApp в течение рабочего дня.</p>
        </div>
        <Link to="/raschet">
          <Button>Рассчитать стоимость →</Button>
        </Link>
      </section>
    </>
  );
}
