"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { REVEAL_GROUPS } from "./motion-config";

/**
 * Ambient artwork. These are the crests, rings and teardrops the whole design
 * is built from; giving them a slow, offset drift is the site's one signature
 * move — the page reads as floating rather than laid out. The animations live
 * in app/motion.css and key off `data-ambient`; the runtime only exists to
 * park them when they scroll out of view or the tab goes to the background,
 * so nothing burns frames off-screen.
 */
const AMBIENT_GROUPS: { selector: string; kind: string }[] = [
  { selector: ".figma-bg-member-wave-a", kind: "tide" },
  { selector: ".figma-bg-member-wave-b", kind: "tide-slow" },
  { selector: ".figma-bg-recruitment-wave", kind: "tide-slow" },
  // Fills its frame exactly — see the phono-swell note in app/motion.css.
  { selector: ".wave-field-asset > .figma-asset", kind: "swell" },
  { selector: ".figma-scroll-blob", kind: "buoy" },
  { selector: ".figma-scroll-blob-lower", kind: "buoy-late" },
  { selector: ".about-question-ring", kind: "breathe" },
  { selector: ".about-statement-disc", kind: "breathe-slow" },
  { selector: ".rc-stance-ring", kind: "breathe" },
  { selector: ".subsidy-money-mark-layer-1", kind: "buoy" },
  { selector: ".subsidy-money-mark-layer-2", kind: "buoy-late" }
];

/** Longest stagger position before delays stop growing. */
const MAX_STAGGER_INDEX = 8;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Tags every unseen reveal target with its stagger delay and hands it to
 * `observe`.
 *
 * Runs inside a MutationObserver callback as well as on navigation, and those
 * callbacks are delivered before the next paint — so client re-renders (the
 * Projects filter, the subsidy carousel, the contact form's completion state)
 * get their hidden state applied without ever flashing at full opacity.
 *
 * `handled` is owned by the calling effect, not by the DOM: React runs effects
 * twice in development, and a marker left on the element would make the second
 * run skip everything the first run tagged — leaving the whole page hidden
 * with no observer watching it.
 */
function tagRevealTargets(handled: WeakSet<Element>, observe: (element: HTMLElement) => void): void {
  for (const group of REVEAL_GROUPS) {
    const step = group.step ?? 70;
    const perParent = new Map<Element | null, number>();

    for (const element of document.querySelectorAll<HTMLElement>(group.selector)) {
      // Counted before the skip, so a stagger position never shifts when a
      // sibling is added or re-scanned.
      const index = perParent.get(element.parentElement) ?? 0;
      perParent.set(element.parentElement, index + 1);

      if (handled.has(element) || element.getAttribute("data-reveal") === "in") {
        continue;
      }

      handled.add(element);

      if (step > 0 && index > 0) {
        element.style.setProperty("--reveal-delay", `${Math.min(index, MAX_STAGGER_INDEX) * step}ms`);
      }

      element.setAttribute("data-reveal", "");
      observe(element);
    }
  }
}

function reveal(element: HTMLElement): void {
  // `will-change` is armed for the one transition and dropped again: a page
  // here can hold 60+ reveal targets, and promoting all of them for the life
  // of the document costs far more than the transitions save.
  element.style.willChange = "opacity, translate, scale";
  element.setAttribute("data-reveal", "in");

  const settle = () => {
    element.style.willChange = "";
    element.removeEventListener("transitionend", settle);
    window.clearTimeout(timer);
  };

  // A reveal that never fires transitionend (interrupted, or already at its
  // end value) must still drop its layer.
  const timer = window.setTimeout(settle, 1600);
  element.addEventListener("transitionend", settle);
}

export function MotionRuntime() {
  const pathname = usePathname();
  const isFirstRoute = useRef(true);

  // Route change: the outgoing frame is already gone by the time this runs, so
  // the incoming one is lifted into place instead. A layout effect, so it is
  // applied before the new route's first paint rather than flashing at full
  // opacity and then restarting.
  useIsomorphicLayoutEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }

    if (prefersReducedMotion()) {
      return;
    }

    document.querySelector("main")?.animate(
      [
        { opacity: 0, transform: "translate3d(0, 14px, 0)" },
        { opacity: 1, transform: "none" }
      ],
      { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
    );
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;

    if (prefersReducedMotion()) {
      root.removeAttribute("data-motion");
      root.setAttribute("data-motion-ready", "");
      return;
    }

    // A block is committed once ~12% of it has crossed the fold, and the
    // bottom margin starts it slightly early so nothing is still arriving by
    // the time the reader is level with it.
    const blockObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            blockObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    // Anything taller than the viewport can never reach a 12% threshold, so
    // those are committed on first contact instead.
    const tallObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            tallObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );

    const ambientObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-ambient-paused", !entry.isIntersecting);
        }
      },
      { rootMargin: "120px" }
    );

    const observeReveal = (element: HTMLElement) => {
      // The responsive canvases turn several wrappers into `display: contents`
      // at some breakpoints. Such an element generates no box, so no observer
      // will ever report it as intersecting — commit it immediately rather
      // than let a future CSS change strand content in the hidden state.
      if (element.getClientRects().length === 0) {
        element.setAttribute("data-reveal", "in");
        return;
      }

      const tall = element.getBoundingClientRect().height > window.innerHeight * 0.85;
      (tall ? tallObserver : blockObserver).observe(element);
    };

    const handledReveals = new WeakSet<Element>();
    const handledAmbient = new WeakSet<Element>();
    let scheduled = 0;

    const scan = () => {
      scheduled = 0;
      tagRevealTargets(handledReveals, observeReveal);

      for (const group of AMBIENT_GROUPS) {
        for (const element of document.querySelectorAll<HTMLElement>(group.selector)) {
          if (handledAmbient.has(element)) {
            continue;
          }
          handledAmbient.add(element);
          element.setAttribute("data-ambient", group.kind);
          ambientObserver.observe(element);
        }
      }
    };

    scan();
    root.setAttribute("data-motion-ready", "");

    // Client-rendered subtrees join the same choreography instead of appearing
    // fully formed next to animated siblings.
    const mutations = new MutationObserver(() => {
      if (scheduled) {
        return;
      }
      scheduled = window.setTimeout(scan, 0);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const onVisibility = () => {
      root.toggleAttribute("data-page-hidden", document.visibilityState === "hidden");
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mutations.disconnect();
      blockObserver.disconnect();
      tallObserver.disconnect();
      ambientObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(scheduled);
    };
  }, [pathname]);

  return null;
}
