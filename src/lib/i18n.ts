export type Lang = "en" | "de";

const en = {
  nav: {
    work: "Work",
    services: "Services",
    about: "About",
    insights: "Insights",
    available: "Available",
    startProject: "Start a project",
  },
  hero: {
    badge: "Now Taking Projects · 2025",
    words1: ["We", "craft", "digital"],
    word2: "legends.",
    sub: "Strategy, identity, and motion — forged into digital experiences that stop people mid-scroll.",
    cta1: "View Our Work",
    cta2: "Start a Project",
  },
  marquee: {
    items: [
      "Brand Identity", "Motion Design", "Web Development", "UX Strategy",
      "Visual Systems", "Art Direction", "Creative Direction", "Interaction Design",
    ],
  },
  services: {
    label: "What We Do",
    heading1: "Full-stack",
    heading2: "creative studio.",
    items: [
      { num: "01", title: "Brand Identity",    color: "#9B3420", tags: ["Logo Design","Visual Systems","Brand Guidelines","Typography"],    desc: "Logos, visual systems, and brand guidelines that define who you are — built to resonate and endure." },
      { num: "02", title: "Web Design & Dev",  color: "#3A45C4", tags: ["Next.js","Motion","Tailwind","Accessibility"],                    desc: "Pixel-perfect sites built with modern tech. Fast, accessible, and animated to feel alive." },
      { num: "03", title: "Motion & Animation",color: "#6B78D8", tags: ["GSAP","Framer Motion","3D","Scroll FX"],                          desc: "Scroll effects, micro-interactions, and transitions that turn your interface into an experience." },
      { num: "04", title: "UX Strategy",       color: "#A0AAEB", tags: ["Research","Wireframes","Prototyping","Testing"],                  desc: "Research-backed architecture and interaction design that converts visitors into loyal customers." },
    ],
  },
  work: {
    label: "Selected Work",
    heading1: "Work that",
    heading2: "leaves a mark.",
    allProjects: "All Projects",
    viewCase: "View Case Study",
    projects: [
      { category: "Tour Guide · Web App", description: "A bilingual tour platform for Tokyo's hidden neighbourhoods. We built the brand, the booking experience, and the full-stack web app — from torii to checkout. Trilingual: DE, EN, JP." },
      { category: "Healthcare · Web",     description: "Full digital presence for a Munich dental practice. Trust-building design with an integrated appointment system that doubled online bookings within the first month of launch." },
      { category: "Luxury · Brand + Web", description: "Brand identity and editorial web presence for a Berlin-based luxury hair atelier. Restrained elegance that converts at the price point their craft commands." },
      { category: "E-Commerce · Shopify", description: "End-to-end e-commerce build for a premium pet retailer. Custom Shopify theme, product photography direction, and a loyalty programme that drives consistent repeat purchase." },
    ],
  },
  manifesto: {
    label: "Our Belief",
    words1: ["Good", "design", "doesn't", "whisper."],
    words2: ["It", "commands", "the", "room."],
    gradientIndex: 1,
    support: "Every project we touch is held to an impossible standard — because the work that reaches people deeply is never ordinary.",
  },
  about: {
    label: "About",
    heading1: "Built by someone who",
    heading2: "obsesses over craft.",
    p1: "NovuDesign was built on a simple belief: great design isn’t just how something looks — it’s how it makes people feel. Every pixel is intentional. Every interaction earns its place.",
    p2: "With over five years working with startups, agencies, and global brands, we bring the same level of obsessive detail to a landing page as we do to a full brand system.",
    skills: ["Brand Strategy", "Motion Design", "Frontend Dev", "Typography", "UX Research", "Visual Systems"],
    stats: [["5+", "Years"], ["80+", "Projects"], ["100%", "Passion"]] as [string, string][],
    badge: ["80+", "Projects Delivered"] as [string, string],
  },
  testimonials: {
    label: "Social Proof",
    heading1: "Words from",
    heading2: "those who know.",
    items: [
      { quote: "NovuDesign didn’t just redesign our brand — they completely transformed how we present ourselves to the world. The result was beyond what we imagined.", name: "Alex Carter", title: "CEO, Luminary Labs",         initials: "AC", color: "#9B3420" },
      { quote: "Working with NovuDesign felt like having a world-class studio in our back pocket. Fast, communicative, and the craft is absolutely stunning.",                 name: "Sarah Kim",   title: "Founder, Prism Studio",       initials: "SK", color: "#3A45C4" },
      { quote: "Our conversion rate doubled after the redesign. But beyond the numbers — the site finally feels like us. I can’t recommend them enough.",             name: "Marcus Bell", title: "Head of Growth, Archetype",    initials: "MB", color: "#6B78D8" },
    ],
  },
  insights: {
    label: "Insights",
    heading1: "How we",
    heading2: "think about craft.",
    sub: "Long-form thinking on design strategy, systems, and the business of building things that last.",
    posts: [
      {
        tag: "Strategy", color: "#9B3420", readTime: "6 min read", date: "May 2025",
        title: "Stop Designing Features. Start Engineering Outcomes.",
        excerpt: "Most studios ship screens. We ship leverage. Here’s the framework we use to make sure every pixel we produce maps directly to a business metric that matters.",
        body: [
          "There’s a quiet crisis in digital product work: teams are shipping faster than ever, yet conversion rates stagnate, retention bleeds out quietly, and brand equity remains stubbornly intangible. The culprit isn’t execution — it’s framing.",
          "When design is scoped as feature delivery, you get feature delivery. When it’s scoped as outcome engineering, you get compounding returns. The distinction sounds semantic. It isn’t.",
          "The shift starts upstream. Before we touch a single wireframe, we run a north-star alignment session: what is the one metric that, if it doubled, would fundamentally change the business? That answer becomes the brief. Every subsequent design decision gets stress-tested against it — not against subjective aesthetics, not against stakeholder preferences, not against what the competitor launched last quarter.",
          "We call this the Outcome Audit. It maps each proposed design surface to a node in the conversion funnel, assigns a hypothesis, and defines the minimum viable signal for validation. It sounds rigorous because it is. It’s also what separates work that looks great in a portfolio from work that actually moves the needle.",
          "The best design isn’t the most beautiful one. It’s the one that produces the most predictable, scalable behaviour change in the right users at the right moment. Beauty is the delivery mechanism. Outcome is the product.",
        ],
      },
      {
        tag: "Systems", color: "#3A45C4", readTime: "8 min read", date: "April 2025",
        title: "Your Design System Is Your Most Undervalued Infrastructure Asset.",
        excerpt: "A mature component library isn’t a developer convenience. It’s a compounding strategic asset — one that reduces time-to-market, enforces brand consistency at scale, and dramatically lowers the cost of future iteration.",
        body: [
          "Most organisations treat their design system as a UI library. A collection of buttons, inputs, and modals that lives in Figma and occasionally makes its way into a Storybook. That framing leaves enormous value on the table.",
          "A properly architected design system is infrastructure. The same way a well-structured database schema pays dividends for years, a token-based component API with strict semantic versioning enforces consistency without centralised gatekeeping. It decouples brand governance from engineering velocity — which is the only way to scale both simultaneously.",
          "The economics are straightforward. Every hour a developer spends recreating a component that already exists elsewhere in the codebase is compounded waste. Every pixel inconsistency between platforms creates cognitive friction for users — and cognitive friction has a directly measurable impact on task completion rates.",
          "We structure design systems around three layers: foundation tokens (colour, type scale, spacing, motion), semantic tokens (purpose-mapped aliases that survive rebrand without cascading changes), and component APIs (composable primitives with explicit prop contracts). The interface between layers is the value.",
          "Done correctly, a design system isn’t a cost centre. It’s a force multiplier on every future sprint. Ship faster. Onboard designers and engineers faster. Maintain quality at a scale that would otherwise require three times the headcount.",
        ],
      },
      {
        tag: "Performance", color: "#6B78D8", readTime: "5 min read", date: "March 2025",
        title: "Performance Is Brand: The Business Case for Sub-Second Experiences.",
        excerpt: "Core Web Vitals aren’t a Google checkbox. They’re a direct line to revenue. A 100ms improvement in LCP correlates with measurable uplift in conversion. Here’s why every millisecond is a brand decision.",
        body: [
          "The conversation around web performance has historically lived in the engineering lane. Developers optimise bundles, implement lazy loading, leverage CDN edge caching — and then hand the result to the marketing team as a ‘fast site’. That handoff is where the insight gets lost.",
          "Performance is a brand signal. Every 100ms of additional load time is a micro-interaction — and it communicates something about the brand making the user wait. The psychological literature on this is unambiguous: users attribute slow interfaces to the organisation behind them, not to infrastructure constraints they can’t see.",
          "The Google/Deloitte data is well-documented: a 0.1-second improvement in load time increases mobile conversion rates by up to 8%. But the downstream effects are less often discussed. Bounce rate reduction compounds into SEO ranking improvements, which compound into organic acquisition cost reduction.",
          "Our performance strategy operates across three vectors: perceived performance (skeleton screens, optimistic UI updates, and strategic animation to mask latency), technical performance (next-gen image formats, edge-rendered critical paths, route-level code splitting), and Core Web Vitals hygiene (LCP under 1.2s, CLS near zero, INP below 200ms).",
          "The most expensive performance decision is the one you make at the architecture level and never revisit. We bake performance budgets into the design process from day one — not as an afterthought, but as a constraint that shapes what we build and how we build it.",
        ],
      },
    ],
  },
  contact: {
    label: "Let’s Build Together",
    heading1: "Got a bold",
    heading2: "idea?",
    sub: "Tell us about your project and let’s make something extraordinary together. We respond within 24 hours.",
    social: "Or find us on",
  },
  footer: {
    rights: "© 2025 NovuDesign. All rights reserved.",
  },
};

const de: typeof en = {
  nav: {
    work: "Arbeit",
    services: "Leistungen",
    about: "Über uns",
    insights: "Einblicke",
    available: "Verfügbar",
    startProject: "Projekt starten",
  },
  hero: {
    badge: "Jetzt Projekte Annehmen · 2025",
    words1: ["Wir", "erschaffen", "digitale"],
    word2: "Legenden.",
    sub: "Strategie, Identität und Bewegung — zu digitalen Erlebnissen geschmiedet, die Menschen innehalten lassen.",
    cta1: "Unsere Arbeit",
    cta2: "Projekt starten",
  },
  marquee: {
    items: [
      "Markenidentität", "Bewegungsdesign", "Webentwicklung", "UX-Strategie",
      "Visuelle Systeme", "Art Direction", "Kreative Leitung", "Interaktionsdesign",
    ],
  },
  services: {
    label: "Was Wir Tun",
    heading1: "Full-Stack",
    heading2: "Kreativstudio.",
    items: [
      { num: "01", title: "Markenidentität",            color: "#9B3420", tags: ["Logo Design","Visuelle Systeme","Brand Guidelines","Typografie"],    desc: "Logos, visuelle Systeme und Markenrichtlinien, die definieren, wer Sie sind — gebaut, um zu resonieren und zu bestehen." },
      { num: "02", title: "Webdesign & -entwicklung",       color: "#3A45C4", tags: ["Next.js","Motion","Tailwind","Barrierefreiheit"],                    desc: "Pixelgenaue Seiten mit moderner Technologie. Schnell, zugänglich und animiert, um lebendig zu wirken." },
      { num: "03", title: "Motion & Animation",             color: "#6B78D8", tags: ["GSAP","Framer Motion","3D","Scroll-Effekte"],                        desc: "Scroll-Effekte, Micro-Interactions und Übergänge, die Ihr Interface in ein Erlebnis verwandeln." },
      { num: "04", title: "UX-Strategie",                   color: "#A0AAEB", tags: ["Research","Wireframes","Prototyping","Testing"],                    desc: "Forschungsgestützte Architektur und Interaktionsdesign, das Besucher in treue Kunden verwandelt." },
    ],
  },
  work: {
    label: "Ausgewählte Projekte",
    heading1: "Arbeit, die",
    heading2: "Spuren hinterlässt.",
    allProjects: "Alle Projekte",
    viewCase: "Fallstudie Ansehen",
    projects: [
      { category: "Stadtführer · Web-App",    description: "Eine mehrsprachige Tour-Plattform für Tokios versteckte Stadtviertel. Wir entwickelten die Marke, das Buchungserlebnis und die Full-Stack-Web-App — von Torii bis Checkout. Dreisprachig: DE, EN, JP." },
      { category: "Gesundheit · Web",         description: "Vollständige digitale Präsenz für eine Münchner Zahnarztpraxis. Vertrauensbildendes Design mit integriertem Terminsystem, das die Online-Buchungen im ersten Monat verdoppelte." },
      { category: "Luxury · Marke + Web",     description: "Markenidentität und redaktionelle Webpräsenz für ein Berliner Luxus-Haaratelier. Zurückhaltende Eleganz, die zum Preisniveau des Handwerks konvertiert." },
      { category: "E-Commerce · Shopify",     description: "End-to-End E-Commerce-Aufbau für einen Premium-Tierbedarf-Händler. Individuelles Shopify-Theme, Produktfotografie-Regie und ein Treueprogramm für nachhaltigen Wiederkauf." },
    ],
  },
  manifesto: {
    label: "Unser Glaube",
    words1: ["Gutes", "Design", "flüstert", "nicht."],
    words2: ["Es", "beherrscht", "den", "Raum."],
    gradientIndex: 1,
    support: "Jedes Projekt, das wir anfassen, wird an einem unmöglichen Standard gemessen — denn Arbeit, die Menschen tief berührt, ist niemals gewöhnlich.",
  },
  about: {
    label: "Über uns",
    heading1: "Erschaffen von jemandem, der",
    heading2: "Perfektion besessen verfolgt.",
    p1: "NovuDesign wurde auf einem einfachen Glauben aufgebaut: Großartiges Design ist nicht nur wie etwas aussieht — es geht darum, wie es Menschen fühlen lässt. Jedes Pixel ist bewusst gesetzt. Jede Interaktion verdient ihren Platz.",
    p2: "Mit über fünf Jahren Erfahrung mit Startups, Agenturen und globalen Marken bringen wir dasselbe Maß an obsessivem Detail zu einer Landing Page wie zu einem vollständigen Markensystem.",
    skills: ["Markenstrategie", "Motion Design", "Frontend-Entwicklung", "Typografie", "UX-Research", "Visuelle Systeme"],
    stats: [["5+", "Jahre"], ["80+", "Projekte"], ["100%", "Leidenschaft"]] as [string, string][],
    badge: ["80+", "Projekte Geliefert"] as [string, string],
  },
  testimonials: {
    label: "Kundenstimmen",
    heading1: "Worte von",
    heading2: "denen, die es wissen.",
    items: [
      { quote: "NovuDesign hat nicht nur unsere Marke neu gestaltet — sie haben völlig transformiert, wie wir uns der Welt präsentieren. Das Ergebnis übertraf alles, was wir uns vorgestellt hatten.", name: "Alex Carter", title: "CEO, Luminary Labs",         initials: "AC", color: "#9B3420" },
      { quote: "Die Zusammenarbeit mit NovuDesign fühlte sich an, als hätte man ein Weltklasse-Studio in der Hosentasche. Schnell, kommunikativ und das Handwerk ist absolut beeindruckend.",              name: "Sarah Kim",   title: "Gründerin, Prism Studio", initials: "SK", color: "#3A45C4" },
      { quote: "Unsere Conversion-Rate hat sich nach dem Redesign verdoppelt. Aber jenseits der Zahlen — die Seite fühlt sich endlich wie wir an. Ich kann sie nicht genug empfehlen.",                    name: "Marcus Bell", title: "Head of Growth, Archetype",  initials: "MB", color: "#6B78D8" },
    ],
  },
  insights: {
    label: "Einblicke",
    heading1: "Wie wir über",
    heading2: "Handwerk denken.",
    sub: "Tiefgehende Gedanken zu Designstrategie, Systemen und dem Handwerk, beständige Dinge zu erschaffen.",
    posts: [
      {
        tag: "Strategie", color: "#9B3420", readTime: "6 Min. Lesen", date: "Mai 2025",
        title: "Hör auf, Features zu gestalten. Fang an, Ergebnisse zu entwickeln.",
        excerpt: "Die meisten Studios liefern Screens. Wir liefern Hebel. Hier ist das Framework, mit dem wir sicherstellen, dass jedes Pixel direkt auf eine wichtige Geschäftskennzahl einzahlt.",
        body: [
          "Es gibt eine stille Krise in der digitalen Produktarbeit: Teams liefern schneller als je zuvor, doch Conversion-Rates stagnieren, Retention schwindet still dahin und Markenwert bleibt hartnäckig immateriell. Der Schuldige ist nicht die Ausführung — es ist der Rahmen.",
          "Wenn Design als Feature-Lieferung definiert wird, erhält man Feature-Lieferung. Wenn es als Outcome-Engineering definiert wird, erhält man Compounding Returns. Der Unterschied klingt semantisch. Ist er nicht.",
          "Der Wandel beginnt upstream. Bevor wir einen einzigen Wireframe anfassen, führen wir eine Nordstern-Ausrichtungssession durch: Was ist die eine Kennzahl, die sich, wenn sie sich verdoppelte, das Geschäft fundamental verändern würde? Diese Antwort wird das Briefing. Jede nachfolgende Designentscheidung wird daran gemessen.",
          "Wir nennen dies das Outcome Audit. Es bildet jede vorgeschlagene Design-Oberfläche auf einen Knoten im Conversion-Funnel ab, weist eine Hypothese zu und definiert das minimale valide Signal zur Validierung. Das klingt rigoros, weil es rigoros ist.",
          "Das beste Design ist nicht das schönste. Es ist das, das die vorhersehbarste, skalierbarste Verhaltensänderung bei den richtigen Nutzern zum richtigen Zeitpunkt erzeugt. Schönheit ist der Liefermechanismus. Ergebnis ist das Produkt.",
        ],
      },
      {
        tag: "Systeme", color: "#3A45C4", readTime: "8 Min. Lesen", date: "April 2025",
        title: "Dein Design-System ist dein meist unterschätztes Infrastruktur-Asset.",
        excerpt: "Eine ausgereifte Komponentenbibliothek ist keine Entwickler-Bequemlichkeit. Es ist ein akkumulierendes strategisches Asset, das Time-to-Market reduziert und die Kosten zukünftiger Iterationen drastisch senkt.",
        body: [
          "Die meisten Organisationen behandeln ihr Design-System als UI-Bibliothek. Eine Sammlung von Buttons, Inputs und Modals, die in Figma lebt und gelegentlich in ein Storybook findet. Dieser Rahmen lässt enormen Wert auf dem Tisch liegen.",
          "Ein richtig architekturiertes Design-System ist Infrastruktur. Wie ein gut strukturiertes Datenbankschema jahrelang Dividenden zahlt, erzwingt eine tokenbasierte Komponenten-API mit strikter semantischer Versionierung Konsistenz ohne zentralisierte Kontrolle. Es entkoppelt Marken-Governance von Engineering-Geschwindigkeit.",
          "Die Ökonomik ist geradlinig. Jede Stunde, die ein Entwickler damit verbringt, eine Komponente neu zu erstellen, die bereits anderswo existiert, ist verschwendete Arbeit. Jede Pixel-Inkonsistenz zwischen Plattformen erzeugt kognitive Reibung — und kognitive Reibung hat einen direkt messbaren Einfluss auf Task-Completion-Raten.",
          "Wir strukturieren Design-Systeme um drei Schichten: Foundation-Tokens (Farbe, Typskala, Abstände, Bewegung), semantische Tokens (zweckgebundene Aliase, die ein Rebranding überstehen) und Komponenten-APIs (komposierbare Primitiven mit expliziten Prop-Verträgen).",
          "Richtig umgesetzt ist ein Design-System kein Cost-Center. Es ist ein Kraftmultiplikator für jeden zukünftigen Sprint. Schneller liefern. Designer und Entwickler schneller einarbeiten. Qualität in einem Maßstab aufrechterhalten, der sonst dreimal die Mannschaftsstärke erfordern würde.",
        ],
      },
      {
        tag: "Performance", color: "#6B78D8", readTime: "5 Min. Lesen", date: "März 2025",
        title: "Performance ist Marke: Der Business Case für Sub-Sekunden-Erlebnisse.",
        excerpt: "Core Web Vitals sind keine Google-Checkbox. Sie sind eine direkte Verbindung zu Umsatz. Eine Verbesserung des LCP um 100ms korreliert mit messbarem Conversion-Anstieg.",
        body: [
          "Das Gespräch über Web-Performance hat historisch in der Engineering-Spur gelebt. Entwickler optimieren Bundles, implementieren Lazy Loading, nutzen CDN Edge Caching — und übergeben das Ergebnis dann dem Marketing-Team als ‘schnelle Seite’. In diesem Handoff geht die Erkenntnis verloren.",
          "Performance ist ein Markensignal. Jede 100ms zusätzliche Ladezeit ist eine Micro-Interaction — und sie kommuniziert etwas über die Marke, die den Nutzer warten lässt. Die psychologische Literatur dazu ist eindeutig: Nutzer schreiben langsame Interfaces der Organisation dahinter zu, nicht der Infrastruktur.",
          "Die Google/Deloitte-Daten sind gut dokumentiert: Eine Verbesserung der Ladezeit um 0,1 Sekunden erhöht die mobile Conversion-Rate um bis zu 8 %. Reduzierung der Absprungrate verdichtet sich zu SEO-Ranking-Verbesserungen, die sich zu organischer Akquisitionskosten-Reduzierung verdichten.",
          "Unsere Performance-Strategie operiert über drei Vektoren: Wahrgenommene Performance (Skeleton Screens, optimistische UI-Updates, strategische Animation), technische Performance (Next-Gen-Bildformate, Edge-gerenderte kritische Pfade, Route-Level-Code-Splitting) und Core Web Vitals-Hygiene.",
          "Die teuerste Performance-Entscheidung ist die, die man auf Architekturebene trifft und nie wieder überdenkt. Wir backen Performance-Budgets von Tag eins in den Designprozess ein — nicht als Nachgedanke, sondern als Einschränkung, die formt, was wir bauen.",
        ],
      },
    ],
  },
  contact: {
    label: "Gemeinsam Erschaffen",
    heading1: "Eine mutige",
    heading2: "Idee?",
    sub: "Erzählen Sie uns von Ihrem Projekt und lassen Sie uns gemeinsam etwas Außergewöhnliches erschaffen. Wir antworten innerhalb von 24 Stunden.",
    social: "Oder finden Sie uns auf",
  },
  footer: {
    rights: "© 2025 NovuDesign. Alle Rechte vorbehalten.",
  },
};

export type T = typeof en;

export const translations: Record<Lang, T> = { en, de };
