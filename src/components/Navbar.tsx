"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = ["Work", "Services", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <nav
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 px-5 py-2.5 rounded-full border transition-all duration-500"
      style={{
        width: "min(700px, calc(100vw - 32px))",
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? 0 : -12}px)`,
        background: scrolled ? "rgba(8,8,16,0.88)" : "rgba(109,40,217,0.06)",
        borderColor: scrolled ? "rgba(167,139,250,0.15)" : "rgba(167,139,250,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: scrolled ? "0 0 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(167,139,250,0.06)" : "none",
      }}
    >
      <Link href="/" className="font-heading font-black text-xl tracking-tight text-white flex-shrink-0 cursor-pointer">
        Novu
        <span style={{
          background: "linear-gradient(135deg,#A78BFA,#6D28D9)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>.</span>
      </Link>

      <ul className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <li key={l}>
            <Link
              href={`#${l.toLowerCase()}`}
              className="px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
              style={{ color: "rgba(196,181,253,0.5)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#C4B5FD"; e.currentTarget.style.background = "rgba(109,40,217,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(196,181,253,0.5)"; e.currentTarget.style.background = "transparent"; }}
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="#contact"
        className="flex-shrink-0 text-sm font-bold px-5 py-2 rounded-full text-white cursor-pointer transition-all duration-200 hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #6D28D9, #8B5CF6)" }}
      >
        Let's Talk
      </Link>
    </nav>
  );
}
