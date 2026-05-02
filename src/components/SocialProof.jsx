import { useState } from "react";
import { useApp } from "../context/useApp";
import { GREEN, GREEN_DARK, GRAD, card, gradText } from "../utils/SharedUI";

const DIFF_ICONS = [
  <svg key="price" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l9 4v6c0 5.25-3.75 10.15-9 11.25C6.75 22.15 3 17.25 3 12V6l9-4z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>,
  <svg key="speed" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>,
  <svg key="founders" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  <svg key="custom" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  </svg>,
];

function DiffCard({ icon, title, desc, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        padding: "32px 28px",
        borderRadius: "20px",
        background: hovered ? "rgba(167,139,250,0.06)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(167,139,250,0.30)" : "rgba(255,255,255,0.07)"}`,
        transition: "background 0.25s, border-color 0.25s, transform 0.25s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: "52px", height: "52px", borderRadius: "14px",
        background: hovered ? GRAD : "rgba(167,139,250,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? "#fff" : "#a78bfa",
        marginBottom: "22px",
        transition: "background 0.25s, color 0.25s",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <p style={{
        fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "19px",
        color: "#f5f0eb", letterSpacing: "-0.02em",
        marginBottom: "12px", lineHeight: 1.2,
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: "14px",
        color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
      }}>
        {desc}
      </p>
    </div>
  );
}

export default function SocialProof() {
  const { t } = useApp();
  const s = t.socialProof;

  const diffs = [
    { icon: DIFF_ICONS[0], title: s.diff1Title, desc: s.diff1Desc },
    { icon: DIFF_ICONS[1], title: s.diff2Title, desc: s.diff2Desc },
    { icon: DIFF_ICONS[2], title: s.diff3Title, desc: s.diff3Desc },
    { icon: DIFF_ICONS[3], title: s.diff4Title, desc: s.diff4Desc },
  ];

  return (
    <section style={{
      background: "#0a0a0b",
      padding: "100px 0 110px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Subtle grid */}
      <div className="line-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Orb */}
      <div style={{ position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.10) 0%,transparent 65%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "12px",
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: "#a78bfa", background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.22)",
              padding: "5px 14px", borderRadius: "99px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", animation: "arp-blink 2s ease infinite" }}/>
              {s.badge}
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800,
            fontSize: "clamp(30px, 3.5vw, 52px)", lineHeight: 1.05,
            letterSpacing: "-0.025em", color: "#f5f0eb",
            marginBottom: "16px",
          }}>
            {s.title}{" "}<span style={{
              background: "linear-gradient(135deg,#c4b5fd,#a78bfa,#7c3aed)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>{s.titleAccent}</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "17px",
            color: "rgba(255,255,255,0.5)", lineHeight: 1.65,
            maxWidth: "560px", margin: "0 auto",
          }}>
            {s.subtitle}
          </p>
        </div>

        {/* Differentiator grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}>
          {diffs.map((d, i) => (
            <DiffCard key={i} icon={d.icon} title={d.title} desc={d.desc} index={i} />
          ))}
        </div>

        {/* Commitments strip */}
        <div style={{
          borderRadius: "20px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "36px 44px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, transparent, #a78bfa, #7c3aed, #a78bfa, transparent)",
            pointerEvents: "none",
          }} />

          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700,
            color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.14em",
            marginBottom: "24px",
          }}>
            {s.commitTitle}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 40px" }}>
            {s.commits.map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "10px",
                fontFamily: "'DM Sans',sans-serif", fontSize: "14px",
                color: "rgba(255,255,255,0.60)", fontWeight: 500,
              }}>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%",
                  background: "rgba(167,139,250,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2 2 5-4" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
