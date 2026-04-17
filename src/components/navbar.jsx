import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/useApp";
import { GREEN, GREEN_DARK, GRAD, ArrowIcon, gradText } from "../utils/SharedUI";

// ─── Icons ────────────────────────────────────────────────────────────────────
const ChevronIcon = ({ open }) => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
    style={{ transition: "transform 0.22s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const MenuIcon  = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>;
const CloseIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>;
const SunIcon   = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const MoonIcon  = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M17.5 12.5A7.5 7.5 0 017.5 2.5a7.5 7.5 0 100 15 7.5 7.5 0 0010-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
    <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{ width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)" }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M2 2 L13.5 2 L9.5 9.5 L2 15.5 Z" fill="currentColor" fillOpacity="0.4"/>
        <path d="M15.5 2 L22 2 L22 13.5 L11.5 9 Z" fill="currentColor" fillOpacity="0.7"/>
        <path d="M2 17.5 L10 11.5 L22 15.5 L22 22 L2 22 Z" fill="currentColor"/>
      </svg>
    </motion.div>
    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "21px", color: "var(--text-primary)", letterSpacing: "-0.04em", whiteSpace: "nowrap" }}>
      AKJ<span style={gradText}>.ai</span>
    </span>
  </Link>
);

// ─── Theme toggle ─────────────────────────────────────────────────────────────
const ThemeToggle = () => {
  const { theme, toggleTheme } = useApp();
  return (
    <motion.button onClick={toggleTheme} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
      style={{ width: "34px", height: "34px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer", transition: "color 0.2s, border-color 0.2s", flexShrink: 0 }}
      onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      {theme === "dark" ? <SunIcon/> : <MoonIcon/>}
    </motion.button>
  );
};

// ─── Language selector ────────────────────────────────────────────────────────
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
        style={{ display: "flex", alignItems: "center", gap: "5px", height: "34px", padding: "0 11px", borderRadius: "9px", background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", transition: "all 0.2s", flexShrink: 0 }}
        onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
      >
        {lang.toUpperCase()}
        <ChevronIcon open={open}/>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "4px", boxShadow: "var(--shadow-md)", zIndex: 200, minWidth: "80px" }}
          >
            {LANGS.map((l) => (
              <button key={l.code} onClick={() => { changeLang(l.code); setOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "center", padding: "8px 12px", borderRadius: "8px", background: lang === l.code ? "rgba(167,139,250,0.12)" : "transparent", color: lang === l.code ? GREEN_DARK : "var(--text-secondary)", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", transition: "background 0.15s" }}
                onMouseEnter={(e) => { if (lang !== l.code) e.currentTarget.style.background = "var(--bg-tertiary)"; }}
                onMouseLeave={(e) => { if (lang !== l.code) e.currentTarget.style.background = "transparent"; }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Solutions dropdown (desktop) ─────────────────────────────────────────────
const SolutionsDropdown = ({ items, visible, onNavigate }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)",
          background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px",
          padding: "8px", boxShadow: "var(--shadow-md)", width: "320px", zIndex: 200,
        }}
      >
        {/* caret */}
        <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "10px", height: "10px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRight: "none", borderBottom: "none" }}/>
        {items.map((item) => (
          <button key={item.label} onClick={() => onNavigate("/services")}
            style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 12px", borderRadius: "11px", background: "transparent", border: "none", width: "100%", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tertiary)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(167,139,250,0.10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>{item.label}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{item.desc}</div>
            </div>
          </button>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Active underline bar ─────────────────────────────────────────────────────
const ActiveBar = () => (
  <motion.div
    layoutId="nav-active-bar"
    style={{ position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)", width: "18px", height: "2px", borderRadius: "99px", background: GRAD }}
    transition={{ type: "spring", stiffness: 500, damping: 35 }}
  />
);

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const { t } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [ddOpen,      setDdOpen]      = useState(false);
  const [mobExpanded, setMobExpanded] = useState(null);
  const [visible,     setVisible]     = useState(true);
  const [progress,    setProgress]    = useState(0);
  const ddRef     = useRef(null);
  const lastScrollY = useRef(0);

  const pathname = location.pathname;

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Auto-hide: always visible near top, show on scroll-up, hide on scroll-down
      setVisible(y < 80 || y <= lastScrollY.current);
      lastScrollY.current = y;
      // Scroll progress 0–100
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? (y / scrollable) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const h = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 900) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setDdOpen(false); }, [pathname]);

  const isActive = (path) => pathname === path || (path !== "/" && pathname.startsWith(path));

  const navBtnStyle = (path) => ({
    fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "14px",
    color: isActive(path) ? GREEN : "var(--text-secondary)",
    background: "none", border: "none", cursor: "pointer",
    padding: "6px 10px", position: "relative",
    display: "flex", alignItems: "center", gap: "4px",
    borderRadius: "8px", transition: "color 0.15s",
  });

  const SOLUTIONS_ITEMS = [
    { label: t.services.items[0].title, desc: t.services.items[0].tag, icon: "💬" },
    { label: t.services.items[1].title, desc: t.services.items[1].tag, icon: "📞" },
    { label: t.services.items[2].title, desc: t.services.items[2].tag, icon: "⚡" },
    { label: t.services.items[3].title, desc: t.services.items[3].tag, icon: "🔗" },
    { label: t.services.moreItems[0].title, desc: t.services.moreItems[0].tag, icon: "📊" },
    { label: t.services.moreItems[1].title, desc: t.services.moreItems[1].tag, icon: "📅" },
    { label: t.services.moreItems[2].title, desc: t.services.moreItems[2].tag, icon: "🤖" },
  ];

  const DIRECT_LINKS = [
    { path: "/use-cases", label: t.nav.useCases },
    { path: "/pricing",   label: t.nav.pricing },
    { path: "/faq",       label: t.nav.faq },
    { path: "/about",     label: t.nav.about },
    { path: "/contact",   label: t.nav.contact },
  ];

  const goTo = (path) => { navigate(path); setMobileOpen(false); setMobExpanded(null); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800;9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes arp-blink  { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes arp-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes arp-fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes arp-ping   { 75%,100%{transform:scale(2);opacity:0} }
        @keyframes fpulse     { 0%,100%{opacity:1} 50%{opacity:.4} }
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

      <motion.header
        animate={{ y: visible ? 0 : "-110%" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
          transition: "background 0.3s, box-shadow 0.3s, border-color 0.3s",
        }}
      >
        {/* ── Desktop bar ── */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <Logo/>

          {/* Center nav */}
          <nav className="arp-desk" style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: "2px" }}>

            {/* Solutions dropdown */}
            <div ref={ddRef} style={{ position: "relative" }}>
              <motion.button style={navBtnStyle("/services")}
                onClick={() => setDdOpen((v) => !v)}
                whileHover={{ color: GREEN }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                onMouseLeave={(e) => { if (!isActive("/services")) e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                {t.nav.solutions}<ChevronIcon open={ddOpen}/>
              </motion.button>
              {isActive("/services") && !ddOpen && <ActiveBar/>}
              <SolutionsDropdown items={SOLUTIONS_ITEMS} visible={ddOpen} onNavigate={(p) => { navigate(p); setDdOpen(false); }}/>
            </div>

            {/* Direct links */}
            {DIRECT_LINKS.map(({ path, label }) => (
              <div key={path} style={{ position: "relative" }}>
                <motion.button style={navBtnStyle(path)}
                  onClick={() => navigate(path)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                  onMouseLeave={(e) => { if (!isActive(path)) e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  {label}
                </motion.button>
                {isActive(path) && <ActiveBar/>}
              </div>
            ))}
          </nav>

          {/* Right controls */}
          <div className="arp-desk" style={{ alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <ThemeToggle/>
            <LangSelector/>
            <div style={{ width: "1px", height: "20px", background: "var(--border)", margin: "0 2px" }}/>
            <motion.button onClick={() => navigate("/contact")}
              whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(167,139,250,0.38)" }}
              whileTap={{ scale: 0.97 }}
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "8px 18px", borderRadius: "10px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 12px rgba(167,139,250,0.28)", transition: "box-shadow 0.2s" }}
            >
              {t.nav.getStarted}<ArrowIcon white/>
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <div className="arp-mob" style={{ alignItems: "center", gap: "8px" }}>
            <ThemeToggle/>
            <LangSelector/>
            <motion.button onClick={() => { setMobileOpen((v) => !v); setMobExpanded(null); }}
              whileTap={{ scale: 0.93 }}
              className="mobile-menu-btn"
              style={{ width: "44px", height: "44px", borderRadius: "10px", background: mobileOpen ? "rgba(167,139,250,0.12)" : "var(--bg-tertiary)", border: "1px solid", borderColor: mobileOpen ? "rgba(167,139,250,0.4)" : "var(--border)", color: mobileOpen ? GREEN : "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            >
              {mobileOpen ? <CloseIcon/> : <MenuIcon/>}
            </motion.button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden", background: "var(--bg-card)", borderTop: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
            >
              <div style={{ padding: "8px 12px 20px" }}>

                {/* Solutions accordion */}
                <div>
                  <button
                    onClick={() => setMobExpanded(mobExpanded === "solutions" ? null : "solutions")}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "12px 10px", borderRadius: "10px", background: mobExpanded === "solutions" ? "rgba(167,139,250,0.08)" : "transparent", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px", color: isActive("/services") ? GREEN : "var(--text-primary)", transition: "background 0.15s" }}
                  >
                    {t.nav.solutions}
                    <ChevronIcon open={mobExpanded === "solutions"}/>
                  </button>
                  <AnimatePresence>
                    {mobExpanded === "solutions" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: "hidden", padding: "4px 0 4px 12px", display: "flex", flexDirection: "column", gap: "2px" }}
                      >
                        {SOLUTIONS_ITEMS.map((item) => (
                          <button key={item.label}
                            onClick={() => goTo("/services")}
                            style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 12px", borderRadius: "9px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tertiary)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "rgba(167,139,250,0.10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>
                              {item.icon}
                            </div>
                            <div>
                              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>{item.label}</div>
                              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)" }}>{item.desc}</div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct links */}
                {DIRECT_LINKS.map(({ path, label }) => (
                  <button key={path}
                    onClick={() => goTo(path)}
                    style={{ display: "flex", alignItems: "center", width: "100%", padding: "12px 10px", borderRadius: "10px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: isActive(path) ? 600 : 500, fontSize: "15px", color: isActive(path) ? GREEN : "var(--text-primary)", transition: "background 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tertiary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {label}
                    {isActive(path) && (
                      <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: GREEN }}/>
                    )}
                  </button>
                ))}

                {/* CTA */}
                <div style={{ borderTop: "1px solid var(--border)", marginTop: "12px", paddingTop: "14px" }}>
                  <motion.button onClick={() => goTo("/contact")}
                    whileTap={{ scale: 0.97 }}
                    style={{ width: "100%", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "13px", borderRadius: "12px", cursor: "pointer", boxShadow: "0 4px 16px rgba(167,139,250,0.28)" }}
                  >
                    {t.nav.getStarted}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scroll progress bar ── */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", overflow: "hidden", opacity: scrolled ? 1 : 0, transition: "opacity 0.4s", pointerEvents: "none" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, #a78bfa, #7c3aed)", transform: `scaleX(${progress / 100})`, transformOrigin: "left", transition: "transform 0.1s linear" }}/>
        </div>
      </motion.header>

      <div style={{ height: "68px" }}/>
    </>
  );
}
