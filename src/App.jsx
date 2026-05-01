import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GRAD, gradText } from "./utils/SharedUI";

import { AppProvider } from "./context/AppContext";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";

import HomePage    from "./pages/HomePage";
import ServicesPage  from "./pages/ServicesPage";
import PricingPage   from "./pages/PricingPage";
import UseCasesPage  from "./pages/UseCasesPage";
import FAQPage       from "./pages/FAQPage";
import AboutPage     from "./pages/AboutPage";
import ContactPage   from "./pages/ContactPage";

// 404 page
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "80vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "40px 24px", background: "var(--bg-primary)",
    }}>
      <p style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "clamp(64px,10vw,120px)", ...gradText, lineHeight: 1, marginBottom: "8px" }}>404</p>
      <h1 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "clamp(22px,3vw,32px)", color: "var(--text-primary)", marginBottom: "14px", letterSpacing: "-0.02em" }}>Page not found</h1>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "360px", lineHeight: 1.6 }}>The page you're looking for doesn't exist. Let's get you back on track.</p>
      <button onClick={() => navigate("/")} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "12px 28px", borderRadius: "12px", cursor: "pointer", boxShadow: "0 4px 20px rgba(167,139,250,0.30)" }}>Go to homepage</button>
    </div>
  );
};

// Floating chat/booking button — always visible
const FloatingCTA = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/contact")}
      title="Book a call"
      style={{
        position: "fixed", bottom: "28px", right: "28px", zIndex: 999,
        width: "52px", height: "52px", borderRadius: "26px",
        background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
        border: "none", cursor: "pointer",
        boxShadow: "0 8px 32px rgba(124,58,237,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(124,58,237,0.60)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.45)"; }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      {/* Online dot */}
      <span style={{
        position: "absolute", top: "3px", right: "3px",
        width: "11px", height: "11px",
        background: "#22c55e", border: "2px solid #7c3aed", borderRadius: "50%",
      }}/>
    </button>
  );
};

// Routes live inside the BrowserRouter so they can use useLocation
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<HomePage />} />
        <Route path="/services"   element={<ServicesPage />} />
        <Route path="/pricing"    element={<PricingPage />} />
        <Route path="/use-cases"  element={<UseCasesPage />} />
        <Route path="/faq"        element={<FAQPage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/contact"    element={<ContactPage />} />
        <Route path="*"           element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppInner() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <AnimatedRoutes />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </AppProvider>
  );
}
