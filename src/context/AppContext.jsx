import { useState, useEffect, createContext, useContext } from "react";

const translations = {
  en: {
    nav: { solutions: "Solutions", howItWorks: "How It Works", contact: "Contact", signIn: "Sign In", getStarted: "Get Started" },
    hero: {
      badge: "Enterprise AI Automation",
      line1: "Your AI partner", line2: "for the next", line2accent: "decade",
      description: "AKJ.ai helps enterprises eliminate operational complexity through AI-powered automation ecosystems.",
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
      subtitle: "From your first automation to a fully integrated AI ecosystem.",
      learnMore: "Learn more",
      items: [
        { tag: "Process Automation",  title: "AI Workflow Automation", desc: "Eliminate manual bottlenecks with end-to-end business process automation.", feats: ["Autonomous AI agents, 24/7", "End-to-end process coverage", "Zero disruption to existing ops"], metric: { val: "Massive", lbl: "reduction in manual workload" } },
        { tag: "Data Intelligence",   title: "Predictive Analytics",   desc: "Transform raw enterprise data into strategic advantage.", feats: ["Real-time data dashboards", "Proactive anomaly alerts", "Custom forecasting models"], metric: { val: "[X]×", lbl: "improvement in forecast accuracy" } },
        { tag: "Customer Experience", title: "Conversational AI",      desc: "Deploy chatbots and AI Voice Agents that handle inbound calls.", feats: ["AI voice agents for phone calls", "Intelligent human escalation", "Omnichannel deployment"], metric: { val: "[X]%", lbl: "of inquiries resolved autonomously" } },
        { tag: "Infrastructure",      title: "API Integrations",        desc: "Connect AI capabilities with your existing enterprise tech stack.", feats: ["REST & GraphQL API support", "SSO & RBAC security", "99.9% uptime SLA"], metric: { val: "Rapid", lbl: "time-to-integration" } },
      ],
      ctaEyebrow: "Ready to transform your operations?", ctaTitle: "Start automating.", ctaAccent: "Scale without limits.", ctaBtn1: "Talk to our team", ctaBtn2: "Watch a live demo",
    },
    hiw: {
      badge: "Our process", title: "From first meeting to", titleAccent: "live AI systems",
      subtitle: "A proven four-phase methodology.",
      steps: [
        { phase: "Discovery",    title: "We audit your operations",    desc: "Our team audits your workflows, tech stack, and pain points.", bullets: ["Current-state workflow mapping", "Tech stack & integration assessment", "Automation opportunity scoring"] },
        { phase: "Architecture", title: "We design your AI ecosystem", desc: "We architect a custom AI ecosystem.", bullets: ["Custom AI agent architecture", "End-to-end integration blueprint", "Phased rollout roadmap"] },
        { phase: "Deployment",   title: "We build and integrate",      desc: "Our engineers deploy your AI workflows.", bullets: ["Secure API & system integration", "Parallel testing environment", "Zero-downtime deployment"] },
        { phase: "Optimization", title: "We monitor and improve",      desc: "Post-launch, systems continuously monitor performance.", bullets: ["Real-time performance monitoring", "Continuous model retraining", "Dedicated success partnership"] },
      ],
      trust: [
        { val: "Weeks, not months", lbl: "Average time to first deployment" },
        { val: "Zero downtime",     lbl: "Guaranteed deployment approach" },
        { val: "Continuous ROI",    lbl: "Post-launch optimization included" },
      ],
    },
    contact: {
      badge: "Contact us", title: "Let's build your", titleAccent: "AI ecosystem",
      subtitle: "Reach out directly to one of our founders.",
      founders: "Reach a founder directly",
      formTitle: "Send us a message", formDesc: "Tell us about your project and we'll put together a tailored proposal within 24 hours.",
      name: "Full name", email: "Work email", company: "Company", service: "Service of interest", message: "Message",
      namePh: "Jane Smith", emailPh: "jane@company.com", companyPh: "Acme Corp", servicePh: "Select a service…", messagePh: "Tell us about your project…",
      submit: "Send message", sending: "Sending…",
      privacy: "We typically respond within 1 business day. Your information is never shared.",
      successTitle: "Message sent!", successDesc: "Thanks for reaching out.", successBtn: "Send another message",
      errorMsg: "Something went wrong.",
      emails: [{ lbl: "General Inquiries", val: "hello@akj.ai" }, { lbl: "Enterprise Sales", val: "sales@akj.ai" }, { lbl: "Careers", val: "careers@akj.ai" }],
      services: ["AI Workflow Automation", "Predictive Analytics", "Conversational AI", "API Integrations", "General Inquiry"],
    },
    footer: {
      ctaEyebrow: "Let's build together", ctaTitle: "Ready to deploy your", ctaAccent: "AI ecosystem?",
      ctaDesc: "Book a free discovery call with Justin, Alexander, or Adrian.",
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
      description: "AKJ.ai ayuda a empresas a eliminar la complejidad operativa mediante ecosistemas de automatización impulsados por IA.",
      cta1: "Empezar", cta2: "Ver demo",
      stat1val: "ROI Probado", stat1lbl: "En cada proyecto",
      stat2val: "Masivo", stat2lbl: "Horas ahorradas al mes",
      dashTitle: "Motor IA Activo", dashLive: "En vivo", dashChart: "Rendimiento semanal",
      dashSaved: "Tiempo ahorrado", dashAcc: "Precisión", dashUp: "Uptime",
      notifTitle: "Nuevo lead cualificado", notifSub: "Hace 2 minutos · Automatizado",
    },
    services: {
      badge: "Lo que hacemos",
      title: "Todo lo que tu empresa necesita", titleAccent: "para escalar con IA",
      subtitle: "Desde tu primera automatización hasta un ecosistema de IA completo.",
      learnMore: "Saber más",
      items: [
        { tag: "Automatización", title: "Flujos de Trabajo IA", desc: "Elimina cuellos de botella manuales con automatización de procesos de extremo a extremo.", feats: ["Agentes IA autónomos 24/7", "Cobertura total de procesos", "Sin interrupción operativa"], metric: { val: "Masivo", lbl: "reducción de carga manual" } },
        { tag: "Inteligencia de Datos", title: "Analítica Predictiva", desc: "Transforma los datos de tu empresa en una ventaja estratégica.", feats: ["Dashboards en tiempo real", "Alertas proactivas", "Modelos personalizados"], metric: { val: "[X]×", lbl: "mejora en precisión" } },
        { tag: "Experiencia Cliente", title: "IA Conversacional", desc: "Despliega chatbots y agentes de voz IA que gestionan llamadas entrantes.", feats: ["Agentes de voz para llamadas", "Escalado humano inteligente", "Despliegue omnicanal"], metric: { val: "[X]%", lbl: "consultas resueltas" } },
        { tag: "Infraestructura", title: "Integraciones API", desc: "Conecta capacidades de IA con tu stack tecnológico actual.", feats: ["Soporte REST y GraphQL", "Seguridad SSO y RBAC", "SLA de 99.9% uptime"], metric: { val: "Rápido", lbl: "tiempo de integración" } },
      ],
      ctaEyebrow: "¿Listo para transformar tus operaciones?", ctaTitle: "Empieza a automatizar.", ctaAccent: "Escala sin límites.", ctaBtn1: "Habla con nuestro equipo", ctaBtn2: "Ver demo en vivo",
    },
    hiw: {
      badge: "Nuestro proceso", title: "Del primer encuentro a", titleAccent: "sistemas IA activos",
      subtitle: "Una metodología probada de cuatro fases.",
      steps: [
        { phase: "Descubrimiento", title: "Auditamos tus operaciones", desc: "Analizamos tus flujos de trabajo y puntos de dolor.", bullets: ["Mapeo de flujos actuales", "Evaluación de stack tecnológico", "Puntuación de oportunidades"] },
        { phase: "Arquitectura", title: "Diseñamos tu ecosistema", desc: "Creamos un ecosistema de IA a medida.", bullets: ["Arquitectura de agentes IA", "Blueprint de integración", "Hoja de ruta por fases"] },
        { phase: "Despliegue", title: "Construimos e integramos", desc: "Nuestros ingenieros despliegan tus flujos de IA.", bullets: ["Integración API segura", "Entornos de prueba paralelos", "Despliegue sin inactividad"] },
        { phase: "Optimización", title: "Monitorizamos y mejoramos", desc: "Tras el lanzamiento, monitorizamos el rendimiento continuamente.", bullets: ["Monitorización en tiempo real", "Reentrenamiento continuo", "Partnership de éxito dedicado"] },
      ],
      trust: [
        { val: "Semanas, no meses", lbl: "Tiempo medio hasta el primer despliegue" },
        { val: "Cero inactividad", lbl: "Enfoque de despliegue garantizado" },
        { val: "ROI continuo", lbl: "Optimización post-lanzamiento incluida" },
      ],
    },
    contact: {
      badge: "Contáctanos", title: "Construyamos tu", titleAccent: "ecosistema IA",
      subtitle: "Contacta directamente con uno de nuestros fundadores.",
      founders: "Contacta con un fundador",
      formTitle: "Envíanos un mensaje", formDesc: "Cuéntanos tu proyecto y te responderemos en menos de 24 horas.",
      name: "Nombre completo", email: "Email corporativo", company: "Empresa", service: "Servicio de interés", message: "Mensaje",
      namePh: "Ana García", emailPh: "ana@empresa.com", companyPh: "Mi Empresa", servicePh: "Selecciona un servicio...", messagePh: "Cuéntanos sobre tu proyecto...",
      submit: "Enviar mensaje", sending: "Enviando...",
      privacy: "Respondemos en 1 día laboral. Tu información nunca se comparte.",
      successTitle: "¡Mensaje enviado!", successDesc: "Gracias por contactarnos.", successBtn: "Enviar otro mensaje",
      errorMsg: "Algo salió mal.",
      emails: [{ lbl: "Consultas Generales", val: "hello@akj.ai" }, { lbl: "Ventas", val: "sales@akj.ai" }, { lbl: "Empleo", val: "careers@akj.ai" }],
      services: ["Automatización de Procesos", "Analítica Predictiva", "IA Conversacional", "Integraciones API", "Consulta general"],
    },
    footer: {
      ctaEyebrow: "Construyamos juntos", ctaTitle: "¿Listo para desplegar tu", ctaAccent: "ecosistema IA?",
      ctaDesc: "Reserva una llamada gratuita con Justin, Alexander o Adrian.",
      ctaBtn1: "Reservar llamada", ctaBtn2: "Explorar servicios →",
      brandDesc: "Ecosistemas de Automatización IA Empresarial. Fundado por Justin Kuijper, Alexander Janssen y Adrian Alvarez.",
      newsletter: "Mantente informado", nlPh: "tu@empresa.com", nlBtn: "Suscribirse", nlSuccess: "Suscrito. ¡Bienvenido!",
      colSolutions: "Soluciones", colNavigate: "Navegar", colLegal: "Legal",
      navLinks: ["Inicio", "Soluciones", "Cómo funciona", "Contacto"],
      legalLinks: ["Privacidad", "Términos", "Cookies", "Seguridad"],
      rights: "Todos los derechos reservados.", status: "Sistemas operativos activos",
    },
  },

  nl: {
    nav: { solutions: "Oplossingen", howItWorks: "Hoe het werkt", contact: "Contact", signIn: "Inloggen", getStarted: "Aan de slag" },
    hero: {
      badge: "Enterprise AI-Automatisering",
      line1: "Uw AI-partner", line2: "voor het volgende", line2accent: "decennium",
      description: "AKJ.ai helpt ondernemingen operationele complexiteit te elimineren via AI-gestuurde automatiseringsecosystemen.",
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
      subtitle: "Van uw eerste automatisering tot een volledig geïntegreerd AI-ecosysteem.",
      learnMore: "Meer weten",
      items: [
        { tag: "Procesautomatisering", title: "AI-werkstroomautomatisering", desc: "Elimineer handmatige knelpunten met end-to-end procesautomatisering via intelligente AI-agenten.", feats: ["Autonome AI-agenten 24/7", "Volledige procesdekking", "Geen verstoring van bestaande operaties"], metric: { val: "Enorm", lbl: "vermindering handmatige werklast" } },
        { tag: "Data-intelligentie", title: "Voorspellende analyse", desc: "Transformeer bedrijfsdata in strategisch concurrentievoordeel met voorspellende modellen.", feats: ["Realtime dashboards", "Proactieve waarschuwingen", "Aangepaste prognosemodellen"], metric: { val: "[X]×", lbl: "verbetering prognoseresultaten" } },
        { tag: "Klantervaring", title: "Conversationele AI", desc: "Implementeer chatbots en AI-spraakagenten voor inkomende gesprekken en leadkwalificatie.", feats: ["AI-spraakagenten voor telefoongesprekken", "Intelligente escalatie", "Omnichannel-inzet"], metric: { val: "[X]%", lbl: "vragen autonoom afgehandeld" } },
        { tag: "Infrastructuur", title: "API-integraties", desc: "Verbind AI naadloos met uw bestaande technologiestapel — CRM, ERP, HRIS.", feats: ["REST & GraphQL API-ondersteuning", "SSO & RBAC-beveiliging", "99,9% uptime SLA"], metric: { val: "Snel", lbl: "tijd tot integratie" } },
      ],
      ctaEyebrow: "Klaar om uw operaties te transformeren?", ctaTitle: "Begin met automatiseren.", ctaAccent: "Schaal zonder grenzen.", ctaBtn1: "Praat met ons team", ctaBtn2: "Bekijk een live demo",
    },
    hiw: {
      badge: "Ons proces", title: "Van eerste kennismaking tot", titleAccent: "live AI-systemen",
      subtitle: "Een bewezen vierfasenmethodologie.",
      steps: [
        { phase: "Ontdekking",    title: "We auditeren uw operaties",      desc: "Ons team voert een grondige audit uit van uw werkstromen en pijnpunten.", bullets: ["Huidige situatie in kaart brengen", "Beoordeling technologiestapel", "Automatiseringskansen scoren"] },
        { phase: "Architectuur", title: "We ontwerpen uw AI-ecosysteem",   desc: "We bouwen een op maat gemaakt AI-ecosysteem.", bullets: ["Aangepaste AI-agentarchitectuur", "End-to-end integratieblauwdruk", "Gefaseerde uitrolroadmap"] },
        { phase: "Implementatie", title: "We bouwen en integreren",         desc: "Onze engineers implementeren uw AI-werkstromen met grondige testcycli.", bullets: ["Veilige API-integratie", "Parallelle testomgeving", "Implementatie zonder downtime"] },
        { phase: "Optimalisatie", title: "We monitoren en verbeteren",      desc: "Na de lancering bewaken systemen continu de prestaties en optimaliseren ze.", bullets: ["Realtime prestatiebewaking", "Continue modelhertraining", "Toegewijde succesbegeleiding"] },
      ],
      trust: [
        { val: "Weken, geen maanden", lbl: "Gemiddelde tijd tot eerste implementatie" },
        { val: "Nul downtime",        lbl: "Gegarandeerde implementatiemethode" },
        { val: "Continue ROI",        lbl: "Post-lanceringsoptimalisatie inbegrepen" },
      ],
    },
    contact: {
      badge: "Neem contact op", title: "Laten we uw", titleAccent: "AI-ecosysteem bouwen",
      subtitle: "Neem rechtstreeks contact op met een van onze oprichters.",
      founders: "Neem contact op met een oprichter",
      formTitle: "Stuur ons een bericht", formDesc: "Vertel ons over uw project en we stellen binnen 24 uur een voorstel op maat voor.",
      name: "Volledige naam", email: "Zakelijk e-mailadres", company: "Bedrijf", service: "Dienst van interesse", message: "Bericht",
      namePh: "Jan de Vries", emailPh: "jan@bedrijf.nl", companyPh: "Mijn Bedrijf", servicePh: "Selecteer een dienst…", messagePh: "Vertel ons over uw project…",
      submit: "Bericht verzenden", sending: "Verzenden…",
      privacy: "We reageren doorgaans binnen 1 werkdag. Uw gegevens worden nooit gedeeld.",
      successTitle: "Bericht verzonden!", successDesc: "Bedankt voor uw bericht.", successBtn: "Nog een bericht sturen",
      errorMsg: "Er is iets misgegaan.",
      emails: [{ lbl: "Algemene vragen", val: "hello@akj.ai" }, { lbl: "Zakelijke verkoop", val: "sales@akj.ai" }, { lbl: "Vacatures", val: "careers@akj.ai" }],
      services: ["AI-werkstroomautomatisering", "Voorspellende analyse", "Conversationele AI", "API-integraties", "Algemene vraag"],
    },
    footer: {
      ctaEyebrow: "Laten we samen bouwen", ctaTitle: "Klaar om uw", ctaAccent: "AI-ecosysteem te implementeren?",
      ctaDesc: "Boek een gratis ontdekkingsgesprek met Justin, Alexander of Adrian.",
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

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("arp-theme") || "light"; } catch { return "light"; }
  });

  const toggleTheme = () => setTheme((t) => {
    const next = t === "light" ? "dark" : "light";
    try { localStorage.setItem("arp-theme", next); } catch {}
    return next;
  });

  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("arp-lang") || "en"; } catch { return "en"; }
  });

  const changeLang = (l) => {
    setLang(l);
    try { localStorage.setItem("arp-lang", l); } catch {}
  };

  const t = translations[lang] || translations.en;

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