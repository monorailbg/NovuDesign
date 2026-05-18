"use client";

import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="py-10 px-6 border-t" style={{ borderColor:"rgba(107,120,216,0.08)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-heading font-black text-xl text-white">
          Novu<span style={{ background:"linear-gradient(135deg,#C4563A,#9B3420)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>.</span>
        </span>
        <p className="text-xs font-mono" style={{ color:"rgba(107,120,216,0.2)" }}>{t.footer.rights}</p>
        <a href="mailto:team@novudesign.co"
          className="text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer"
          style={{ color:"rgba(107,120,216,0.3)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(160,170,235,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(107,120,216,0.3)")}>
          team@novudesign.co
        </a>
      </div>
    </footer>
  );
}
