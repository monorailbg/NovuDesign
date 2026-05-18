"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import Magnetic from "@/components/Magnetic";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled]   = useState(false);
  const [visible, setVisible]     = useState(false);
  const [active, setActive]       = useState<string | null>(null);
  const [inkStyle, setInkStyle]   = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLUListElement>(null);

  const links = [
    { label: t.nav.work,     href: "#work" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.about,    href: "#about" },
    { label: t.nav.insights, href: "#insights" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  const updateInk = (el: HTMLElement) => {
    const nav = navRef.current;
    if (!nav) return;
    const nr = nav.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setInkStyle({ left: er.left - nr.left, width: er.width, opacity: 1 });
  };

  const clearInk = () => setInkStyle(s => ({ ...s, opacity: 0 }));

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : -16}px)`,
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div
        className="mx-auto grid grid-cols-3 items-center transition-all duration-500"
        style={{
          maxWidth: "100%",
          padding: scrolled ? "0 2rem" : "0 2.5rem",
          height: scrolled ? "56px" : "72px",
          background: scrolled ? "rgba(8,10,18,0.9)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(107,120,216,0.1)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group" aria-label="NovuDesign home">
          <div className="relative w-5 h-5 flex-shrink-0">
            <div className="absolute inset-0 rounded-sm rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]"
              style={{ background: "linear-gradient(135deg, #9B3420, #3A45C4)" }} />
          </div>
          <span className="font-heading font-black text-lg tracking-tight text-white">
            Novu<span style={{ color: "#9B3420" }}>Design</span>
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex justify-center" aria-label="Primary">
          <ul ref={navRef} className="relative flex items-center gap-1" onMouseLeave={clearInk}>
            <div
              className="absolute bottom-0 h-px pointer-events-none transition-all duration-200"
              style={{
                left: inkStyle.left,
                width: inkStyle.width,
                opacity: inkStyle.opacity,
                background: "linear-gradient(90deg, #9B3420, #3A45C4)",
              }}
            />
            {links.map(({ label, href }) => (
              <li key={href}>
                <Magnetic strength={0.18}>
                  <Link
                    href={href}
                    className="relative px-4 py-2 text-sm font-medium tracking-wide cursor-pointer block transition-colors duration-200"
                    style={{ color: active === label ? "#fff" : "rgba(160,170,235,0.45)" }}
                    onMouseEnter={(e) => { setActive(label); updateInk(e.currentTarget.closest("[data-magnetic]") as HTMLElement ?? e.currentTarget); }}
                    onMouseLeave={() => setActive(null)}
                  >
                    {label}
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 justify-end">
          {/* Lang toggle */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-bold tracking-widest">
            {(["en", "de"] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span style={{ color: "rgba(107,120,216,0.2)" }}>·</span>}
                <button
                  onClick={() => setLang(l)}
                  className="cursor-pointer transition-colors duration-200 uppercase px-1 py-0.5"
                  style={{ color: lang === l ? "#fff" : "rgba(160,170,235,0.25)" }}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>

          {/* Availability pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{ borderColor: "rgba(107,120,216,0.15)", background: "rgba(58,69,196,0.06)" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#4ade80" }} />
              <span className="relative rounded-full h-1.5 w-1.5" style={{ background: "#4ade80" }} />
            </span>
            <span className="text-xs font-semibold" style={{ color: "rgba(160,170,235,0.4)" }}>{t.nav.available}</span>
          </div>

          {/* CTA */}
          <Magnetic strength={0.2}>
            <Link
              href="#contact"
              className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white cursor-pointer group"
              style={{ background: "rgba(155,52,32,0.12)", border: "1px solid rgba(155,52,32,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#9B3420"; e.currentTarget.style.borderColor = "#9B3420"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(155,52,32,0.12)"; e.currentTarget.style.borderColor = "rgba(155,52,32,0.3)"; }}
            >
              <span style={{ color: "rgba(200,160,140,0.9)" }} className="group-hover:text-white transition-colors duration-200">
                {t.nav.startProject}
              </span>
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ color: "rgba(200,160,140,0.7)" }}
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
