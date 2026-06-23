export default function Radio({ on }: { on?: boolean }) {
  return (
    <span
      className={`relative inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${
        on ? "border-orange" : "border-line"
      }`}
    >
      {on && <span className="h-2.5 w-2.5 rounded-full bg-orange" />}
    </span>
  );
}
