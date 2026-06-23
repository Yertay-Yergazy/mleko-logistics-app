import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatusBadge from "../components/atoms/StatusBadge";
import StepperBar, { type Step } from "../components/organisms/StepperBar";
import BookingsTable from "../components/organisms/BookingsTable";
import Radio from "../components/atoms/Radio";
import Button from "../components/atoms/Button";
import { getBookingById, getBookings, issueInvoice } from "../api/bookingsApi";
import type { Booking, BookingDetail } from "../api/types";

export default function BookingDetailPage() {
  const { id = "MP-024815" } = useParams();
  const [detail, setDetail] = useState<BookingDetail>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"requisites" | "remote">("requisites");
  const [issued, setIssued] = useState(false);

  useEffect(() => {
    getBookingById(id).then(setDetail);
    getBookings().then(setBookings);
  }, [id]);

  if (!detail) return null;

  const steps: Step[] = [
    { label: "Заявка создана", status: "done" },
    { label: "В ожидании", status: detail.status === "wait" ? "now" : "done" },
    { label: "Счёт выставлен", status: issued ? "now" : "todo" },
    { label: "Готово", status: "todo" },
  ];

  return (
    <div className="bg-mist-2 px-6 py-10 lg:px-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm text-muted">
            Бронирование № <b className="text-navy">{detail.id}</b> · создано {detail.createdAt}
          </div>
          <h1 className="mt-1 font-display text-[28px] font-extrabold uppercase italic text-navy">
            Бронирование <span className="text-orange">груза</span>
          </h1>
        </div>
        <StatusBadge status={detail.status} label={detail.statusLabel} />
      </div>

      <div className="mt-7 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-line bg-white p-6">
            <StepperBar steps={steps} />
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-display text-base font-bold text-navy">Детали перевозки</h3>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <Field label="Вид перевозки" value={detail.transportType} />
              <Field label="Направление" value={detail.direction} />
              <Field label="Маршрут" value={detail.route} />
              <Field label="Дата отправки" value={detail.departureDate} />
              <Field label="Вес / объём" value={detail.weightVolume} />
              <Field label="Тип груза" value={detail.cargoType} />
            </div>
            <div className="my-5 h-px bg-line" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted">Сумма к оплате</span>
              <span className="font-display text-[26px] font-extrabold text-navy">{detail.amount}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-display text-base font-bold text-navy">Мои бронирования</h3>
            <BookingsTable bookings={bookings} activeId={detail.id} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border-[1.6px] border-orange bg-white p-5.5">
            <h3 className="font-display text-base font-bold text-navy">Выставить счёт</h3>
            <p className="mt-1 text-xs text-muted">Выберите способ оплаты для формирования счёта.</p>

            <div className="mt-4 flex flex-col gap-2.5">
              <PaymentOption
                active={paymentMethod === "requisites"}
                title="По реквизитам"
                subtitle="Счёт на юр. лицо / ИП"
                onClick={() => setPaymentMethod("requisites")}
              />
              <PaymentOption
                active={paymentMethod === "remote"}
                title="Удалённая оплата"
                subtitle="Онлайн-ссылка на оплату"
                onClick={() => setPaymentMethod("remote")}
              />
            </div>

            <Button
              className="mt-4 h-12 w-full"
              onClick={async () => {
                await issueInvoice(detail.id, paymentMethod);
                setIssued(true);
              }}
            >
              {issued ? "Счёт выставлен ✓" : "Выставить счёт"}
            </Button>
          </div>

          <div className="rounded-2xl border border-line bg-mist-2 p-5">
            <h3 className="font-display text-sm font-bold text-navy">Статус брони</h3>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted">Текущий статус</span>
              <StatusBadge status="wait" label="В ожидании" />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted">После оплаты</span>
              <StatusBadge status="ok" label="Готово" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted">{label}</div>
      <div className="font-semibold text-ink">{value}</div>
    </div>
  );
}

function PaymentOption({
  active,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left ${
        active ? "border-orange bg-[#fff7ef]" : "border-line"
      }`}
    >
      <Radio on={active} />
      <span>
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="block text-xs text-muted">{subtitle}</span>
      </span>
    </button>
  );
}
