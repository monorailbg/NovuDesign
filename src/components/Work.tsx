"use client";

import { useRef, useEffect, useState } from "react";
import ProjectModal, { type Project } from "./ProjectModal";
import { useLang } from "@/context/LanguageContext";

// ─── Browser chrome wrapper ──────────────────────────────────────────────────

function BrowserFrame({ children, color, compact, url }: {
  children: React.ReactNode; color: string; compact?: boolean; url?: string;
}) {
  return (
    <div className="w-full h-full flex flex-col rounded-xl overflow-hidden"
      style={{ border: `1px solid ${color}25`, background: "#07080F" }}>
      <div className="flex items-center gap-1.5 px-3 flex-shrink-0"
        style={{ height: compact ? 26 : 34, background: "#0C0E1A", borderBottom: `1px solid ${color}18` }}>
        {["#FF5F57","#FFBD2E","#28CA42"].map((c, i) => (
          <span key={i} style={{ width: compact ? 7 : 9, height: compact ? 7 : 9, borderRadius: "50%", background: c, opacity: 0.75, display: "inline-block", flexShrink: 0 }} />
        ))}
        <div className="ml-2 flex-1 rounded-full flex items-center px-2"
          style={{ height: compact ? 12 : 16, background: "rgba(255,255,255,0.05)", maxWidth: 200 }}>
          <span style={{ fontSize: compact ? 6 : 8, color: "rgba(160,170,235,0.3)", fontFamily: "monospace", overflow: "hidden", whiteSpace: "nowrap" }}>
            {url ?? "novudesign.co/work"}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">{children}</div>
    </div>
  );
}

// ─── 1. Unentdecktes Tokio ──────────────────────────────────────────────────

function TokyoMockup({ compact }: { compact?: boolean }) {
  const cherry = "#CF3254";
  const gold   = "#C4982A";
  const bg     = "#0B0912";

  return (
    <BrowserFrame color={cherry} compact={compact} url="unentdecktestokio.de">
      <div style={{ position: "absolute", inset: 0, background: bg, overflow: "hidden", fontFamily: "system-ui" }}>

        {/* Ambient glow blobs */}
        <div style={{ position: "absolute", top: "-15%", right: "-8%", width: "55%", height: "55%", borderRadius: "50%", background: `radial-gradient(circle, ${cherry}28 0%, transparent 70%)`, filter: "blur(20px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-10%", width: "48%", height: "48%", borderRadius: "50%", background: `radial-gradient(circle, ${gold}20 0%, transparent 70%)`, filter: "blur(25px)", pointerEvents: "none" }} />
        {/* Deep purple atmospheric glow center */}
        <div style={{ position: "absolute", top: "30%", left: "20%", width: "60%", height: "40%", background: "radial-gradient(ellipse, rgba(80,20,120,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Seigaiha dot pattern top-right */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "45%", height: "55%",
          opacity: 0.06, pointerEvents: "none",
          backgroundImage: `radial-gradient(circle, ${gold} 1px, transparent 1px)`,
          backgroundSize: compact ? "8px 8px" : "12px 12px",
        }} />

        {/* Thin horizontal gold rule above nav */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${cherry}60, ${gold}40, transparent)`, zIndex: 11 }} />

        {/* Nav */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: compact ? 22 : 32, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: `0 ${compact ? 8 : 16}px`,
          borderBottom: `1px solid rgba(207,50,84,0.2)`,
          background: "rgba(11,9,18,0.95)",
        }}>
          {/* Logo: dot + TOKIO */}
          <div style={{ display: "flex", alignItems: "center", gap: compact ? 4 : 6 }}>
            <div style={{ width: compact ? 6 : 9, height: compact ? 6 : 9, borderRadius: "50%", background: `radial-gradient(circle, #fff 20%, ${cherry})`, boxShadow: `0 0 8px ${cherry}90`, flexShrink: 0 }} />
            <span style={{ fontSize: compact ? 6.5 : 9, fontWeight: 900, letterSpacing: "0.28em", color: "#fff", textTransform: "uppercase" }}>TOKIO</span>
          </div>
          {/* Nav links — non-compact only */}
          {!compact && (
            <div style={{ display: "flex", gap: 16 }}>
              {["Touren","Stadtteile","Buchen"].map(n => (
                <span key={n} style={{ fontSize: 6, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{n}</span>
              ))}
            </div>
          )}
          {/* Language switcher */}
          <div style={{ display: "flex", gap: compact ? 3 : 5, alignItems: "center" }}>
            {["DE","EN","JP"].map((l, li) => (
              <span key={l} style={{
                fontSize: compact ? 4.5 : 5.5,
                color: li === 0 ? "#fff" : "rgba(255,255,255,0.25)",
                fontWeight: li === 0 ? 800 : 400,
                background: li === 0 ? cherry : "transparent",
                padding: li === 0 ? (compact ? "1px 3px" : "1px 5px") : undefined,
                borderRadius: 2,
                letterSpacing: "0.08em",
              }}>{l}</span>
            ))}
          </div>
        </div>

        {compact ? (
          /* ── COMPACT layout ── */
          <>
            {/* Left hero text */}
            <div style={{ position: "absolute", top: 26, left: 8, right: "46%", bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 3, paddingBottom: 36 }}>
              <div style={{ fontSize: 4.5, letterSpacing: "0.45em", color: gold, fontWeight: 700, textTransform: "uppercase" }}>東京を発見する</div>
              <div style={{ lineHeight: 1.05 }}>
                <div style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.12em", color: "#fff" }}>UNENT-</div>
                <div style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.12em", color: "#fff" }}>DECKTES</div>
                <div style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.12em", color: cherry, textShadow: `0 0 12px ${cherry}60` }}>TOKIO</div>
              </div>
              <div style={{ fontSize: 4, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", lineHeight: 1.5 }}>Stadttouren · seit 2019</div>
              <div style={{ marginTop: 2, alignSelf: "flex-start", background: cherry, borderRadius: 8, padding: "3px 8px", boxShadow: `0 2px 10px ${cherry}55`, display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 4.5, color: "#fff", fontWeight: 700, letterSpacing: "0.06em" }}>Buchen →</span>
              </div>
            </div>
            {/* Right photo placeholder with torii */}
            <div style={{ position: "absolute", top: 26, right: 6, bottom: 30, width: "40%", borderRadius: 6, background: `linear-gradient(155deg, ${cherry}99 0%, ${gold}50 48%, #2D0A4F 100%)`, overflow: "hidden", boxShadow: `inset 0 0 20px rgba(0,0,0,0.4)` }}>
              {/* Torii gate CSS art */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -58%)" }}>
                <div style={{ width: 28, height: 3.5, background: "rgba(255,255,255,0.85)", borderRadius: "2px 2px 0 0", marginBottom: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
                <div style={{ width: 22, height: 2, background: "rgba(255,255,255,0.65)", borderRadius: 1, marginLeft: 3, marginBottom: 3 }} />
                <div style={{ display: "flex", gap: 13, justifyContent: "center" }}>
                  {[0,1].map(i => <div key={i} style={{ width: 2.5, height: 16, background: "rgba(255,255,255,0.75)", borderRadius: "1px 1px 2px 2px" }} />)}
                </div>
              </div>
              {/* Stats strip */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "3px 4px", display: "flex", justifyContent: "space-around" }}>
                <span style={{ fontSize: 3.5, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>500+</span>
                <span style={{ fontSize: 3.5, color: gold, fontWeight: 700 }}>4.9★</span>
                <span style={{ fontSize: 3.5, color: "rgba(255,255,255,0.45)" }}>2019</span>
              </div>
            </div>
            {/* Destination cards bottom strip */}
            <div style={{ position: "absolute", bottom: 5, left: 6, right: 6, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
              {[
                { name: "Shibuya", jp: "渋谷", color: "#8E44AD", price: "49€" },
                { name: "Yanaka",  jp: "谷中", color: cherry,    price: "39€" },
              ].map(({ name, jp, color, price }) => (
                <div key={name} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}40`, borderTop: `2px solid ${color}`, borderRadius: "0 0 4px 4px", padding: "3px 5px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 3, color: "rgba(255,255,255,0.25)" }}>{jp}</div>
                    <div style={{ fontSize: 5.5, fontWeight: 800, color: "#fff" }}>{name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 3.5, color: gold, fontWeight: 700 }}>★ 4.9</div>
                    <div style={{ fontSize: 3, color: "rgba(255,255,255,0.22)" }}>{price}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ── FULL layout ── */
          <>
            {/* Hero split */}
            <div style={{ position: "absolute", top: 32, left: 0, right: 0, bottom: 0, display: "flex" }}>
              {/* Left: headline + CTA */}
              <div style={{ width: "50%", padding: "16px 18px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 7 }}>
                <div style={{ fontSize: 6, letterSpacing: "0.55em", color: gold, fontWeight: 700, textTransform: "uppercase" }}>東京を発見する</div>
                <div style={{ lineHeight: 1.05 }}>
                  <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: "0.18em", color: "#fff" }}>UNENT-</div>
                  <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: "0.18em", color: "#fff" }}>DECKTES</div>
                  <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: "0.18em", color: cherry, textShadow: `0 0 20px ${cherry}70` }}>TOKIO</div>
                </div>
                <div style={{ fontSize: 6, color: "rgba(255,255,255,0.28)", letterSpacing: "0.15em", lineHeight: 1.7, textTransform: "uppercase" }}>
                  Exklusive Stadttouren<br />im Herzen Japans · seit 2019
                </div>
                {/* CTA Button */}
                <div style={{
                  alignSelf: "flex-start", marginTop: 2,
                  background: cherry, borderRadius: 20, padding: "5px 16px",
                  boxShadow: `0 4px 20px ${cherry}55, 0 0 40px ${cherry}20`,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <span style={{ fontSize: 7, fontWeight: 700, color: "#fff", letterSpacing: "0.1em" }}>Tour buchen →</span>
                </div>
              </div>
              {/* Right: photo placeholder with torii gate */}
              <div style={{ flex: 1, margin: "14px 16px 0 0", borderRadius: "8px 8px 0 0", background: `linear-gradient(155deg, ${cherry}95 0%, ${gold}65 44%, #2A0E50 100%)`, position: "relative", overflow: "hidden", boxShadow: `inset 0 0 40px rgba(0,0,0,0.3)` }}>
                {/* Subtle light rays */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)", pointerEvents: "none" }} />
                {/* Torii gate CSS art */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -65%)" }}>
                  {/* Top curved beam */}
                  <div style={{ width: 72, height: 7, background: "rgba(255,255,255,0.88)", borderRadius: "4px 4px 2px 2px", marginBottom: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }} />
                  {/* Second beam */}
                  <div style={{ width: 58, height: 4, background: "rgba(255,255,255,0.65)", borderRadius: 2, marginLeft: 7, marginBottom: 6 }} />
                  {/* Pillars */}
                  <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
                    {[0,1].map(i => <div key={i} style={{ width: 6, height: 46, background: "rgba(255,255,255,0.78)", borderRadius: "2px 2px 3px 3px", boxShadow: "1px 0 6px rgba(0,0,0,0.2)" }} />)}
                  </div>
                </div>
                {/* Stats overlay */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", padding: "7px 12px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 900, color: "#fff" }}>500+</div>
                    <div style={{ fontSize: 4.5, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Touren</div>
                  </div>
                  <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.12)" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 900, color: gold }}>4.9★</div>
                    <div style={{ fontSize: 4.5, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Rating</div>
                  </div>
                  <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.12)" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 900, color: "#fff" }}>2019</div>
                    <div style={{ fontSize: 4.5, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Seit</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Destination cards at bottom-left */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, width: "50%",
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, padding: "0 16px 14px",
            }}>
              {[
                { name: "Shibuya", jp: "渋谷", color: "#8E44AD", price: "49€", star: "4.9" },
                { name: "Yanaka",  jp: "谷中", color: cherry,    price: "39€", star: "4.8" },
                { name: "Shinjuku",jp: "新宿", color: "#1A7BB8", price: "55€", star: "5.0" },
              ].map(({ name, jp, color, price, star }) => (
                <div key={name} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${color}35`,
                  borderTop: `2.5px solid ${color}`,
                  borderRadius: "0 0 6px 6px",
                  padding: "7px 8px",
                }}>
                  <div style={{ fontSize: 4.5, color: "rgba(255,255,255,0.22)", marginBottom: 1 }}>{jp}</div>
                  <div style={{ fontSize: 8.5, fontWeight: 800, color: "#fff", marginBottom: 3 }}>{name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 5.5, color: gold, fontWeight: 700 }}>★ {star}</span>
                    <span style={{ fontSize: 4.5, color: "rgba(255,255,255,0.25)" }}>ab {price}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </BrowserFrame>
  );
}

// ─── 2. PureSmile Dental ──────────────────────────────────────────────────────

function DentalMockup({ compact }: { compact?: boolean }) {
  const blue = "#0B62C4";
  const teal = "#0D9E8E";

  return (
    <BrowserFrame color={blue} compact={compact} url="puresmile-dental.de">
      <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", overflow: "hidden", fontFamily: "system-ui" }}>

        {/* Subtle blue wash background */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg, #F6FAFF 0%, #FFFFFF 55%, #F0FAF9 100%)", pointerEvents: "none" }} />

        {/* Nav */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          height: compact ? 22 : 30,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: `0 ${compact ? 8 : 14}px`,
          background: "#fff", borderBottom: `1px solid rgba(11,98,196,0.1)`,
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: compact ? 4 : 6 }}>
            {/* Tooth CSS icon */}
            <div style={{ position: "relative", width: compact ? 12 : 16, height: compact ? 14 : 18, flexShrink: 0 }}>
              <div style={{ width: "100%", height: "100%", background: `linear-gradient(160deg, ${blue}, ${teal}80)`, borderRadius: "42% 42% 30% 30%" }} />
              <div style={{ position: "absolute", bottom: 0, left: "16%", width: "68%", height: "36%", background: "#fff", borderRadius: "0 0 28% 28%" }} />
              <div style={{ position: "absolute", bottom: "26%", left: "49%", width: 1, height: "28%", background: "rgba(255,255,255,0.7)", transform: "translateX(-50%)" }} />
            </div>
            <div>
              <span style={{ fontSize: compact ? 7 : 9, fontWeight: 900, color: blue, letterSpacing: "0.04em" }}>PureSmile</span>
              {!compact && <span style={{ fontSize: 5.5, color: "rgba(0,0,0,0.3)", marginLeft: 2 }}>Dental</span>}
            </div>
          </div>
          {!compact && (
            <div style={{ display: "flex", gap: 14 }}>
              {["Leistungen","Team","Preise"].map(n => (
                <span key={n} style={{ fontSize: 6, color: "rgba(0,0,0,0.4)", letterSpacing: "0.02em" }}>{n}</span>
              ))}
            </div>
          )}
          <div style={{
            fontSize: compact ? 5 : 6.5, fontWeight: 700, color: "#fff",
            background: `linear-gradient(135deg, ${blue}, ${teal})`,
            borderRadius: 20, padding: compact ? "2px 7px" : "3px 10px",
            boxShadow: `0 2px 8px ${blue}40`,
          }}>Termin buchen</div>
        </div>

        {/* Hero content */}
        <div style={{ position: "absolute", top: compact ? 22 : 30, left: 0, right: 0, bottom: 0, display: "flex" }}>

          {compact ? (
            /* ── COMPACT layout ── */
            <>
              {/* Left: Doctor photo frame */}
              <div style={{
                width: "44%",
                background: `linear-gradient(160deg, ${blue}18 0%, ${teal}12 100%)`,
                borderRight: `1px solid rgba(11,98,196,0.08)`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end",
                padding: "6px 6px 8px",
                position: "relative", overflow: "hidden",
              }}>
                {/* Oval doctor frame */}
                <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 36, height: 44, borderRadius: "50% 50% 40% 40%", background: `linear-gradient(160deg, ${blue}40, ${teal}30)`, border: `2px solid rgba(255,255,255,0.7)`, overflow: "hidden" }}>
                  {/* Silhouette */}
                  <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 26, background: `${blue}35`, borderRadius: "6px 6px 0 0" }} />
                  <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 16, height: 16, borderRadius: "50%", background: `linear-gradient(135deg, ${blue}55, ${teal}45)` }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 4, color: "rgba(0,0,0,0.3)" }}>Dr. med. dent.</div>
                  <div style={{ fontSize: 6.5, fontWeight: 800, color: "#0D1B2A" }}>Sarah Klein</div>
                </div>
              </div>
              {/* Right: content */}
              <div style={{ flex: 1, padding: "7px 8px", display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontSize: 9, fontWeight: 900, color: "#0D1B2A", lineHeight: 1.15 }}>
                  Ihr Lächeln,<br /><span style={{ color: blue }}>unsere Passion.</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
                  {[
                    { icon: "🦷", label: "Prophylaxe" },
                    { icon: "✨", label: "Bleaching" },
                    { icon: "🔬", label: "Implantate" },
                    { icon: "😊", label: "Ästhetik" },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{
                      background: "#F6FAFF", borderRadius: 5, padding: "3px 5px",
                      border: `1px solid ${blue}14`,
                      display: "flex", alignItems: "center", gap: 3,
                    }}>
                      <span style={{ fontSize: 9 }}>{icon}</span>
                      <span style={{ fontSize: 5, color: "rgba(0,0,0,0.55)", fontWeight: 600 }}>{label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 6, fontWeight: 700, color: "#fff", background: `linear-gradient(135deg, ${blue}, ${teal})`, borderRadius: 20, padding: "3px 10px", alignSelf: "flex-start", boxShadow: `0 2px 8px ${blue}40` }}>
                  Termin buchen →
                </div>
              </div>
            </>
          ) : (
            /* ── FULL layout ── */
            <>
              {/* Left: Main content (55%) */}
              <div style={{ width: "55%", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: "#0D1B2A", lineHeight: 1.15 }}>
                    Ihr Lächeln,
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: blue, lineHeight: 1.15 }}>
                    unsere Passion.
                  </div>
                  <div style={{ fontSize: 6, color: "rgba(0,0,0,0.4)", marginTop: 5, lineHeight: 1.6 }}>
                    Modernste Zahntechnik in entspannter<br />Atmosphäre — im Herzen Münchens.
                  </div>
                </div>
                {/* Trust badges */}
                <div style={{ display: "flex", gap: 5 }}>
                  {[
                    { val: "★4.9", label: "Google" },
                    { val: "300+", label: "Patienten" },
                    { val: "15 J.", label: "Erfahrung" },
                  ].map(({ val, label }) => (
                    <div key={label} style={{ background: "#F6FAFF", borderRadius: 6, padding: "3px 6px", border: `1px solid ${blue}14`, textAlign: "center" }}>
                      <div style={{ fontSize: 7.5, fontWeight: 800, color: blue }}>{val}</div>
                      <div style={{ fontSize: 4.5, color: "rgba(0,0,0,0.35)" }}>{label}</div>
                    </div>
                  ))}
                </div>
                {/* Services grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                  {[
                    { icon: "🦷", label: "Prophylaxe" },
                    { icon: "✨", label: "Bleaching" },
                    { icon: "🔬", label: "Implantate" },
                    { icon: "😊", label: "Ästhetik" },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{
                      background: "#fff", borderRadius: 6, padding: "5px 7px",
                      border: `1px solid ${blue}15`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <span style={{ fontSize: 12 }}>{icon}</span>
                      <span style={{ fontSize: 6.5, color: "rgba(0,0,0,0.55)", fontWeight: 600 }}>{label}</span>
                    </div>
                  ))}
                </div>
                {/* Appointment card */}
                <div style={{
                  background: "#F6FAFF", borderRadius: 8, padding: "7px 9px",
                  border: `1px solid ${blue}18`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: 5, color: "rgba(0,0,0,0.28)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Nächster freier Termin</div>
                    <div style={{ fontSize: 8.5, fontWeight: 900, color: "#0D1B2A", marginTop: 1 }}>Mo, 19. Mai · 14:30</div>
                  </div>
                  <div style={{ fontSize: 7, fontWeight: 700, color: "#fff", background: `linear-gradient(135deg, ${blue}, ${teal})`, borderRadius: 20, padding: "4px 12px", boxShadow: `0 2px 10px ${blue}40` }}>
                    Buchen →
                  </div>
                </div>
              </div>

              {/* Right: Doctor photo frame (45%) */}
              <div style={{ width: "45%", position: "relative", overflow: "hidden" }}>
                {/* Background gradient panel */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(155deg, ${blue}12 0%, ${teal}10 100%)`, borderLeft: `1px solid rgba(11,98,196,0.08)` }} />
                {/* Oval doctor photo frame */}
                <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 80, height: 96, borderRadius: "50% 50% 45% 45%", background: `linear-gradient(160deg, ${blue}35, ${teal}28)`, border: "3px solid rgba(255,255,255,0.85)", boxShadow: `0 4px 20px ${blue}25`, overflow: "hidden" }}>
                  {/* Doctor silhouette */}
                  <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 52, height: 60, background: `${blue}30`, borderRadius: "8px 8px 0 0" }} />
                  <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${blue}55, ${teal}45)` }} />
                  {/* White coat highlight */}
                  <div style={{ position: "absolute", bottom: 10, left: "20%", width: "60%", height: 30, background: "rgba(255,255,255,0.15)", borderRadius: "6px 6px 0 0" }} />
                </div>
                {/* Name badge below oval */}
                <div style={{ position: "absolute", bottom: "22%", left: "50%", transform: "translateX(-50%)", background: "#fff", borderRadius: 8, padding: "5px 10px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", textAlign: "center", whiteSpace: "nowrap" }}>
                  <div style={{ fontSize: 8, fontWeight: 900, color: "#0D1B2A" }}>Dr. Sarah Klein</div>
                  <div style={{ fontSize: 5, color: teal, marginTop: 1 }}>Implantologie & Ästhetik</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── 3. Maison Éclat Hair Salon ───────────────────────────────────────────────

function HairSalonMockup({ compact }: { compact?: boolean }) {
  const gold  = "#B8922A";
  const bg    = "#090806";
  const cream = "#F0E8D8";

  const services = [
    ["Damen-Schnitt & Styling", "ab 65 €"],
    ["Colorierung & Balayage",  "ab 90 €"],
    ["Haarpflege-Ritual",        "ab 55 €"],
    ["Hochzeitsfrisur",          "ab 180 €"],
  ];

  const swatches = ["#F2E2B0","#C9A66B","#8B5E3C","#4A2C17","#1A1008","#D4344A"];

  return (
    <BrowserFrame color={gold} compact={compact} url="maison-eclat.de">
      <div style={{ position: "absolute", inset: 0, background: bg, overflow: "hidden", fontFamily: "Georgia, serif" }}>

        {/* Very subtle warm texture overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(45deg, ${gold} 1px, transparent 1px), linear-gradient(-45deg, ${gold} 1px, transparent 1px)`, backgroundSize: compact ? "18px 18px" : "24px 24px", pointerEvents: "none" }} />

        {/* Ambient glow: warm center */}
        <div style={{ position: "absolute", top: "20%", left: "30%", width: "55%", height: "45%", background: `radial-gradient(ellipse, rgba(184,146,42,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />

        {/* Hairline gold top border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}80, transparent)`, zIndex: 11 }} />

        {/* Nav */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          height: compact ? 22 : 30,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: `0 ${compact ? 8 : 16}px`,
          borderBottom: `1px solid rgba(184,146,42,0.2)`,
          background: "rgba(9,8,6,0.97)",
        }}>
          <span style={{ fontSize: compact ? 6.5 : 8.5, fontWeight: 700, letterSpacing: "0.38em", color: cream, textTransform: "uppercase" }}>MAISON ÉCLAT</span>
          {!compact && (
            <div style={{ display: "flex", gap: 14 }}>
              {["SCHNITT","FARBE","PFLEGE","BRAUT"].map(n => (
                <span key={n} style={{ fontSize: 5.5, color: `${cream}50`, letterSpacing: "0.2em", fontFamily: "system-ui" }}>{n}</span>
              ))}
            </div>
          )}
          <div style={{
            fontSize: compact ? 4.5 : 6, letterSpacing: "0.14em", fontFamily: "system-ui",
            color: gold, border: `1px solid ${gold}80`, borderRadius: 20,
            padding: compact ? "1px 6px" : "2px 10px",
          }}>RÉSERVER</div>
        </div>

        {/* Hairline below nav */}
        <div style={{ position: "absolute", top: compact ? 22 : 30, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}30, transparent)`, zIndex: 9 }} />

        {/* Content */}
        <div style={{ position: "absolute", top: compact ? 23 : 31, left: 0, right: 0, bottom: 0, display: "flex" }}>

          {/* Left: Monogram column */}
          <div style={{
            width: compact ? "44%" : "40%",
            borderRight: `1px solid rgba(184,146,42,0.15)`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: compact ? 8 : 18, gap: compact ? 5 : 10,
            position: "relative", overflow: "hidden",
          }}>
            {/* Giant italic M monogram */}
            <div style={{ fontSize: compact ? 56 : 92, color: gold, lineHeight: 1, opacity: 0.78, fontStyle: "italic", fontWeight: 400, textShadow: `0 0 30px ${gold}30`, letterSpacing: "-0.02em" }}>M</div>

            {!compact && (
              <>
                {/* Thin gradient rule */}
                <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
                <div style={{ fontSize: 5, letterSpacing: "0.4em", color: `${cream}60`, textAlign: "center", fontFamily: "system-ui", lineHeight: 2, textTransform: "uppercase" }}>
                  L&apos;ART DE BEAUTÉ<br />BERLIN · MITTE
                </div>
                {/* Color swatches */}
                <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                  {swatches.map((c, i) => (
                    <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, border: "1.5px solid rgba(255,255,255,0.12)", boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }} />
                  ))}
                </div>
              </>
            )}
            {compact && (
              <>
                <div style={{ width: 28, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
                <div style={{ display: "flex", gap: 3.5 }}>
                  {swatches.slice(0, 5).map((c, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.1)" }} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: Service list */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: compact ? "6px 9px" : "14px 16px", gap: 0 }}>
            {/* LEISTUNGEN header */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: compact ? 7 : 12 }}>
              <div style={{ width: compact ? 8 : 12, height: 1, background: gold }} />
              <div style={{ fontSize: compact ? 5 : 6.5, letterSpacing: "0.3em", color: gold, fontFamily: "system-ui", fontWeight: 600, textTransform: "uppercase" }}>LEISTUNGEN</div>
            </div>

            {(compact ? services.slice(0, 3) : services).map(([name, price], i) => (
              <div key={name} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: compact ? "4px 7px" : "7px 9px",
                background: i === 0 ? `rgba(184,146,42,0.14)` : "transparent",
                borderBottom: i < (compact ? 2 : 3) ? `1px solid rgba(184,146,42,0.1)` : "none",
                borderLeft: i === 0 ? `2px solid ${gold}` : "2px solid transparent",
                borderRadius: i === 0 ? "0 4px 4px 0" : 0,
                marginBottom: i === 0 ? compact ? 2 : 3 : 0,
              }}>
                <span style={{ fontSize: compact ? 6 : 7.5, fontFamily: "Georgia, serif", color: i === 0 ? cream : `${cream}80`, fontWeight: i === 0 ? 600 : 400, letterSpacing: "0.02em" }}>{name}</span>
                <span style={{ fontSize: compact ? 5.5 : 7, fontFamily: "system-ui", color: gold, fontWeight: 700, letterSpacing: "0.02em" }}>{price}</span>
              </div>
            ))}

            {!compact && (
              <>
                <div style={{ marginTop: 10, marginBottom: 8, fontSize: 5, color: `${cream}35`, letterSpacing: "0.12em", fontFamily: "system-ui", textTransform: "uppercase" }}>Di–Sa · 10:00–19:00 · Mitte, Berlin</div>
                {/* Outlined gold pill button */}
                <div style={{ alignSelf: "flex-start", border: `1px solid ${gold}`, borderRadius: 20, padding: "4px 12px", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 6, color: gold, letterSpacing: "0.15em", fontFamily: "system-ui", textTransform: "uppercase", fontWeight: 600 }}>TERMIN RESERVIEREN →</span>
                </div>
              </>
            )}
            {compact && (
              <div style={{ marginTop: 6, alignSelf: "flex-start", border: `1px solid ${gold}70`, borderRadius: 14, padding: "2px 8px" }}>
                <span style={{ fontSize: 4.5, color: gold, letterSpacing: "0.12em", fontFamily: "system-ui", textTransform: "uppercase" }}>RESERVIEREN →</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── 4. Pawfect Pet Store ─────────────────────────────────────────────────────

function PetStoreMockup({ compact }: { compact?: boolean }) {
  const orange = "#E85A1E";
  const green  = "#1E5C38";
  const cream  = "#FFF8F0";

  const categories = [
    { emoji: "🐕", name: "Hunde",   count: "124",  bg: "#FFF0E8", border: orange,    hot: true  },
    { emoji: "🐈", name: "Katzen",  count: "89",   bg: "#EEF8F2", border: green,     hot: false },
    { emoji: "🦜", name: "Vögel",   count: "45",   bg: "#FFFBF0", border: "#C4991E", hot: false },
    { emoji: "🐟", name: "Fische",  count: "67",   bg: "#F0F7FF", border: "#2980B9", hot: false },
    { emoji: "🐇", name: "Nager",   count: "38",   bg: "#FFF0F8", border: "#C0418B", hot: false },
    { emoji: "🎁", name: "Angebot", count: "−30%", bg: `${orange}18`, border: orange, hot: true },
  ];

  return (
    <BrowserFrame color={orange} compact={compact} url="pawfect-store.de">
      <div style={{ position: "absolute", inset: 0, background: cream, overflow: "hidden", fontFamily: "system-ui" }}>

        {/* Nav — forest green bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          height: compact ? 22 : 30,
          background: green,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: `0 ${compact ? 8 : 12}px`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}>
          {/* Paw CSS logo + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: compact ? 4 : 6 }}>
            <div style={{ position: "relative", width: compact ? 14 : 18, height: compact ? 14 : 18, flexShrink: 0 }}>
              {/* Palm oval */}
              <div style={{ position: "absolute", bottom: 0, left: "10%", width: "80%", height: "68%", borderRadius: "50% 50% 44% 44%", background: orange }} />
              {/* 4 toe beans */}
              {[{l:"14%",t:"2px"},{l:"50%",t:"-1px"},{l:"2%",t:"32%"},{l:"65%",t:"32%"}].map((pos, i) => (
                <div key={i} style={{ position: "absolute", left: pos.l, top: pos.t, width: compact ? 4 : 5, height: compact ? 4 : 5, borderRadius: "50%", background: orange }} />
              ))}
            </div>
            <span style={{ fontSize: compact ? 7.5 : 10, fontWeight: 900, color: "#fff", letterSpacing: "0.08em" }}>PAWFECT</span>
          </div>
          {!compact && (
            <div style={{ display: "flex", gap: 13 }}>
              {["Hunde","Katzen","Vögel","Sale"].map(n => (
                <span key={n} style={{ fontSize: 6.5, color: "rgba(255,255,255,0.65)" }}>{n}</span>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: compact ? 4 : 7, alignItems: "center" }}>
            {!compact && (
              <div style={{ fontSize: 6, color: "rgba(255,255,255,0.55)" }}>🔍</div>
            )}
            {/* Cart badge */}
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: compact ? 5 : 7, fontWeight: 700, background: orange, color: "#fff", borderRadius: 20, padding: compact ? "2px 6px" : "3px 10px", boxShadow: `0 1px 6px ${orange}60` }}>
                {compact ? "🛒" : "Warenkorb"}
              </div>
              <div style={{ position: "absolute", top: -3, right: -3, width: compact ? 7 : 9, height: compact ? 7 : 9, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: compact ? 3.5 : 5, fontWeight: 800, color: orange }}>2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sale banner — non-compact */}
        {!compact && (
          <div style={{
            position: "absolute", top: 30, left: 0, right: 0,
            height: 22, background: `rgba(232,90,30,0.1)`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            borderBottom: `1px solid ${orange}22`,
          }}>
            <span style={{ fontSize: 6.5, color: orange, fontWeight: 700 }}>🎉 SOMMER-SALE · bis zu 30% auf ausgewählte Artikel</span>
            <div style={{ fontSize: 6, color: "#fff", background: orange, borderRadius: 20, padding: "1px 9px", fontWeight: 700, boxShadow: `0 1px 4px ${orange}50` }}>Jetzt ansehen</div>
          </div>
        )}

        {/* Hero headline + categories */}
        {!compact ? (
          <div style={{ position: "absolute", top: 52, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column" }}>
            {/* Hero text strip */}
            <div style={{ padding: "8px 12px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 900, color: "#1A1A1A", lineHeight: 1.1 }}>Für dein Tier.<br /><span style={{ color: green }}>Mit Liebe.</span></div>
                <div style={{ fontSize: 5.5, color: "rgba(0,0,0,0.38)", marginTop: 3 }}>Alles für Hund, Katze & Co.</div>
              </div>
              <div style={{ fontSize: 7, fontWeight: 700, color: "#fff", background: orange, borderRadius: 20, padding: "4px 14px", boxShadow: `0 2px 10px ${orange}50` }}>Zum Shop →</div>
            </div>
            {/* 3-col category grid */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 5, padding: "0 8px 8px" }}>
              {categories.map(({ emoji, name, count, bg, border, hot }) => (
                <div key={name} style={{
                  background: bg, border: `1.5px solid ${border}30`,
                  borderRadius: 8, padding: "8px 10px",
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4,
                  position: "relative",
                }}>
                  {hot && (
                    <div style={{ position: "absolute", top: 5, right: 5, fontSize: 5, fontWeight: 800, color: "#fff", background: orange, borderRadius: 8, padding: "1px 4px" }}>HOT</div>
                  )}
                  <div style={{ fontSize: 22 }}>{emoji}</div>
                  <div>
                    <div style={{ fontSize: 8.5, fontWeight: 800, color: "#1A1A1A" }}>{name}</div>
                    <div style={{ fontSize: 5.5, color: "rgba(0,0,0,0.35)", marginTop: 1 }}>{count} Artikel</div>
                  </div>
                  <div style={{ fontSize: 5.5, color: border, fontWeight: 700, marginTop: "auto" }}>→</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── COMPACT layout ── */
          <div style={{ position: "absolute", top: 22, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column" }}>
            {/* Compact headline */}
            <div style={{ padding: "5px 8px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 8.5, fontWeight: 900, color: "#1A1A1A", lineHeight: 1.1 }}>Für dein Tier.<br /><span style={{ color: green }}>Mit Liebe.</span></div>
              <div style={{ fontSize: 5.5, fontWeight: 700, color: "#fff", background: orange, borderRadius: 14, padding: "2px 8px" }}>Shop →</div>
            </div>
            {/* 2-col compact grid */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 4, padding: "0 6px 6px" }}>
              {categories.slice(0, 4).map(({ emoji, name, count, bg, border, hot }) => (
                <div key={name} style={{
                  background: bg, border: `1.5px solid ${border}28`,
                  borderRadius: 6, padding: "5px 7px",
                  display: "flex", flexDirection: "row", alignItems: "center", gap: 5,
                  position: "relative",
                }}>
                  {hot && (
                    <div style={{ position: "absolute", top: 3, right: 3, fontSize: 4, fontWeight: 800, color: "#fff", background: orange, borderRadius: 8, padding: "0px 3px" }}>HOT</div>
                  )}
                  <div style={{ fontSize: 16 }}>{emoji}</div>
                  <div>
                    <div style={{ fontSize: 7, fontWeight: 800, color: "#1A1A1A" }}>{name}</div>
                    <div style={{ fontSize: 4.5, color: "rgba(0,0,0,0.35)", marginTop: 1 }}>{count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}

// ─── Project visual data (text comes from i18n) ───────────────────────────────

type FullProject = Project & { span: string; height: string; compactMockup: React.ReactNode };

const PROJECT_VISUAL = [
  { title: "Unentdecktes Tokio", color: "#D63A5A", accent: "#C9963A", year: "2025", span: "col-span-1 md:col-span-2", height: "h-[440px]", tags: ["Web Design","Booking System","Branding","DE/EN/JP"], mockup: <TokyoMockup />,      compactMockup: <TokyoMockup compact /> },
  { title: "PureSmile Dental",   color: "#0C6FD4", accent: "#0AA3A3", year: "2025", span: "col-span-1",               height: "h-[440px]", tags: ["Healthcare","Web Design","CMS","Termin-System"],    mockup: <DentalMockup />,      compactMockup: <DentalMockup compact /> },
  { title: "Maison Éclat",       color: "#B8922A", accent: "#D4AF60", year: "2025", span: "col-span-1",               height: "h-[380px]", tags: ["Luxury Brand","Web Design","Art Direction"],         mockup: <HairSalonMockup />,   compactMockup: <HairSalonMockup compact /> },
  { title: "Pawfect Store",      color: "#F06030", accent: "#2A6448", year: "2025", span: "col-span-1 md:col-span-2", height: "h-[380px]", tags: ["E-Commerce","UX Design","Branding","Shopify"],        mockup: <PetStoreMockup />,    compactMockup: <PetStoreMockup compact /> },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({ p, viewCase, i, onOpen }: { p: FullProject; viewCase: string; i: number; onOpen: () => void }) {
  const ref     = useRef<HTMLDivElement>(null);
  const gradRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border cursor-pointer ${p.span} ${p.height} group`}
      style={{
        borderColor: hov ? `${p.color}50` : "rgba(107,120,216,0.1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: `opacity 0.7s ${i * 0.12}s, transform 0.7s ${i * 0.12}s, border-color 0.3s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        if (gradRef.current) {
          gradRef.current.style.background = `radial-gradient(ellipse 55% 55% at ${x}% ${y}%, ${p.color}28 0%, transparent 70%)`;
        }
      }}
      onClick={onOpen}
    >
      <div className="absolute inset-0" style={{ background: `${p.color}07` }} />
      <div ref={gradRef} className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: hov ? 1 : 0, background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${p.color}28 0%, transparent 70%)` }} />

      {/* Corner deco */}
      <div className="absolute top-5 right-5 w-7 h-7 opacity-20" style={{ borderTop: `1px solid ${p.color}`, borderRight: `1px solid ${p.color}` }} />
      <div className="absolute bottom-5 left-5 w-7 h-7 opacity-20" style={{ borderBottom: `1px solid ${p.color}`, borderLeft: `1px solid ${p.color}` }} />

      {/* Mockup preview */}
      <div className="absolute inset-0 flex items-start justify-center pt-10 px-8 pointer-events-none"
        style={{ transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)", transform: hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)" }}>
        <div className="w-full" style={{ maxWidth: "88%", height: "55%" }}>
          {p.compactMockup}
        </div>
      </div>

      {/* Fade gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to top, #080A12 0%, ${p.color}12 40%, transparent 60%)` }} />

      {/* Text overlay */}
      <div className="absolute inset-0 p-7 flex flex-col justify-end pointer-events-none">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ background: `${p.color}22`, color: p.color }}>{p.category}</span>
          <span className="text-xs font-mono" style={{ color: "rgba(160,170,235,0.25)" }}>{p.year}</span>
        </div>
        <p className="text-sm mb-2 transition-all duration-300"
          style={{ color: "rgba(160,170,235,0.45)", opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(8px)" }}>
          {p.description.split(" ").slice(0, 11).join(" ")}…
        </p>
        <h3 className="font-heading font-black text-[clamp(26px,3.5vw,48px)] text-white tracking-tighter leading-none">{p.title}</h3>
        <div className="mt-3 flex items-center gap-2 font-bold text-sm transition-all duration-300"
          style={{ color: p.color, opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(-10px)" }}>
          {viewCase}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{ opacity: hov ? 1 : 0, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
    </div>
  );
}

// ─── All Projects Modal ───────────────────────────────────────────────────────

function AllProjectsModal({ projects, viewCase, onClose, onOpen }: {
  projects: FullProject[];
  viewCase: string;
  onClose: () => void;
  onOpen: (p: FullProject) => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9980] flex items-center justify-center p-4 md:p-10"
      style={{ animation: "apFadeIn 0.25s ease forwards" }}>
      <div className="absolute inset-0 backdrop-blur-xl cursor-pointer"
        style={{ background: "rgba(6,8,16,0.93)" }} onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border overflow-hidden"
        style={{ background: "rgba(9,11,20,0.98)", borderColor: "rgba(107,120,216,0.14)", boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(58,69,196,0.1)", animation: "apPanelUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b flex-shrink-0"
          style={{ borderColor: "rgba(107,120,216,0.1)" }}>
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(160,170,235,0.4)" }}>
            All Projects
          </span>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{ background: "rgba(160,170,235,0.07)", color: "rgba(160,170,235,0.4)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(107,120,216,0.2)"; e.currentTarget.style.color = "#A0AAEB"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(160,170,235,0.07)"; e.currentTarget.style.color = "rgba(160,170,235,0.4)"; }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="overflow-y-auto p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5" data-lenis-prevent>
          {projects.map((p, i) => (
            <button key={p.title} onClick={() => { onClose(); setTimeout(() => onOpen(p), 50); }}
              className="group relative flex flex-col rounded-2xl border overflow-hidden cursor-pointer text-left transition-all duration-300"
              style={{ borderColor: "rgba(107,120,216,0.1)", background: "rgba(58,69,196,0.04)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}40`; e.currentTarget.style.background = `${p.color}08`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.1)"; e.currentTarget.style.background = "rgba(58,69,196,0.04)"; }}>

              {/* Mockup preview */}
              <div className="h-52 flex-shrink-0 overflow-hidden">
                {p.compactMockup}
              </div>

              {/* Info */}
              <div className="px-5 py-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: p.color }}>{p.category}</p>
                  <h3 className="font-heading font-black text-base text-white leading-tight">{p.title}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: p.color }}>
                  {viewCase}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes apFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes apPanelUp { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Work() {
  const { t } = useLang();
  const w = t.work;
  const hRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState<FullProject | null>(null);
  const [allOpen, setAllOpen] = useState(false);

  const projects: FullProject[] = PROJECT_VISUAL.map((v, i) => ({
    ...v,
    category: w.projects[i]?.category ?? v.title,
    description: w.projects[i]?.description ?? "",
  }));

  useEffect(() => {
    const el = hRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="work" className="py-36 px-6 relative overflow-hidden">
        {/* Subtle scan-line stripes */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg, rgba(107,120,216,0.018) 0px, rgba(107,120,216,0.018) 1px, transparent 1px, transparent 40px)" }} />
        {/* Corner glow blobs */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,69,196,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(155,52,32,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto">
          <div ref={hRef} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px" style={{ background: "#3A45C4" }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#3A45C4" }}>{w.label}</span>
              </div>
              <h2 className="font-heading font-black text-5xl md:text-[80px] text-white leading-[0.9] tracking-tighter">
                {w.heading1}<br /><span style={{ color: "rgba(107,120,216,0.3)" }}>{w.heading2}</span>
              </h2>
            </div>
            <button
              onClick={() => setAllOpen(true)}
              className="hidden md:inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full border cursor-pointer transition-all duration-300 flex-shrink-0 self-end"
              style={{ borderColor: "rgba(107,120,216,0.15)", color: "rgba(160,170,235,0.5)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.35)"; e.currentTarget.style.color = "#A0AAEB"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(107,120,216,0.15)"; e.currentTarget.style.color = "rgba(160,170,235,0.5)"; }}>
              {w.allProjects}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} viewCase={w.viewCase} i={i} onOpen={() => setActive(p)} />
            ))}
          </div>
        </div>
      </section>

      {active && (
        <ProjectModal project={{ ...active, mockup: active.mockup }} onClose={() => setActive(null)} />
      )}

      {allOpen && (
        <AllProjectsModal
          projects={projects}
          viewCase={w.viewCase}
          onClose={() => setAllOpen(false)}
          onOpen={(p) => setActive(p)}
        />
      )}
    </>
  );
}
