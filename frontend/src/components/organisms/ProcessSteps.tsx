import type { ProcessStep } from "../../api/types";

export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <div key={step.number} className="rounded-2xl border border-line bg-white p-5">
          <div className="font-display text-sm font-extrabold text-sky-2">{step.number}</div>
          <div className="mt-1 font-display text-[15px] font-bold text-navy">{step.title}</div>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
