import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./i18n";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ── Theme ────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("arp-theme") || "light"; } catch { return "light"; }
  });

  const toggleTheme = () => setTheme((t) => {
    const next = t === "light" ? "dark" : "light";
    try { localStorage.setItem("arp-theme", next); } catch {}
    return next;
  });

  // ── Language ─────────────────────────────────────────────────────────────
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("arp-lang") || "en"; } catch { return "en"; }
  });

  const changeLang = (l) => {
    setLang(l);
    try { localStorage.setItem("arp-lang", l); } catch {}
  };

  const t = translations[lang] || translations.en;

  // ── CSS variables injected on <html> ─────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty("--bg-primary",    "#0f0e0d");
      root.style.setProperty("--bg-secondary",  "#1a1917");
      root.style.setProperty("--bg-tertiary",   "#232220");
      root.style.setProperty("--bg-card",       "#1e1d1b");
      root.style.setProperty("--bg-input",      "#242220");
      root.style.setProperty("--text-primary",  "#f5f0eb");
      root.style.setProperty("--text-secondary","#a8a29e");
      root.style.setProperty("--text-muted",    "#6b6560");
      root.style.setProperty("--border",        "rgba(255,255,255,0.08)");
      root.style.setProperty("--border-hover",  "rgba(255,255,255,0.15)");
      root.style.setProperty("--shadow-sm",     "0 2px 12px rgba(0,0,0,0.4)");
      root.style.setProperty("--shadow-md",     "0 8px 32px rgba(0,0,0,0.5)");
      root.style.setProperty("--shadow-lg",     "0 20px 60px rgba(0,0,0,0.6)");
      root.style.setProperty("--nav-bg",        "rgba(15,14,13,0.92)");
      root.style.setProperty("--hero-bg",       "#0f0e0d");
      root.style.setProperty("--section-alt",   "#141312");
      root.setAttribute("data-theme", "dark");
    } else {
      root.style.setProperty("--bg-primary",    "#ffffff");
      root.style.setProperty("--bg-secondary",  "#fafafa");
      root.style.setProperty("--bg-tertiary",   "#f5f3f0");
      root.style.setProperty("--bg-card",       "#ffffff");
      root.style.setProperty("--bg-input",      "#ffffff");
      root.style.setProperty("--text-primary",  "#1c1917");
      root.style.setProperty("--text-secondary","#57534e");
      root.style.setProperty("--text-muted",    "#a8a29e");
      root.style.setProperty("--border",        "#e7e5e4");
      root.style.setProperty("--border-hover",  "#d4d0cc");
      root.style.setProperty("--shadow-sm",     "0 2px 12px rgba(0,0,0,0.06)");
      root.style.setProperty("--shadow-md",     "0 8px 32px rgba(0,0,0,0.08)");
      root.style.setProperty("--shadow-lg",     "0 20px 60px rgba(0,0,0,0.10)");
      root.style.setProperty("--nav-bg",        "rgba(250,250,250,0.92)");
      root.style.setProperty("--hero-bg",       "#fafafa");
      root.style.setProperty("--section-alt",   "#f5f3f0");
      root.setAttribute("data-theme", "light");
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, changeLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);