/**
 * Motion configuration shared by the server layout and the client runtime.
 *
 * The site is a 1:1 reproduction of eight 1440px Figma frames: almost every
 * element carries a raw page coordinate, so nothing here may touch layout.
 * Reveals therefore animate `opacity` / `translate` / `scale` only — the
 * individual transform properties, never the `transform` shorthand, so they
 * compose with the `transform: translateX(-50%)` that several canvas wrappers
 * already carry and with the ambient drift in app/motion.css (which uses
 * `transform`). Every reveal settles at exactly the Figma position.
 *
 * The hidden state has to exist before first paint or the page flashes its
 * content and then hides it, so `revealBaseCss()` is rendered inline by the
 * root layout from the same group list the runtime observes. There is no
 * second copy of these selectors to keep in sync.
 */

export type RevealVariant = "rise" | "rise-sm" | "scale" | "bloom";

export type RevealGroup = {
  /** Elements to reveal. */
  selector: string;
  /** How they arrive. Defaults to "rise". */
  variant?: RevealVariant;
  /** Stagger between siblings inside one parent, in ms. 0 = arrive together. */
  step?: number;
};

/**
 * Reveal targets, per route. Blocks are revealed, not whole sections: a
 * section here is often 2000px tall and would still be arriving when the
 * reader reached its end.
 */
export const REVEAL_GROUPS: RevealGroup[] = [
  /* ── Shared furniture ──────────────────────────────────────────────── */
  { selector: ".figma-section-title", step: 0 },
  { selector: ".site-footer .footer-column", variant: "rise-sm", step: 55 },
  { selector: ".site-footer .footer-grid > .contact-circle", variant: "scale" },
  { selector: ".footer-brand", variant: "rise-sm" },

  /* ── Home — Figma 1:2 ──────────────────────────────────────────────── */
  { selector: ".figma-statement p", variant: "rise-sm", step: 110 },
  { selector: ".figma-service-links > .figma-arrow-link", step: 120 },
  { selector: ".figma-service-circles", variant: "bloom" },
  { selector: ".figma-project-heading", step: 0 },
  { selector: ".figma-project-filter", variant: "rise-sm" },
  { selector: ".figma-projects > .figma-arrow-link", step: 0 },
  { selector: ".figma-project-card", step: 90 },
  { selector: ".figma-member-heading", step: 0 },
  { selector: ".figma-member-card", step: 80 },
  { selector: ".figma-recruitment-title", step: 0 },
  { selector: ".figma-recruitment > .figma-arrow-link", step: 0 },
  { selector: ".figma-recruitment-copy > *", step: 110 },

  /* ── About — Figma 1:508 ───────────────────────────────────────────── */
  { selector: ".about-question", variant: "bloom" },
  { selector: ".about-introduction-grid > div:not(.about-question) > p", variant: "rise-sm", step: 90 },
  { selector: ".about-statement-disc", variant: "bloom" },
  { selector: ".about-statement-lead", step: 0 },
  { selector: ".about-statement-copy p", variant: "rise-sm", step: 110 },
  { selector: ".about-phono-grid > article", step: 90 },
  { selector: ".about-hip-label", variant: "rise-sm" },
  { selector: ".about-hip h2", step: 0 },
  { selector: ".about-hip-grid > article", step: 80 },
  { selector: ".about-company-logo-art", variant: "scale" },
  { selector: ".about-company dl > div", variant: "rise-sm", step: 55 },

  /* ── Services — Figma 1:1092 ───────────────────────────────────────── */
  { selector: ".services-eyebrow", variant: "rise-sm" },
  { selector: ".services-statement", step: 0 },
  { selector: ".services-creative-copy p", variant: "rise-sm", step: 90 },
  { selector: ".services-restore-diagram", variant: "scale" },
  // 1:1004… — the row and its detail column are `display: contents` on the
  // desktop canvas, so the teardrop and each detail block are the real boxes.
  { selector: ".services-teardrop", variant: "scale" },
  { selector: ".services-approach-detail > *", variant: "rise-sm", step: 90 },
  { selector: ".services-projects-link", step: 0 },
  { selector: ".services-contract-intro", variant: "rise-sm" },
  { selector: ".services-contract-asset", variant: "bloom" },
  { selector: ".services-contract-card", step: 110 },
  { selector: ".services-contact-link", step: 0 },
  { selector: ".services-media-copy p", variant: "rise-sm", step: 90 },
  { selector: ".services-coming-soon", step: 0 },
  { selector: ".services-coming-soon-label", variant: "rise-sm" },
  // 1:1120 / 1:1121 — same: the feature wrapper carries no box on desktop.
  { selector: ".services-media-thumb", variant: "scale" },
  { selector: ".services-media-feature-copy", step: 0 },

  /* ── Subsidy — Figma 1:1283 ────────────────────────────────────────── */
  { selector: ".subsidy-money-mark", variant: "scale" },
  { selector: ".subsidy-statement", step: 0 },
  { selector: ".subsidy-intro-body p", variant: "rise-sm", step: 90 },
  { selector: ".subsidy-intro-diagram", variant: "scale" },
  { selector: ".subsidy-finance-row", step: 0 },
  { selector: ".subsidy-finance-note", variant: "rise-sm" },
  { selector: ".subsidy-feature-card", step: 100 },
  { selector: ".subsidy-detail-title", step: 0 },
  { selector: ".subsidy-detail-scene", variant: "bloom" },
  { selector: ".subsidy-detail-card", step: 90 },

  /* ── Projects list — Figma 1:1786 ──────────────────────────────────── */
  { selector: ".filter-row", variant: "rise-sm" },
  { selector: ".project-grid > *", step: 90 },
  { selector: ".pagination", variant: "rise-sm" },

  /* ── Project detail — Figma 1:2258 ─────────────────────────────────── */
  { selector: ".detail-visual", variant: "scale" },
  { selector: ".project-meta > *", step: 80 },
  { selector: ".figma-detail-copy", step: 0 },
  { selector: ".detail-nav", variant: "rise-sm" },

  /* ── Contact — Figma 1:2585 ────────────────────────────────────────── */
  { selector: ".contact-form-background-asset", variant: "scale" },
  { selector: ".contact-form", step: 0 },

  /* ── Recruitment — Figma 1:2872 ────────────────────────────────────── */
  { selector: ".rc-head", step: 0 },
  { selector: ".rc-stance-ring", variant: "bloom" },
  { selector: ".rc-stance-lead", step: 0 },
  { selector: ".rc-stance-body p", variant: "rise-sm", step: 110 },
  { selector: ".rc-partner-card", step: 100 },
  { selector: ".rc-gantt", variant: "rise-sm" },
  { selector: ".rc-flow-list", variant: "rise-sm" },
  { selector: ".rc-eligibility-list", variant: "rise-sm" },
  { selector: ".rc-occupation-body", variant: "rise-sm" },
  { selector: ".rc-hospitality-body", variant: "rise-sm" },
  { selector: ".rc-style-card", step: 110 },
  { selector: ".rc-style-note", variant: "rise-sm" },
  { selector: ".rc-row", variant: "rise-sm", step: 45 },
  { selector: ".rc-support-card", step: 90 },
  { selector: ".rc-faq-item", variant: "rise-sm", step: 55 },
  { selector: ".rc-career-lead", step: 0 },
  { selector: ".rc-career-card", step: 90 },
  { selector: ".rc-entry", variant: "bloom" }
];

/** Every reveal target, as one selector. Used by the client runtime. */
export const REVEAL_SELECTOR = REVEAL_GROUPS.map((group) => group.selector).join(", ");

const VARIANT_TOKENS: Record<RevealVariant, string> = {
  // Editorial blocks: a 22px lift, the house "buoyed into place" distance.
  rise: "--reveal-y: 22px;",
  // Dense copy and small controls move less so paragraphs do not slide about.
  "rise-sm": "--reveal-y: 12px;",
  // Media and diagrams settle out of a slight recess instead of travelling.
  scale: "--reveal-y: 10px; --reveal-scale: 0.972;",
  // The signature move: circle groups and rings open outward from their centre.
  bloom: "--reveal-y: 0px; --reveal-scale: 0.945;"
};

function selectorsFor(variant: RevealVariant): string {
  return REVEAL_GROUPS.filter((group) => (group.variant ?? "rise") === variant)
    .map((group) => group.selector)
    .join(",\n  ");
}

/**
 * The reveal hidden state, inlined into the document by the root layout.
 *
 * Only the *state* lives here — the transition that animates out of it is in
 * app/motion.css, which is free to specialise it per variant because it
 * cannot be beaten by this block's document order. Everything is gated on
 * `html[data-motion]`, which the boot script only sets when scripting is
 * available and the reader has not asked for reduced motion; without it the
 * page renders settled and never depends on the runtime mounting at all.
 *
 * Variant tokens use `:where()` so they carry no specificity and the
 * responsive overrides in app/motion.css can retune them.
 */
export function revealBaseCss(): string {
  const variantBlocks = (Object.keys(VARIANT_TOKENS) as RevealVariant[])
    .map((variant) => {
      const selectors = selectorsFor(variant);
      return selectors ? `html[data-motion] :where(\n  ${selectors}\n) { ${VARIANT_TOKENS[variant]} }` : "";
    })
    .filter(Boolean)
    .join("\n");

  return `${variantBlocks}
html[data-motion] :where(
  ${REVEAL_GROUPS.map((group) => group.selector).join(",\n  ")}
) {
  opacity: 0;
  translate: 0 var(--reveal-y, 22px);
  scale: var(--reveal-scale, 1);
}
html[data-motion] [data-reveal="in"] {
  opacity: 1;
  translate: none;
  scale: none;
}`;
}

/**
 * Runs during HTML parse, before anything below it paints.
 *
 * Sets the gate for every entrance in the site, and arms a watchdog: if the
 * runtime chunk never signals ready the gate is dropped, so a failed or
 * blocked script bundle leaves a fully readable page rather than a blank one.
 */
export const MOTION_BOOT_SCRIPT = `(function(){try{
var r=document.documentElement;
if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
r.setAttribute("data-motion","");
setTimeout(function(){if(!r.hasAttribute("data-motion-ready"))r.removeAttribute("data-motion");},4000);
}catch(e){}})();`;
