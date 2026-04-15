import { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Services from "./components/services";
import HowItWorks from "./components/HowItWorks";
import SocialProof from "./components/SocialProof";
import UseCases from "./components/UseCases";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import About from "./components/About";
import Contact from "./components/contact";

const SECTION_IDS = [
  "hero",
  "services",
  "how-it-works",
  "social-proof",
  "use-cases",
  "pricing",
  "faq",
  "about",
  "contact",
];

// Floating chat button
const FloatingAssistant = () => (
  <button
    style={{
      position: "fixed", bottom: "30px", right: "30px", zIndex: 999,
      width: "56px", height: "56px", borderRadius: "28px",
      background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
      border: "none", cursor: "pointer",
      boxShadow: "0 8px 32px rgba(167,139,250,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "transform 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    onClick={() => {
      const el = document.getElementById("contact");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
    }}
    title="Book a call"
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
    <span style={{
      position: "absolute", top: "4px", right: "4px",
      width: "12px", height: "12px",
      background: "#22c55e", border: "2px solid #7c3aed", borderRadius: "50%",
    }}/>
  </button>
);

function AppInner() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <div id="hero"        style={{ scrollMarginTop: "72px" }}><Hero /></div>
      <div id="services"    style={{ scrollMarginTop: "72px" }}><Services /></div>
      <div id="how-it-works" style={{ scrollMarginTop: "72px" }}><HowItWorks /></div>
      <div id="social-proof" style={{ scrollMarginTop: "72px" }}><SocialProof /></div>
      <div id="use-cases"   style={{ scrollMarginTop: "72px" }}><UseCases /></div>
      <div id="pricing"     style={{ scrollMarginTop: "72px" }}><Pricing /></div>
      <div id="faq"         style={{ scrollMarginTop: "72px" }}><FAQ /></div>
      <div id="about"       style={{ scrollMarginTop: "72px" }}><About /></div>
      <div id="contact"     style={{ scrollMarginTop: "72px" }}><Contact /></div>
      <Footer />
      <FloatingAssistant />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
