"use client";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-heading font-bold text-lg text-white">
          Novu<span style={{ color: "var(--color-primary)" }}>.</span>
        </span>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          © 2025 NovuDesign. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Twitter", "Instagram", "LinkedIn"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-xs font-medium transition-colors duration-200 cursor-pointer"
              style={{ color: "var(--color-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
