"use client";

import { useRef, useEffect, useState } from "react";

const posts = [
  {
    tag: "Strategy",
    color: "#9B3420",
    readTime: "6 min read",
    date: "May 2025",
    title: "Stop Designing Features. Start Engineering Outcomes.",
    excerpt: "Most studios ship screens. We ship leverage. Here's the framework we use to make sure every pixel we produce maps directly to a business metric that matters.",
    body: [
      "There's a quiet crisis in digital product work: teams are shipping faster than ever, yet conversion rates stagnate, retention bleeds out quietly, and brand equity remains stubbornly intangible. The culprit isn't execution — it's framing.",
      "When design is scoped as feature delivery, you get feature delivery. When it's scoped as outcome engineering, you get compounding returns. The distinction sounds semantic. It isn't.",
      "The shift starts upstream. Before we touch a single wireframe, we run a north-star alignment session: what is the one metric that, if it doubled, would fundamentally change the business? That answer becomes the brief. Every subsequent design decision gets stress-tested against it — not against subjective aesthetics, not against stakeholder preferences, not against what the competitor launched last quarter.",
      "We call this the Outcome Audit. It maps each proposed design surface to a node in the conversion funnel, assigns a hypothesis, and defines the minimum viable signal for validation. It sounds rigorous because it is. It's also what separates work that looks great in a portfolio from work that actually moves the needle.",
      "The best design isn't the most beautiful one. It's the one that produces the most predictable, scalable behaviour change in the right users at the right moment. Beauty is the delivery mechanism. Outcome is the product.",
    ],
  },
  {
    tag: "Systems",
    color: "#3A45C4",
    readTime: "8 min read",
    date: "April 2025",
    title: "Your Design System Is Your Most Undervalued Infrastructure Asset.",
    excerpt: "A mature component library isn't a developer convenience. It's a compounding strategic asset — one that reduces time-to-market, enforces brand consistency at scale, and dramatically lowers the cost of future iteration.",
    body: [
      "Most organisations treat their design system as a UI library. A collection of buttons, inputs, and modals that lives in Figma and occasionally makes its way into a Storybook. That framing leaves enormous value on the table.",
      "A properly architected design system is infrastructure. The same way a well-structured database schema pays dividends for years, a token-based component API with strict semantic versioning enforces consistency without centralised gatekeeping. It decouples brand governance from engineering velocity — which is the only way to scale both simultaneously.",
      "The economics are straightforward. Every hour a developer spends recreating a component that already exists elsewhere in the codebase is compounded waste. Every pixel inconsistency between platforms creates cognitive friction for users — and cognitive friction has a directly measurable impact on task completion rates. The accumulation of these micro-frictions is what makes legacy products feel 'slow' even when performance metrics are healthy.",
      "We structure design systems around three layers: foundation tokens (colour, type scale, spacing, motion), semantic tokens (purpose-mapped aliases that survive rebrand without cascading changes), and component APIs (composable primitives with explicit prop contracts). The interface between layers is the value. Rebrand a product at the token level and the entire system updates. No regression hunting. No inconsistent one-offs.",
      "Done correctly, a design system isn't a cost centre. It's a force multiplier on every future sprint. Ship faster. Onboard designers and engineers faster. Maintain quality at a scale that would otherwise require three times the headcount.",
    ],
  },
  {
    tag: "Performance",
    color: "#6B78D8",
    readTime: "5 min read",
    date: "March 2025",
    title: "Performance Is Brand: The Business Case for Sub-Second Experiences.",
    excerpt: "Core Web Vitals aren't a Google checkbox. They're a direct line to revenue. A 100ms improvement in LCP correlates with measurable uplift in conversion. Here's why every millisecond is a brand decision.",
    body: [
      "The conversation around web performance has historically lived in the engineering lane. Developers optimise bundles, implement lazy loading, leverage CDN edge caching — and then hand the result to the marketing team as a 'fast site'. That handoff is where the insight gets lost.",
      "Performance is a brand signal. Every 100ms of additional load time is a micro-interaction — and it communicates something about the brand making the user wait. The psychological literature on this is unambiguous: users attribute slow interfaces to the organisation behind them, not to infrastructure constraints they can't see. A slow site feels like a brand that doesn't respect your time.",
      "The Google/Deloitte data is well-documented: a 0.1-second improvement in load time increases mobile conversion rates by up to 8%. But the downstream effects are less often discussed. Bounce rate reduction compounds into SEO ranking improvements, which compound into organic acquisition cost reduction. The funnel economics of a 200ms LCP improvement versus a 3-second LCP are not incremental — they're structural.",
      "Our performance strategy operates across three vectors: perceived performance (skeleton screens, optimistic UI updates, and strategic animation to mask latency), technical performance (next-gen image formats, edge-rendered critical paths, route-level code splitting), and Core Web Vitals hygiene (LCP under 1.2s, CLS near zero, INP below 200ms — hard targets, not aspirational ones).",
      "The most expensive performance decision is the one you make at the architecture level and never revisit. We bake performance budgets into the design process from day one — not as an afterthought, but as a constraint that shapes what we build and how we build it.",
    ],
  },
];

type Post = typeof posts[0];

function ArticleCard({ p, i, vis, onOpen }: { p: Post; i: number; vis: boolean; onOpen: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      className="relative flex flex-col gap-5 p-8 rounded-2xl border cursor-pointer group"
      style={{
        borderColor: hov ? `${p.color}35` : "rgba(107,120,216,0.1)",
        background: hov ? `${p.color}07` : "rgba(58,69,196,0.03)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${i * 0.13}s, transform 0.6s ease ${i * 0.13}s, border-color 0.25s, background 0.25s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onOpen}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{ opacity: hov ? 1 : 0, background: `radial-gradient(ellipse at 20% 20%, ${p.color}0E 0%, transparent 60%)` }} />

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: `${p.color}18`, color: p.color }}>{p.tag}</span>
        <div className="flex items-center gap-3 text-xs font-mono" style={{ color: "rgba(160,170,235,0.25)" }}>
          <span>{p.date}</span>
          <span>·</span>
          <span>{p.readTime}</span>
        </div>
      </div>

      <div>
        <h3 className="font-heading font-black text-xl md:text-2xl text-white leading-[1.15] tracking-tight mb-3 group-hover:text-white transition-colors">
          {p.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(160,170,235,0.45)" }}>{p.excerpt}</p>
      </div>

      <div className="mt-auto flex items-center gap-2 text-sm font-bold transition-all duration-300"
        style={{ color: p.color, opacity: hov ? 1 : 0.5, transform: hov ? "translateX(0)" : "translateX(-6px)" }}>
        Read article
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl transition-opacity duration-300"
        style={{ opacity: hov ? 1 : 0, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
    </article>
  );
}

function ArticleModal({ p, onClose }: { p: Post; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 md:p-10"
      style={{ animation: "fadeIn 0.25s ease forwards" }}>
      <div className="absolute inset-0 backdrop-blur-xl cursor-pointer"
        style={{ background: "rgba(8,10,18,0.9)" }} onClick={onClose} />
      <article
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl border flex flex-col"
        data-lenis-prevent
        style={{
          background: "rgba(10,12,22,0.98)",
          borderColor: `${p.color}28`,
          boxShadow: `0 0 60px ${p.color}18, 0 40px 80px rgba(0,0,0,0.6)`,
          animation: "panelUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b flex-shrink-0"
          style={{ borderColor: `${p.color}15` }}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: `${p.color}18`, color: p.color }}>{p.tag}</span>
            <span className="text-xs font-mono" style={{ color: "rgba(160,170,235,0.25)" }}>{p.date} · {p.readTime}</span>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{ background: "rgba(160,170,235,0.07)", color: "rgba(160,170,235,0.4)" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${p.color}20`; e.currentTarget.style.color = p.color; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(160,170,235,0.07)"; e.currentTarget.style.color = "rgba(160,170,235,0.4)"; }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 md:p-10 flex flex-col gap-6">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-white leading-tight tracking-tight">{p.title}</h2>
          <p className="text-base font-medium leading-relaxed" style={{ color: `${p.color}CC` }}>{p.excerpt}</p>
          <div className="h-px" style={{ background: `linear-gradient(90deg, ${p.color}40, transparent)` }} />
          {p.body.map((para, i) => (
            <p key={i} className="text-sm md:text-base leading-[1.85]" style={{ color: "rgba(160,170,235,0.55)" }}>{para}</p>
          ))}
        </div>
      </article>
      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes panelUp { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </div>
  );
}

export default function Insights() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [open, setOpen] = useState<Post | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="insights" className="py-36 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(58,69,196,0.06) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto" ref={ref}>
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}
            className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px" style={{ background: "#9B3420" }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#9B3420" }}>Insights</span>
              </div>
              <h2 className="font-heading font-black text-5xl md:text-[80px] text-white leading-[0.9] tracking-tighter">
                How we<br /><span style={{ color: "rgba(107,120,216,0.28)" }}>think about craft.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed md:text-right" style={{ color: "rgba(160,170,235,0.35)", fontFamily: "var(--font-space-grotesk)" }}>
              Long-form thinking on design strategy, systems, and the business of building things that last.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((p, i) => (
              <ArticleCard key={p.title} p={p} i={i} vis={vis} onOpen={() => setOpen(p)} />
            ))}
          </div>
        </div>
      </section>

      {open && <ArticleModal p={open} onClose={() => setOpen(null)} />}
    </>
  );
}
