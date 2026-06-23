import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Icon from "../atoms/Icon";
import type { CabinetUser } from "../../api/types";

const navItems = [
  { to: "/cabinet", label: "Мои заявки", icon: "grid" as const, badge: 4 },
  { to: "/cabinet/active-shipments", label: "Активные грузы", icon: "eye" as const, badge: 3 },
  { to: "/cabinet/documents", label: "Документы", icon: "document" as const, badge: 7 },
  { to: "/cabinet/profile", label: "Профиль", icon: "user" as const },
  { to: "/cabinet/settings", label: "Настройки", icon: "gear" as const },
];

export default function Sidebar({ user }: { user: CabinetUser }) {
  const { pathname } = useLocation();

  return (
    <aside className="flex w-60 flex-none flex-col bg-navy text-white">
      <div className="px-5.5 pb-4.5 pt-6">
        <img src={logo} alt="Млечный Путь" className="h-8 w-auto rounded-md bg-white p-1 brightness-110" />
      </div>

      <div className="flex items-center gap-3 border-y border-white/10 px-4.5 py-3.5">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-orange font-bold text-white">
          {user.initials}
        </span>
        <div>
          <div className="text-[13px] font-bold">{user.name}</div>
          <div className="text-[11px] text-[#aebbe6]">{user.company}</div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 py-3">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4.5 py-2.5 text-sm no-underline ${
                active
                  ? "border-l-[3px] border-orange bg-orange/15 text-white"
                  : "border-l-[3px] border-transparent text-[#aebbe6]"
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    active ? "bg-orange text-white" : "bg-white/15 text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="mt-2 flex-1" />

        <Link
          to="/"
          className="mt-2 flex items-center gap-3 border-t border-white/10 px-4.5 py-3 text-[12.5px] text-[#7a8ab8] no-underline"
        >
          <Icon name="logout" size={16} />
          Выйти
        </Link>
      </nav>
    </aside>
  );
}
