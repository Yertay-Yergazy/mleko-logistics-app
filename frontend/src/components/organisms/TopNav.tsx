import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Button from "../atoms/Button";
import { useLanguage } from "../../context/LanguageContext";

const menu = [
  { to: "/", label: "Главная" },
  { to: "/uslugi", label: "Услуги" },
  { to: "/mezhdunarodnye", label: "Международные" },
  { to: "/vnutri-kz", label: "Внутренние" },
];

export default function TopNav() {
  const { pathname } = useLocation();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="flex h-20 items-center gap-7 border-b border-line bg-white px-6 lg:px-16">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Млечный Путь" className="h-12 w-auto" />
        <span className="hidden border-l border-line pl-3 font-mono text-[9.5px] uppercase leading-tight text-muted sm:block">
          Логистика
          <br />
          <b className="font-bold text-navy">основан в 2013</b>
        </span>
      </Link>

      <nav className="ml-2 hidden gap-6 lg:flex">
        {menu.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`whitespace-nowrap text-[15px] font-semibold ${
              pathname === item.to ? "text-blue" : "text-ink"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="hidden items-center gap-1 rounded-xl bg-mist p-1 sm:flex">
        {(["RU", "EN", "TR"] as const).map((lng) => (
          <span
            key={lng}
            onClick={() => setLanguage(lng)}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 font-display text-xs font-bold ${
              language === lng ? "bg-white text-navy shadow-sm" : "text-muted"
            }`}
          >
            {lng}
          </span>
        ))}
      </div>

      <Link to="/raschet">
        <Button>Рассчитать</Button>
      </Link>
    </header>
  );
}
