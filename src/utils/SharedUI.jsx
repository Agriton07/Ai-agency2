/**
 * AKJ.ai — Shared UI Primitives
 * Design system building blocks. Import from here, not from components.
 */

// ── Color tokens ─────────────────────────────────────────────────────────────
export const GREEN      = "#a78bfa";
export const GREEN_DARK = "#7c3aed";
export const GRAD       = `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`;

// ── Style helpers ─────────────────────────────────────────────────────────────
export const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  boxShadow: "var(--shadow-sm)",
};

export const gradText = {
  background: GRAD,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const tag = (small) => ({
  display: "inline-flex", alignItems: "center", gap: "6px",
  fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
  fontSize: small ? "11px" : "12px", textTransform: "uppercase", letterSpacing: "0.1em",
  color: GREEN_DARK, background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.25)",
  padding: small ? "4px 10px" : "5px 13px", borderRadius: "99px",
});

// ── Layout primitives ─────────────────────────────────────────────────────────

/**
 * Container — enforces max-width and consistent horizontal padding.
 * size: "sm" | "md" | "lg" | "xl"
 */
export const Container = ({ children, size = "lg", style = {} }) => {
  const maxWidth = { sm: "760px", md: "960px", lg: "1200px", xl: "1400px" }[size] ?? "1200px";
  return (
    <div style={{ maxWidth, margin: "0 auto", padding: "0 clamp(16px, 3vw, 32px)", width: "100%", ...style }}>
      {children}
    </div>
  );
};

/**
 * SectionHeader — badge + H2 title + subtitle in one consistent block.
 */
export const SectionHeader = ({ badge, title, accent, subtitle, align = "center", maxSub = "560px", mb = "64px" }) => {
  const isCenter = align === "center";
  return (
    <div style={{ textAlign: isCenter ? "center" : "left", marginBottom: mb }}>
      {badge && <SectionBadge>{badge}</SectionBadge>}
      <SectionTitle accent={accent} center={isCenter}>{title}</SectionTitle>
      {subtitle && (
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "17px",
          color: "var(--text-secondary)", lineHeight: 1.65,
          textAlign: isCenter ? "center" : "left",
          maxWidth: maxSub, margin: isCenter ? "20px auto 0" : "20px 0 0",
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * Stat — a single metric with value + label. Used in stat strips.
 */
export const Stat = ({ value, label, accent = true }) => (
  <div>
    <div style={{
      fontFamily: "'Fraunces',serif", fontWeight: 800,
      fontSize: "clamp(20px, 2.2vw, 30px)", lineHeight: 1.1, marginBottom: "5px",
      ...(accent ? gradText : { color: "var(--text-primary)" }),
    }}>
      {value}
    </div>
    <div style={{
      fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
      color: "var(--text-muted)", lineHeight: 1.45,
    }}>
      {label}
    </div>
  </div>
);

/**
 * Divider — full-width subtle horizontal rule.
 */
export const Divider = ({ my = "0px" }) => (
  <div style={{ height: "1px", background: "var(--border)", margin: `${my} 0` }} />
);

// ── Typography components ─────────────────────────────────────────────────────

export const SectionBadge = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
    <span style={tag(false)}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, animation: "arp-blink 2s ease infinite" }} />
      {children}
    </span>
  </div>
);

export const SectionTitle = ({ children, accent, center = true }) => (
  <h2 style={{
    fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800,
    fontSize: "clamp(30px, 3.5vw, 52px)", lineHeight: 1.05,
    letterSpacing: "-0.025em", color: "var(--text-primary)",
    textAlign: center ? "center" : "left", marginBottom: "16px",
  }}>
    {children}{" "}<span style={gradText}>{accent}</span>
  </h2>
);

export const SectionSub = ({ children }) => (
  <p style={{
    fontFamily: "'DM Sans',sans-serif", fontSize: "17px",
    color: "var(--text-secondary)", lineHeight: 1.65,
    textAlign: "center", maxWidth: "580px", margin: "0 auto",
  }}>
    {children}
  </p>
);

/**
 * Eyebrow — small all-caps label above a title.
 */
export const Eyebrow = ({ children, style = {} }) => (
  <p style={{
    fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "11px",
    color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em",
    marginBottom: "10px", ...style,
  }}>
    {children}
  </p>
);

// ── Icon components ────────────────────────────────────────────────────────────

export const CheckIcon = ({ size = 9 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowIcon = ({ white, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke={white ? "white" : "currentColor"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GreenCheck = () => (
  <div style={{
    width: "18px", height: "18px", borderRadius: "50%", background: GRAD,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  }}>
    <CheckIcon />
  </div>
);
