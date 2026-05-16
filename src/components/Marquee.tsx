"use client";

const items = [
  "Brand Identity", "Motion Design", "Web Development", "UX Strategy",
  "Visual Systems", "Art Direction", "Creative Direction", "Interaction Design",
];

export default function Marquee() {
  const repeated = [...items, ...items];
  return (
    <div className="relative py-6 overflow-hidden border-y border-white/8 select-none">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: "marquee 24s linear infinite" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-sm font-semibold tracking-widest uppercase text-zinc-500">
            {item}
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: i % 2 === 0 ? "#EC4899" : "#06B6D4" }}
            />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
