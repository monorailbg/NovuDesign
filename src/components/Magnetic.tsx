"use client";

import { useRef, ReactNode } from "react";

export default function Magnetic({
  children,
  strength = 0.28,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const el  = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const tgt = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  const tick = () => {
    const dx = tgt.current.x - pos.current.x;
    const dy = tgt.current.y - pos.current.y;
    pos.current.x += dx * 0.18;
    pos.current.y += dy * 0.18;
    if (el.current)
      el.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`;
    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05)
      raf.current = requestAnimationFrame(tick);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!el.current) return;
    const r = el.current.getBoundingClientRect();
    tgt.current = {
      x: (e.clientX - (r.left + r.width  / 2)) * strength,
      y: (e.clientY - (r.top  + r.height / 2)) * strength,
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };

  const onMouseLeave = () => {
    tgt.current = { x: 0, y: 0 };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };

  return (
    <div
      ref={el}
      data-magnetic
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
