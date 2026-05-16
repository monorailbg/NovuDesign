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
  const cherry = "#D63A5A";
  const gold   = "#C9963A";
  const bg     = "#0D0B14";

  const petals = [
    { x: 8,  y: 18, r: 38 }, { x: 82, y: 10, r: 72 },
    { x: 55, y: 28, r: 15 }, { x: 92, y: 52, r: 55 },
    { x: 20, y: 68, r: 90 }, { x: 70, y: 80, r: 130 },
    { x: 38, y: 88, r: 200 },
  ];

  return (
    <BrowserFrame color={cherry} compact={compact} url="unentdecktestokio.de">
      <div style={{ position: "absolute", inset: 0, background: bg, overflow: "hidden", fontFamily: "system-ui" }}>

        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "-20%", left: "30%", width: "60%", height: "60%", borderRadius: "50%", background: `${cherry}18`, filter: "blur(40px)" }} />

        {/* Cherry blossom petals */}
        {petals.map((p, i) => (
          <div key={i} style={{
            position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
            width: compact ? 7 : 11, height: compact ? 7 : 11,
            borderRadius: "50% 0 50% 0",
            background: cherry, opacity: 0.08 + i * 0.028,
            transform: `rotate(${p.r}deg)`,
          }} />
        ))}

        {/* Nav */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: compact ? 20 : 28, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: `0 ${compact ? 8 : 14}px`,
          borderBottom: `1px solid ${cherry}22`,
          background: "rgba(13,11,20,0.85)", backdropFilter: "blur(8px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: compact ? 3 : 5 }}>
            <div style={{ width: compact ? 10 : 14, height: compact ? 10 : 14, borderRadius: "50%", background: cherry, flexShrink: 0 }} />
            <span style={{ fontSize: compact ? 6 : 8, fontWeight: 900, letterSpacing: "0.22em", color: "#fff" }}>TOKIO</span>
          </div>
          {!compact && (
            <div style={{ display: "flex", gap: 14 }}>
              {["Touren","Karte","Über uns","Buchen"].map(n => (
                <span key={n} style={{ fontSize: 6.5, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>{n}</span>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {["DE","EN","JP"].map((l, i) => (
              <span key={l} style={{ fontSize: compact ? 4.5 : 6, color: i === 0 ? "#fff" : "rgba(255,255,255,0.3)", fontWeight: i === 0 ? 700 : 400, letterSpacing: "0.1em" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Torii gate */}
        <div style={{ position: "absolute", left: "50%", top: compact ? 24 : 34, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: compact ? 2 : 3 }}>
          {/* Top curved beam */}
          <div style={{ position: "relative", width: compact ? 68 : 112 }}>
            <div style={{ height: compact ? 5 : 8, background: cherry, borderRadius: "3px 3px 0 0", opacity: 0.9 }} />
            <div style={{ position: "absolute", top: compact ? 5 : 8, left: compact ? -4 : 6, right: compact ? -4 : 6, height: compact ? 2 : 3, background: cherry, opacity: 0.4, borderRadius: "0 0 3px 3px" }} />
          </div>
          {/* Second beam */}
          <div style={{ width: compact ? 54 : 90, height: compact ? 3 : 4, background: cherry, opacity: 0.65, borderRadius: 2 }} />
          {/* Pillars */}
          <div style={{ display: "flex", gap: compact ? 36 : 60 }}>
            {[0,1].map(i => (
              <div key={i} style={{
                width: compact ? 5 : 7, height: compact ? 30 : 50,
                background: `linear-gradient(to bottom, ${cherry}, ${cherry}44)`,
                borderRadius: "2px 2px 1px 1px",
              }} />
            ))}
          </div>
        </div>

        {/* Headline */}
        <div style={{ position: "absolute", top: compact ? 82 : 128, left: 0, right: 0, textAlign: "center" }}>
          {!compact && <div style={{ fontSize: 6, letterSpacing: "0.5em", color: gold, marginBottom: 5, fontWeight: 600 }}>東京を発見する</div>}
          <div style={{ fontSize: compact ? 9 : 14, fontWeight: 900, letterSpacing: compact ? "0.12em" : "0.18em", color: "#fff", lineHeight: 1.3 }}>
            UNENTDECKTES
          </div>
          <div style={{ fontSize: compact ? 9 : 14, fontWeight: 900, letterSpacing: compact ? "0.12em" : "0.18em", color: cherry, lineHeight: 1.3 }}>
            TOKIO
          </div>
          {!compact && (
            <div style={{ marginTop: 6, fontSize: 6.5, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>
              EXKLUSIVE STADTTOUREN · SEIT 2019
            </div>
          )}
        </div>

        {/* Tour cards */}
        <div style={{
          position: "absolute",
          bottom: compact ? 6 : 8,
          left: compact ? 6 : 8, right: compact ? 6 : 8,
          display: "grid",
          gridTemplateColumns: compact ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: compact ? 4 : 5,
        }}>
          {[
            { name: "Shibuya", jp: "渋谷", sub: "Neon & Nightlife", color: "#8E44AD" },
            { name: "Yanaka",  jp: "谷中", sub: "Altes Tokyo",      color: cherry },
            { name: "Shinjuku",jp: "新宿", sub: "Gärten & Tempel",  color: "#1A7BB8" },
          ].slice(0, compact ? 2 : 3).map(({ name, jp, sub, color }) => (
            <div key={name} style={{
              background: `rgba(255,255,255,0.04)`,
              border: `1px solid ${color}30`,
              borderRadius: compact ? 5 : 6,
              padding: compact ? "5px 6px" : "7px 8px",
              backdropFilter: "blur(4px)",
            }}>
              <div style={{ fontSize: compact ? 4.5 : 6, color: "rgba(255,255,255,0.3)", marginBottom: 1 }}>{jp}</div>
              <div style={{ fontSize: compact ? 7 : 9, fontWeight: 800, color: "#fff" }}>{name}</div>
              {!compact && <div style={{ fontSize: 5.5, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{sub}</div>}
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: compact ? 2 : 3 }}>
                <span style={{ fontSize: compact ? 4.5 : 6, color: gold }}>★ 4.9</span>
                {!compact && <span style={{ fontSize: 5, color: "rgba(255,255,255,0.25)" }}>· ab 49€</span>}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {!compact && (
          <div style={{ position: "absolute", top: 195, left: "50%", transform: "translateX(-50%)" }}>
            <div style={{
              fontSize: 7, fontWeight: 700, color: "#fff",
              background: cherry, borderRadius: 20, padding: "4px 14px",
              letterSpacing: "0.1em", whiteSpace: "nowrap",
            }}>Tour buchen →</div>
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}

// ─── 2. PureSmile Dental ──────────────────────────────────────────────────────

function DentalMockup({ compact }: { compact?: boolean }) {
  const blue = "#0C6FD4";
  const teal = "#0AA3A3";

  return (
    <BrowserFrame color={blue} compact={compact} url="puresmile-dental.de">
      <div style={{ position: "absolute", inset: 0, background: "#F7FBFF", overflow: "hidden", fontFamily: "system-ui" }}>

        {/* Nav */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          height: compact ? 20 : 28,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: `0 ${compact ? 8 : 12}px`,
          background: "#fff", borderBottom: `1px solid ${blue}14`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: compact ? 3 : 5 }}>
            {/* Tooth icon */}
            <div style={{ position: "relative", width: compact ? 11 : 15, height: compact ? 13 : 17, flexShrink: 0 }}>
              <div style={{ width: "100%", height: "100%", background: blue, borderRadius: "40% 40% 35% 35%" }} />
              <div style={{ position: "absolute", bottom: 0, left: "18%", width: "64%", height: "38%", background: "#F7FBFF", borderRadius: "0 0 30% 30%" }} />
              <div style={{ position: "absolute", bottom: "28%", left: "50%", width: "1px", height: "30%", background: "#F7FBFF", transform: "translateX(-50%)" }} />
            </div>
            <span style={{ fontSize: compact ? 6 : 8.5, fontWeight: 800, color: blue, letterSpacing: "0.06em" }}>PURESMILE</span>
          </div>
          {!compact && (
            <div style={{ display: "flex", gap: 12 }}>
              {["Leistungen","Team","Preise","Kontakt"].map(n => (
                <span key={n} style={{ fontSize: 6.5, color: "rgba(0,0,0,0.38)" }}>{n}</span>
              ))}
            </div>
          )}
          <div style={{
            fontSize: compact ? 5 : 7, fontWeight: 700, color: "#fff",
            background: blue, borderRadius: 20, padding: compact ? "2px 6px" : "3px 9px",
          }}>Termin</div>
        </div>

        {/* Hero split */}
        <div style={{ position: "absolute", top: compact ? 20 : 28, left: 0, right: 0, bottom: 0, display: "flex" }}>

          {/* Left: doctor card */}
          <div style={{
            width: compact ? "46%" : "42%",
            background: `linear-gradient(160deg, ${blue}16 0%, ${teal}12 100%)`,
            borderRight: `1px solid ${blue}10`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end",
            padding: compact ? "6px 6px 8px" : "10px 10px 12px",
            position: "relative", overflow: "hidden",
          }}>
            {/* Doctor silhouette */}
            <div style={{ position: "absolute", top: compact ? 6 : 8, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: compact ? 22 : 34, height: compact ? 22 : 34, borderRadius: "50%", background: `linear-gradient(135deg, ${blue}50, ${teal}40)` }} />
              <div style={{ width: compact ? 38 : 58, height: compact ? 22 : 36, background: `${blue}28`, borderRadius: "6px 6px 0 0", marginTop: compact ? 2 : 3 }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: compact ? 4.5 : 6, color: "rgba(0,0,0,0.35)" }}>Dr. med. dent.</div>
              <div style={{ fontSize: compact ? 6.5 : 9, fontWeight: 800, color: "#0D1B2A" }}>Sarah Klein</div>
              {!compact && (
                <>
                  <div style={{ fontSize: 6, color: teal, marginTop: 2 }}>Implantologie · Ästhetik</div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 1, marginTop: 4 }}>
                    {[0,1,2,3,4].map(i => <span key={i} style={{ fontSize: 8, color: "#F5A623" }}>★</span>)}
                  </div>
                  <div style={{ fontSize: 5.5, color: "rgba(0,0,0,0.3)", marginTop: 2 }}>4.9 · 312 Bewertungen</div>
                </>
              )}
            </div>
          </div>

          {/* Right: content */}
          <div style={{ flex: 1, padding: compact ? "6px 7px" : "10px 12px", display: "flex", flexDirection: "column", gap: compact ? 4 : 6 }}>
            <div>
              <div style={{ fontSize: compact ? 8 : 13, fontWeight: 900, color: "#0D1B2A", lineHeight: 1.2 }}>
                Ihr Lächeln,<br /><span style={{ color: blue }}>unsere Passion.</span>
              </div>
              {!compact && (
                <div style={{ fontSize: 6.5, color: "rgba(0,0,0,0.42)", marginTop: 4, lineHeight: 1.55 }}>
                  Modernste Zahntechnik in<br />entspannter Atmosphäre.
                </div>
              )}
            </div>

            {/* Services */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: compact ? 3 : 4 }}>
              {[
                { icon: "🦷", label: "Prophylaxe" },
                { icon: "✨", label: "Bleaching" },
                { icon: "🔬", label: "Implantate" },
                { icon: "😊", label: "Ästhetik" },
              ].slice(0, compact ? 4 : 4).map(({ icon, label }) => (
                <div key={label} style={{
                  background: "#fff", borderRadius: 5, padding: compact ? "3px 4px" : "5px 6px",
                  border: `1px solid ${blue}14`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  display: "flex", alignItems: "center", gap: compact ? 3 : 4,
                }}>
                  <span style={{ fontSize: compact ? 9 : 12 }}>{icon}</span>
                  <span style={{ fontSize: compact ? 5.5 : 7, color: "rgba(0,0,0,0.55)", fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>

            {!compact && (
              <div style={{
                background: "#fff", borderRadius: 7, padding: "6px 8px",
                border: `1px solid ${blue}18`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <div style={{ fontSize: 5.5, color: "rgba(0,0,0,0.3)" }}>Nächster freier Termin</div>
                  <div style={{ fontSize: 8, fontWeight: 800, color: "#0D1B2A" }}>Mo, 19. Mai · 14:30</div>
                </div>
                <div style={{ fontSize: 7, fontWeight: 700, color: "#fff", background: blue, borderRadius: 20, padding: "3px 10px" }}>
                  Buchen →
                </div>
              </div>
            )}

            {compact && (
              <div style={{ fontSize: 6, fontWeight: 700, color: "#fff", background: blue, borderRadius: 20, padding: "3px 10px", alignSelf: "flex-start" }}>
                Termin buchen →
              </div>
            )}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── 3. Maison Éclat Hair Salon ───────────────────────────────────────────────

function HairSalonMockup({ compact }: { compact?: boolean }) {
  const gold  = "#B8922A";
  const black = "#0A0A0A";
  const cream = "#F5EFE6";

  const services = [
    ["Damen-Schnitt & Styling", "ab 65 €"],
    ["Colorierung & Balayage",  "ab 90 €"],
    ["Haarpflege-Ritual",        "ab 55 €"],
    ["Hochzeitsfrisur",          "ab 180 €"],
  ];

  const swatches = ["#F2E2B0","#C9A66B","#8B5E3C","#4A2C17","#1A1008","#D4344A"];

  return (
    <BrowserFrame color={gold} compact={compact} url="maison-eclat.de">
      <div style={{ position: "absolute", inset: 0, background: cream, overflow: "hidden", fontFamily: "Georgia, serif" }}>

        {/* Subtle grid */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${black} 1px, transparent 1px), linear-gradient(90deg, ${black} 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />

        {/* Nav */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          height: compact ? 20 : 28,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: `0 ${compact ? 8 : 14}px`,
          borderBottom: `1px solid rgba(0,0,0,0.1)`,
          background: cream,
        }}>
          <span style={{ fontSize: compact ? 7 : 9, fontWeight: 700, letterSpacing: "0.32em", color: black, fontStyle: "normal" }}>MAISON ÉCLAT</span>
          {!compact && (
            <div style={{ display: "flex", gap: 16 }}>
              {["SCHNITT","FARBE","PFLEGE","BRAUT"].map(n => (
                <span key={n} style={{ fontSize: 6, color: "rgba(0,0,0,0.38)", letterSpacing: "0.18em", fontFamily: "system-ui" }}>{n}</span>
              ))}
            </div>
          )}
          <div style={{
            fontSize: compact ? 5 : 6.5, letterSpacing: "0.15em", fontFamily: "system-ui",
            color: gold, border: `1px solid ${gold}`, borderRadius: 20,
            padding: compact ? "1px 6px" : "2px 10px",
          }}>RESERVIERUNG</div>
        </div>

        {/* Content */}
        <div style={{ position: "absolute", top: compact ? 20 : 28, left: 0, right: 0, bottom: 0, display: "flex" }}>

          {/* Left: Monogram */}
          <div style={{
            width: compact ? "46%" : "44%",
            borderRight: `1px solid rgba(0,0,0,0.07)`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: compact ? 8 : 16, gap: compact ? 4 : 8,
          }}>
            <div style={{ fontSize: compact ? 52 : 88, color: gold, lineHeight: 1, opacity: 0.82, fontStyle: "italic", fontWeight: 400 }}>M</div>
            {!compact && (
              <>
                <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
                <div style={{ fontSize: 5.5, letterSpacing: "0.35em", color: "rgba(0,0,0,0.35)", textAlign: "center", fontFamily: "system-ui", lineHeight: 1.8 }}>
                  L&apos;ART DE BEAUTÉ<br />BERLIN · PARIS
                </div>
                {/* Color swatches */}
                <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                  {swatches.map((c, i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, border: "1.5px solid rgba(255,255,255,0.8)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  ))}
                </div>
              </>
            )}
            {compact && (
              <div style={{ display: "flex", gap: 3 }}>
                {swatches.slice(0, 4).map((c, i) => (
                  <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, border: "1.5px solid rgba(255,255,255,0.8)" }} />
                ))}
              </div>
            )}
          </div>

          {/* Right: Service list */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: compact ? "6px 8px" : "12px 14px", gap: 0 }}>
            <div style={{ fontSize: compact ? 5.5 : 7, letterSpacing: "0.25em", color: gold, marginBottom: compact ? 6 : 10, fontFamily: "system-ui", fontWeight: 600 }}>LEISTUNGEN</div>
            {(compact ? services.slice(0, 3) : services).map(([name, price], i) => (
              <div key={name} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: compact ? "4px 6px" : "6px 8px",
                background: i === 0 ? gold : "transparent",
                borderBottom: i !== 0 ? `1px solid rgba(0,0,0,0.07)` : "none",
                borderRadius: i === 0 ? 4 : 0,
                marginBottom: i === 0 ? compact ? 3 : 5 : 0,
              }}>
                <span style={{ fontSize: compact ? 6.5 : 8, fontFamily: "system-ui", color: i === 0 ? "#fff" : black, fontWeight: i === 0 ? 600 : 400, letterSpacing: "0.03em" }}>{name}</span>
                <span style={{ fontSize: compact ? 6 : 7.5, fontFamily: "system-ui", color: i === 0 ? "rgba(255,255,255,0.85)" : gold, fontWeight: 600 }}>{price}</span>
              </div>
            ))}
            {!compact && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 6, color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em", fontFamily: "system-ui" }}>Di–Sa · 10:00–19:00 · Mitte, Berlin</div>
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
  const orange = "#F06030";
  const green  = "#2A6448";
  const cream  = "#FFF8F0";

  const categories = [
    { emoji: "🐕", name: "Hunde",  count: "124",  bg: "#FFF0E8", border: orange,   hot: true  },
    { emoji: "🐈", name: "Katzen", count: "89",   bg: "#EEF7F2", border: green,    hot: false },
    { emoji: "🦜", name: "Vögel",  count: "45",   bg: "#FFFBF0", border: "#C4991E", hot: false },
    { emoji: "🐟", name: "Fische", count: "67",   bg: "#F0F7FF", border: "#2980B9", hot: false },
    { emoji: "🐇", name: "Nager",  count: "38",   bg: "#FFF0F8", border: "#C0418B", hot: false },
    { emoji: "🎁", name: "Angebot",count: "−30%", bg: `${orange}14`, border: orange, hot: true },
  ];

  return (
    <BrowserFrame color={orange} compact={compact} url="pawfect-store.de">
      <div style={{ position: "absolute", inset: 0, background: cream, overflow: "hidden", fontFamily: "system-ui" }}>

        {/* Nav */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          height: compact ? 20 : 28,
          background: green,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: `0 ${compact ? 8 : 12}px`,
        }}>
          {/* Paw logo */}
          <div style={{ display: "flex", alignItems: "center", gap: compact ? 3 : 5 }}>
            <div style={{ position: "relative", width: compact ? 14 : 18, height: compact ? 14 : 18, flexShrink: 0 }}>
              <div style={{ position: "absolute", bottom: 0, left: "10%", width: "80%", height: "70%", borderRadius: "50% 50% 45% 45%", background: orange }} />
              {[{l:"15%",t:"0px"},{l:"52%",t:"-1px"},{l:"3%",t:"30%"},{l:"66%",t:"30%"}].map((pos, i) => (
                <div key={i} style={{ position: "absolute", left: pos.l, top: pos.t, width: compact ? 4 : 5, height: compact ? 4 : 5, borderRadius: "50%", background: orange }} />
              ))}
            </div>
            <span style={{ fontSize: compact ? 7 : 9, fontWeight: 900, color: "#fff", letterSpacing: "0.06em" }}>PAWFECT</span>
          </div>
          {!compact && (
            <div style={{ display: "flex", gap: 12 }}>
              {["Hunde","Katzen","Vögel","Sale"].map(n => (
                <span key={n} style={{ fontSize: 6.5, color: "rgba(255,255,255,0.6)" }}>{n}</span>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: compact ? 4 : 6, alignItems: "center" }}>
            {!compact && <span style={{ fontSize: 12 }}>🔍</span>}
            <div style={{ fontSize: compact ? 5 : 7, fontWeight: 700, background: orange, color: "#fff", borderRadius: 20, padding: compact ? "2px 5px" : "2px 9px" }}>Shop</div>
          </div>
        </div>

        {/* Sale banner */}
        {!compact && (
          <div style={{
            position: "absolute", top: 28, left: 0, right: 0,
            height: 22, background: `${orange}18`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            borderBottom: `1px solid ${orange}20`,
          }}>
            <span style={{ fontSize: 7, color: orange, fontWeight: 700 }}>🎉 SOMMER-SALE · bis zu 30 % Rabatt auf ausgewählte Produkte</span>
            <div style={{ fontSize: 6.5, color: "#fff", background: orange, borderRadius: 20, padding: "1px 8px", fontWeight: 700 }}>Jetzt ansehen</div>
          </div>
        )}

        {/* Categories grid */}
        <div style={{
          position: "absolute",
          top: compact ? 20 : 52,
          left: compact ? 6 : 8, right: compact ? 6 : 8,
          bottom: compact ? 6 : 8,
          display: "grid",
          gridTemplateColumns: compact ? "1fr 1fr" : "1fr 1fr 1fr",
          gridTemplateRows: compact ? "1fr 1fr" : "1fr 1fr",
          gap: compact ? 4 : 5,
        }}>
          {(compact ? categories.slice(0, 4) : categories).map(({ emoji, name, count, bg, border, hot }) => (
            <div key={name} style={{
              background: bg,
              border: `1.5px solid ${border}28`,
              borderRadius: compact ? 6 : 7,
              padding: compact ? "6px 7px" : "8px 10px",
              display: "flex",
              flexDirection: compact ? "row" : "column",
              alignItems: compact ? "center" : "flex-start",
              gap: compact ? 5 : 4,
              position: "relative",
              cursor: "pointer",
            }}>
              {hot && (
                <div style={{
                  position: "absolute", top: compact ? 3 : 4, right: compact ? 3 : 4,
                  fontSize: compact ? 4 : 5.5, fontWeight: 800, color: "#fff",
                  background: orange, borderRadius: 10, padding: compact ? "0px 3px" : "1px 4px",
                }}>HOT</div>
              )}
              <div style={{ fontSize: compact ? 16 : 24 }}>{emoji}</div>
              <div>
                <div style={{ fontSize: compact ? 7.5 : 9.5, fontWeight: 800, color: "#1A1A1A" }}>{name}</div>
                <div style={{ fontSize: compact ? 5 : 6.5, color: "rgba(0,0,0,0.38)", marginTop: 1 }}>{count} {compact ? "" : "Artikel"}</div>
              </div>
            </div>
          ))}
        </div>
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
      <section id="work" className="py-36 px-6">
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
