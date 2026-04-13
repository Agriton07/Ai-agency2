import { useState } from "react";

// ─── Logo ─────────────────────────────────────────────────────────────────
const Logo = ({ onNavigate }) => (
  <button
    onClick={() => onNavigate("hero")}
    style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
  >
    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg,#45c789,#1aa685)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 3L15 9L9 15L3 9L9 3Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="9" cy="9" r="2.5" fill="white"/>
      </svg>
    </div>
    <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "22px", color: "#ffffff", letterSpacing: "-0.02em" }}>
      ARP
      <span style={{ background: "linear-gradient(135deg,#45c789,#1aa685)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}> Solutions</span>
    </span>
  </button>
);

// ─── Social button ────────────────────────────────────────────────────────
const SocialBtn = ({ href, label, children }) => (
  <a href={href} aria-label={label}
    style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "background 0.2s,color 0.2s,border-color 0.2s", flexShrink: 0 }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(69,199,137,0.15)"; e.currentTarget.style.color = "#45c789"; e.currentTarget.style.borderColor = "rgba(69,199,137,0.35)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
  >
    {children}
  </a>
);

// ─── Newsletter form ──────────────────────────────────────────────────────
const NewsletterForm = () => {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
        Stay in the loop
      </p>
      {submitted ? (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 14px", borderRadius: "12px", background: "rgba(69,199,137,0.12)", border: "1px solid rgba(69,199,137,0.25)" }}>
          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg,#45c789,#1aa685)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "#45c789" }}>You're subscribed. Welcome aboard.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@company.com" required
            style={{ flex: 1, height: "42px", borderRadius: "11px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", padding: "0 14px", outline: "none", transition: "border-color 0.2s,background 0.2s", minWidth: 0 }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(69,199,137,0.45)"; e.target.style.background = "rgba(255,255,255,0.10)"; }}
            onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
          />
          <button type="submit"
            style={{ height: "42px", padding: "0 18px", borderRadius: "11px", background: "linear-gradient(135deg,#45c789,#1aa685)", border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: "6px", transition: "transform 0.2s,box-shadow 0.2s", boxShadow: "0 2px 12px rgba(69,199,137,0.25)" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(69,199,137,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(69,199,137,0.25)"; }}
          >
            Subscribe
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      )}
    </div>
  );
};

// ─── Footer link helpers ──────────────────────────────────────────────────
const FLink = ({ onClick, href, children }) => (
  <a
    href={href || "#"}
    onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
    style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", textDecoration: "none", display: "block", transition: "color 0.15s", cursor: "pointer" }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#45c789")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
  >
    {children}
  </a>
);

const FHeading = ({ children }) => (
  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
    {children}
  </p>
);

// ─── Main Footer ──────────────────────────────────────────────────────────
export default function Footer({ onNavigate }) {
  const nav = (id) => () => onNavigate(id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .footer-rule { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 0; }
        input[type="email"]::placeholder { color: rgba(255,255,255,0.28) !important; }
        @keyframes footer-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @media(max-width:768px){
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-cta-band { flex-direction: column !important; padding: 36px 28px !important; }
        }
        @media(max-width:480px){
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <footer style={{ background: "linear-gradient(160deg,#1a1917 0%,#0f0e0d 100%)", position: "relative", overflow: "hidden" }}>

        {/* Background glow orbs */}
        <div style={{ position: "absolute", top: "-120px", left: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(69,199,137,0.05) 0%,transparent 65%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "-100px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(26,166,133,0.06) 0%,transparent 65%)", pointerEvents: "none" }}/>

        {/* ── Pre-footer CTA band ───────────────────────────────────── */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "80px 24px 0" }}>
          <div className="footer-cta-band"
            style={{ borderRadius: "24px", padding: "52px 56px", background: "linear-gradient(135deg,rgba(69,199,137,0.10) 0%,rgba(26,166,133,0.06) 100%)", border: "1px solid rgba(69,199,137,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle,rgba(69,199,137,0.12) 0%,transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "relative" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "#45c789", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
                Let's build together
              </p>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "clamp(24px,3vw,38px)", color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "12px" }}>
                Ready to deploy your{" "}
                <span style={{ background: "linear-gradient(135deg,#45c789,#1aa685)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  AI ecosystem?
                </span>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.50)", maxWidth: "420px", lineHeight: 1.6 }}>
                Book a free discovery call with Justin, Alexander, or Adrian — and walk away with a clear AI roadmap for your enterprise.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}>
              <button
                onClick={nav("contact")}
                style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px", color: "#fff", background: "linear-gradient(135deg,#45c789,#1aa685)", border: "none", padding: "14px 30px", borderRadius: "13px", boxShadow: "0 4px 20px rgba(69,199,137,0.30)", display: "inline-flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", cursor: "pointer", transition: "transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(69,199,137,0.40)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(69,199,137,0.30)"; }}
              >
                Book a discovery call
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={nav("services")}
                style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.50)", background: "none", border: "none", cursor: "pointer", textAlign: "center", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#45c789")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
              >
                Explore our services →
              </button>
            </div>
          </div>
        </div>

        {/* ── Main grid ─────────────────────────────────────────────── */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "64px 24px 0" }}>
          <div className="footer-grid"
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px" }}
          >
            {/* Brand column */}
            <div className="footer-brand" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Logo onNavigate={onNavigate}/>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, maxWidth: "280px" }}>
                Enterprise AI Automation Ecosystems. Built by operators, for operators. Founded by Justin Kuijper, Alexander Janssen, and Adrian Alvarez.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <SocialBtn href="#" label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </SocialBtn>
                <SocialBtn href="#" label="X / Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </SocialBtn>
                <SocialBtn href="#" label="GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </SocialBtn>
              </div>
              <NewsletterForm/>
            </div>

            {/* Solutions column — all 4 scroll to #services */}
            <div>
              <FHeading>Solutions</FHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <FLink onClick={nav("services")}>AI Workflow Automation</FLink>
                <FLink onClick={nav("services")}>Predictive Analytics</FLink>
                <FLink onClick={nav("services")}>Conversational AI</FLink>
                <FLink onClick={nav("services")}>API Integrations</FLink>
              </div>
            </div>

            {/* Navigate column — only sections that exist */}
            <div>
              <FHeading>Navigate</FHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <FLink onClick={nav("hero")}>Home</FLink>
                <FLink onClick={nav("services")}>Solutions</FLink>
                <FLink onClick={nav("how-it-works")}>How It Works</FLink>
                <FLink onClick={nav("contact")}>Contact</FLink>
              </div>
            </div>

            {/* Legal column */}
            <div>
              <FHeading>Legal</FHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <FLink href="#">Privacy Policy</FLink>
                <FLink href="#">Terms of Service</FLink>
                <FLink href="#">Cookie Policy</FLink>
                <FLink href="#">Security</FLink>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "40px 24px" }}>
          <hr className="footer-rule"/>
          <div style={{ paddingTop: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.22)" }}>
              © {new Date().getFullYear()} ARP Solutions. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#45c789", animation: "footer-pulse 2.5s ease infinite" }}/>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.22)" }}>
                All systems operational
              </span>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}