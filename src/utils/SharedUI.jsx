export const GREEN = "#3ecf8e";
export const GREEN_DARK = "#1ea87a";
export const GRAD = `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`;

export const card = { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", boxShadow: "var(--shadow-sm)" };

export const tag = (small) => ({
  display: "inline-flex", alignItems: "center", gap: "6px",
  fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
  fontSize: small ? "11px" : "12px", textTransform: "uppercase", letterSpacing: "0.1em",
  color: GREEN_DARK, background: "rgba(62,207,142,0.10)", border: "1px solid rgba(62,207,142,0.25)",
  padding: small ? "4px 10px" : "5px 13px", borderRadius: "99px",
});

export const gradText = { background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

export const SectionBadge = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
    <span style={tag(false)}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, animation: "arp-blink 2s ease infinite" }}/>
      {children}
    </span>
  </div>
);

export const SectionTitle = ({ children, accent, center = true }) => (
  <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--text-primary)", textAlign: center ? "center" : "left", marginBottom: "16px" }}>
    {children}{" "}<span style={gradText}>{accent}</span>
  </h2>
);

export const SectionSub = ({ children }) => (
  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65, textAlign: "center", maxWidth: "580px", margin: "0 auto" }}>
    {children}
  </p>
);

export const CheckIcon = ({ size = 9 }) => <svg width={size} height={size} viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
export const ArrowIcon = ({ white }) => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke={white ? "white" : "currentColor"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export const GreenCheck = () => (
  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <CheckIcon/>
  </div>
);