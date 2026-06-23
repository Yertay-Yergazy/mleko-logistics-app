import logo from "../../assets/logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-navy px-6 pb-7 pt-9 text-white lg:px-16">
      <div className="flex flex-col gap-9 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <img src={logo} alt="Млечный Путь" className="h-11 w-auto rounded-xl bg-white p-1.5" />

        <div className="grid flex-1 grid-cols-1 gap-7 sm:grid-cols-3 sm:pl-10">
          <div>
            <h4 className="mb-3 font-display text-[13px] font-extrabold uppercase tracking-wide text-[#aebbe6]">
              Перевозки
            </h4>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">Международные</a>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">Внутри КЗ</a>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">Мультимодальные</a>
          </div>
          <div>
            <h4 className="mb-3 font-display text-[13px] font-extrabold uppercase tracking-wide text-[#aebbe6]">
              Услуги
            </h4>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">Упаковка</a>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">Склад / СВХ</a>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">Брокерские</a>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">Животные</a>
          </div>
          <div>
            <h4 className="mb-3 font-display text-[13px] font-extrabold uppercase tracking-wide text-[#aebbe6]">
              Контакты
            </h4>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">+7 727 304 33 61</a>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">+7 705 596 96 04</a>
            <a className="mb-2 block text-[13.5px] text-[#dde4f6]">byte083@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-4 font-mono text-xs text-[#9aa7d4] sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Млечный Путь · mleko.kz</span>
        <span>РУ · EN · TR</span>
      </div>
    </footer>
  );
}
