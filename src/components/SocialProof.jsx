import { useApp } from "../context/useApp";
import { GREEN, GRAD, card, SectionBadge, SectionTitle, SectionSub } from "../utils/SharedUI";

export default function SocialProof() {
  const { t } = useApp();
  const s = t.socialProof;

  return (
    <section style={{ background: "var(--section-alt)", padding: "80px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <SectionBadge>{s.badge}</SectionBadge>
        <SectionTitle accent={s.titleAccent}>{s.title}</SectionTitle>
        <SectionSub>{s.subtitle}</SectionSub>

        {/* Logo strip */}
        <div style={{ marginTop: "48px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} style={{
              width: "130px", height: "48px", borderRadius: "12px",
              background: "var(--bg-card)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.35)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(167,139,250,0.10)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <span style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700,
                color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em",
              }}>
                {s.logoSlot}
              </span>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "12px",
          color: "var(--text-muted)", textAlign: "center", marginTop: "20px",
        }}>
          {s.logoNote}
        </p>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border)", margin: "56px 0" }} />

        {/* Testimonials */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ ...card, padding: "28px 26px" }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "18px" }}>
                {[0, 1, 2, 3, 4].map((star) => (
                  <svg key={star} width="14" height="14" viewBox="0 0 14 14" fill="rgba(167,139,250,0.35)">
                    <path d="M7 1.5l1.545 3.58 3.955.485-2.91 2.69.8 3.9L7 10.25l-3.39 1.905.8-3.9L1.5 5.565l3.955-.485z"/>
                  </svg>
                ))}
              </div>

              {/* Quote skeleton */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {[95, 80, 90, 60].map((w, j) => (
                  <div key={j} style={{
                    height: "11px", borderRadius: "6px",
                    background: "var(--bg-tertiary)", width: `${w}%`,
                  }} />
                ))}
              </div>

              {/* Author */}
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                paddingTop: "20px", borderTop: "1px solid var(--border)",
              }}>
                {/* Avatar placeholder */}
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
                  background: `rgba(167,139,250,${0.08 + i * 0.05})`,
                  border: "1.5px solid rgba(167,139,250,0.20)",
                }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <div style={{ height: "11px", borderRadius: "5px", background: "var(--bg-tertiary)", width: "110px" }} />
                  <div style={{ height: "10px", borderRadius: "5px", background: "var(--bg-tertiary)", width: "80px" }} />
                </div>
                {/* Company logo placeholder */}
                <div style={{
                  marginLeft: "auto", width: "52px", height: "22px", borderRadius: "6px",
                  background: "var(--bg-tertiary)",
                }} />
              </div>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
          color: "var(--text-muted)", textAlign: "center", marginTop: "32px",
        }}>
          {s.trustNote}
        </p>
      </div>
    </section>
  );
}
