"use client";

const items = [
  "Brand Identity", "Motion Design", "Web Development", "UX Strategy",
  "Visual Systems", "Art Direction", "Creative Direction", "Interaction Design",
];

export default function Marquee() {
  const repeated = [...items, ...items];
  return (
    <div className="relative py-5 overflow-hidden border-y select-none" style={{ borderColor: "rgba(107,120,216,0.1)" }}>
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 26s linear infinite" }}>
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(107,120,216,0.35)" }}>
            {item}
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: i % 2 === 0 ? "#9B3420" : "#3A45C4" }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}
