"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a,button,[data-magnetic]";

export default function Cursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringOuter = useRef<HTMLDivElement>(null);
  const ringInner = useRef<HTMLDivElement>(null);
  const target    = useRef({ x: -200, y: -200 });
  const current   = useRef({ x: -200, y: -200 });
  const rafId     = useRef<number>(0);
  const hovered   = useRef(false);

  useEffect(() => {
    // Hide on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    const expand = () => {
      hovered.current = true;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringInner.current) {
        ringInner.current.style.width       = "64px";
        ringInner.current.style.height      = "64px";
        ringInner.current.style.marginLeft  = "-32px";
        ringInner.current.style.marginTop   = "-32px";
        ringInner.current.style.borderColor = "rgba(155,52,32,0.55)";
        ringInner.current.style.background  = "rgba(155,52,32,0.04)";
      }
    };

    const contract = () => {
      hovered.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringInner.current) {
        ringInner.current.style.width       = "40px";
        ringInner.current.style.height      = "40px";
        ringInner.current.style.marginLeft  = "-20px";
        ringInner.current.style.marginTop   = "-20px";
        ringInner.current.style.borderColor = "rgba(107,120,216,0.45)";
        ringInner.current.style.background  = "transparent";
      }
    };

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    // Only expand/contract when truly entering/leaving an interactive zone
    const onOver = (e: MouseEvent) => {
      const entering = (e.target as HTMLElement).closest(INTERACTIVE);
      if (!entering) return;
      const from = (e.relatedTarget as HTMLElement | null)?.closest(INTERACTIVE);
      if (!from) expand(); // only expand if we weren't already in an interactive el
    };

    const onOut = (e: MouseEvent) => {
      const leaving = (e.target as HTMLElement).closest(INTERACTIVE);
      if (!leaving) return;
      const to = (e.relatedTarget as HTMLElement | null)?.closest(INTERACTIVE);
      if (!to) contract(); // only contract if we're not moving into another interactive el
    };

    const loop = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.13;
      current.current.y += dy * 0.13;

      if (dotRef.current)
        dotRef.current.style.transform =
          `translate(${target.current.x - 4}px,${target.current.y - 4}px)`;
      if (ringOuter.current)
        ringOuter.current.style.transform =
          `translate(${current.current.x}px,${current.current.y}px)`;

      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: "8px", height: "8px",
          borderRadius: "50%",
          background: "#fff",
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "opacity 0.2s ease",
        }}
      />
      <div
        ref={ringOuter}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          ref={ringInner}
          style={{
            width: "40px", height: "40px",
            marginLeft: "-20px", marginTop: "-20px",
            borderRadius: "50%",
            border: "1px solid rgba(107,120,216,0.45)",
            background: "transparent",
            transition:
              "width 0.5s cubic-bezier(0.16,1,0.3,1)," +
              "height 0.5s cubic-bezier(0.16,1,0.3,1)," +
              "margin 0.5s cubic-bezier(0.16,1,0.3,1)," +
              "border-color 0.3s ease," +
              "background 0.3s ease",
          }}
        />
      </div>
    </>
  );
}
