import { useState } from "react";
import { useApp } from "../context/useApp";
import { scrollTo } from "../utils/helper";
import { GREEN, GREEN_DARK, GRAD, card, tag, gradText, SectionBadge, SectionTitle, SectionSub, GreenCheck, ArrowIcon } from "../utils/SharedUI";

const ServiceVisual = ({ index }) => {
  if (index === 0) return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {["Trigger received", "AI processes", "Action executed", "Result delivered"].map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "8px 12px", borderRadius: "10px", background: i === 1 ? "rgba(167,139,250,0.10)" : "var(--bg-secondary)", border: `1px solid ${i === 1 ? "rgba(167,139,250,0.28)" : "var(--border)"}` }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: i === 1 ? GRAD : "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {i === 1 ? <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1L10 6L6 11L2 6L6 1Z" fill="white"/></svg> : <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--text-muted)" }}>{i + 1}</span>}
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: i === 1 ? 600 : 400, color: i === 1 ? GREEN_DARK : "var(--text-secondary)" }}>{s}</span>
          {i < 3 && <svg style={{ marginLeft: "auto" }} width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6h6M7 4l2 2-2 2" stroke="var(--border-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
      ))}
    </div>
  );
  if (index === 1) return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>Forecast accuracy</span>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 700, color: GREEN_DARK }}>↑ Trending up</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "64px" }}>
        {[45, 60, 52, 78, 68, 94].map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <div style={{ width: "100%", height: `${h}%`, borderRadius: "4px 4px 2px 2px", background: i === 5 ? GRAD : `rgba(167,139,250,${0.2 + i * 0.1})` }}/>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", color: "var(--text-muted)" }}>{["J","F","M","A","M","J"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
  if (index === 2) return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      {[{ from: "user", text: "Status of account #8821?" }, { from: "ai", text: "Active. Renewal in 14 days. Trigger follow-up?" }, { from: "user", text: "Yes, start the sequence." }].map((m, i) => (
        <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
          <div style={{ maxWidth: "85%", padding: "7px 11px", borderRadius: m.from === "user" ? "13px 13px 3px 13px" : "13px 13px 13px 3px", background: m.from === "user" ? GRAD : "var(--bg-secondary)", border: m.from === "user" ? "none" : "1px solid var(--border)" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: m.from === "user" ? "#fff" : "var(--text-primary)", margin: 0, lineHeight: 1.4 }}>{m.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ background: "#1c1917", borderRadius: "10px", padding: "14px 15px", fontFamily: "'Fira Code',monospace", fontSize: "11px", lineHeight: 1.6 }}>
      <div style={{ color: "#6b7280", marginBottom: "4px" }}>// Connect in minutes</div>
      <div><span style={{ color: "#f9a8d4" }}>const</span><span style={{ color: "#e5e7eb" }}> client </span><span style={{ color: "#60a5fa" }}>=</span><span style={{ color: "#a3e635" }}> new </span><span style={{ color: "#fbbf24" }}>ARPSolutions</span><span style={{ color: "#e5e7eb" }}>&#123;</span></div>
      <div style={{ paddingLeft: "14px" }}><span style={{ color: "#94a3b8" }}>apiKey: </span><span style={{ color: "#86efac" }}>'sk-arp-...'</span><span style={{ color: "#e5e7eb" }}>,</span></div>
      <div><span style={{ color: "#e5e7eb" }}>&#125;);</span></div>
      <div style={{ marginTop: "8px", padding: "5px 9px", borderRadius: "6px", background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)" }}>
        <span style={{ color: "#a78bfa" }}>✓ Connected · 11ms latency</span>
      </div>
    </div>
  );
};

const ServiceCard = ({ item, index }) => {
  const { t } = useApp();
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div style={{ ...card, display: "grid", gridTemplateColumns: "1fr 1fr", boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)", transform: hovered ? "translateY(-3px)" : "translateY(0)", transition: "box-shadow 0.3s,transform 0.3s", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between", order: isEven ? 1 : 2 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <span style={tag(true)}>{item.tag}</span>
          </div>
          <h3 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "26px", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "14px" }}>{item.title}</h3>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "20px" }}>{item.desc}</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
            {item.feats.map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <GreenCheck/>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ padding: "10px 14px", borderRadius: "12px", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.20)" }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "20px", ...gradText, lineHeight: 1.1 }}>{item.metric.val}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{item.metric.lbl}</div>
          </div>
          <button style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: GREEN_DARK, background: "transparent", border: "1.5px solid rgba(167,139,250,0.35)", borderRadius: "11px", padding: "9px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", transition: "background 0.2s,border-color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(167,139,250,0.08)"; e.currentTarget.style.borderColor = GREEN; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(167,139,250,0.35)"; }}
          >
            {t.services.learnMore}<ArrowIcon/>
          </button>
        </div>
      </div>

      <div style={{ background: "var(--bg-tertiary)", borderLeft: isEven ? "1px solid var(--border)" : "none", borderRight: !isEven ? "1px solid var(--border)" : "none", padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "center", order: isEven ? 2 : 1, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-50px", right: "-50px", width: "160px", height: "160px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.08) 0%,transparent 70%)", pointerEvents: "none" }}/>
        <ServiceVisual index={index}/>
      </div>
    </div>
  );
};

// ─── Compact card for additional services ────────────────────────────────────
const CompactServiceCard = ({ item }) => {
  const { t } = useApp();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...card,
        padding: "28px 24px",
        display: "flex", flexDirection: "column", gap: "14px",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        borderColor: hovered ? "rgba(167,139,250,0.30)" : "var(--border)",
        transition: "box-shadow 0.25s, transform 0.25s, border-color 0.25s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "11px",
          background: hovered ? GRAD : "rgba(167,139,250,0.10)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", flexShrink: 0, transition: "background 0.25s",
        }}>
          {item.icon}
        </div>
        <div>
          <span style={tag(true)}>{item.tag}</span>
        </div>
      </div>
      <h3 style={{
        fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "18px",
        lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0,
      }}>
        {item.title}
      </h3>
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
        color: "var(--text-secondary)", lineHeight: 1.65, margin: 0,
      }}>
        {item.desc}
      </p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
        {item.feats.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <GreenCheck/>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => scrollTo("contact")}
        style={{
          marginTop: "auto", fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
          fontSize: "13px", color: GREEN_DARK, background: "transparent",
          border: "1.5px solid rgba(167,139,250,0.35)", borderRadius: "10px",
          padding: "8px 16px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "5px",
          transition: "background 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(167,139,250,0.08)"; e.currentTarget.style.borderColor = GREEN; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(167,139,250,0.35)"; }}
      >
        {t.services.learnMore}<ArrowIcon/>
      </button>
    </div>
  );
};

export default function Services() {
  const { t } = useApp();
  const s = t.services;
  return (
    <section style={{ background: "var(--bg-secondary)", padding: "96px 0 112px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <SectionBadge>{s.badge}</SectionBadge>
        <SectionTitle accent={s.titleAccent}>{s.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "64px" }}><SectionSub>{s.subtitle}</SectionSub></div>

        {/* Main 4 featured services — alternating layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {s.items.map((item, i) => <ServiceCard key={i} item={item} index={i}/>)}
        </div>

        {/* 3 additional compact services */}
        {s.moreItems && s.moreItems.length > 0 && (
          <div style={{ marginTop: "48px" }}>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600,
              color: "var(--text-muted)", textTransform: "uppercase",
              letterSpacing: "0.10em", marginBottom: "20px", textAlign: "center",
            }}>
              {s.moreTitle}
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}>
              {s.moreItems.map((item, i) => (
                <CompactServiceCard key={i} item={item}/>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA banner */}
        <div style={{ marginTop: "64px", borderRadius: "24px", padding: "48px 56px", background: "linear-gradient(135deg,#1c1917,#262421)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.12) 0%,transparent 70%)", pointerEvents: "none" }}/>
          <div style={{ position: "relative" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>{s.ctaEyebrow}</p>
            <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "clamp(22px,3vw,34px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {s.ctaTitle}{" "}<span style={gradText}>{s.ctaAccent}</span>
            </h3>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", position: "relative" }}>
            <button onClick={() => scrollTo("contact")} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "12px 26px", borderRadius: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px", boxShadow: "0 4px 20px rgba(167,139,250,0.30)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(167,139,250,0.40)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(167,139,250,0.30)"; }}
            >{s.ctaBtn1}<ArrowIcon white/></button>
            <button
              onClick={() => scrollTo("pricing")}
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.70)", background: "none", border: "1.5px solid rgba(255,255,255,0.15)", padding: "12px 26px", borderRadius: "13px", cursor: "pointer", transition: "border-color 0.2s,color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.70)"; }}
            >{s.ctaBtn2}</button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.service-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}