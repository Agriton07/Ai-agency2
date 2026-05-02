import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import { GREEN, GRAD, card, tag, gradText, CheckIcon, ArrowIcon, GREEN_DARK } from "../utils/SharedUI";

const NOTIFS = [
  { icon: "🎯", title: "Lead qualified",       sub: "Sarah M. → Discovery call booked" },
  { icon: "📅", title: "Appointment confirmed", sub: "Dr. Patel · Tomorrow 2:00 PM" },
  { icon: "⚡", title: "Admin automated",       sub: "8 invoices processed · 0 effort" },
];

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useApp();
  const h = t.hero;
  const [notifIdx, setNotifIdx] = useState(0);
  const [notifVisible, setNotifVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setNotifVisible(false);
      setTimeout(() => {
        setNotifIdx(i => (i + 1) % NOTIFS.length);
        setNotifVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(cycle);
  }, []);

  const notif = NOTIFS[notifIdx];

  return (
    <section style={{
      background: "var(--hero-bg)", minHeight: "100vh",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden", padding: "40px 0 80px",
    }}>
      {/* Dot grid texture */}
      <div className="dot-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6 }} />

      {/* Gradient orbs */}
      <div style={{ position: "absolute", top: "-12%", right: "-6%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 62%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "-12%", left: "-6%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 62%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", top: "35%", left: "25%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 60%)", pointerEvents: "none" }}/>

      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "60px", alignItems: "center", position: "relative",
      }}>
        {/* Left: copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Badge */}
          <div className="arp-fade-1">
            <span style={tag(false)}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, animation: "arp-blink 2s ease infinite" }}/>
              {h.badge}
            </span>
          </div>

          {/* Headline — bigger, tighter */}
          <h1 className="arp-fade-2" style={{
            fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800,
            fontSize: "clamp(48px, 6.2vw, 86px)", lineHeight: 0.98,
            letterSpacing: "-0.038em", color: "var(--text-primary)",
          }}>
            {h.line1}<br/>
            {h.line2}{" "}<span style={gradText}>{h.line2accent}</span>
          </h1>

          {/* Description */}
          <p className="arp-fade-3" style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "18px",
            color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "460px",
          }}>
            {h.description}
          </p>

          {/* CTAs */}
          <div className="arp-fade-4" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/contact")}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
                color: "#fff", background: GRAD, border: "none",
                padding: "14px 28px", borderRadius: "14px", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "8px",
                boxShadow: "0 4px 24px rgba(167,139,250,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(167,139,250,0.50)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(167,139,250,0.35)"; }}
            >
              {h.cta1}<ArrowIcon white/>
            </button>

            <button
              onClick={() => navigate("/services")}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
                color: "var(--text-primary)", background: "transparent",
                border: "1.5px solid var(--border)", padding: "14px 28px",
                borderRadius: "14px", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "8px",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.color = GREEN; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            >
              {h.cta2}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="arp-fade-4" style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            {[h.trust1, h.trust2, h.trust3].filter(Boolean).map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "18px", height: "18px", borderRadius: "50%",
                  background: "rgba(167,139,250,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2 2 5-4" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="arp-fade-5" style={{
            display: "flex", gap: "0", paddingTop: "24px",
            borderTop: "1px solid var(--border)",
          }}>
            {[
              { val: h.stat1val, lbl: h.stat1lbl },
              { val: h.stat2val, lbl: h.stat2lbl },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, paddingTop: "16px",
                paddingLeft: i > 0 ? "28px" : "0",
                borderLeft: i > 0 ? "1px solid var(--border)" : "none",
                marginLeft: i > 0 ? "28px" : "0",
              }}>
                <div style={{
                  fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "28px",
                  ...gradText, lineHeight: 1.1, marginBottom: "4px",
                }}>
                  {s.val}
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-muted)" }}>
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: dashboard card */}
        <div className="arp-fade-3 hero-right-panel" style={{
          display: "flex", justifyContent: "flex-end", paddingBottom: "32px",
        }}>
          <div style={{ width: "100%", maxWidth: "380px", position: "relative" }}>
            <div
              style={{
                ...card, padding: "24px",
                boxShadow: "var(--shadow-lg), 0 0 0 1px rgba(167,139,250,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(167,139,250,0.18)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-lg), 0 0 0 1px rgba(167,139,250,0.08)"; }}
            >
              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ position: "relative", width: "10px", height: "10px" }}>
                    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: GREEN, opacity: 0.4, animation: "arp-ping 1.5s ease infinite" }}/>
                    <span style={{ position: "absolute", inset: "1px", borderRadius: "50%", background: GREEN }}/>
                  </div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text-primary)" }}>{h.dashTitle}</span>
                </div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: GREEN_DARK, background: "rgba(167,139,250,0.12)", padding: "3px 10px", borderRadius: "99px" }}>{h.dashLive}</span>
              </div>

              {/* Animated bar chart */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)" }}>{h.dashChart}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 700, ...gradText }}>+24.8%</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "60px" }}>
                  {[40, 65, 50, 85, 70, 95, 80].map((v, i) => (
                    <div key={i} style={{
                      flex: 1, height: `${v}%`, borderRadius: "4px 4px 2px 2px",
                      background: i === 5 ? GRAD : `rgba(167,139,250,${0.18 + i * 0.1})`,
                      transformOrigin: "bottom",
                      animation: `bar-grow 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.08}s both`,
                    }}/>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", marginBottom: "16px" }}/>

              {/* Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { val: "40h/mo", lbl: h.dashSaved },
                  { val: "99.2%",  lbl: h.dashAcc },
                  { val: "99.9%",  lbl: h.dashUp },
                ].map((m) => (
                  <div key={m.lbl} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px", ...gradText }}>{m.val}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{m.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cycling notification */}
            <div style={{
              position: "absolute", bottom: "-16px", left: "-20px",
              ...card, padding: "12px 14px",
              display: "flex", alignItems: "flex-start", gap: "10px",
              boxShadow: "var(--shadow-md)", minWidth: "240px",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              opacity: notifVisible ? 1 : 0,
              transform: notifVisible ? "translateY(0)" : "translateY(6px)",
            }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%", background: GRAD,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                fontSize: "13px",
              }}>
                {notif.icon}
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)", marginBottom: "2px" }}>{notif.title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)" }}>{notif.sub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
