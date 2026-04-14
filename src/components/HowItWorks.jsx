import { useState } from "react";
import { useApp } from "../context/AppContext";
import { GREEN_DARK, GRAD, card, SectionBadge, SectionTitle, SectionSub, GreenCheck, CheckIcon, gradText } from "../utils/SharedUI";

export default function HowItWorks() {
  const { t } = useApp();
  const h = t.hiw;
  const [active, setActive] = useState(0);

  return (
    <section style={{ background: "var(--bg-tertiary)", padding: "96px 0 112px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <SectionBadge>{h.badge}</SectionBadge>
        <SectionTitle accent={h.titleAccent}>{h.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "56px" }}><SectionSub>{h.subtitle}</SectionSub></div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: "48px", padding: "0 40px" }}>
          {h.steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < h.steps.length - 1 ? 1 : "none" }}>
              <button onClick={() => setActive(i)}
                style={{ width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: i <= active ? GRAD : "var(--bg-secondary)", border: i === active ? "3px solid rgba(167,139,250,0.35)" : "3px solid transparent", boxShadow: i === active ? "0 0 0 5px rgba(167,139,250,0.12)" : "none", cursor: "pointer", transition: "all 0.3s" }}
              >
                {i < active ? <CheckIcon size={13}/> : <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "12px", color: i <= active ? "#fff" : "var(--text-muted)" }}>0{i + 1}</span>}
              </button>
              {i < h.steps.length - 1 && <div style={{ flex: 1, height: "3px", borderRadius: "99px", margin: "0 4px", background: i < active ? GRAD : "var(--border)", transition: "background 0.4s" }}/>}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px", alignItems: "start" }}>
          <div style={{ background: "var(--bg-secondary)", borderRadius: "20px", padding: "10px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
            {h.steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px 18px", borderRadius: "13px", background: active === i ? "var(--bg-card)" : "transparent", border: active === i ? "1px solid var(--border)" : "1px solid transparent", boxShadow: active === i ? "var(--shadow-sm)" : "none", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.2s" }}
              >
                <div style={{ width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: active === i ? GRAD : "var(--bg-tertiary)", transition: "background 0.2s" }}>
                  <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "12px", color: active === i ? "#fff" : "var(--text-muted)" }}>0{i + 1}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: active === i ? GREEN_DARK : "var(--text-muted)", marginBottom: "3px" }}>{s.phase}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "14px", lineHeight: 1.2, color: active === i ? "var(--text-primary)" : "var(--text-secondary)" }}>{s.title}</div>
                </div>
                {active === i && <div style={{ width: "4px", height: "34px", borderRadius: "99px", background: GRAD, flexShrink: 0, alignSelf: "center" }}/>}
              </button>
            ))}
          </div>

          <div style={{ ...card, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
            <div style={{ height: "4px", background: GRAD }}/>
            <div style={{ padding: "36px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "13px", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px", color: "#fff" }}>0{active + 1}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: GREEN_DARK, marginBottom: "2px" }}>{h.steps[active].phase}</div>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1.1 }}>{h.steps[active].title}</h3>
                </div>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "24px" }}>{h.steps[active].desc}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                {h.steps[active].bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <GreenCheck/>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "56px", ...card, padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-around", gap: "24px", flexWrap: "wrap" }}>
          {h.trust.map((item) => (
            <div key={item.val} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "rgba(167,139,250,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN_DARK, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 17h14M5 17V11M8 17V7M11 17V4M14 17V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px", ...gradText, lineHeight: 1.2 }}>{item.val}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{item.lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}