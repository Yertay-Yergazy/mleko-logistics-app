export default function Checkbox({ checked, label, onChange }: { checked: boolean; label: string; onChange?: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-medium text-ink cursor-pointer select-none">
      <span
        onClick={() => onChange?.(!checked)}
        className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 ${
          checked ? "border-orange bg-orange" : "border-line bg-white"
        }`}
      >
        {checked && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
