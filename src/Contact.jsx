import { useState, useRef, useEffect } from "react";

// ─── EmailJS credentials ──────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_7qaapmd";
const EMAILJS_TEMPLATE_ID = "template_4xorr3d";
const EMAILJS_PUBLIC_KEY  = "2D4yS9JCljquj4JFu";

// ─── Load EmailJS from CDN (no npm install needed) ────────────────────────
function useEmailJS() {
  const [ready, setReady] = useState(!!window.emailjs);

  useEffect(() => {
    if (window.emailjs) { setReady(true); return; }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      setReady(true);
    };
    document.head.appendChild(script);
  }, []);

  return ready;
}

// ─── Founder data ─────────────────────────────────────────────────────────
const FOUNDERS = [
  {
    name: "Justin Kuijper",
    role: "Co-Founder",
    initials: "JK",
    phone: "+31 6 [Justin's number]",
    email: "justin@arpsolutions.ai",
    linkedin: "#",
  },
  {
    name: "Alexander Janssen",
    role: "Co-Founder",
    initials: "AJ",
    phone: "+31 6 [Alexander's number]",
    email: "alexander@arpsolutions.ai",
    linkedin: "#",
  },
  {
    name: "Adrian Alvarez",
    role: "Co-Founder",
    initials: "AA",
    phone: "+34 6 [Adrian's number]",
    email: "adrian@arpsolutions.ai",
    linkedin: "#",
  },
];

const SERVICES = [
  "AI Workflow Automation",
  "Predictive Analytics",
  "Conversational AI",
  "API Integrations",
  "General Inquiry",
];

// ─── Shared input styles ──────────────────────────────────────────────────
const inputBase = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  color: "#292524",
  background: "#ffffff",
  border: "1.5px solid #e7e5e4",
  borderRadius: "12px",
  padding: "11px 16px",
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const focusIn  = (e) => { e.target.style.borderColor = "#45c789"; e.target.style.boxShadow = "0 0 0 3px rgba(69,199,137,0.12)"; };
const focusOut = (e) => { e.target.style.borderColor = "#e7e5e4"; e.target.style.boxShadow = "none"; };

// ─── Field wrapper ────────────────────────────────────────────────────────
const Field = ({ label, required, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
    <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "#57534e", letterSpacing: "0.01em" }}>
      {label}
      {required && <span style={{ color: "#45c789", marginLeft: "3px" }}>*</span>}
    </label>
    {children}
  </div>
);

// ─── Success screen ───────────────────────────────────────────────────────
const SuccessScreen = ({ onReset }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "52px 32px", gap: "20px" }}>
    <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg,#45c789,#1aa685)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(69,199,137,0.30)" }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M7 16l6 6 12-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div>
      <h3 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "24px", color: "#292524", letterSpacing: "-0.02em", marginBottom: "10px" }}>
        Message sent!
      </h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "#78716c", lineHeight: 1.6, maxWidth: "320px" }}>
        Thanks for reaching out. One of the ARP Solutions founders will get back to you within one business day.
      </p>
    </div>
    <button onClick={onReset}
      style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "#1aa685", background: "transparent", border: "1.5px solid rgba(69,199,137,0.35)", borderRadius: "10px", padding: "9px 20px", cursor: "pointer", transition: "background 0.2s,border-color 0.2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(69,199,137,0.08)"; e.currentTarget.style.borderColor = "#45c789"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(69,199,137,0.35)"; }}
    >
      Send another message
    </button>
  </div>
);

// ─── Contact form ─────────────────────────────────────────────────────────
const ContactForm = ({ ejsReady }) => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [fields, setFields] = useState({ from_name: "", from_email: "", company: "", service: "", message: "" });

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ejsReady || !window.emailjs) { setStatus("error"); return; }
    setStatus("sending");
    try {
      await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current);
      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setFields({ from_name: "", from_email: "", company: "", service: "", message: "" });
  };

  if (status === "success") return <SuccessScreen onReset={reset} />;

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

      {/* Name + Email */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Field label="Full name" required>
          <input name="from_name" type="text" placeholder="Jane Smith" value={fields.from_name} onChange={set("from_name")} required style={inputBase} onFocus={focusIn} onBlur={focusOut}/>
        </Field>
        <Field label="Work email" required>
          <input name="from_email" type="email" placeholder="jane@company.com" value={fields.from_email} onChange={set("from_email")} required style={inputBase} onFocus={focusIn} onBlur={focusOut}/>
        </Field>
      </div>

      {/* Company + Service */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Field label="Company">
          <input name="company" type="text" placeholder="Acme Corp" value={fields.company} onChange={set("company")} style={inputBase} onFocus={focusIn} onBlur={focusOut}/>
        </Field>
        <Field label="Service of interest">
          <select name="service" value={fields.service} onChange={set("service")}
            style={{ ...inputBase, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M3 5l4 4 4-4' stroke='%2378716c' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "36px", cursor: "pointer", color: fields.service ? "#292524" : "#a8a29e" }}
            onFocus={focusIn} onBlur={focusOut}
          >
            <option value="" disabled>Select a service…</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      {/* Message */}
      <Field label="Message" required>
        <textarea name="message" placeholder="Tell us about your project, current challenges, and what you're hoping AI can solve…" value={fields.message} onChange={set("message")} required rows={5}
          style={{ ...inputBase, resize: "vertical", minHeight: "120px", lineHeight: 1.6 }}
          onFocus={focusIn} onBlur={focusOut}
        />
      </Field>

      {/* Error banner */}
      {status === "error" && (
        <div style={{ padding: "12px 16px", borderRadius: "12px", background: "rgba(226,73,74,0.07)", border: "1px solid rgba(226,73,74,0.25)", display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="#E2494A" strokeWidth="1.5"/>
            <path d="M8 5v3M8 11v.5" stroke="#E2494A" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "#a32d2d" }}>
            Something went wrong. Please try again or email us directly at hello@arpsolutions.ai
          </span>
        </div>
      )}

      {/* Submit button */}
      <button type="submit" disabled={status === "sending"}
        style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px", color: "#fff", background: status === "sending" ? "linear-gradient(135deg,#7dd8ab,#5bb89a)" : "linear-gradient(135deg,#45c789,#1aa685)", border: "none", borderRadius: "13px", padding: "14px 28px", cursor: status === "sending" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 20px rgba(69,199,137,0.28)", transition: "transform 0.2s,box-shadow 0.2s" }}
        onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(69,199,137,0.38)"; } }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(69,199,137,0.28)"; }}
      >
        {status === "sending" ? (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "contact-spin 0.9s linear infinite" }}>
              <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
              <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send message
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.5 7h11M8 3.5L11.5 7 8 10.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "#a8a29e", textAlign: "center", lineHeight: 1.5 }}>
        We typically respond within 1 business day. Your information is never shared with third parties.
      </p>
    </form>
  );
};

// ─── Founder card ─────────────────────────────────────────────────────────
const FounderCard = ({ founder }) => (
  <div
    style={{ background: "#ffffff", border: "1px solid #e7e5e4", borderRadius: "18px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)", transition: "box-shadow 0.25s ease,transform 0.25s ease" }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "linear-gradient(135deg,#45c789,#1aa685)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "14px", color: "#fff" }}>{founder.initials}</span>
      </div>
      <div>
        <p style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "16px", color: "#292524", letterSpacing: "-0.01em", marginBottom: "2px" }}>{founder.name}</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "#1aa685", textTransform: "uppercase", letterSpacing: "0.07em" }}>{founder.role}</p>
      </div>
    </div>

    <div style={{ borderTop: "1px solid #f0ede9" }}/>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {[
        { href: `tel:${founder.phone}`, icon: <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M6.5 3.5c.5 1.5 1 2.5 1.5 3L6 8.5c1 2 2.5 3.5 4.5 4.5l2-2c.5.5 1.5 1 3 1.5v3c0 .5-.5 1-1 1C7.5 17 3 12.5 3 7c0-.5.5-1 1-1l2.5-.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: founder.phone },
        { href: `mailto:${founder.email}`, icon: <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 5h14v10H3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 5l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: founder.email },
      ].map(({ href, icon, text }) => (
        <a key={href} href={href}
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          onMouseEnter={(e) => e.currentTarget.querySelector("span").style.color = "#1aa685"}
          onMouseLeave={(e) => e.currentTarget.querySelector("span").style.color = "#57534e"}
        >
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(69,199,137,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1aa685", flexShrink: 0 }}>{icon}</div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "#57534e", transition: "color 0.15s" }}>{text}</span>
        </a>
      ))}
    </div>

    <a href={founder.linkedin}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "9px", borderRadius: "11px", border: "1.5px solid rgba(69,199,137,0.30)", color: "#1aa685", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, transition: "background 0.2s,border-color 0.2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(69,199,137,0.08)"; e.currentTarget.style.borderColor = "#45c789"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(69,199,137,0.30)"; }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
      Connect on LinkedIn
    </a>
  </div>
);

// ─── Company bar ──────────────────────────────────────────────────────────
const CompanyBar = () => (
  <div style={{ background: "#ffffff", border: "1px solid #e7e5e4", borderRadius: "18px", padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", marginBottom: "48px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
    {[
      { icon: <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M3 5h14v10H3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 5l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, label: "General Inquiries", value: "hello@arpsolutions.ai", href: "mailto:hello@arpsolutions.ai" },
      { icon: <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M3 17h14M5 17V11M8 17V7M11 17V4M14 17V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, label: "Enterprise Sales", value: "sales@arpsolutions.ai", href: "mailto:sales@arpsolutions.ai" },
      { icon: <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, label: "Careers", value: "careers@arpsolutions.ai", href: "mailto:careers@arpsolutions.ai" },
    ].map((item) => (
      <a key={item.label} href={item.href}
        style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", flex: "1", minWidth: "180px", transition: "opacity 0.15s" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "rgba(69,199,137,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1aa685", flexShrink: 0 }}>{item.icon}</div>
        <div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "2px" }}>{item.label}</p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: 500, color: "#292524" }}>{item.value}</p>
        </div>
      </a>
    ))}
  </div>
);

// ─── Main export ──────────────────────────────────────────────────────────
export default function Contact() {
  const ejsReady = useEmailJS();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes contact-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes contact-spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media(max-width:768px) {
          .contact-layout { flex-direction: column !important; }
          .contact-layout > div:first-child { width: 100% !important; }
          .contact-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        id="contact"
        style={{ background: "#f5f3f0", padding: "96px 0 112px", position: "relative", overflow: "hidden" }}
      >
        {/* Background glow orbs */}
        <div style={{ position: "absolute", top: "-80px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(69,199,137,0.06) 0%,transparent 65%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "-60px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(26,166,133,0.05) 0%,transparent 65%)", pointerEvents: "none" }}/>

        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative" }}>

          {/* Section header */}
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 64px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1aa685", background: "rgba(69,199,137,0.08)", border: "1px solid rgba(69,199,137,0.22)", padding: "6px 14px", borderRadius: "99px", marginBottom: "20px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#45c789", animation: "contact-blink 2s ease infinite" }}/>
              Contact us
            </div>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#292524", marginBottom: "18px" }}>
              Let's build your{" "}
              <span style={{ background: "linear-gradient(135deg,#45c789,#1aa685)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                AI ecosystem
              </span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "17px", color: "#78716c", lineHeight: 1.65 }}>
              Reach out directly to one of our founders, or fill out the form and we'll get back to you within one business day.
            </p>
          </div>

          {/* Company email bar */}
          <CompanyBar/>

          {/* Main layout */}
          <div className="contact-layout" style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>

            {/* Founder cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px", flexShrink: 0 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                Reach a founder directly
              </p>
              {FOUNDERS.map((f) => <FounderCard key={f.name} founder={f}/>)}
            </div>

            {/* Form panel */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ background: "#ffffff", borderRadius: "24px", border: "1px solid #e7e5e4", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
                <div style={{ height: "4px", background: "linear-gradient(90deg,#45c789,#1aa685)" }}/>
                <div style={{ padding: "36px 40px" }}>
                  <h3 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "22px", color: "#292524", letterSpacing: "-0.02em", marginBottom: "6px" }}>
                    Send us a message
                  </h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "#78716c", lineHeight: 1.6, marginBottom: "28px" }}>
                    Tell us about your project and we'll put together a tailored proposal within 24 hours.
                  </p>
                  <ContactForm ejsReady={ejsReady}/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}