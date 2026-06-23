import Icon from "../atoms/Icon";
import type { CabinetUser } from "../../api/types";

export default function CabinetTopbar({ title, user }: { title: string; user: CabinetUser }) {
  return (
    <header className="flex h-[58px] flex-none items-center gap-4 border-b border-line bg-white px-7">
      <h1 className="flex-1 font-display text-lg font-extrabold text-navy">{title}</h1>

      <div className="hidden h-[34px] w-[220px] items-center gap-2 rounded-lg border border-line bg-mist px-3 sm:flex">
        <Icon name="search" size={15} className="text-muted" />
        <input
          placeholder="Поиск заявок…"
          className="w-full bg-transparent text-xs text-ink placeholder:text-muted focus:outline-none"
        />
      </div>

      <button className="flex h-[34px] items-center gap-1.5 rounded-lg bg-orange px-4 text-[12.5px] font-bold text-white">
        <Icon name="plus" size={14} />
        Новая заявка
      </button>

      <button className="relative text-muted">
        <Icon name="bell" size={19} />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-orange" />
      </button>

      <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-orange text-xs font-bold text-white">
        {user.initials}
      </span>
    </header>
  );
}
