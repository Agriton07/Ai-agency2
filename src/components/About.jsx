import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import { GREEN, GREEN_DARK, GRAD, card, SectionBadge, SectionTitle, SectionSub, ArrowIcon, gradText } from "../utils/SharedUI";

const ValueIcons = {
  0: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  1: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  2: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
};

const FOUNDER_COLORS = [
  { bg: "linear-gradient(135deg,#7c3aed,#a78bfa)", shadow: "rgba(124,58,237,0.30)" },
  { bg: "linear-gradient(135deg,#5b21b6,#8b5cf6)", shadow: "rgba(91,33,182,0.30)" },
  { bg: "linear-gradient(135deg,#6d28d9,#a78bfa)", shadow: "rgba(109,40,217,0.30)" },
];

export default function About() {
  const navigate = useNavigate();
  const { t } = useApp();
  const a = t.about;

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "100px 0 120px", position: "relative", overflow: "hidden" }}>
      {/* Background glows */}
      <div style={{ position: "absolute", top: "-80px", left: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.06) 0%,transparent 65%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "-80px", right: "-100px", width: "440px", height: "440px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 65%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Header */}
        <SectionBadge>{a.badge}</SectionBadge>
        <SectionTitle accent={a.titleAccent}>{a.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <SectionSub>{a.subtitle}</SectionSub>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "64px" }}>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "16px",
            color: "var(--text-secondary)", lineHeight: 1.7, textAlign: "center",
            maxWidth: "600px",
          }}>
            {a.story}
          </p>
        </div>

        {/* Founder cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "56px",
        }}>
          {a.founders.map((f, i) => {
            const colors = FOUNDER_COLORS[i % FOUNDER_COLORS.length];
            return (
              <div
                key={i}
                style={{
                  ...card,
                  padding: "0",
                  overflow: "hidden",
                  transition: "box-shadow 0.25s, transform 0.25s, border-color 0.25s",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `var(--shadow-md), 0 0 0 1.5px rgba(167,139,250,0.30)`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(167,139,250,0.30)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                {/* Gradient header band */}
                <div style={{ height: "4px", background: GRAD }} />

                <div style={{ padding: "28px 24px 24px" }}>
                  {/* Avatar + name row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "18px" }}>
                    <div style={{
                      width: "56px", height: "56px", borderRadius: "16px",
                      background: colors.bg, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 6px 20px ${colors.shadow}`,
                    }}>
                      <span style={{
                        fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px",
                        color: "#fff", letterSpacing: "-0.01em",
                      }}>
                        {f.initials}
                      </span>
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "16px",
                        color: "var(--text-primary)", marginBottom: "3px", letterSpacing: "-0.01em",
                      }}>
                        {f.name}
                      </p>
                      <p style={{
                        fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700,
                        color: GREEN_DARK, textTransform: "uppercase", letterSpacing: "0.09em",
                      }}>
                        {f.role}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  {f.bio && (
                    <p style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                      color: "var(--text-secondary)", lineHeight: 1.65,
                      marginBottom: "16px",
                    }}>
                      {f.bio}
                    </p>
                  )}

                  {/* Specialty pill + school */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                    {f.specialty && (
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        padding: "5px 12px", borderRadius: "8px",
                        background: "rgba(167,139,250,0.08)",
                        border: "1px solid rgba(167,139,250,0.18)",
                      }}>
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: GREEN, animation: "arp-blink 2s ease infinite" }} />
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)" }}>
                          {f.specialty}
                        </span>
                      </div>
                    )}
                    {f.school && (
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        padding: "5px 12px", borderRadius: "8px",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border)",
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                        </svg>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 500, color: "var(--text-muted)" }}>
                          AUC
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Values grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "52px",
        }}>
          {a.values.map((v, i) => (
            <div
              key={i}
              style={{
                ...card,
                padding: "24px 22px",
                display: "flex", flexDirection: "column", gap: "12px",
                transition: "border-color 0.22s, box-shadow 0.22s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.30)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
            >
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: "rgba(167,139,250,0.10)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: GREEN,
              }}>
                {ValueIcons[i] || <span style={{ fontSize: "18px" }}>{v.icon}</span>}
              </div>
              <div>
                <p style={{
                  fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px",
                  color: "var(--text-primary)", marginBottom: "6px",
                }}>
                  {v.title}
                </p>
                <p style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                  color: "var(--text-secondary)", lineHeight: 1.6,
                }}>
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/contact")}
            style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
              color: "#fff", background: GRAD, border: "none",
              padding: "14px 32px", borderRadius: "14px", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: "8px",
              boxShadow: "0 4px 24px rgba(167,139,250,0.30)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(167,139,250,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(167,139,250,0.30)"; }}
          >
            {a.ctaLabel}<ArrowIcon white/>
          </button>
        </div>
      </div>
    </section>
  );
}
