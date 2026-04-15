import { useApp } from "../context/useApp";
import { scrollTo } from "../utils/helper";
import { GREEN, GRAD, card, tag, gradText, CheckIcon, ArrowIcon, GREEN_DARK } from "../utils/SharedUI";

export default function Hero() {
  const { t } = useApp();
  const h = t.hero;

  return (
    <section style={{
      background: "var(--hero-bg)", minHeight: "100vh",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden", padding: "40px 0 80px",
    }}>
      {/* Background glows */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(30,168,122,0.05) 0%, transparent 65%)", pointerEvents: "none" }}/>

      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "60px", alignItems: "center",
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

          {/* Headline — fixed: line1 + line2 + accent on same line */}
          <h1 className="arp-fade-2" style={{
            fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800,
            fontSize: "clamp(44px,5.5vw,76px)", lineHeight: 1.03,
            letterSpacing: "-0.03em", color: "var(--text-primary)",
          }}>
            {h.line1}<br/>
            {h.line2}{" "}<span style={gradText}>{h.line2accent}</span>
          </h1>

          {/* Description */}
          <p className="arp-fade-3" style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "17px",
            color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "460px",
          }}>
            {h.description}
          </p>

          {/* CTAs */}
          <div className="arp-fade-4" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {/* Primary CTA → contact */}
            <button
              onClick={() => scrollTo("contact")}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
                color: "#fff", background: GRAD, border: "none",
                padding: "13px 26px", borderRadius: "13px", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "8px",
                boxShadow: "0 4px 20px rgba(167,139,250,0.30)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(167,139,250,0.40)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(167,139,250,0.30)"; }}
            >
              {h.cta1}<ArrowIcon white/>
            </button>

            {/* Secondary CTA → how it works */}
            <button
              onClick={() => scrollTo("how-it-works")}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
                color: "var(--text-primary)", background: "transparent",
                border: "1.5px solid var(--border)", padding: "13px 26px",
                borderRadius: "13px", cursor: "pointer",
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
                  fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "26px",
                  ...gradText, lineHeight: 1.1, marginBottom: "4px",
                }}>
                  {s.val}
                </div>
                <div style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                  color: "var(--text-muted)",
                }}>
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: dashboard card */}
        <div className="arp-fade-3" style={{
          display: "flex", justifyContent: "flex-end", paddingBottom: "32px",
        }}>
          <div style={{ width: "100%", maxWidth: "380px", position: "relative" }}>
            <div
              style={{ ...card, padding: "24px", boxShadow: "var(--shadow-lg)", transition: "transform 0.3s, box-shadow 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
            >
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

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)" }}>{h.dashChart}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 700, ...gradText }}>+24.8%</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "56px" }}>
                  {[40, 65, 50, 85, 70, 95, 80].map((v, i) => (
                    <div key={i} style={{
                      flex: 1, height: `${v}%`, borderRadius: "4px 4px 2px 2px",
                      background: i === 5 ? GRAD : `rgba(167,139,250,${0.2 + i * 0.1})`,
                    }}/>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", marginBottom: "16px" }}/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { val: "40h/mo", lbl: h.dashSaved },
                  { val: "99.2%", lbl: h.dashAcc },
                  { val: "99.9%", lbl: h.dashUp },
                ].map((m) => (
                  <div key={m.lbl} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px", ...gradText }}>{m.val}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{m.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating notification */}
            <div style={{
              position: "absolute", bottom: "-16px", left: "-16px",
              ...card, padding: "12px 14px",
              display: "flex", alignItems: "flex-start", gap: "10px",
              boxShadow: "var(--shadow-md)", minWidth: "220px",
            }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckIcon size={11}/>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)", marginBottom: "2px" }}>{h.notifTitle}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)" }}>{h.notifSub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.hero-right{display:none!important}}`}</style>
    </section>
  );
}
