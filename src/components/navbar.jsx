import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { scrollTo } from "../utils/helper";
import { GREEN, GREEN_DARK, GRAD, ArrowIcon, gradText } from "../utils/SharedUI";

const ChevronIcon = ({ open }) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const MenuIcon  = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>;
const CloseIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>;
const SunIcon   = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const MoonIcon  = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M17.5 12.5A7.5 7.5 0 017.5 2.5a7.5 7.5 0 100 15 7.5 7.5 0 0010-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;

const Logo = ({ onClick }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
    <div style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--text-primary)" }}>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2 L13.5 2 L9.5 9.5 L2 15.5 Z" fill="currentColor" fillOpacity="0.4" />
        <path d="M15.5 2 L22 2 L22 13.5 L11.5 9 Z" fill="currentColor" fillOpacity="0.7" />
        <path d="M2 17.5 L10 11.5 L22 15.5 L22 22 L2 22 Z" fill="currentColor" />
      </svg>
    </div>

    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "22px", color: "var(--text-primary)", letterSpacing: "-0.04em", whiteSpace: "nowrap" }}>
      AKJ<span style={gradText}>.ai</span>
    </span>
  </button>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useApp();
  return (
    <button onClick={toggleTheme}
      style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer", transition: "all 0.2s", flexShrink: 0 }}
      onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      {theme === "dark" ? <SunIcon/> : <MoonIcon/>}
    </button>
  );
};

const LANGS = [{ code: "en", label: "EN" }, { code: "es", label: "ES" }, { code: "nl", label: "NL" }];
const LangSelector = () => {
  const { lang, changeLang } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen((v) => !v)}
        style={{ display: "flex", alignItems: "center", gap: "5px", height: "36px", padding: "0 12px", borderRadius: "10px", background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", transition: "all 0.2s", flexShrink: 0 }}
        onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
      >
        {lang.toUpperCase()}
        <ChevronIcon open={open}/>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "4px", boxShadow: "var(--shadow-md)", zIndex: 200, minWidth: "80px" }}>
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => { changeLang(l.code); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "center", padding: "8px 12px", borderRadius: "8px", background: lang === l.code ? "rgba(167,139,250,0.12)" : "transparent", color: lang === l.code ? GREEN_DARK : "var(--text-secondary)", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", transition: "background 0.15s" }}
              onMouseEnter={(e) => { if (lang !== l.code) e.currentTarget.style.background = "var(--bg-tertiary)"; }}
              onMouseLeave={(e) => { if (lang !== l.code) e.currentTarget.style.background = "transparent"; }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Dropdown = ({ items, sectionId, visible }) => (
  <div style={{ position: "absolute", top: "calc(100% + 12px)", left: "50%", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "8px", boxShadow: "var(--shadow-md)", width: "280px", opacity: visible ? 1 : 0, pointerEvents: visible ? "all" : "none", transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-8px)", transition: "opacity 0.2s, transform 0.2s", zIndex: 200 }}>
    <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "10px", height: "10px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRight: "none", borderBottom: "none" }}/>
    {items.map((item) => (
      <button key={item.label} onClick={() => scrollTo(sectionId)}
        style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "transparent", border: "none", width: "100%", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tertiary)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(167,139,250,0.10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>{item.icon}</div>
        <div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>{item.label}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", marginTop: "1px" }}>{item.desc}</div>
        </div>
      </button>
    ))}
  </div>
);

export default function Navbar({ activeSection }) {
  const { t } = useApp();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ddOpen,     setDdOpen]     = useState(false);
  const ddRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const h = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const navLinkStyle = (id) => ({
    fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "14px",
    color: activeSection === id ? GREEN : "var(--text-secondary)",
    background: "none", border: "none", cursor: "pointer", padding: "6px 2px",
    position: "relative", display: "flex", alignItems: "center", gap: "4px",
    transition: "color 0.15s",
  });

  const SOLUTIONS_ITEMS = [
    { label: t.services.items[0].title, desc: t.services.items[0].tag, icon: "⚡" },
    { label: t.services.items[1].title, desc: t.services.items[1].tag, icon: "📊" },
    { label: t.services.items[2].title, desc: t.services.items[2].tag, icon: "💬" },
    { label: t.services.items[3].title, desc: t.services.items[3].tag, icon: "🔗" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800;9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes arp-blink  { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes arp-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes arp-fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes arp-ping   { 75%,100%{transform:scale(2);opacity:0} }
        .arp-fade-1{opacity:0;animation:arp-fadeUp .6s ease .1s forwards}
        .arp-fade-2{opacity:0;animation:arp-fadeUp .6s ease .22s forwards}
        .arp-fade-3{opacity:0;animation:arp-fadeUp .6s ease .34s forwards}
        .arp-fade-4{opacity:0;animation:arp-fadeUp .6s ease .46s forwards}
        .arp-fade-5{opacity:0;animation:arp-fadeUp .6s ease .58s forwards}
        .arp-desk{display:flex!important}
        .arp-mob{display:none!important}
        @media(max-width:900px){.arp-desk{display:none!important}.arp-mob{display:flex!important}}
        *, *::before, *::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:var(--bg-secondary);-webkit-font-smoothing:antialiased}
      `}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        transition: "background 0.3s, box-shadow 0.3s, border-color 0.3s",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <Logo onClick={() => scrollTo("hero")}/>

          <nav className="arp-desk" style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: "4px" }}>
            <div ref={ddRef} style={{ position: "relative" }}>
              <button style={navLinkStyle("services")} onClick={() => setDdOpen((v) => !v)}
                onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                onMouseLeave={(e) => { if (activeSection !== "services") e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                {t.nav.solutions}<ChevronIcon open={ddOpen}/>
              </button>
              {activeSection === "services" && !ddOpen && <div style={{ position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)", width: "18px", height: "2px", borderRadius: "99px", background: GRAD }}/>}
              <Dropdown items={SOLUTIONS_ITEMS} sectionId="services" visible={ddOpen}/>
            </div>

            {[{ id: "how-it-works", label: t.nav.howItWorks }, { id: "contact", label: t.nav.contact }].map(({ id, label }) => (
              <div key={id} style={{ position: "relative" }}>
                <button style={navLinkStyle(id)} onClick={() => scrollTo(id)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                  onMouseLeave={(e) => { if (activeSection !== id) e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  {label}
                </button>
                {activeSection === id && <div style={{ position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)", width: "18px", height: "2px", borderRadius: "99px", background: GRAD }}/>}
              </div>
            ))}
          </nav>

          <div className="arp-desk" style={{ alignItems: "center", gap: "10px" }}>
            <ThemeToggle/>
            <LangSelector/>
            <a href="#" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "14px", color: "var(--text-secondary)", textDecoration: "none", padding: "8px 14px", borderRadius: "10px", transition: "color 0.15s,background 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; e.currentTarget.style.background = "rgba(167,139,250,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}
            >
              {t.nav.signIn}
            </a>
            <button onClick={() => scrollTo("contact")}
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "9px 20px", borderRadius: "11px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 12px rgba(167,139,250,0.28)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(167,139,250,0.38)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(167,139,250,0.28)"; }}
            >
              {t.nav.getStarted}<ArrowIcon white/>
            </button>
          </div>

          <div className="arp-mob" style={{ alignItems: "center", gap: "8px" }}>
            <ThemeToggle/>
            <LangSelector/>
            <button onClick={() => setMobileOpen((v) => !v)}
              style={{ width: "36px", height: "36px", borderRadius: "9px", background: mobileOpen ? "rgba(167,139,250,0.12)" : "var(--bg-tertiary)", border: "1px solid", borderColor: mobileOpen ? "rgba(167,139,250,0.4)" : "var(--border)", color: mobileOpen ? GREEN : "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            >
              {mobileOpen ? <CloseIcon/> : <MenuIcon/>}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: "16px 20px 24px", boxShadow: "var(--shadow-md)" }}>
            {[{ id: "services", label: t.nav.solutions }, { id: "how-it-works", label: t.nav.howItWorks }, { id: "contact", label: t.nav.contact }].map(({ id, label }) => (
              <button key={id} onClick={() => { scrollTo(id); setMobileOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 8px", borderRadius: "10px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "15px", color: "var(--text-primary)", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tertiary)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {label}
              </button>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: "12px", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button onClick={() => { scrollTo("contact"); setMobileOpen(false); }}
                style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "12px", borderRadius: "12px", cursor: "pointer" }}
              >
                {t.nav.getStarted}
              </button>
            </div>
          </div>
        )}
      </header>
      <div style={{ height: "72px" }}/>
    </>
  );
}