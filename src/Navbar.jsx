import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  {
    label: "Solutions",
    dropdown: [
      { label: "AI Workflow Automation", desc: "End-to-end process automation", icon: "⚡" },
      { label: "Predictive Analytics", desc: "Data-driven decision systems", icon: "📊" },
      { label: "Conversational AI", desc: "Chatbots & AI voice agents", icon: "💬" },
      { label: "API Integrations", desc: "Connect your enterprise stack", icon: "🔗" },
    ],
  },
  { label: "Use Cases", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
];

const ChevronIcon = ({ open }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    style={{
      transition: "transform 0.25s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <path
      d="M3 5l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const Logo = () => (
  <a href="#" className="flex items-center gap-2.5 group" style={{ textDecoration: "none" }}>
    <div
      className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #45c789, #1aa685)" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 3L15 9L9 15L3 9L9 3Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="2.5" fill="white" />
      </svg>
    </div>
    <span
      style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontWeight: 800,
        fontSize: "20px",
        color: "#292524",
        letterSpacing: "-0.02em",
      }}
    >
      ARP<span style={{ background: "linear-gradient(135deg, #45c789, #1aa685)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}> Solutions</span>
    </span>
  </a>
);

const DropdownMenu = ({ items, visible }) => (
  <div
    style={{
      position: "absolute",
      top: "calc(100% + 12px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#ffffff",
      border: "1px solid #e7e5e4",
      borderRadius: "16px",
      padding: "8px",
      boxShadow: "0 16px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)",
      width: "280px",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "all" : "none",
      transform: visible
        ? "translateX(-50%) translateY(0)"
        : "translateX(-50%) translateY(-8px)",
      transition: "opacity 0.2s ease, transform 0.2s ease",
      zIndex: 100,
    }}
  >
    {/* Arrow */}
    <div
      style={{
        position: "absolute",
        top: "-5px",
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: "10px",
        height: "10px",
        background: "#ffffff",
        border: "1px solid #e7e5e4",
        borderRight: "none",
        borderBottom: "none",
      }}
    />
    {items.map((item) => (
      <a
        key={item.label}
        href="#"
        className="flex items-start gap-3 px-3 py-2.5 rounded-xl group"
        style={{
          textDecoration: "none",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f4")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base"
          style={{ background: "rgba(69,199,137,0.1)" }}
        >
          {item.icon}
        </div>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#292524" }}>
            {item.label}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#78716c", marginTop: "1px" }}>
            {item.desc}
          </div>
        </div>
      </a>
    ))}
  </div>
);

const NavLink = ({ link }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (link.dropdown) {
    return (
      <div ref={ref} style={{ position: "relative" }}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            color: open ? "#1aa685" : "#57534e",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px 4px",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1aa685")}
          onMouseLeave={(e) => !open && (e.currentTarget.style.color = "#57534e")}
        >
          {link.label}
          <ChevronIcon open={open} />
        </button>
        <DropdownMenu items={link.dropdown} visible={open} />
      </div>
    );
  }

  return (
    <a
      href={link.href}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: "14px",
        color: "#57534e",
        textDecoration: "none",
        padding: "6px 4px",
        transition: "color 0.15s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#1aa685")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#57534e")}
    >
      {link.label}
    </a>
  );
};

const MobileMenu = ({ open }) => (
  <div
    style={{
      position: "fixed",
      top: "64px",
      left: 0,
      right: 0,
      background: "#ffffff",
      borderBottom: "1px solid #e7e5e4",
      padding: "16px 20px 24px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
      opacity: open ? 1 : 0,
      transform: open ? "translateY(0)" : "translateY(-12px)",
      pointerEvents: open ? "all" : "none",
      transition: "opacity 0.25s ease, transform 0.25s ease",
      zIndex: 90,
    }}
  >
    <nav className="flex flex-col gap-1">
      {NAV_LINKS.map((link) => (
        <div key={link.label}>
          <a
            href={link.href || "#"}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              color: "#292524",
              textDecoration: "none",
              display: "block",
              padding: "10px 8px",
              borderRadius: "8px",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {link.label}
          </a>
          {link.dropdown && (
            <div className="pl-4 flex flex-col gap-0.5 mt-1 mb-2">
              {link.dropdown.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#78716c",
                    textDecoration: "none",
                    padding: "7px 8px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f4")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
    <div
      style={{ borderTop: "1px solid #e7e5e4", marginTop: "12px", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <a
        href="#"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: "14px",
          color: "#57534e",
          textDecoration: "none",
          textAlign: "center",
          padding: "11px",
          borderRadius: "12px",
          border: "1.5px solid #e7e5e4",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1aa685"; e.currentTarget.style.color = "#1aa685"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e7e5e4"; e.currentTarget.style.color = "#57534e"; }}
      >
        Sign In
      </a>
      <a
        href="#"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          color: "#fff",
          textDecoration: "none",
          textAlign: "center",
          padding: "11px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #45c789, #1aa685)",
        }}
      >
        Get Started
      </a>
    </div>
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=DM+Sans:wght@400;500;600&display=swap');
        .navbar-fade-in { animation: navFadeIn 0.5s ease forwards; }
        @keyframes navFadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <header
        className="navbar-fade-in"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          background: scrolled ? "rgba(250,250,250,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
          borderBottom: scrolled ? "1px solid rgba(231,229,228,0.8)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            style={{ flex: 1, justifyContent: "center" }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#57534e",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "10px",
                transition: "color 0.15s ease, background 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#1aa685"; e.currentTarget.style.background = "rgba(69,199,137,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#57534e"; e.currentTarget.style.background = "transparent"; }}
            >
              Sign In
            </a>
            <a
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#fff",
                textDecoration: "none",
                padding: "9px 20px",
                borderRadius: "11px",
                background: "linear-gradient(135deg, #45c789, #1aa685)",
                boxShadow: "0 2px 12px rgba(26,166,133,0.25)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(26,166,133,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(26,166,133,0.25)"; }}
            >
              Get Started
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              background: mobileOpen ? "#f0faf5" : "transparent",
              border: "1.5px solid",
              borderColor: mobileOpen ? "#45c789" : "#e7e5e4",
              color: mobileOpen ? "#1aa685" : "#292524",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu */}
        <MobileMenu open={mobileOpen} />
      </header>

      {/* Spacer */}
      <div style={{ height: "64px" }} />
    </>
  );
}