import { useState, useEffect, useRef, createContext, useContext } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// TRANSLATIONS (inline — no external imports needed)
// ═══════════════════════════════════════════════════════════════════════════
const translations = {
  en: {
    nav: { solutions: "Solutions", howItWorks: "How It Works", contact: "Contact", signIn: "Sign In", getStarted: "Get Started" },
    hero: {
      badge: "Enterprise AI Automation",
      line1: "Your AI partner", line2: "for the next", line2accent: "decade",
      description: "ARP Solutions helps enterprises eliminate operational complexity through AI-powered automation ecosystems — so your team focuses on what drives growth.",
      cta1: "Get Started", cta2: "Watch Demo",
      stat1val: "Proven ROI", stat1lbl: "Across every engagement",
      stat2val: "Massive",   stat2lbl: "Hours saved per month",
      dashTitle: "AI Engine Active", dashLive: "Live", dashChart: "Weekly performance",
      dashSaved: "Time Saved", dashAcc: "Accuracy", dashUp: "Uptime",
      notifTitle: "New qualified lead captured", notifSub: "2 minutes ago · Automated",
    },
    services: {
      badge: "What we do",
      title: "Everything your enterprise needs", titleAccent: "to scale with AI",
      subtitle: "From your first automation to a fully integrated AI ecosystem — built for enterprises that refuse to stand still.",
      learnMore: "Learn more",
      items: [
        { tag: "Process Automation",  title: "AI Workflow Automation", desc: "Eliminate manual bottlenecks with end-to-end business process automation. ARP Solutions designs intelligent AI agents that learn your workflows and scale alongside your operations.", feats: ["Autonomous AI agents, 24/7", "End-to-end process coverage", "Zero disruption to existing ops"], metric: { val: "Massive", lbl: "reduction in manual workload" } },
        { tag: "Data Intelligence",   title: "Predictive Analytics",   desc: "Transform raw enterprise data into strategic advantage. Our models surface patterns, forecast outcomes, and raise proactive alerts before problems emerge.", feats: ["Real-time data dashboards", "Proactive anomaly alerts", "Custom forecasting models"], metric: { val: "[X]×", lbl: "improvement in forecast accuracy" } },
        { tag: "Customer Experience", title: "Conversational AI",      desc: "Deploy chatbots and AI Voice Agents that handle inbound calls, qualify leads, and resolve support tickets without human intervention.", feats: ["AI voice agents for phone calls", "Intelligent human escalation", "Omnichannel deployment"], metric: { val: "[X]%", lbl: "of inquiries resolved autonomously" } },
        { tag: "Infrastructure",      title: "API Integrations",        desc: "Connect AI capabilities with your existing enterprise tech stack — CRM, ERP, HRIS, and proprietary databases. Secure, enterprise-grade architecture.", feats: ["REST & GraphQL API support", "SSO & RBAC security", "99.9% uptime SLA"], metric: { val: "Rapid", lbl: "time-to-integration" } },
      ],
      ctaEyebrow: "Ready to transform your operations?", ctaTitle: "Start automating.", ctaAccent: "Scale without limits.", ctaBtn1: "Talk to our team", ctaBtn2: "Watch a live demo",
    },
    hiw: {
      badge: "Our process", title: "From first meeting to", titleAccent: "live AI systems",
      subtitle: "A proven four-phase methodology — from operational audit to a fully deployed, continuously improving AI ecosystem with zero disruption.",
      steps: [
        { phase: "Discovery",    title: "We audit your operations",    desc: "Our team audits your workflows, tech stack, and pain points — mapping every manual process and quantifying where time and revenue are being lost.", bullets: ["Current-state workflow mapping", "Tech stack & integration assessment", "Automation opportunity scoring"] },
        { phase: "Architecture", title: "We design your AI ecosystem", desc: "We architect a custom AI ecosystem — selecting the right models, designing agent logic, and planning every integration. No off-the-shelf templates.", bullets: ["Custom AI agent architecture", "End-to-end integration blueprint", "Phased rollout roadmap"] },
        { phase: "Deployment",   title: "We build and integrate",      desc: "Our engineers deploy your AI workflows, connect them via secure API integrations, and run rigorous testing before anything goes live.", bullets: ["Secure API & system integration", "Parallel testing environment", "Zero-downtime deployment"] },
        { phase: "Optimization", title: "We monitor and improve",      desc: "Post-launch, systems continuously monitor performance, flag anomalies, and self-optimize. You get a dashboard, reports, and direct access to our team.", bullets: ["Real-time performance monitoring", "Continuous model retraining", "Dedicated success partnership"] },
      ],
      trust: [
        { val: "Weeks, not months", lbl: "Average time to first deployment" },
        { val: "Zero downtime",     lbl: "Guaranteed deployment approach" },
        { val: "Continuous ROI",    lbl: "Post-launch optimization included" },
      ],
    },
    contact: {
      badge: "Contact us", title: "Let's build your", titleAccent: "AI ecosystem",
      subtitle: "Reach out directly to one of our founders, or fill out the form and we'll get back to you within one business day.",
      founders: "Reach a founder directly",
      formTitle: "Send us a message", formDesc: "Tell us about your project and we'll put together a tailored proposal within 24 hours.",
      name: "Full name", email: "Work email", company: "Company", service: "Service of interest", message: "Message",
      namePh: "Jane Smith", emailPh: "jane@company.com", companyPh: "Acme Corp", servicePh: "Select a service…", messagePh: "Tell us about your project and current challenges…",
      submit: "Send message", sending: "Sending…",
      privacy: "We typically respond within 1 business day. Your information is never shared.",
      successTitle: "Message sent!", successDesc: "Thanks for reaching out. One of the ARP Solutions founders will reply within one business day.", successBtn: "Send another message",
      errorMsg: "Something went wrong. Please try again or email us directly.",
      emails: [{ lbl: "General Inquiries", val: "hello@arpsolutions.ai" }, { lbl: "Enterprise Sales", val: "sales@arpsolutions.ai" }, { lbl: "Careers", val: "careers@arpsolutions.ai" }],
      services: ["AI Workflow Automation", "Predictive Analytics", "Conversational AI", "API Integrations", "General Inquiry"],
      founderPhone: "Phone",
    },
    footer: {
      ctaEyebrow: "Let's build together", ctaTitle: "Ready to deploy your", ctaAccent: "AI ecosystem?",
      ctaDesc: "Book a free discovery call with Justin, Alexander, or Adrian — and walk away with a clear AI roadmap for your enterprise.",
      ctaBtn1: "Book a discovery call", ctaBtn2: "Explore our services →",
      brandDesc: "Enterprise AI Automation Ecosystems. Founded by Justin Kuijper, Alexander Janssen, and Adrian Alvarez.",
      newsletter: "Stay in the loop", nlPh: "your@company.com", nlBtn: "Subscribe", nlSuccess: "You're subscribed. Welcome aboard.",
      colSolutions: "Solutions", colNavigate: "Navigate", colLegal: "Legal",
      navLinks: ["Home", "Solutions", "How It Works", "Contact"],
      legalLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
      rights: "All rights reserved.", status: "All systems operational",
    },
  },

  es: {
    nav: { solutions: "Soluciones", howItWorks: "Cómo funciona", contact: "Contacto", signIn: "Iniciar sesión", getStarted: "Empezar" },
    hero: {
      badge: "Automatización IA Empresarial",
      line1: "Tu aliado de IA", line2: "para la próxima", line2accent: "década",
      description: "ARP Solutions ayuda a empresas a eliminar la complejidad operativa con ecosistemas de automatización IA — para que tu equipo se enfoque en lo que impulsa el crecimiento.",
      cta1: "Empezar", cta2: "Ver demo",
      stat1val: "ROI Probado", stat1lbl: "En cada proyecto",
      stat2val: "Masivo", stat2lbl: "Horas ahorradas por mes",
      dashTitle: "Motor IA Activo", dashLive: "En vivo", dashChart: "Rendimiento semanal",
      dashSaved: "Ahorro", dashAcc: "Precisión", dashUp: "Uptime",
      notifTitle: "Nuevo lead cualificado capturado", notifSub: "Hace 2 minutos · Automatizado",
    },
    services: {
      badge: "Lo que hacemos",
      title: "Todo lo que necesita tu empresa", titleAccent: "para crecer con IA",
      subtitle: "Desde tu primera automatización hasta un ecosistema de IA completo — para empresas que no se detienen.",
      learnMore: "Saber más",
      items: [
        { tag: "Automatización", title: "Automatización de Flujos IA", desc: "Elimina los cuellos de botella manuales con automatización de procesos de extremo a extremo mediante agentes IA inteligentes.", feats: ["Agentes IA autónomos 24/7", "Cobertura completa del proceso", "Sin interrupción operativa"], metric: { val: "Masivo", lbl: "reducción de carga manual" } },
        { tag: "Inteligencia de Datos", title: "Analítica Predictiva", desc: "Transforma datos empresariales en ventaja competitiva. Nuestros modelos detectan patrones y emiten alertas proactivas.", feats: ["Dashboards en tiempo real", "Alertas de anomalías", "Modelos personalizados"], metric: { val: "[X]×", lbl: "mejora en precisión de pronóstico" } },
        { tag: "Experiencia Cliente", title: "IA Conversacional", desc: "Despliega chatbots y agentes de voz IA para gestionar llamadas, calificar leads y resolver tickets sin intervención humana.", feats: ["Agentes de voz para llamadas", "Escalado inteligente", "Despliegue omnicanal"], metric: { val: "[X]%", lbl: "consultas resueltas automáticamente" } },
        { tag: "Infraestructura", title: "Integraciones API", desc: "Conecta capacidades IA con tu stack tecnológico — CRM, ERP, HRIS y bases de datos propias con arquitectura segura.", feats: ["Soporte REST & GraphQL", "Seguridad SSO & RBAC", "SLA 99,9% uptime"], metric: { val: "Rápido", lbl: "tiempo hasta integración" } },
      ],
      ctaEyebrow: "¿Listo para transformar tus operaciones?", ctaTitle: "Empieza a automatizar.", ctaAccent: "Escala sin límites.", ctaBtn1: "Habla con nuestro equipo", ctaBtn2: "Ver demo en vivo",
    },
    hiw: {
      badge: "Nuestro proceso", title: "Del primer encuentro a", titleAccent: "sistemas IA en producción",
      subtitle: "Una metodología de cuatro fases — desde auditoría operativa hasta ecosistema IA desplegado, sin interrupciones.",
      steps: [
        { phase: "Descubrimiento", title: "Auditamos tus operaciones", desc: "Análisis profundo de tus flujos, stack tecnológico y puntos de dolor para cuantificar el tiempo y los ingresos perdidos.", bullets: ["Mapeo del estado actual", "Evaluación del stack tecnológico", "Puntuación de oportunidades"] },
        { phase: "Arquitectura", title: "Diseñamos tu ecosistema IA", desc: "Arquitecturamos un ecosistema IA totalmente personalizado, sin plantillas genéricas.", bullets: ["Arquitectura de agentes IA", "Blueprint de integración completo", "Hoja de ruta por fases"] },
        { phase: "Despliegue", title: "Construimos e integramos", desc: "Desplegamos los flujos IA con ciclos de prueba rigurosos antes de salir a producción.", bullets: ["Integración API segura", "Entorno de pruebas paralelo", "Despliegue sin inactividad"] },
        { phase: "Optimización", title: "Monitorizamos y mejoramos", desc: "Monitorizamos el rendimiento continuamente y auto-optimizamos, con dashboard dedicado y acceso directo al equipo.", bullets: ["Monitorización en tiempo real", "Reentrenamiento continuo", "Partnership de éxito dedicado"] },
      ],
      trust: [
        { val: "Semanas, no meses", lbl: "Tiempo hasta primer despliegue" },
        { val: "Cero inactividad", lbl: "Enfoque de despliegue garantizado" },
        { val: "ROI continuo", lbl: "Optimización post-lanzamiento incluida" },
      ],
    },
    contact: {
      badge: "Contáctanos", title: "Construyamos tu", titleAccent: "ecosistema IA",
      subtitle: "Contacta directamente con uno de nuestros fundadores, o rellena el formulario y te responderemos en un día laboral.",
      founders: "Contacta directamente con un fundador",
      formTitle: "Envíanos un mensaje", formDesc: "Cuéntanos tu proyecto y elaboraremos una propuesta personalizada en 24 horas.",
      name: "Nombre completo", email: "Email corporativo", company: "Empresa", service: "Servicio de interés", message: "Mensaje",
      namePh: "Ana García", emailPh: "ana@empresa.com", companyPh: "Mi Empresa", servicePh: "Selecciona un servicio…", messagePh: "Cuéntanos sobre tu proyecto y retos actuales…",
      submit: "Enviar mensaje", sending: "Enviando…",
      privacy: "Respondemos en menos de 1 día laboral. Tu información nunca se comparte.",
      successTitle: "¡Mensaje enviado!", successDesc: "Gracias por contactarnos. Uno de los fundadores de ARP Solutions te responderá en un día laboral.", successBtn: "Enviar otro mensaje",
      errorMsg: "Algo salió mal. Por favor inténtalo de nuevo o escríbenos directamente.",
      emails: [{ lbl: "Consultas generales", val: "hello@arpsolutions.ai" }, { lbl: "Ventas empresariales", val: "sales@arpsolutions.ai" }, { lbl: "Empleo", val: "careers@arpsolutions.ai" }],
      services: ["Automatización de Flujos IA", "Analítica Predictiva", "IA Conversacional", "Integraciones API", "Consulta general"],
      founderPhone: "Teléfono",
    },
    footer: {
      ctaEyebrow: "Construyamos juntos", ctaTitle: "¿Listo para desplegar tu", ctaAccent: "ecosistema IA?",
      ctaDesc: "Reserva una llamada gratuita con Justin, Alexander o Adrian — y obtén una hoja de ruta de IA clara para tu empresa.",
      ctaBtn1: "Reservar una llamada", ctaBtn2: "Explorar nuestros servicios →",
      brandDesc: "Ecosistemas de Automatización IA Empresarial. Fundado por Justin Kuijper, Alexander Janssen y Adrian Alvarez.",
      newsletter: "Mantente informado", nlPh: "tu@empresa.com", nlBtn: "Suscribirse", nlSuccess: "Suscrito. ¡Bienvenido!",
      colSolutions: "Soluciones", colNavigate: "Navegar", colLegal: "Legal",
      navLinks: ["Inicio", "Soluciones", "Cómo funciona", "Contacto"],
      legalLinks: ["Política de privacidad", "Términos de servicio", "Política de cookies", "Seguridad"],
      rights: "Todos los derechos reservados.", status: "Todos los sistemas operativos",
    },
  },

  nl: {
    nav: { solutions: "Oplossingen", howItWorks: "Hoe het werkt", contact: "Contact", signIn: "Inloggen", getStarted: "Aan de slag" },
    hero: {
      badge: "Enterprise AI-Automatisering",
      line1: "Uw AI-partner", line2: "voor het volgende", line2accent: "decennium",
      description: "ARP Solutions helpt ondernemingen operationele complexiteit te elimineren via AI-gestuurde automatiseringsecosystemen — zodat uw team zich op groei kan focussen.",
      cta1: "Aan de slag", cta2: "Bekijk demo",
      stat1val: "Bewezen ROI", stat1lbl: "Bij elk project",
      stat2val: "Enorm", stat2lbl: "Uren bespaard per maand",
      dashTitle: "AI-motor actief", dashLive: "Live", dashChart: "Wekelijkse prestaties",
      dashSaved: "Bespaard", dashAcc: "Nauwkeurigheid", dashUp: "Uptime",
      notifTitle: "Nieuwe gekwalificeerde lead", notifSub: "2 minuten geleden · Geautomatiseerd",
    },
    services: {
      badge: "Wat we doen",
      title: "Alles wat uw onderneming nodig heeft", titleAccent: "om te schalen met AI",
      subtitle: "Van uw eerste automatisering tot een volledig geïntegreerd AI-ecosysteem — gebouwd voor ondernemingen die niet stilstaan.",
      learnMore: "Meer weten",
      items: [
        { tag: "Procesautomatisering", title: "AI-werkstroomautomatisering", desc: "Elimineer handmatige knelpunten met end-to-end procesautomatisering via intelligente AI-agenten.", feats: ["Autonome AI-agenten 24/7", "Volledige procesdekking", "Geen verstoring van bestaande operaties"], metric: { val: "Enorm", lbl: "vermindering handmatige werklast" } },
        { tag: "Data-intelligentie", title: "Voorspellende analyse", desc: "Transformeer bedrijfsdata in strategisch concurrentievoordeel met voorspellende modellen die patronen blootleggen.", feats: ["Realtime dashboards", "Proactieve anomaliewaarschuwingen", "Aangepaste prognosemodellen"], metric: { val: "[X]×", lbl: "verbetering prognoseresultaten" } },
        { tag: "Klantervaring", title: "Conversationele AI", desc: "Implementeer chatbots en AI-spraakagenten voor inkomende gesprekken, leadkwalificatie en ticketoplossing.", feats: ["AI-spraakagenten voor telefoongesprekken", "Intelligente escalatie", "Omnichannel-inzet"], metric: { val: "[X]%", lbl: "vragen autonoom afgehandeld" } },
        { tag: "Infrastructuur", title: "API-integraties", desc: "Verbind AI naadloos met uw bestaande technologiestapel — CRM, ERP, HRIS en eigen databases met enterprise-beveiliging.", feats: ["REST & GraphQL API-ondersteuning", "SSO & RBAC-beveiliging", "99,9% uptime SLA"], metric: { val: "Snel", lbl: "tijd tot integratie" } },
      ],
      ctaEyebrow: "Klaar om uw operaties te transformeren?", ctaTitle: "Begin met automatiseren.", ctaAccent: "Schaal zonder grenzen.", ctaBtn1: "Praat met ons team", ctaBtn2: "Bekijk een live demo",
    },
    hiw: {
      badge: "Ons proces", title: "Van eerste kennismaking tot", titleAccent: "live AI-systemen",
      subtitle: "Een bewezen vierfasenmethodologie — van operationele audit tot volledig geïmplementeerd AI-ecosysteem zonder verstoring.",
      steps: [
        { phase: "Ontdekking",    title: "We auditeren uw operaties",      desc: "Ons team voert een grondige audit uit van uw werkstromen, technologiestapel en pijnpunten.", bullets: ["Huidige situatie in kaart brengen", "Beoordeling technologiestapel", "Automatiseringskansen scoren"] },
        { phase: "Architectuur", title: "We ontwerpen uw AI-ecosysteem",   desc: "We bouwen een op maat gemaakt AI-ecosysteem — geen kant-en-klare sjablonen.", bullets: ["Aangepaste AI-agentarchitectuur", "End-to-end integratieblauwdruk", "Gefaseerde uitrolroadmap"] },
        { phase: "Implementatie", title: "We bouwen en integreren",         desc: "Onze engineers implementeren uw AI-werkstromen met grondige testcycli voordat alles live gaat.", bullets: ["Veilige API-integratie", "Parallelle testomgeving", "Implementatie zonder downtime"] },
        { phase: "Optimalisatie", title: "We monitoren en verbeteren",      desc: "Na de lancering bewaken systemen continu de prestaties, markeren anomalieën en optimaliseren automatisch.", bullets: ["Realtime prestatiebewaking", "Continue modelhertraining", "Toegewijd succesbegeleiding"] },
      ],
      trust: [
        { val: "Weken, geen maanden", lbl: "Gemiddelde tijd tot eerste implementatie" },
        { val: "Nul downtime",        lbl: "Gegarandeerde implementatiemethode" },
        { val: "Continue ROI",        lbl: "Post-lanceringsoptimalisatie inbegrepen" },
      ],
    },
    contact: {
      badge: "Neem contact op", title: "Laten we uw", titleAccent: "AI-ecosysteem bouwen",
      subtitle: "Neem rechtstreeks contact op met een van onze oprichters, of vul het formulier in en we reageren binnen één werkdag.",
      founders: "Neem contact op met een oprichter",
      formTitle: "Stuur ons een bericht", formDesc: "Vertel ons over uw project en we stellen binnen 24 uur een voorstel op maat voor.",
      name: "Volledige naam", email: "Zakelijk e-mailadres", company: "Bedrijf", service: "Dienst van interesse", message: "Bericht",
      namePh: "Jan de Vries", emailPh: "jan@bedrijf.nl", companyPh: "Mijn Bedrijf", servicePh: "Selecteer een dienst…", messagePh: "Vertel ons over uw project en huidige uitdagingen…",
      submit: "Bericht verzenden", sending: "Verzenden…",
      privacy: "We reageren doorgaans binnen 1 werkdag. Uw gegevens worden nooit gedeeld.",
      successTitle: "Bericht verzonden!", successDesc: "Bedankt voor uw bericht. Een oprichter van ARP Solutions neemt binnen één werkdag contact op.", successBtn: "Nog een bericht sturen",
      errorMsg: "Er is iets misgegaan. Probeer het opnieuw of stuur ons een e-mail.",
      emails: [{ lbl: "Algemene vragen", val: "hello@arpsolutions.ai" }, { lbl: "Zakelijke verkoop", val: "sales@arpsolutions.ai" }, { lbl: "Vacatures", val: "careers@arpsolutions.ai" }],
      services: ["AI-werkstroomautomatisering", "Voorspellende analyse", "Conversationele AI", "API-integraties", "Algemene vraag"],
      founderPhone: "Telefoon",
    },
    footer: {
      ctaEyebrow: "Laten we samen bouwen", ctaTitle: "Klaar om uw", ctaAccent: "AI-ecosysteem te implementeren?",
      ctaDesc: "Boek een gratis ontdekkingsgesprek met Justin, Alexander of Adrian — en vertrek met een duidelijke AI-routekaart.",
      ctaBtn1: "Boek een gesprek", ctaBtn2: "Bekijk onze diensten →",
      brandDesc: "Enterprise AI-automatiseringsecosystemen. Opgericht door Justin Kuijper, Alexander Janssen en Adrian Alvarez.",
      newsletter: "Blijf op de hoogte", nlPh: "uw@bedrijf.nl", nlBtn: "Abonneren", nlSuccess: "U bent geabonneerd. Welkom!",
      colSolutions: "Oplossingen", colNavigate: "Navigeren", colLegal: "Juridisch",
      navLinks: ["Home", "Oplossingen", "Hoe het werkt", "Contact"],
      legalLinks: ["Privacybeleid", "Servicevoorwaarden", "Cookiebeleid", "Beveiliging"],
      rights: "Alle rechten voorbehouden.", status: "Alle systemen operationeel",
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// APP CONTEXT (inline)
// ═══════════════════════════════════════════════════════════════════════════

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


// ─── Constants ────────────────────────────────────────────────────────────
const GREEN      = "#3ecf8e";
const GREEN_DARK = "#1ea87a";
const GRAD       = `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`;

const FOUNDERS = [
  { name: "Justin Kuijper",    initials: "JK", phone: "+31 6 [number]", email: "justin@arpsolutions.ai",    linkedin: "#" },
  { name: "Alexander Janssen", initials: "AJ", phone: "+31 6 [number]", email: "alexander@arpsolutions.ai", linkedin: "#" },
  { name: "Adrian Alvarez",    initials: "AA", phone: "+34 6 [number]", email: "adrian@arpsolutions.ai",    linkedin: "#" },
];

const EMAILJS_SERVICE_ID  = "service_7qaapmd";
const EMAILJS_TEMPLATE_ID = "template_4xorr3d";
const EMAILJS_PUBLIC_KEY  = "2D4yS9JCljquj4JFu";

// ─── EmailJS loader ───────────────────────────────────────────────────────
function useEmailJS() {
  const [ready, setReady] = useState(!!window.emailjs);
  useEffect(() => {
    if (window.emailjs) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.async = true;
    s.onload = () => { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); setReady(true); };
    document.head.appendChild(s);
  }, []);
  return ready;
}

// ─── Scroll helper ────────────────────────────────────────────────────────
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
};

// ─── Shared style helpers ─────────────────────────────────────────────────
const card = { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", boxShadow: "var(--shadow-sm)" };
const tag  = (small) => ({
  display: "inline-flex", alignItems: "center", gap: "6px",
  fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
  fontSize: small ? "11px" : "12px", textTransform: "uppercase", letterSpacing: "0.1em",
  color: GREEN_DARK, background: "rgba(62,207,142,0.10)", border: "1px solid rgba(62,207,142,0.25)",
  padding: small ? "4px 10px" : "5px 13px", borderRadius: "99px",
});
const gradText = { background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };
const hoverScale = {
  transition: "transform 0.2s, box-shadow 0.2s",
  onMouseEnter: (e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = `0 8px 28px rgba(62,207,142,0.35)`; },
  onMouseLeave: (e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = ""; },
};

const SectionBadge = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
    <span style={tag(false)}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, animation: "arp-blink 2s ease infinite" }}/>
      {children}
    </span>
  </div>
);

const SectionTitle = ({ children, accent, center = true }) => (
  <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--text-primary)", textAlign: center ? "center" : "left", marginBottom: "16px" }}>
    {children}{" "}<span style={gradText}>{accent}</span>
  </h2>
);

const SectionSub = ({ children }) => (
  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65, textAlign: "center", maxWidth: "580px", margin: "0 auto" }}>
    {children}
  </p>
);

// ─── Icons ────────────────────────────────────────────────────────────────
const ChevronIcon = ({ open }) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const MenuIcon  = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>;
const CloseIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>;
const SunIcon   = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const MoonIcon  = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M17.5 12.5A7.5 7.5 0 017.5 2.5a7.5 7.5 0 100 15 7.5 7.5 0 0010-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
const CheckIcon = ({ size = 9 }) => <svg width={size} height={size} viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowIcon = ({ white }) => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke={white ? "white" : "currentColor"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const GreenCheck = () => (
  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <CheckIcon/>
  </div>
);

// ─── Logo ─────────────────────────────────────────────────────────────────
const Logo = ({ onClick }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
    <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <path d="M9 3L15 9L9 15L3 9L9 3Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="9" cy="9" r="2.5" fill="white"/>
      </svg>
    </div>
    <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "19px", color: "var(--text-primary)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
      ARP<span style={gradText}> Solutions</span>
    </span>
  </button>
);

// ─── Theme toggle ─────────────────────────────────────────────────────────
const ThemeToggle = () => {
  const { theme, toggleTheme } = useApp();
  return (
    <button onClick={toggleTheme}
      style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer", transition: "all 0.2s", flexShrink: 0 }}
      onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; e.currentTarget.style.borderColor = "rgba(62,207,142,0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      {theme === "dark" ? <SunIcon/> : <MoonIcon/>}
    </button>
  );
};

// ─── Language selector ────────────────────────────────────────────────────
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
        onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; e.currentTarget.style.borderColor = "rgba(62,207,142,0.4)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
      >
        {lang.toUpperCase()}
        <ChevronIcon open={open}/>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "4px", boxShadow: "var(--shadow-md)", zIndex: 200, minWidth: "80px" }}>
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => { changeLang(l.code); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "center", padding: "8px 12px", borderRadius: "8px", background: lang === l.code ? "rgba(62,207,142,0.12)" : "transparent", color: lang === l.code ? GREEN_DARK : "var(--text-secondary)", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", transition: "background 0.15s" }}
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

// ─── Dropdown nav menu ────────────────────────────────────────────────────
const Dropdown = ({ items, sectionId, visible }) => (
  <div style={{ position: "absolute", top: "calc(100% + 12px)", left: "50%", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "8px", boxShadow: "var(--shadow-md)", width: "280px", opacity: visible ? 1 : 0, pointerEvents: visible ? "all" : "none", transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-8px)", transition: "opacity 0.2s, transform 0.2s", zIndex: 200 }}>
    <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "10px", height: "10px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRight: "none", borderBottom: "none" }}/>
    {items.map((item) => (
      <button key={item.label} onClick={() => scrollTo(sectionId)}
        style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "transparent", border: "none", width: "100%", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tertiary)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(62,207,142,0.10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>{item.icon}</div>
        <div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>{item.label}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", marginTop: "1px" }}>{item.desc}</div>
        </div>
      </button>
    ))}
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: "services", dropdown: true },
  { id: "how-it-works" },
  { id: "contact" },
];

const Navbar = ({ activeSection }) => {
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

          {/* Desktop nav */}
          <nav className="arp-desk" style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: "4px" }}>
            {/* Solutions dropdown */}
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

          {/* Desktop right controls */}
          <div className="arp-desk" style={{ alignItems: "center", gap: "10px" }}>
            <ThemeToggle/>
            <LangSelector/>
            <a href="#" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "14px", color: "var(--text-secondary)", textDecoration: "none", padding: "8px 14px", borderRadius: "10px", transition: "color 0.15s,background 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; e.currentTarget.style.background = "rgba(62,207,142,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}
            >
              {t.nav.signIn}
            </a>
            <button onClick={() => scrollTo("contact")}
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "9px 20px", borderRadius: "11px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 12px rgba(62,207,142,0.28)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(62,207,142,0.38)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(62,207,142,0.28)"; }}
            >
              {t.nav.getStarted}<ArrowIcon white/>
            </button>
          </div>

          {/* Mobile right controls */}
          <div className="arp-mob" style={{ alignItems: "center", gap: "8px" }}>
            <ThemeToggle/>
            <LangSelector/>
            <button onClick={() => setMobileOpen((v) => !v)}
              style={{ width: "36px", height: "36px", borderRadius: "9px", background: mobileOpen ? "rgba(62,207,142,0.12)" : "var(--bg-tertiary)", border: "1px solid", borderColor: mobileOpen ? "rgba(62,207,142,0.4)" : "var(--border)", color: mobileOpen ? GREEN : "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            >
              {mobileOpen ? <CloseIcon/> : <MenuIcon/>}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
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
};

// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════
const Hero = () => {
  const { t } = useApp();
  const h = t.hero;
  return (
    <section style={{ background: "var(--hero-bg)", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "40px 0 80px" }}>
      {/* bg glows */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(62,207,142,0.07) 0%, transparent 65%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(30,168,122,0.05) 0%, transparent 65%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div className="arp-fade-1">
            <span style={tag(false)}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, animation: "arp-blink 2s ease infinite" }}/>
              {h.badge}
            </span>
          </div>

          <h1 className="arp-fade-2" style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "clamp(44px,5.5vw,76px)", lineHeight: 1.03, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
            {h.line1}<br/>
            {h.line2}{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ position: "relative", zIndex: 1 }}>{h.line2}</span>
            </span>
            <br/>
            <span style={gradText}>{h.line2accent}</span>
          </h1>

          <p className="arp-fade-3" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "460px" }}>
            {h.description}
          </p>

          <div className="arp-fade-4" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("contact")}
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px", color: "#fff", background: GRAD, border: "none", padding: "13px 26px", borderRadius: "13px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 20px rgba(62,207,142,0.30)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(62,207,142,0.40)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(62,207,142,0.30)"; }}
            >
              {h.cta1}<ArrowIcon white/>
            </button>
            <button
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px", color: "var(--text-primary)", background: "transparent", border: "1.5px solid var(--border)", padding: "13px 26px", borderRadius: "13px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transition: "border-color 0.2s,color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.color = GREEN; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            >
              {h.cta2}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/></svg>
            </button>
          </div>

          <div className="arp-fade-5" style={{ display: "flex", gap: "0", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
            {[{ val: h.stat1val, lbl: h.stat1lbl }, { val: h.stat2val, lbl: h.stat2lbl }].map((s, i) => (
              <div key={i} style={{ flex: 1, paddingTop: "16px", paddingLeft: i > 0 ? "28px" : "0", borderLeft: i > 0 ? "1px solid var(--border)" : "none", marginLeft: i > 0 ? "28px" : "0" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "26px", ...gradText, lineHeight: 1.1, marginBottom: "4px" }}>{s.val}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-muted)" }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — dashboard */}
        <div className="arp-fade-3" style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "32px" }}>
          <div style={{ width: "100%", maxWidth: "380px", position: "relative" }}>
            {/* Main card */}
            <div style={{ ...card, padding: "24px", boxShadow: "var(--shadow-lg)", transition: "transform 0.3s,box-shadow 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ position: "relative", width: "10px", height: "10px" }}>
                    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: GREEN, opacity: 0.4, animation: "arp-ping 1.5s ease infinite" }}/>
                    <span style={{ position: "absolute", inset: "1px", borderRadius: "50%", background: GREEN }}/>
                  </div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text-primary)" }}>{h.dashTitle}</span>
                </div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: GREEN_DARK, background: "rgba(62,207,142,0.12)", padding: "3px 10px", borderRadius: "99px" }}>{h.dashLive}</span>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)" }}>{h.dashChart}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 700, ...gradText }}>+24.8%</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "56px" }}>
                  {[40, 65, 50, 85, 70, 95, 80].map((h2, i) => (
                    <div key={i} style={{ flex: 1, height: `${h2}%`, borderRadius: "4px 4px 2px 2px", background: i === 5 ? GRAD : `rgba(62,207,142,${0.2 + i * 0.1})` }}/>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", marginBottom: "16px" }}/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[{ val: "[X]h/wk", lbl: h.dashSaved }, { val: "99.2%", lbl: h.dashAcc }, { val: "99.9%", lbl: h.dashUp }].map((m) => (
                  <div key={m.lbl} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px", ...gradText }}>{m.val}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{m.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification chip */}
            <div style={{ position: "absolute", bottom: "-16px", left: "-16px", ...card, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: "10px", boxShadow: "var(--shadow-md)", minWidth: "220px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckIcon size={11}/>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)", marginBottom: "2px" }}>{h.notifTitle}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)" }}>{h.notifSub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr!important}.hero-right{display:none!important}}`}</style>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SERVICES SECTION
// ═══════════════════════════════════════════════════════════════════════════
const ServiceCard = ({ item, index }) => {
  const { t } = useApp();
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div style={{ ...card, display: "grid", gridTemplateColumns: "1fr 1fr", boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)", transform: hovered ? "translateY(-3px)" : "translateY(0)", transition: "box-shadow 0.3s,transform 0.3s", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {/* Content side */}
      <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between", order: isEven ? 1 : 2 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <span style={tag(true)}>{item.tag}</span>
          </div>
          <h3 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: "26px", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "14px" }}>{item.title}</h3>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "20px" }}>{item.desc}</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
            {item.feats.map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <GreenCheck/>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ padding: "10px 14px", borderRadius: "12px", background: "rgba(62,207,142,0.08)", border: "1px solid rgba(62,207,142,0.20)" }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "20px", ...gradText, lineHeight: 1.1 }}>{item.metric.val}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{item.metric.lbl}</div>
          </div>
          <button style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: GREEN_DARK, background: "transparent", border: "1.5px solid rgba(62,207,142,0.35)", borderRadius: "11px", padding: "9px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", transition: "background 0.2s,border-color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(62,207,142,0.08)"; e.currentTarget.style.borderColor = GREEN; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(62,207,142,0.35)"; }}
          >
            {t.services.learnMore}<ArrowIcon/>
          </button>
        </div>
      </div>

      {/* Visual side */}
      <div style={{ background: "var(--bg-tertiary)", borderLeft: isEven ? "1px solid var(--border)" : "none", borderRight: !isEven ? "1px solid var(--border)" : "none", padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "center", order: isEven ? 2 : 1, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-50px", right: "-50px", width: "160px", height: "160px", borderRadius: "50%", background: "radial-gradient(circle,rgba(62,207,142,0.08) 0%,transparent 70%)", pointerEvents: "none" }}/>
        {/* Service-specific mini visual */}
        <ServiceVisual index={index}/>
      </div>
    </div>
  );
};

const ServiceVisual = ({ index }) => {
  const { t } = useApp();
  if (index === 0) return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {["Trigger received", "AI processes", "Action executed", "Result delivered"].map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "8px 12px", borderRadius: "10px", background: i === 1 ? "rgba(62,207,142,0.10)" : "var(--bg-secondary)", border: `1px solid ${i === 1 ? "rgba(62,207,142,0.28)" : "var(--border)"}` }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: i === 1 ? GRAD : "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {i === 1 ? <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1L10 6L6 11L2 6L6 1Z" fill="white"/></svg> : <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--text-muted)" }}>{i + 1}</span>}
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: i === 1 ? 600 : 400, color: i === 1 ? GREEN_DARK : "var(--text-secondary)" }}>{s}</span>
          {i < 3 && <svg style={{ marginLeft: "auto" }} width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6h6M7 4l2 2-2 2" stroke="var(--border-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
      ))}
    </div>
  );
  if (index === 1) return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>Forecast accuracy</span>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 700, color: GREEN_DARK }}>↑ Trending up</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "64px" }}>
        {[45, 60, 52, 78, 68, 94].map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <div style={{ width: "100%", height: `${h}%`, borderRadius: "4px 4px 2px 2px", background: i === 5 ? GRAD : `rgba(62,207,142,${0.2 + i * 0.1})` }}/>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", color: "var(--text-muted)" }}>{["J","F","M","A","M","J"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
  if (index === 2) return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      {[{ from: "user", text: "Status of account #8821?" }, { from: "ai", text: "Active. Renewal in 14 days. Trigger follow-up?" }, { from: "user", text: "Yes, start the sequence." }].map((m, i) => (
        <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
          <div style={{ maxWidth: "85%", padding: "7px 11px", borderRadius: m.from === "user" ? "13px 13px 3px 13px" : "13px 13px 13px 3px", background: m.from === "user" ? GRAD : "var(--bg-secondary)", border: m.from === "user" ? "none" : "1px solid var(--border)" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: m.from === "user" ? "#fff" : "var(--text-primary)", margin: 0, lineHeight: 1.4 }}>{m.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ background: "#1c1917", borderRadius: "10px", padding: "14px 15px", fontFamily: "'Fira Code',monospace", fontSize: "11px", lineHeight: 1.6 }}>
      <div style={{ color: "#6b7280", marginBottom: "4px" }}>// Connect in minutes</div>
      <div><span style={{ color: "#f9a8d4" }}>const</span><span style={{ color: "#e5e7eb" }}> client </span><span style={{ color: "#60a5fa" }}>=</span><span style={{ color: "#a3e635" }}> new </span><span style={{ color: "#fbbf24" }}>ARPSolutions</span><span style={{ color: "#e5e7eb" }}>(&#123;</span></div>
      <div style={{ paddingLeft: "14px" }}><span style={{ color: "#94a3b8" }}>apiKey: </span><span style={{ color: "#86efac" }}>'sk-arp-...'</span><span style={{ color: "#e5e7eb" }}>,</span></div>
      <div><span style={{ color: "#e5e7eb" }}>&#125;);</span></div>
      <div style={{ marginTop: "8px", padding: "5px 9px", borderRadius: "6px", background: "rgba(62,207,142,0.12)", border: "1px solid rgba(62,207,142,0.25)" }}>
        <span style={{ color: "#3ecf8e" }}>✓ Connected · 11ms latency</span>
      </div>
    </div>
  );
};

const Services = () => {
  const { t } = useApp();
  const s = t.services;
  return (
    <section style={{ background: "var(--bg-secondary)", padding: "96px 0 112px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <SectionBadge>{s.badge}</SectionBadge>
        <SectionTitle accent={s.titleAccent}>{s.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "64px" }}><SectionSub>{s.subtitle}</SectionSub></div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {s.items.map((item, i) => <ServiceCard key={i} item={item} index={i}/>)}
        </div>

        {/* CTA strip */}
        <div style={{ marginTop: "64px", borderRadius: "24px", padding: "48px 56px", background: "linear-gradient(135deg,#1c1917,#262421)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle,rgba(62,207,142,0.12) 0%,transparent 70%)", pointerEvents: "none" }}/>
          <div style={{ position: "relative" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>{s.ctaEyebrow}</p>
            <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "clamp(22px,3vw,34px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {s.ctaTitle}{" "}<span style={gradText}>{s.ctaAccent}</span>
            </h3>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", position: "relative" }}>
            <button onClick={() => scrollTo("contact")} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "12px 26px", borderRadius: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px", boxShadow: "0 4px 20px rgba(62,207,142,0.30)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(62,207,142,0.40)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(62,207,142,0.30)"; }}
            >{s.ctaBtn1}<ArrowIcon white/></button>
            <button style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.70)", background: "none", border: "1.5px solid rgba(255,255,255,0.15)", padding: "12px 26px", borderRadius: "13px", cursor: "pointer", transition: "border-color 0.2s,color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.70)"; }}
            >{s.ctaBtn2}</button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.service-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// HOW IT WORKS
// ═══════════════════════════════════════════════════════════════════════════
const HowItWorks = () => {
  const { t } = useApp();
  const h = t.hiw;
  const [active, setActive] = useState(0);

  return (
    <section style={{ background: "var(--bg-tertiary)", padding: "96px 0 112px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <SectionBadge>{h.badge}</SectionBadge>
        <SectionTitle accent={h.titleAccent}>{h.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "56px" }}><SectionSub>{h.subtitle}</SectionSub></div>

        {/* Timeline */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: "48px", padding: "0 40px" }}>
          {h.steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < h.steps.length - 1 ? 1 : "none" }}>
              <button onClick={() => setActive(i)}
                style={{ width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: i <= active ? GRAD : "var(--bg-secondary)", border: i === active ? "3px solid rgba(62,207,142,0.35)" : "3px solid transparent", boxShadow: i === active ? "0 0 0 5px rgba(62,207,142,0.12)" : "none", cursor: "pointer", transition: "all 0.3s" }}
              >
                {i < active ? <CheckIcon size={13}/> : <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "12px", color: i <= active ? "#fff" : "var(--text-muted)" }}>0{i + 1}</span>}
              </button>
              {i < h.steps.length - 1 && <div style={{ flex: 1, height: "3px", borderRadius: "99px", margin: "0 4px", background: i < active ? GRAD : "var(--border)", transition: "background 0.4s" }}/>}
            </div>
          ))}
        </div>

        {/* Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px", alignItems: "start" }}>
          {/* Tabs */}
          <div style={{ background: "var(--bg-secondary)", borderRadius: "20px", padding: "10px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
            {h.steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px 18px", borderRadius: "13px", background: active === i ? "var(--bg-card)" : "transparent", border: active === i ? "1px solid var(--border)" : "1px solid transparent", boxShadow: active === i ? "var(--shadow-sm)" : "none", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.2s" }}
              >
                <div style={{ width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: active === i ? GRAD : "var(--bg-tertiary)", transition: "background 0.2s" }}>
                  <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "12px", color: active === i ? "#fff" : "var(--text-muted)" }}>0{i + 1}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: active === i ? GREEN_DARK : "var(--text-muted)", marginBottom: "3px" }}>{s.phase}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "14px", lineHeight: 1.2, color: active === i ? "var(--text-primary)" : "var(--text-secondary)" }}>{s.title}</div>
                </div>
                {active === i && <div style={{ width: "4px", height: "34px", borderRadius: "99px", background: GRAD, flexShrink: 0, alignSelf: "center" }}/>}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div style={{ ...card, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
            <div style={{ height: "4px", background: GRAD }}/>
            <div style={{ padding: "36px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "13px", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px", color: "#fff" }}>0{active + 1}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: GREEN_DARK, marginBottom: "2px" }}>{h.steps[active].phase}</div>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1.1 }}>{h.steps[active].title}</h3>
                </div>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "24px" }}>{h.steps[active].desc}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                {h.steps[active].bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <GreenCheck/>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div style={{ marginTop: "56px", ...card, padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-around", gap: "24px", flexWrap: "wrap" }}>
          {h.trust.map((item) => (
            <div key={item.val} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "rgba(62,207,142,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN_DARK, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 17h14M5 17V11M8 17V7M11 17V4M14 17V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px", ...gradText, lineHeight: 1.2 }}>{item.val}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{item.lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════════════════
const ContactForm = ({ ejsReady }) => {
  const { t } = useApp();
  const c = t.contact;
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [fields, setFields] = useState({ from_name: "", from_email: "", company: "", service: "", message: "" });
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const inputStyle = { fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "var(--text-primary)", background: "var(--bg-input)", border: "1.5px solid var(--border)", borderRadius: "12px", padding: "11px 16px", outline: "none", width: "100%", transition: "border-color 0.2s,box-shadow 0.2s" };
  const fi = (e) => { e.target.style.borderColor = GREEN; e.target.style.boxShadow = "0 0 0 3px rgba(62,207,142,0.12)"; };
  const fo = (e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ejsReady || !window.emailjs) { setStatus("error"); return; }
    setStatus("sending");
    try { await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current); setStatus("success"); }
    catch (err) { console.error(err); setStatus("error"); }
  };

  if (status === "success") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 32px", gap: "20px" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(62,207,142,0.30)" }}>
        <CheckIcon size={28}/>
      </div>
      <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "24px", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{c.successTitle}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "320px" }}>{c.successDesc}</p>
      <button onClick={() => { setStatus("idle"); setFields({ from_name: "", from_email: "", company: "", service: "", message: "" }); }}
        style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: GREEN_DARK, background: "transparent", border: "1.5px solid rgba(62,207,142,0.35)", borderRadius: "10px", padding: "9px 20px", cursor: "pointer" }}
      >{c.successBtn}</button>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.name} <span style={{ color: GREEN }}>*</span></label><input name="from_name" type="text" placeholder={c.namePh} value={fields.from_name} onChange={set("from_name")} required style={inputStyle} onFocus={fi} onBlur={fo}/></div>
        <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.email} <span style={{ color: GREEN }}>*</span></label><input name="from_email" type="email" placeholder={c.emailPh} value={fields.from_email} onChange={set("from_email")} required style={inputStyle} onFocus={fi} onBlur={fo}/></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.company}</label><input name="company" type="text" placeholder={c.companyPh} value={fields.company} onChange={set("company")} style={inputStyle} onFocus={fi} onBlur={fo}/></div>
        <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.service}</label>
          <select name="service" value={fields.service} onChange={set("service")} style={{ ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M3 5l4 4 4-4' stroke='%2378716c' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "36px", cursor: "pointer", color: fields.service ? "var(--text-primary)" : "var(--text-muted)" }} onFocus={fi} onBlur={fo}>
            <option value="" disabled>{c.servicePh}</option>
            {c.services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "7px" }}>{c.message} <span style={{ color: GREEN }}>*</span></label>
        <textarea name="message" placeholder={c.messagePh} value={fields.message} onChange={set("message")} required rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: "120px", lineHeight: 1.6 }} onFocus={fi} onBlur={fo}/>
      </div>

      {status === "error" && (
        <div style={{ padding: "12px 16px", borderRadius: "12px", background: "rgba(226,73,74,0.08)", border: "1px solid rgba(226,73,74,0.25)", display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#E2494A" strokeWidth="1.5"/><path d="M8 5v3M8 11v.5" stroke="#E2494A" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "#a32d2d" }}>{c.errorMsg}</span>
        </div>
      )}

      <button type="submit" disabled={status === "sending"} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px", color: "#fff", background: status === "sending" ? "linear-gradient(135deg,#7dd8ab,#5bb89a)" : GRAD, border: "none", borderRadius: "13px", padding: "14px 28px", cursor: status === "sending" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 20px rgba(62,207,142,0.28)", transition: "transform 0.2s,box-shadow 0.2s" }}
        onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(62,207,142,0.38)"; } }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(62,207,142,0.28)"; }}
      >
        {status === "sending" ? <><svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ animation: "arp-spin 0.9s linear infinite" }}><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/><path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>{c.sending}</> : <>{c.submit}<ArrowIcon white/></>}
      </button>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>{c.privacy}</p>
    </form>
  );
};

const Contact = () => {
  const { t } = useApp();
  const c = t.contact;
  const ejsReady = useEmailJS();

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "96px 0 112px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-80px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(62,207,142,0.06) 0%,transparent 65%)", pointerEvents: "none" }}/>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <SectionBadge>{c.badge}</SectionBadge>
        <SectionTitle accent={c.titleAccent}>{c.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}><SectionSub>{c.subtitle}</SectionSub></div>

        {/* Company emails bar */}
        <div style={{ ...card, padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", marginBottom: "48px" }}>
          {c.emails.map((item) => (
            <a key={item.val} href={`mailto:${item.val}`} style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", flex: "1", minWidth: "180px", transition: "opacity 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "rgba(62,207,142,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN_DARK, flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 5h14v10H3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 5l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "2px" }}>{item.lbl}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>{item.val}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Main layout */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "28px", alignItems: "start" }}>
          {/* Founder cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{c.founders}</p>
            {FOUNDERS.map((f) => (
              <div key={f.name} style={{ ...card, padding: "20px", display: "flex", flexDirection: "column", gap: "14px", transition: "box-shadow 0.25s,transform 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "13px", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "13px", color: "#fff" }}>{f.initials}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px", color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: "2px" }}>{f.name}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: GREEN_DARK, textTransform: "uppercase", letterSpacing: "0.07em" }}>Co-Founder</p>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid var(--border)" }}/>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[{ href: `tel:${f.phone}`, text: f.phone, icon: <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M6.5 3.5c.5 1.5 1 2.5 1.5 3L6 8.5c1 2 2.5 3.5 4.5 4.5l2-2c.5.5 1.5 1 3 1.5v3c0 .5-.5 1-1 1C7.5 17 3 12.5 3 7c0-.5.5-1 1-1l2.5-.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> }, { href: `mailto:${f.email}`, text: f.email, icon: <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 5h14v10H3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 5l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> }].map((row) => (
                    <a key={row.href} href={row.href}
                      style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                      onMouseEnter={(e) => e.currentTarget.querySelector("span").style.color = GREEN_DARK}
                      onMouseLeave={(e) => e.currentTarget.querySelector("span").style.color = "var(--text-secondary)"}
                    >
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(62,207,142,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN_DARK, flexShrink: 0 }}>{row.icon}</div>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-secondary)", transition: "color 0.15s" }}>{row.text}</span>
                    </a>
                  ))}
                </div>
                <a href={f.linkedin} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", borderRadius: "10px", border: "1.5px solid rgba(62,207,142,0.30)", color: GREEN_DARK, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, transition: "background 0.2s,border-color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(62,207,142,0.08)"; e.currentTarget.style.borderColor = GREEN; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(62,207,142,0.30)"; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ ...card, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
            <div style={{ height: "4px", background: GRAD }}/>
            <div style={{ padding: "36px 40px" }}>
              <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "22px", color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "6px" }}>{c.formTitle}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "28px" }}>{c.formDesc}</p>
              <ContactForm ejsReady={ejsReady}/>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════
const Footer = () => {
  const { t } = useApp();
  const f = t.footer;
  const [email, setEmail] = useState("");
  const [nlDone, setNlDone] = useState(false);
  const nav = (id) => scrollTo(id);
  const NAV_IDS = ["hero", "services", "how-it-works", "contact"];

  return (
    <>
      <style>{`
        .footer-input::placeholder { color: rgba(255,255,255,0.28) !important; }
        @keyframes fpulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        @media(max-width:900px){ .footer-grid{grid-template-columns:1fr 1fr!important} .footer-brand{grid-column:1/-1!important} }
        @media(max-width:480px){ .footer-grid{grid-template-columns:1fr!important} }
      `}</style>
      <footer style={{ background: "linear-gradient(160deg,#1a1917 0%,#0f0e0d 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-120px", left: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(62,207,142,0.05) 0%,transparent 65%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "-100px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(30,168,122,0.06) 0%,transparent 65%)", pointerEvents: "none" }}/>

        {/* CTA band */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "80px 24px 0" }}>
          <div style={{ borderRadius: "24px", padding: "52px 56px", background: "linear-gradient(135deg,rgba(62,207,142,0.10),rgba(30,168,122,0.06))", border: "1px solid rgba(62,207,142,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle,rgba(62,207,142,0.12) 0%,transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "relative" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: GREEN, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>{f.ctaEyebrow}</p>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "clamp(22px,3vw,36px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "12px" }}>
                {f.ctaTitle}{" "}<span style={gradText}>{f.ctaAccent}</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.50)", maxWidth: "420px", lineHeight: 1.6 }}>{f.ctaDesc}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}>
              <button onClick={() => nav("contact")} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", background: GRAD, border: "none", padding: "13px 28px", borderRadius: "12px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "7px", boxShadow: "0 4px 20px rgba(62,207,142,0.30)", transition: "transform 0.2s,box-shadow 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(62,207,142,0.40)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(62,207,142,0.30)"; }}
              >{f.ctaBtn1}<ArrowIcon white/></button>
              <button onClick={() => nav("services")} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.50)", background: "none", border: "none", cursor: "pointer", textAlign: "center", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
              >{f.ctaBtn2}</button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "64px 24px 0" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "44px" }}>
            <div className="footer-brand">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M9 3L15 9L9 15L3 9L9 3Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="9" cy="9" r="2.5" fill="white"/></svg>
                </div>
                <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "20px", color: "#fff", letterSpacing: "-0.02em" }}>ARP<span style={gradText}> Solutions</span></span>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, maxWidth: "270px", marginBottom: "20px" }}>{f.brandDesc}</p>
              <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                {[["LinkedIn", <svg key="li" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>], ["X", <svg key="x" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>]].map(([lbl, icon]) => (
                  <a key={lbl} href="#" aria-label={lbl} style={{ width: "34px", height: "34px", borderRadius: "9px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.50)", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(62,207,142,0.15)"; e.currentTarget.style.color = GREEN; e.currentTarget.style.borderColor = "rgba(62,207,142,0.35)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.50)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
                  >{icon}</a>
                ))}
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.30)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "9px" }}>{f.newsletter}</p>
              {nlDone ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 13px", borderRadius: "10px", background: "rgba(62,207,142,0.12)", border: "1px solid rgba(62,207,142,0.25)" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}><CheckIcon/></div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: GREEN }}>{f.nlSuccess}</span>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "7px" }}>
                  <input className="footer-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={f.nlPh}
                    style={{ flex: 1, height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", padding: "0 13px", outline: "none", minWidth: 0 }}
                    onKeyDown={(e) => { if (e.key === "Enter" && email.trim()) setNlDone(true); }}
                  />
                  <button onClick={() => { if (email.trim()) setNlDone(true); }} style={{ height: "40px", padding: "0 16px", borderRadius: "10px", background: GRAD, border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>{f.nlBtn}</button>
                </div>
              )}
            </div>

            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>{f.colSolutions}</p>
              {t.services.items.map((item) => (
                <button key={item.title} onClick={() => nav("services")} style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: "0 0 11px", textAlign: "left", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{item.title}</button>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>{f.colNavigate}</p>
              {f.navLinks.map((label, i) => (
                <button key={label} onClick={() => nav(NAV_IDS[i])} style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: "0 0 11px", textAlign: "left", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{label}</button>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>{f.colLegal}</p>
              {f.legalLinks.map((label) => (
                <a key={label} href="#" style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "11px", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.22)" }}>© {new Date().getFullYear()} ARP Solutions. {f.rights}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: GREEN, animation: "fpulse 2.5s ease infinite" }}/>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.22)" }}>{f.status}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════
const SECTION_IDS = ["hero", "services", "how-it-works", "contact"];

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
      <Navbar activeSection={activeSection}/>
      <div id="hero"          style={{ scrollMarginTop: "72px" }}><Hero/></div>
      <div id="services"      style={{ scrollMarginTop: "72px" }}><Services/></div>
      <div id="how-it-works"  style={{ scrollMarginTop: "72px" }}><HowItWorks/></div>
      <div id="contact"       style={{ scrollMarginTop: "72px" }}><Contact/></div>
      <Footer/>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner/>
    </AppProvider>
  );
}