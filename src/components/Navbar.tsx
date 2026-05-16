"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = ["Work", "Services", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-8 px-6 py-3 rounded-full border transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/90 border-white/10 backdrop-blur-md shadow-lg shadow-black/40"
          : "bg-white/5 border-white/5 backdrop-blur-sm"
      }`}
      style={{ width: "min(680px, calc(100vw - 32px))" }}
    >
      <Link href="/" className="font-heading font-bold text-lg tracking-tight text-white">
        Novu<span style={{ color: "var(--color-primary)" }}>.</span>
      </Link>

      <ul className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <li key={l}>
            <Link
              href={`#${l.toLowerCase()}`}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="#contact"
        className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
        style={{ background: "var(--color-primary)", color: "#fff" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Let's Talk
      </Link>
    </nav>
  );
}
