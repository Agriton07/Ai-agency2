/**
 * AKJ.ai — Unified Motion System
 * Single source of truth for all animation variants, easing curves, and durations.
 * Import from here; never define one-off transitions in components.
 */

// ── Easing curves ────────────────────────────────────────────────────────────
// Each curve has a specific "feel" — use the right one for the right job.
export const E = {
  out:    [0.22, 1, 0.36, 1],       // Primary — fast decel, used for most entrances
  in:     [0.4, 0, 1, 1],            // Fast accel — exits, dismissals
  inOut:  [0.65, 0, 0.35, 1],        // Smooth push — modals, overlays
  sharp:  [0.33, 0, 0.66, 0],        // Quick & decisive
  spring: { type: "spring", stiffness: 360, damping: 28, mass: 0.9 },
  snappy: { type: "spring", stiffness: 520, damping: 32, mass: 0.8 },
  bounce: { type: "spring", stiffness: 400, damping: 20 },
};

// ── Duration scale ────────────────────────────────────────────────────────────
// Aligned to human perception thresholds.
export const D = {
  instant: 0.12,  // Micro-interactions (hover, active)
  fast:    0.22,  // Icon swaps, badge pops
  base:    0.38,  // Standard enter/exit
  slow:    0.55,  // Feature reveals, hero elements
  glacial: 0.80,  // Hero headline, full-page transitions
};

// ── Viewport trigger config ───────────────────────────────────────────────────
export const VP      = { once: true, amount: 0.12 };  // Standard — 12% visible
export const VP_LAZY = { once: true, amount: 0.04 };  // Eager — near-immediate
export const VP_HALF = { once: true, amount: 0.40 };  // Half in view

// ── Core entrance variants ────────────────────────────────────────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: D.base, ease: E.out } },
};

export const fadeDown = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: D.base, ease: E.out } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: D.base, ease: E.out } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.90, y: 12 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: D.slow, ease: E.out } },
};

export const scaleInSubtle = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: D.base, ease: E.out } },
};

export const slideFromLeft = {
  hidden:  { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0,   transition: { duration: D.slow, ease: E.out } },
};

export const slideFromRight = {
  hidden:  { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0,  transition: { duration: D.slow, ease: E.out } },
};

// ── Stagger container variants ────────────────────────────────────────────────
export const stagger = (delay = 0.08, start = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay, delayChildren: start } },
});

// Named presets — covers 90% of use cases
export const STAGGER      = stagger(0.07);
export const STAGGER_SLOW = stagger(0.13);
export const STAGGER_FAST = stagger(0.04);

// ── Interaction presets (use with whileHover / whileTap) ─────────────────────
export const HOVER_LIFT  = { y: -6,     transition: { duration: D.fast, ease: E.out } };
export const HOVER_LIFT_SM = { y: -3,   transition: { duration: D.fast, ease: E.out } };
export const HOVER_SCALE = { scale: 1.04, transition: { duration: D.fast, ease: E.out } };
export const HOVER_GLOW  = { boxShadow: "0 8px 40px rgba(167,139,250,0.22)" };
export const TAP         = { scale: 0.97 };
export const TAP_SM      = { scale: 0.98 };

// ── Page transition (used in PageTransition.jsx) ──────────────────────────────
export const pageEnter = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.38, ease: E.out } },
  exit:     { opacity: 0, y: -10, transition: { duration: 0.22, ease: E.in } },
};
