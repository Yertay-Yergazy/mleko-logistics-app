import type { TransportNode } from "../../api/types";

const nodeTone: Record<string, string> = {
  orange: "bg-orange",
  blue: "bg-blue",
  navy: "bg-navy",
  green: "bg-ok",
};

export default function DirectionsTree({ nodes }: { nodes: TransportNode[] }) {
  return (
    <div className="rounded-2xl border border-line bg-mist-2 p-7">
      <div className="mb-6 flex justify-center">
        <span className="rounded-xl bg-orange px-5 py-3 font-display text-base font-extrabold italic uppercase text-white">
          Международные перевозки
        </span>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {nodes.map((node) => (
          <div key={node.id} className="flex flex-col items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-xl px-4.5 py-3 font-display text-base font-extrabold italic uppercase text-white ${nodeTone[node.tone]}`}
            >
              {node.label}
            </span>
            {node.leaves.map((leaf) => (
              <span
                key={leaf.label}
                className="flex w-full items-center justify-between gap-2 rounded-lg border-[1.6px] border-line bg-white px-3.5 py-2.5 font-mono text-xs font-bold text-navy"
              >
                {leaf.label}
                <span className="rounded-md bg-[#fdeede] px-1.5 py-0.5 text-[9.5px] text-orange-dark">
                  {leaf.action}
                </span>
              </span>
            ))}
            <span className="w-full rounded-lg border-[1.6px] border-blue px-3.5 py-2.5 text-center font-mono text-[11px] font-bold text-blue">
              {node.scope}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
