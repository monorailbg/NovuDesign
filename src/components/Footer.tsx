"use client";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t" style={{ borderColor:"rgba(167,139,250,0.08)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-heading font-black text-xl text-white">
          Novu<span style={{ background:"linear-gradient(135deg,#A78BFA,#6D28D9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>.</span>
        </span>
        <p className="text-xs font-mono" style={{ color:"rgba(167,139,250,0.2)" }}>© 2025 NovuDesign. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {["Twitter","Instagram","LinkedIn"].map((s) => (
            <a key={s} href="#" className="text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer"
              style={{ color:"rgba(167,139,250,0.25)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(196,181,253,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(167,139,250,0.25)")}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
