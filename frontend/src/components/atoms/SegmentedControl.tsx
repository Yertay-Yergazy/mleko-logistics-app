export interface SegmentedOption {
  id: string;
  label: string;
  hint?: string;
}

export default function SegmentedControl({
  options,
  value,
  onChange,
  className = "",
}: {
  options: SegmentedOption[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {options.map((opt) => {
        const on = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl border-2 py-2.5 font-display text-[13px] font-bold transition-colors ${
              on ? "border-blue bg-mist text-navy" : "border-line bg-white text-muted"
            }`}
          >
            {opt.label}
            {opt.hint && <small className="font-mono text-[9px] font-medium">{opt.hint}</small>}
          </button>
        );
      })}
    </div>
  );
}
