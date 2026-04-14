import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { GREEN, GREEN_DARK, GRAD, card, SectionBadge, SectionTitle, SectionSub, CheckIcon, ArrowIcon, gradText } from "../utils/SharedUI";

const FOUNDERS = [
  { name: "Justin Kuijper",    initials: "JK", phone: "+31 6 [number]", email: "justin@adrimalu.ai",    linkedin: "#" },
  { name: "Alexander Janssen", initials: "AJ", phone: "+31 6 [number]", email: "alexander@adrimalu.ai", linkedin: "#" },
  { name: "Adrian Alvarez",    initials: "AA", phone: "+34 6 [number]", email: "adrian@adrimalu.ai",    linkedin: "#" },
];

const EMAILJS_SERVICE_ID  = "service_7qaapmd";
const EMAILJS_TEMPLATE_ID = "template_4xorr3d";
const EMAILJS_PUBLIC_KEY  = "2D4yS9JCljquj4JFu";

function useEmailJS() {
  const [ready, setReady] = useState(!!window.emailjs);
  useEffect(() => {
    if (window.emailjs) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.async = true;
    s.onload = () => { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); setReady(true); };
    document.head.appendChild(s);
  }, []);
  return ready;
}

const ContactForm = ({ ejsReady }) => {
  const { t } = useApp();
  const c = t.contact;
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [fields, setFields] = useState({ from_name: "", from_email: "", company: "", service: "", message: "", extra_info: "" });
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const inputStyle = { fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "var(--text-primary)", background: "var(--bg-input)", border: "1.5px solid var(--border)", borderRadius: "12px", padding: "11px 16px", outline: "none", width: "100%", transition: "border-color 0.2s,box-shadow 0.2s" };
  const fi = (e) => { e.target.style.borderColor = GREEN; e.target.style.boxShadow = "0 0 0 3px rgba(167,139,250,0.12)"; };
  const fo = (e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ejsReady || !window.emailjs) { setStatus("error"); return; }
    setStatus("sending");
    try { await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current); setStatus("success"); }
    catch (err) { console.error(err); setStatus("error"); }
  };

  if (status === "success") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 32px", gap: "20px" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(167,139,250,0.30)" }}>
        <CheckIcon size={28}/>
      </div>
      <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "24px", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{c.successTitle}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "320px" }}>{c.successDesc}</p>
      <button onClick={() => { setStatus("idle"); setFields({ from_name: "", from_email: "", company: "", service: "", message: "", extra_info: "" }); }}
        style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: GREEN_DARK, background: "transparent", border: "1.5px solid rgba(167,139,250,0.35)", borderRadius: "10px", padding: "9px 20px", cursor: "pointer" }}
      >{c.successBtn}</button>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.name} <span style={{ color: GREEN }}>*</span></label><input name="from_name" type="text" placeholder={c.namePh} value={fields.from_name} onChange={set("from_name")} required style={inputStyle} onFocus={fi} onBlur={fo}/></div>
        <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.email} <span style={{ color: GREEN }}>*</span></label><input name="from_email" type="email" placeholder={c.emailPh} value={fields.from_email} onChange={set("from_email")} required style={inputStyle} onFocus={fi} onBlur={fo}/></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.company}</label><input name="company" type="text" placeholder={c.companyPh} value={fields.company} onChange={set("company")} style={inputStyle} onFocus={fi} onBlur={fo}/></div>
        <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.service}</label>
          <select name="service" value={fields.service} onChange={set("service")} style={{ ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M3 5l4 4 4-4' stroke='%2378716c' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "36px", cursor: "pointer", color: fields.service ? "var(--text-primary)" : "var(--text-muted)" }} onFocus={fi} onBlur={fo}>
            <option value="" disabled>{c.servicePh}</option>
            {c.services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      
      {fields.service && fields.service.includes("Automatización") && (
        <div style={{ animation: "arp-fadeUp 0.3s ease forwards" }}>
          <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>¿Qué proceso te quita más tiempo actualmente?</label>
          <input name="extra_info" type="text" placeholder="Ej. Generación de reportes, on-boarding..." value={fields.extra_info} onChange={set("extra_info")} style={inputStyle} onFocus={fi} onBlur={fo}/>
        </div>
      )}

      <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.message} <span style={{ color: GREEN }}>*</span></label>
        <textarea name="message" placeholder={c.messagePh} value={fields.message} onChange={set("message")} required rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: "120px", lineHeight: 1.6 }} onFocus={fi} onBlur={fo}/>
      </div>

      {status === "error" && (
        <div style={{ padding: "12px 16px", borderRadius: "12px", background: "rgba(226,73,74,0.08)", border: "1px solid rgba(226,73,74,0.25)", display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#E2494A" strokeWidth="1.5"/><path d="M8 5v3M8 11v.5" stroke="#E2494A" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "#a32d2d" }}>{c.errorMsg}</span>
        </div>
      )}

      <button type="submit" disabled={status === "sending"} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px", color: "#fff", background: status === "sending" ? "linear-gradient(135deg,#7dd8ab,#5bb89a)" : GRAD, border: "none", borderRadius: "13px", padding: "14px 28px", cursor: status === "sending" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 20px rgba(167,139,250,0.28)", transition: "transform 0.2s,box-shadow 0.2s" }}
        onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(167,139,250,0.38)"; } }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(167,139,250,0.28)"; }}
      >
        {status === "sending" ? <><svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ animation: "arp-spin 0.9s linear infinite" }}><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/><path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>{c.sending}</> : <>{c.submit}<ArrowIcon white/></>}
      </button>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>{c.privacy}</p>
    </form>
  );
};

export default function Contact() {
  const { t } = useApp();
  const c = t.contact;
  const ejsReady = useEmailJS();

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "96px 0 112px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-80px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.06) 0%,transparent 65%)", pointerEvents: "none" }}/>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <SectionBadge>{c.badge}</SectionBadge>
        <SectionTitle accent={c.titleAccent}>{c.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}><SectionSub>{c.subtitle}</SectionSub></div>

        <div style={{ ...card, padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", marginBottom: "48px" }}>
          {c.emails.map((item) => (
            <a key={item.val} href={`mailto:${item.val}`} style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", flex: "1", minWidth: "180px", transition: "opacity 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "rgba(167,139,250,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN_DARK, flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 5h14v10H3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 5l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "2px" }}>{item.lbl}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>{item.val}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "28px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{c.founders}</p>
            {FOUNDERS.map((f) => (
              <div key={f.name} style={{ ...card, padding: "20px", display: "flex", flexDirection: "column", gap: "14px", transition: "box-shadow 0.25s,transform 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "13px", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "13px", color: "#fff" }}>{f.initials}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px", color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: "2px" }}>{f.name}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: GREEN_DARK, textTransform: "uppercase", letterSpacing: "0.07em" }}>Co-Founder</p>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid var(--border)" }}/>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[{ href: `tel:${f.phone}`, text: f.phone, icon: <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M6.5 3.5c.5 1.5 1 2.5 1.5 3L6 8.5c1 2 2.5 3.5 4.5 4.5l2-2c.5.5 1.5 1 3 1.5v3c0 .5-.5 1-1 1C7.5 17 3 12.5 3 7c0-.5.5-1 1-1l2.5-.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> }, { href: `mailto:${f.email}`, text: f.email, icon: <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 5h14v10H3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 5l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> }].map((row) => (
                    <a key={row.href} href={row.href}
                      style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                      onMouseEnter={(e) => e.currentTarget.querySelector("span").style.color = GREEN_DARK}
                      onMouseLeave={(e) => e.currentTarget.querySelector("span").style.color = "var(--text-secondary)"}
                    >
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(167,139,250,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN_DARK, flexShrink: 0 }}>{row.icon}</div>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-secondary)", transition: "color 0.15s" }}>{row.text}</span>
                    </a>
                  ))}
                </div>
                <a href={f.linkedin} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", borderRadius: "10px", border: "1.5px solid rgba(167,139,250,0.30)", color: GREEN_DARK, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, transition: "background 0.2s,border-color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(167,139,250,0.08)"; e.currentTarget.style.borderColor = GREEN; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(167,139,250,0.30)"; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>

          <div style={{ ...card, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
            <div style={{ height: "4px", background: GRAD }}/>
            <div style={{ padding: "36px 40px" }}>
              <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "22px", color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "6px" }}>{c.formTitle}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "28px" }}>{c.formDesc}</p>
              <ContactForm ejsReady={ejsReady}/>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}