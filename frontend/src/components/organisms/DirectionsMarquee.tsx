export default function DirectionsMarquee({ outbound, inbound }: { outbound: string[]; inbound: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <Track items={outbound} reverse={false} />
      <Track items={inbound} reverse />
    </div>
  );
}

function Track({ items, reverse }: { items: string[]; reverse: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div
        className={`flex w-max gap-3 px-1.5 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-[marquee-rev_54s_linear_infinite]" : "animate-[marquee_46s_linear_infinite]"
        }`}
      >
        {doubled.map((chip, i) => (
          <span
            key={`${chip}-${i}`}
            className="inline-flex flex-none items-center gap-2 rounded-lg border-[1.6px] border-line bg-white px-4 py-2.5 font-mono text-sm font-bold tracking-wide text-navy"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
