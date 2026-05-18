"use client";

import { useRef, useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useLang } from "@/context/LanguageContext";

const INPUT_BASE: React.CSSProperties = {
  width: "100%",
  background: "rgba(107,120,216,0.06)",
  border: "1px solid rgba(107,120,216,0.14)",
  borderRadius: 12,
  color: "#fff",
  fontFamily: "var(--font-space-grotesk)",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(160,170,235,0.4)" }}>{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const f = c.form;
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [state, handleSubmit] = useForm("xredgqaw");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const inputStyle = (name: string): React.CSSProperties => ({
    ...INPUT_BASE,
    padding: "12px 16px",
    borderColor: focused === name ? "rgba(107,120,216,0.45)" : "rgba(107,120,216,0.14)",
    background: focused === name ? "rgba(107,120,216,0.1)" : "rgba(107,120,216,0.06)",
  });

  const selectStyle = (name: string, hasValue: boolean): React.CSSProperties => ({
    ...inputStyle(name),
    appearance: "none" as const,
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='rgba(160,170,235,0.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: 40,
    color: hasValue ? "#fff" : "rgba(160,170,235,0.3)",
  });

  return (
    <section id="contact" className="py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="relative overflow-hidden rounded-3xl p-10 md:p-16"
          style={{
            background: "rgba(58,69,196,0.06)",
            border: "1px solid rgba(107,120,216,0.12)",
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s ease",
          }}>

          {/* Glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[100px] opacity-20" style={{ background: "#9B3420" }} />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-15" style={{ background: "#3A45C4" }} />
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-3xl overflow-hidden"
            style={{ backgroundImage: "linear-gradient(rgba(107,120,216,1) 1px,transparent 1px),linear-gradient(90deg,rgba(107,120,216,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="relative flex flex-col lg:flex-row gap-16 items-start">

            {/* Left — heading + email */}
            <div className="lg:w-2/5 flex-shrink-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px" style={{ background: "#9B3420" }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#A0AAEB" }}>{c.label}</span>
              </div>

              <h2 className="font-heading font-black text-[clamp(40px,6vw,80px)] text-white tracking-tighter leading-[0.88] mb-6">
                {c.heading1}<br />
                <span style={{ background: "linear-gradient(135deg,#A0AAEB,#3A45C4,#7B2316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{c.heading2}</span>
              </h2>

              <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(160,170,235,0.45)", maxWidth: 320 }}>
                {c.sub}
              </p>

              <a href="mailto:team@novudesign.co"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-base text-white cursor-pointer transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg,#7B2316,#3A45C4,#6B78D8)",
                  boxShadow: hov ? "0 0 60px rgba(58,69,196,0.5),0 0 120px rgba(155,52,32,0.2)" : "0 0 30px rgba(58,69,196,0.3)",
                  transform: hov ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
                }}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}>
                team@novudesign.co
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>

              <p className="mt-6 text-xs" style={{ color: "rgba(107,120,216,0.25)" }}>
                {c.social}{" "}
                {["Twitter", "Instagram", "LinkedIn"].map((s, i) => (
                  <span key={s}>
                    <a href="#" className="transition-colors duration-200 cursor-pointer hover:text-violet-300" style={{ color: "rgba(107,120,216,0.4)" }}>{s}</a>
                    {i < 2 && <span> · </span>}
                  </span>
                ))}
              </p>
            </div>

            {/* Right — form */}
            <div className="flex-1 w-full">
              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 py-16 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#3A45C4,#9B3420)", boxShadow: "0 0 40px rgba(58,69,196,0.4)" }}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-white">{f.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label={f.name}>
                      <input
                        name="name"
                        required
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        style={inputStyle("name")}
                        placeholder={f.name}
                      />
                      <ValidationError field="name" errors={state.errors}
                        className="text-xs mt-1" style={{ color: "#f87171" }} />
                    </Field>
                    <Field label={f.email}>
                      <input
                        name="email"
                        required type="email"
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        style={inputStyle("email")}
                        placeholder="you@company.com"
                      />
                      <ValidationError field="email" errors={state.errors}
                        className="text-xs mt-1" style={{ color: "#f87171" }} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label={f.type}>
                      <select
                        name="project_type"
                        onFocus={() => setFocused("type")} onBlur={(e) => { setFocused(null); e.currentTarget.style.color = e.currentTarget.value ? "#fff" : "rgba(160,170,235,0.3)"; }}
                        defaultValue=""
                        style={selectStyle("type", false)}>
                        <option value="" disabled>{f.type}</option>
                        {f.types.map(opt => <option key={opt} value={opt} style={{ background: "#0A0C16", color: "#fff" }}>{opt}</option>)}
                      </select>
                    </Field>
                    <Field label={f.budget}>
                      <select
                        name="budget"
                        onFocus={() => setFocused("budget")} onBlur={(e) => { setFocused(null); e.currentTarget.style.color = e.currentTarget.value ? "#fff" : "rgba(160,170,235,0.3)"; }}
                        defaultValue=""
                        style={selectStyle("budget", false)}>
                        <option value="" disabled>{f.budget}</option>
                        {f.budgets.map(opt => <option key={opt} value={opt} style={{ background: "#0A0C16", color: "#fff" }}>{opt}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label={f.message}>
                    <textarea
                      name="message"
                      required
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      rows={5}
                      style={{ ...inputStyle("message"), padding: "12px 16px", resize: "vertical" as const, minHeight: 120 }}
                      placeholder={f.message}
                    />
                    <ValidationError field="message" errors={state.errors}
                      className="text-xs mt-1" style={{ color: "#f87171" }} />
                  </Field>

                  {/* Top-level form error (e.g. network failure) */}
                  <ValidationError errors={state.errors}
                    className="text-xs" style={{ color: "#f87171" }} />

                  <button
                    type="submit" disabled={state.submitting}
                    className="self-start flex items-center gap-3 px-8 py-4 rounded-full font-black text-base text-white transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg,#9B3420,#3A45C4)",
                      boxShadow: "0 0 30px rgba(58,69,196,0.35)",
                      opacity: state.submitting ? 0.7 : 1,
                      cursor: state.submitting ? "wait" : "pointer",
                    }}
                    onMouseEnter={e => { if (!state.submitting) e.currentTarget.style.boxShadow = "0 0 50px rgba(58,69,196,0.55)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 30px rgba(58,69,196,0.35)"; }}>
                    {state.submitting ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    )}
                    {f.send}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

