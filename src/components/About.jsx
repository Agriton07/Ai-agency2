import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import { GREEN, GREEN_DARK, GRAD, card, SectionBadge, SectionTitle, SectionSub, ArrowIcon, gradText } from "../utils/SharedUI";

export default function About() {
  const navigate = useNavigate();
  const { t } = useApp();
  const a = t.about;

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "96px 0 112px", position: "relative", overflow: "hidden" }}>
      {/* Background glows */}
      <div style={{ position: "absolute", top: "-60px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.05) 0%,transparent 65%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "-60px", right: "-80px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle,rgba(30,168,122,0.04) 0%,transparent 65%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <SectionBadge>{a.badge}</SectionBadge>
        <SectionTitle accent={a.titleAccent}>{a.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <SectionSub>{a.subtitle}</SectionSub>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "56px" }}>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "15px",
            color: "var(--text-secondary)", lineHeight: 1.7, textAlign: "center",
            maxWidth: "580px",
          }}>
            {a.story}
          </p>
        </div>

        {/* Values */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "52px",
        }}>
          {a.values.map((v, i) => (
            <div key={i} style={{
              ...card,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              transition: "border-color 0.22s, box-shadow 0.22s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.35)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: "rgba(167,139,250,0.10)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px",
              }}>
                {v.icon}
              </div>
              <div>
                <p style={{
                  fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "16px",
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

        {/* Founder cards — elevated */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "44px",
        }}>
          {a.founders.map((f, i) => (
            <div key={i} style={{
              ...card,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "0",
              transition: "box-shadow 0.22s, transform 0.22s, border-color 0.22s",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "rgba(167,139,250,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                background: GRAD, opacity: 0.6,
              }} />

              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px", paddingTop: "4px" }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "15px",
                  background: GRAD, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.25)",
                }}>
                  <span style={{
                    fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "14px",
                    color: "#fff",
                  }}>
                    {f.initials}
                  </span>
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px",
                    color: "var(--text-primary)", marginBottom: "3px", letterSpacing: "-0.01em",
                  }}>
                    {f.name}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700,
                    color: GREEN_DARK, textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>
                    {f.role}
                  </p>
                </div>
              </div>

              {f.specialty && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "6px 12px", borderRadius: "8px",
                  background: "rgba(167,139,250,0.08)",
                  border: "1px solid rgba(167,139,250,0.18)",
                  alignSelf: "flex-start",
                }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN }} />
                  <span style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}>
                    {f.specialty}
                  </span>
                </div>
              )}
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
              padding: "13px 30px", borderRadius: "13px", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: "8px",
              boxShadow: "0 4px 20px rgba(167,139,250,0.28)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(167,139,250,0.40)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(167,139,250,0.28)"; }}
          >
            {a.ctaLabel}<ArrowIcon white/>
          </button>
        </div>
      </div>
    </section>
  );
}
