import Icon from "../atoms/Icon";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/77055969604"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-16 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_26px_rgba(37,211,102,.45)]"
      aria-label="WhatsApp"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
