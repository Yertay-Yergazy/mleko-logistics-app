import { Link } from "react-router-dom";
import type { Booking } from "../../api/types";
import StatusBadge from "../atoms/StatusBadge";

export default function BookingsTable({ bookings, activeId }: { bookings: Booking[]; activeId?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="grid grid-cols-5 gap-2 bg-mist-2 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wide text-[#9aaac8]">
        <span>№</span>
        <span>Маршрут</span>
        <span>Вид</span>
        <span>Сумма</span>
        <span>Статус</span>
      </div>
      {bookings.map((b) => (
        <Link
          key={b.id}
          to={`/bron/${b.id}`}
          className={`grid grid-cols-5 items-center gap-2 border-t border-line px-4 py-3 text-sm no-underline ${
            b.id === activeId ? "bg-[#fff8f4]" : "bg-white"
          }`}
        >
          <span className="font-mono font-bold text-blue">{b.id}</span>
          <span className="text-ink">{b.route}</span>
          <span className="text-muted">{b.type}</span>
          <span className="font-display font-bold text-navy">{b.amount}</span>
          <StatusBadge status={b.status} label={b.statusLabel} />
        </Link>
      ))}
    </div>
  );
}
