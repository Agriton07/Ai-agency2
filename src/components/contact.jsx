import { useEffect, useRef } from "react";
import { useApp } from "../context/useApp";
import { GREEN, GREEN_DARK, GRAD, gradText } from "../utils/SharedUI";

const CAL_LINK = "adriansande-ce9fyl";

const FOUNDERS = [
  { name: "Adrián Álvarez Sande", initials: "AÁ", email: "adrian@akj.ai",    bg: "#7c3aed" },
  { name: "Justin Kuijper",       initials: "JK", email: "justin@akj.ai",    bg: "#a78bfa" },
  { name: "Alexander",            initials: "AK", email: "alexander@akj.ai", bg: "#9333ea" },
];

const STEPS = [
  { n: "01", title: "Pick a time",        desc: "Choose a 30-min slot that fits your schedule." },
  { n: "02", title: "We do the homework", desc: "We review your business before the call — no generic advice." },
  { n: "03", title: "Leave with a plan",  desc: "A concrete automation roadmap tailored to your operations." },
];

function useCalEmbed(theme) {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal; let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {}; cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, [L, namespace, ar[2]]);
          } else { p(cal, ar); }
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", { origin: "https://cal.com" });
    window.Cal("inline", {
      elementOrSelector: "#cal-inline",
      config: { layout: "month_view", theme: theme === "dark" ? "dark" : "light" },
      calLink: CAL_LINK,
    });
    window.Cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
  }, []);
}

export default function Contact() {
  const { t, theme } = useApp();
  const c = t.contact;
  useCalEmbed(theme);

  return (
    <section style={{
      background: "var(--bg-secondary)",
      padding: "96px 0 120px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", top: "-160px", right: "-120px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 65%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "-100px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 65%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* ── Header ── */}
        <div style={{ maxWidth: "600px", marginBottom: "72px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 13px", borderRadius: "999px", background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.22)", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, display: "inline-block", animation: "arp-ping 1.8s ease infinite" }}/>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: GREEN_DARK, letterSpacing: "0.06em", textTransform: "uppercase" }}>Free · No pitch · 30 minutes</span>
          </div>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "20px" }}>
            Book your free<br/>
            <span style={gradText}>discovery call.</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "480px" }}>
            Tell us about your business. We'll map out exactly which processes to automate and show you what that looks like in practice.
          </p>
        </div>

        {/* ── Main grid ── */}
        <div className="contact-main-grid" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "32px", alignItems: "start" }}>

          {/* ── Left sidebar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            {/* What to expect */}
            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "20px" }}>What to expect</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {STEPS.map((step, i) => (
                  <div key={step.n} style={{ display: "flex", gap: "16px", paddingBottom: i < STEPS.length - 1 ? "24px" : "0", position: "relative" }}>
                    {/* Connector line */}
                    {i < STEPS.length - 1 && (
                      <div style={{ position: "absolute", left: "15px", top: "32px", bottom: "0", width: "1px", background: "linear-gradient(to bottom, rgba(167,139,250,0.35), transparent)" }}/>
                    )}
                    <div style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "10px", background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700, color: GREEN_DARK }}>{step.n}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>{step.title}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)" }}/>

            {/* Contact emails */}
            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "14px" }}>{c.founders}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {FOUNDERS.map((f, i) => (
                  <div key={f.name} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border)", transition: "border-color 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.35)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "11px", color: "#fff" }}>{f.initials}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: GREEN_DARK, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.about?.founders?.[i]?.role || "Co-Founder"}</p>
                    </div>
                    <a href={`mailto:${f.email}`} style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(167,139,250,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN_DARK, flexShrink: 0, textDecoration: "none", transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(167,139,250,0.18)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(167,139,250,0.08)")}
                    >
                      <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 5h14v10H3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 5l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust note */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "14px 16px", borderRadius: "12px", background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.15)" }}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "1px", color: GREEN_DARK }}><path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.5L10 14.5l-4.9 2.7.9-5.5L2 7.8l5.5-.8L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                No sales pressure. If we're not the right fit, we'll tell you — and point you in the right direction.
              </p>
            </div>

          </div>

          {/* ── Cal.com embed ── */}
          <div style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 0 0 1px var(--border), var(--shadow-lg)",
            background: "var(--bg-card)",
            position: "relative",
          }}>
            {/* Gradient top accent */}
            <div style={{ height: "3px", background: "linear-gradient(90deg, #a78bfa, #7c3aed, #a78bfa)", backgroundSize: "200% 100%", animation: "shimmer-bg 3s linear infinite" }}/>
            <div id="cal-inline" style={{ minHeight: "700px", width: "100%" }}/>
          </div>

        </div>
      </div>
    </section>
  );
}
