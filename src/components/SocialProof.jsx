import { useState } from "react";
import { useApp } from "../context/useApp";
import { GREEN, GREEN_DARK, GRAD, card, SectionBadge, SectionTitle, SectionSub } from "../utils/SharedUI";

const DIFF_ICONS = [
  // Fixed price — shield check
  <svg key="price" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l9 4v6c0 5.25-3.75 10.15-9 11.25C6.75 22.15 3 17.25 3 12V6l9-4z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>,
  // Speed — bolt
  <svg key="speed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>,
  // Founders — users
  <svg key="founders" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  // Custom build — settings sliders
  <svg key="custom" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  </svg>,
];

const CheckCircle = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function DiffCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...card,
        padding: "32px 28px",
        transition: "border-color 0.22s, box-shadow 0.22s, transform 0.22s",
        borderColor: hovered ? "rgba(167,139,250,0.40)" : "var(--border)",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        background: hovered ? GRAD : "rgba(167,139,250,0.10)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? "#fff" : GREEN_DARK,
        marginBottom: "20px",
        transition: "background 0.25s, color 0.25s",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <p style={{
        fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "18px",
        color: "var(--text-primary)", letterSpacing: "-0.02em",
        marginBottom: "10px", lineHeight: 1.2,
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
        color: "var(--text-secondary)", lineHeight: 1.7,
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
    <section style={{ background: "var(--section-alt)", padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        <SectionBadge>{s.badge}</SectionBadge>
        <SectionTitle accent={s.titleAccent}>{s.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "64px" }}>
          <SectionSub>{s.subtitle}</SectionSub>
        </div>

        {/* Differentiator grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}>
          {diffs.map((d, i) => (
            <DiffCard key={i} icon={d.icon} title={d.title} desc={d.desc} />
          ))}
        </div>

        {/* Commitments strip */}
        <div style={{
          ...card,
          padding: "36px 44px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle gradient accent */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            background: "linear-gradient(90deg, #a78bfa, #7c3aed, #a78bfa)",
            pointerEvents: "none",
          }} />

          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700,
            color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.14em",
            marginBottom: "22px",
          }}>
            {s.commitTitle}
          </p>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px 36px",
          }}>
            {s.commits.map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "9px",
                fontFamily: "'DM Sans',sans-serif", fontSize: "14px",
                color: "var(--text-secondary)", fontWeight: 500,
              }}>
                <div style={{
                  color: GREEN_DARK, flexShrink: 0,
                  width: "20px", height: "20px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(167,139,250,0.10)", borderRadius: "50%",
                }}>
                  <CheckCircle />
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
