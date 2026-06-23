import Breadcrumb from "../components/molecules/Breadcrumb";
import CalculatorForm from "../components/organisms/CalculatorForm";

export default function CalculatorPage() {
  return (
    <div className="bg-mist-2 px-6 py-10 lg:px-16">
      <Breadcrumb current="Расчёт стоимости" />
      <h1 className="mt-3 font-display text-[32px] font-extrabold uppercase italic text-navy">
        Расчёт <span className="text-orange">стоимости</span> перевозки
      </h1>

      <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <CalculatorForm />

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-[linear-gradient(135deg,#243089,#2b3f9e)] p-6 text-white">
            <h3 className="font-display text-base font-extrabold">Как это работает</h3>
            <ol className="mt-3 flex flex-col gap-3">
              {[
                "Вы отправляете заявку с параметрами груза",
                "Запрос приходит нам на e-mail и WhatsApp",
                "Менеджер присылает расчёт в том же канале",
              ].map((text, i) => (
                <li key={text} className="flex gap-3 text-sm text-[#dde4f6]">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-orange text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {text}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-display text-sm font-bold text-navy">Среднее время ответа</h3>
            <div className="mt-1 font-display text-3xl font-extrabold text-orange">~ 5 мин</div>
            <p className="mt-1 text-xs text-muted">круглосуточно, без выходных</p>
          </div>

          <div className="rounded-2xl border border-line bg-mist-2 p-6">
            <h3 className="font-display text-sm font-bold text-navy">Нужна помощь?</h3>
            <p className="mt-2 text-[13px] leading-relaxed">
              <b>+7 705 596 96 04</b>
              <br />
              <span className="text-muted">WhatsApp</span>
              <br />
              <b>byte083@gmail.com</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
