import { useApp } from "../context/useApp";
import { GREEN_DARK, GRAD, card, SectionBadge, SectionTitle, SectionSub, gradText } from "../utils/SharedUI";
import { scrollTo } from "../utils/helper";

export default function Pricing() {
  const { t } = useApp();
  const p = t.pricing;

  return (
    <section style={{ background: "var(--bg-primary)", padding: "96px 0 112px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <SectionBadge>{p.badge}</SectionBadge>
        <SectionTitle accent={p.titleAccent}>{p.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
          <SectionSub>{p.subtitle}</SectionSub>
        </div>

        {/* "One-time project fee" badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: "var(--bg-tertiary)", border: "1px solid var(--border)",
            borderRadius: "99px", padding: "6px 14px",
          }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e" }}/>
            <span style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "12px",
              color: "var(--text-muted)", letterSpacing: "0.04em",
            }}>
              Fixed-price projects · No hidden fees · No monthly subscriptions
            </span>
          </div>
        </div>

        {/* Pricing tiers */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}>
          {p.tiers.map((tier, i) => {
            const featured = i === 1;
            return (
              <div
                key={i}
                style={{
                  ...card,
                  padding: "32px 28px",
                  position: "relative",
                  ...(featured ? {
                    border: "2px solid rgba(167,139,250,0.45)",
                    boxShadow: "0 12px 48px rgba(167,139,250,0.14)",
                  } : {}),
                }}
              >
                {/* Popular badge */}
                {featured && (
                  <div style={{
                    position: "absolute", top: "-14px", left: "50%",
                    transform: "translateX(-50%)",
                    background: GRAD, borderRadius: "99px", padding: "4px 18px",
                    fontFamily: "'DM Sans',sans-serif", fontSize: "11px",
                    fontWeight: 700, color: "#fff", letterSpacing: "0.07em",
                    whiteSpace: "nowrap",
                  }}>
                    {p.popularBadge}
                  </div>
                )}

                {/* Tier header */}
                <div style={{ marginBottom: "20px" }}>
                  <div style={{
                    fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "22px",
                    color: "var(--text-primary)", marginBottom: "6px",
                  }}>
                    {tier.name}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                    color: "var(--text-secondary)", lineHeight: 1.55,
                  }}>
                    {tier.desc}
                  </div>
                </div>

                {/* Price area */}
                <div style={{
                  paddingBottom: "22px", borderBottom: "1px solid var(--border)",
                  marginBottom: "22px",
                }}>
                  <div style={{
                    fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "34px",
                    ...gradText, lineHeight: 1.1, marginBottom: "4px",
                  }}>
                    {tier.priceLabel}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "12px",
                    color: "var(--text-muted)",
                  }}>
                    {tier.priceSub}
                  </div>
                </div>

                {/* Feature list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "11px", marginBottom: "28px" }}>
                  {tier.features.map((feat, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{
                        width: "18px", height: "18px", borderRadius: "50%",
                        flexShrink: 0, marginTop: "1px",
                        background: featured ? GRAD : "var(--bg-tertiary)",
                        border: featured ? "none" : "1px solid var(--border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke={featured ? "#fff" : "var(--text-muted)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{
                        fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                        color: "var(--text-secondary)", lineHeight: 1.45,
                      }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => scrollTo("contact")}
                  style={{
                    width: "100%",
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                    fontSize: "14px", padding: "13px", borderRadius: "12px",
                    cursor: "pointer", transition: "all 0.2s",
                    ...(featured
                      ? { background: GRAD, color: "#fff", border: "none", boxShadow: "0 4px 20px rgba(167,139,250,0.28)" }
                      : { background: "transparent", color: "var(--text-primary)", border: "1.5px solid var(--border)" }),
                  }}
                  onMouseEnter={(e) => {
                    if (featured) { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(167,139,250,0.38)"; }
                    else { e.currentTarget.style.borderColor = "rgba(167,139,250,0.45)"; e.currentTarget.style.color = GREEN_DARK; }
                  }}
                  onMouseLeave={(e) => {
                    if (featured) { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(167,139,250,0.28)"; }
                    else { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }
                  }}
                >
                  {tier.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
          color: "var(--text-muted)", textAlign: "center",
          maxWidth: "560px", margin: "32px auto 0",
        }}>
          {p.note}
        </p>
      </div>
    </section>
  );
}
