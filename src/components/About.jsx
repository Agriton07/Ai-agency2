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
            maxWidth: "560px",
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
            }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
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

        {/* Founder cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "44px",
        }}>
          {a.founders.map((f, i) => (
            <div key={i} style={{
              ...card,
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                width: "50px", height: "50px", borderRadius: "14px",
                background: GRAD,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
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
                  color: "var(--text-primary)", marginBottom: "3px",
                }}>
                  {f.name}
                </p>
                <p style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600,
                  color: GREEN_DARK, textTransform: "uppercase", letterSpacing: "0.06em",
                }}>
                  {f.role}
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
