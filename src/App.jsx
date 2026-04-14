import { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Services from "./components/services";
import HowItWorks from "./components/HowItWorks";
import Contact from "./components/contact";

const SECTION_IDS = ["hero", "services", "how-it-works", "contact"];

// Botón de Asistente Flotante
const FloatingAssistant = () => {
  return (
    <button 
      style={{
        position: "fixed", bottom: "30px", right: "30px", zIndex: 999,
        width: "56px", height: "56px", borderRadius: "28px",
        background: "linear-gradient(135deg, #3ecf8e, #1ea87a)",
        border: "none", cursor: "pointer",
        boxShadow: "0 8px 32px rgba(62,207,142,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 0.2s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      onClick={() => alert("Simulación: Abriendo chat con IA de ADRIMALU...")}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      {/* Puntito verde de estado */}
      <span style={{ position: "absolute", top: "4px", right: "4px", width: "12px", height: "12px", background: "#fff", border: "2px solid #1ea87a", borderRadius: "50%" }}></span>
    </button>
  );
};

// Lógica de navegación y ensamblaje de la página
function AppInner() {
  const [activeSection, setActiveSection] = useState("hero");

  // Observer para actualizar el enlace activo en el Navbar al hacer scroll
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
      <div id="hero" style={{ scrollMarginTop: "72px" }}><Hero /></div>
      <div id="services" style={{ scrollMarginTop: "72px" }}><Services /></div>
      <div id="how-it-works" style={{ scrollMarginTop: "72px" }}><HowItWorks /></div>
      <div id="contact" style={{ scrollMarginTop: "72px" }}><Contact /></div>
      <Footer />
      
      <FloatingAssistant />
    </>
  );
}

// Componente Raíz
export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}