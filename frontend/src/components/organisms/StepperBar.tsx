export interface Step {
  label: string;
  status: "done" | "now" | "todo";
}

export default function StepperBar({ steps }: { steps: Step[] }) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-1 items-center last:flex-none">
          <div className="flex items-center gap-2.5">
            <span
              className={`flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full font-display text-[13px] font-extrabold text-white ${
                step.status === "done"
                  ? "bg-ok"
                  : step.status === "now"
                    ? "bg-wait"
                    : "bg-[#cdd6e8] text-[#7c88ab]"
              }`}
            >
              {step.status === "done" ? "✓" : i + 1}
            </span>
            <span
              className={`whitespace-nowrap text-[13px] font-semibold ${
                step.status === "todo" ? "text-[#7c88ab]" : "text-ink"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && <span className="mx-3 h-0.5 min-w-[34px] flex-1 bg-line" />}
        </div>
      ))}
    </div>
  );
}
