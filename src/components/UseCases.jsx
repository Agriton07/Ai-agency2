import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import { GREEN, GREEN_DARK, GRAD, card, SectionBadge, SectionTitle, SectionSub, ArrowIcon, gradText } from "../utils/SharedUI";

const UseCaseCard = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...card,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.25s, transform 0.25s, border-color 0.25s",
        borderColor: hovered ? "rgba(167,139,250,0.3)" : "var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glow on hover */}
      <div style={{
        position: "absolute", top: "-40px", right: "-40px",
        width: "140px", height: "140px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      }}/>

      {/* Tag */}
      <div style={{ marginBottom: "16px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "11px",
          textTransform: "uppercase", letterSpacing: "0.1em",
          color: GREEN_DARK, background: "rgba(167,139,250,0.10)",
          border: "1px solid rgba(167,139,250,0.25)",
          padding: "4px 10px", borderRadius: "99px",
        }}>
          {item.tag}
        </span>
      </div>

      {/* Icon + Title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
          background: hovered ? GRAD : "var(--bg-tertiary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px",
          transition: "background 0.25s",
        }}>
          {item.icon}
        </div>
        <h3 style={{
          fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "18px",
          lineHeight: 1.2, letterSpacing: "-0.02em",
          color: "var(--text-primary)", margin: 0, paddingTop: "4px",
        }}>
          {item.title}
        </h3>
      </div>

      {/* Scenario */}
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
        color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "18px",
      }}>
        {item.scenario}
      </p>

      {/* Outcome chip */}
      <div style={{
        marginTop: "auto",
        display: "inline-flex", alignItems: "center", gap: "7px",
        padding: "8px 14px", borderRadius: "10px",
        background: hovered ? "rgba(167,139,250,0.10)" : "var(--bg-tertiary)",
        border: `1px solid ${hovered ? "rgba(167,139,250,0.30)" : "var(--border)"}`,
        transition: "background 0.25s, border-color 0.25s",
      }}>
        <div style={{
          width: "7px", height: "7px", borderRadius: "50%",
          background: hovered ? GREEN : "var(--text-muted)",
          transition: "background 0.25s",
        }}/>
        <span style={{
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "12px",
          color: hovered ? GREEN_DARK : "var(--text-muted)",
          transition: "color 0.25s",
        }}>
          {item.outcome}
        </span>
      </div>
    </div>
  );
};

export default function UseCases() {
  const navigate = useNavigate();
  const { t } = useApp();
  const u = t.useCases;

  return (
    <section style={{ background: "var(--bg-primary)", padding: "96px 0 112px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <SectionBadge>{u.badge}</SectionBadge>
        <SectionTitle accent={u.titleAccent}>{u.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "56px" }}>
          <SectionSub>{u.subtitle}</SectionSub>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {u.items.map((item, i) => (
            <UseCaseCard key={i} item={item} index={i}/>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: "64px",
          borderRadius: "24px",
          padding: "44px 52px",
          background: "linear-gradient(135deg,#1c1917,#262421)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "28px",
          flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-40px", right: "-40px",
            width: "240px", height: "240px", borderRadius: "50%",
            background: "radial-gradient(circle,rgba(167,139,250,0.10) 0%,transparent 70%)",
            pointerEvents: "none",
          }}/>
          <div style={{ position: "relative" }}>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600,
              color: "rgba(255,255,255,0.40)", textTransform: "uppercase",
              letterSpacing: "0.1em", marginBottom: "8px",
            }}>
              {u.ctaText}
            </p>
            <h3 style={{
              fontFamily: "'Fraunces',serif", fontWeight: 800,
              fontSize: "clamp(20px,2.8vw,30px)", color: "#fff",
              lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0,
            }}>
              Let's map out yours in{" "}
              <span style={gradText}>30 minutes.</span>
            </h3>
          </div>
          <button
            onClick={() => navigate("/contact")}
            style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px",
              color: "#fff", background: GRAD, border: "none",
              padding: "13px 28px", borderRadius: "13px", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: "7px",
              boxShadow: "0 4px 20px rgba(167,139,250,0.30)",
              transition: "transform 0.2s, box-shadow 0.2s",
              position: "relative", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(167,139,250,0.40)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(167,139,250,0.30)"; }}
          >
            {u.ctaBtn}<ArrowIcon white/>
          </button>
        </div>
      </div>

      <style>{`
        @media(max-width:640px) {
          .use-cases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
