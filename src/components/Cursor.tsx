"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringOuter = useRef<HTMLDivElement>(null);
  const ringInner = useRef<HTMLDivElement>(null);
  const target    = useRef({ x: -100, y: -100 });
  const current   = useRef({ x: -100, y: -100 });
  const rafId     = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("a,button,[data-magnetic]")) return;
      if (dotRef.current)    dotRef.current.style.opacity    = "0";
      if (ringInner.current) {
        ringInner.current.style.width        = "64px";
        ringInner.current.style.height       = "64px";
        ringInner.current.style.marginLeft   = "-32px";
        ringInner.current.style.marginTop    = "-32px";
        ringInner.current.style.borderColor  = "rgba(155,52,32,0.55)";
        ringInner.current.style.background   = "rgba(155,52,32,0.04)";
      }
    };

    const onOut = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("a,button,[data-magnetic]")) return;
      if (dotRef.current)    dotRef.current.style.opacity    = "1";
      if (ringInner.current) {
        ringInner.current.style.width        = "40px";
        ringInner.current.style.height       = "40px";
        ringInner.current.style.marginLeft   = "-20px";
        ringInner.current.style.marginTop    = "-20px";
        ringInner.current.style.borderColor  = "rgba(107,120,216,0.45)";
        ringInner.current.style.background   = "transparent";
      }
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
      {/* Dot — snaps to cursor exactly, disappears on interactive elements */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: "8px", height: "8px",
          borderRadius: "50%",
          background: "#fff",
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Ring — lags behind, expands on hover via inner div with CSS transitions */}
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
