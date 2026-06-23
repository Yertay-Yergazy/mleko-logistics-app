import { useState } from "react";
import Icon from "../atoms/Icon";
import { FieldLabel, Input, Select, Textarea } from "../atoms/Input";
import SegmentedControl from "../atoms/SegmentedControl";
import Checkbox from "../atoms/Checkbox";
import Button from "../atoms/Button";
import { submitQuoteRequest } from "../../api/quoteApi";
import type { QuoteRequest } from "../../api/types";

const transportOptions = [
  { id: "auto", label: "Авто", hint: "LTL / FTL" },
  { id: "air", label: "Авиа", hint: "регулярные / чартер" },
  { id: "sea", label: "Море", hint: "FCL / LCL" },
  { id: "rail", label: "ЖД", hint: "import" },
  { id: "multimodal", label: "Мультимод.", hint: "combo" },
];

export default function CalculatorForm() {
  const [transportMode, setTransportMode] = useState("auto");
  const [replyByEmail, setReplyByEmail] = useState(true);
  const [replyByWhatsapp, setReplyByWhatsapp] = useState(true);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: QuoteRequest = {
      transportMode,
      from: String(form.get("from") || ""),
      to: String(form.get("to") || ""),
      cargoType: String(form.get("cargoType") || ""),
      direction: String(form.get("direction") || ""),
      weightKg: String(form.get("weightKg") || ""),
      dimensions: String(form.get("dimensions") || ""),
      pieces: String(form.get("pieces") || ""),
      comment: String(form.get("comment") || ""),
      email: String(form.get("email") || ""),
      whatsapp: String(form.get("whatsapp") || ""),
      replyByEmail,
      replyByWhatsapp,
    };
    await submitQuoteRequest(payload);
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-7 shadow-[0_10px_30px_rgba(22,32,92,.06)]"
    >
      <FieldLabel>Вид перевозки</FieldLabel>
      <SegmentedControl options={transportOptions} value={transportMode} onChange={setTransportMode} className="mb-5" />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel>Откуда</FieldLabel>
          <Input name="from" defaultValue="Алматы, KZ" icon={<Icon name="pin-from" size={16} />} />
        </div>
        <div>
          <FieldLabel>Куда</FieldLabel>
          <Input name="to" defaultValue="Москва, RU" icon={<Icon name="pin-to" size={16} />} />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel>Тип груза</FieldLabel>
          <Select name="cargoType" defaultValue="ltl">
            <option value="ltl">Сборный груз (LTL)</option>
            <option value="ftl">Полная машина (FTL)</option>
          </Select>
        </div>
        <div>
          <FieldLabel>Направление</FieldLabel>
          <Select name="direction" defaultValue="export">
            <option value="export">Export</option>
            <option value="import">Import</option>
          </Select>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <FieldLabel>Вес, кг</FieldLabel>
          <Input name="weightKg" defaultValue="1 200" />
        </div>
        <div>
          <FieldLabel>Размеры, см</FieldLabel>
          <Input name="dimensions" defaultValue="120×80×100" />
        </div>
        <div>
          <FieldLabel>Мест</FieldLabel>
          <Input name="pieces" defaultValue="6" />
        </div>
      </div>

      <div className="mb-5">
        <FieldLabel>Комментарий к грузу</FieldLabel>
        <Textarea name="comment" placeholder="Габариты, особенности, опасный класс…" />
      </div>

      <div className="mb-5 h-px bg-line" />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel>E-mail</FieldLabel>
          <Input name="email" type="email" placeholder="you@mail.com" icon={<Icon name="email" size={16} />} />
        </div>
        <div>
          <FieldLabel>WhatsApp / телефон</FieldLabel>
          <Input name="whatsapp" placeholder="+7 ___ ___ __ __" icon={<Icon name="whatsapp" size={16} />} />
        </div>
      </div>

      <div className="mb-6 flex gap-6">
        <Checkbox checked={replyByEmail} onChange={setReplyByEmail} label="Ответ на e-mail" />
        <Checkbox checked={replyByWhatsapp} onChange={setReplyByWhatsapp} label="Ответ в WhatsApp" />
      </div>

      <Button type="submit" className="h-[52px] w-full text-base">
        {sent ? "Заявка отправлена ✓" : "Отправить запрос на расчёт →"}
      </Button>
    </form>
  );
}
