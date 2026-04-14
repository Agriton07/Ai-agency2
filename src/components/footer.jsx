import { useState } from "react";
import { useApp } from "../context/AppContext";
import { scrollTo } from "../utils/helper";
import { GREEN, GRAD, gradText, ArrowIcon, CheckIcon } from "../utils/SharedUI";

export default function Footer() {
  const { t } = useApp();
  const f = t.footer;
  const [email, setEmail] = useState("");
  const [nlDone, setNlDone] = useState(false);
  const nav = (id) => scrollTo(id);
  const NAV_IDS = ["hero", "services", "how-it-works", "contact"];

  return (
    <>
      <style>{`
        .footer-input::placeholder { color: rgba(255,255,255,0.28) !important; }
        @keyframes fpulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        @media(max-width:900px){ .footer-grid{grid-template-columns:1fr 1fr!important} .footer-brand{grid-column:1/-1!important} }
        @media(max-width:480px){ .footer-grid{grid-template-columns:1fr!important} }
      `}</style>
      <footer style={{ background: "linear-gradient(160deg,#1a1917 0%,#0f0e0d 100%)", position: "relative", overflow: "hidden" }}>
        {/* Glows de fondo */}
        <div style={{ position: "absolute", top: "-120px", left: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(62,207,142,0.05) 0%,transparent 65%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "-100px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(30,168,122,0.06) 0%,transparent 65%)", pointerEvents: "none" }}/>

        {/* Banda CTA superior */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "80px 24px 0" }}>
          <div style={{ borderRadius: "24px", padding: "52px 56px", background: "linear-gradient(135deg,rgba(62,207,142,0.10),rgba(30,168,122,0.06))", border: "1px solid rgba(62,207,142,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle,rgba(62,207,142,0.12) 0%,transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "relative" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: GREEN, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>{f.ctaEyebrow}</p>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "clamp(22px,3vw,36px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "12px" }}>
                {f.ctaTitle}{" "}<span style={gradText}>{f.ctaAccent}</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.50)", maxWidth: "420px", lineHeight: 1.6 }}>{f.ctaDesc}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}>
              <button onClick={() => nav("contact")} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "13px 28px", borderRadius: "12px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "7px", boxShadow: "0 4px 20px rgba(62,207,142,0.30)", transition: "transform 0.2s,box-shadow 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(62,207,142,0.40)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(62,207,142,0.30)"; }}
              >{f.ctaBtn1}<ArrowIcon white/></button>
              <button onClick={() => nav("services")} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.50)", background: "none", border: "none", cursor: "pointer", textAlign: "center", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
              >{f.ctaBtn2}</button>
            </div>
          </div>
        </div>

        {/* Cuadrícula Principal del Footer */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "64px 24px 0" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "44px" }}>
            <div className="footer-brand">
              
              {/* Logo AKJ.ai */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2 L13.5 2 L9.5 9.5 L2 15.5 Z" fill="currentColor" fillOpacity="0.4" />
                    <path d="M15.5 2 L22 2 L22 13.5 L11.5 9 Z" fill="currentColor" fillOpacity="0.7" />
                    <path d="M2 17.5 L10 11.5 L22 15.5 L22 22 L2 22 Z" fill="currentColor" />
                  </svg>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff", letterSpacing: "-0.04em" }}>
                  AKJ<span style={gradText}>.ai</span>
                </span>
              </div>
              
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, maxWidth: "270px", marginBottom: "20px" }}>{f.brandDesc}</p>
              
              {/* Redes Sociales */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                {[["LinkedIn", <svg key="li" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>], ["X", <svg key="x" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>]].map(([lbl, icon]) => (
                  <a key={lbl} href="#" aria-label={lbl} style={{ width: "34px", height: "34px", borderRadius: "9px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.50)", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(62,207,142,0.15)"; e.currentTarget.style.color = GREEN; e.currentTarget.style.borderColor = "rgba(62,207,142,0.35)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.50)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
                  >{icon}</a>
                ))}
              </div>

              {/* Newsletter */}
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.30)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "9px" }}>{f.newsletter}</p>
              {nlDone ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 13px", borderRadius: "10px", background: "rgba(62,207,142,0.12)", border: "1px solid rgba(62,207,142,0.25)" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}><CheckIcon/></div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: GREEN }}>{f.nlSuccess}</span>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "7px" }}>
                  <input className="footer-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={f.nlPh}
                    style={{ flex: 1, height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", padding: "0 13px", outline: "none", minWidth: 0 }}
                    onKeyDown={(e) => { if (e.key === "Enter" && email.trim()) setNlDone(true); }}
                  />
                  <button onClick={() => { if (email.trim()) setNlDone(true); }} style={{ height: "40px", padding: "0 16px", borderRadius: "10px", background: GRAD, border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>{f.nlBtn}</button>
                </div>
              )}
            </div>

            {/* Columnas de Enlaces */}
            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>{f.colSolutions}</p>
              {t.services.items.map((item) => (
                <button key={item.title} onClick={() => nav("services")} style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: "0 0 11px", textAlign: "left", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{item.title}</button>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>{f.colNavigate}</p>
              {f.navLinks.map((label, i) => (
                <button key={label} onClick={() => nav(NAV_IDS[i])} style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: "0 0 11px", textAlign: "left", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{label}</button>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>{f.colLegal}</p>
              {f.legalLinks.map((label) => (
                <a key={label} href="#" style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "11px", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.22)" }}>© {new Date().getFullYear()} AKJ.ai. {f.rights}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: GREEN, animation: "fpulse 2.5s ease infinite" }}/>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.22)" }}>{f.status}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}