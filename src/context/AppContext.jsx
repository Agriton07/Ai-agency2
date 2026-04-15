import { useState, useEffect } from "react";
import { AppContext } from "./context";

const translations = {
  en: {
    nav: {
      solutions: "Solutions",
      howItWorks: "How It Works",
      clients: "Clients",
      useCases: "Use Cases",
      pricing: "Pricing",
      faq: "FAQ",
      about: "About",
      contact: "Contact",
      signIn: "Sign In",
      getStarted: "Book a Call",
    },
    hero: {
      badge: "AI Automation Agency",
      line1: "Your business,",
      line2: "powered by",
      line2accent: "AI.",
      description:
        "We build AI chatbots, voice agents, and automation systems that eliminate manual work, capture more leads, and scale your business — without hiring more people.",
      cta1: "Book a Free Call",
      cta2: "See How It Works",
      stat1val: "1–3 weeks",
      stat1lbl: "Average time to go live",
      stat2val: "60%+",
      stat2lbl: "Reduction in manual work",
      dashTitle: "AI System Active",
      dashLive: "Live",
      dashChart: "Weekly performance",
      dashSaved: "Time Saved",
      dashAcc: "Accuracy",
      dashUp: "Uptime",
      notifTitle: "New qualified lead captured",
      notifSub: "2 minutes ago · Automated",
    },
    services: {
      badge: "What we build",
      title: "AI systems that work",
      titleAccent: "for your business",
      subtitle:
        "From your first chatbot to a fully connected AI operation — we build it, integrate it, and make sure it delivers.",
      learnMore: "Learn more",
      items: [
        {
          tag: "AI Chatbots",
          title: "Chatbots for Web, WhatsApp & Social",
          desc:
            "Deploy intelligent chatbots that answer questions, qualify leads, and book appointments — on your website, WhatsApp, Instagram, and more.",
          feats: [
            "24/7 instant customer responses",
            "Lead qualification & auto-routing",
            "WhatsApp, Instagram & web ready",
          ],
          metric: { val: "24/7", lbl: "always-on customer support" },
        },
        {
          tag: "Voice AI",
          title: "AI Voice Agents for Phone Calls",
          desc:
            "Automate inbound and outbound calls. Your AI voice agent books appointments, answers questions, and handles follow-ups — without a single ring going unanswered.",
          feats: [
            "Inbound & outbound call handling",
            "Natural voice conversations",
            "CRM sync after every call",
          ],
          metric: { val: "100%", lbl: "calls answered, zero missed" },
        },
        {
          tag: "Automation",
          title: "Workflow & Process Automation",
          desc:
            "Eliminate repetitive manual tasks across your entire operation. From triggered emails to multi-step automations — set it once, let it run forever.",
          feats: [
            "End-to-end process automation",
            "Custom trigger + action flows",
            "Connects 100+ business tools",
          ],
          metric: { val: "60%+", lbl: "reduction in manual workload" },
        },
        {
          tag: "Integrations",
          title: "API & Tool Integrations",
          desc:
            "Connect your payment system, CRM, project manager, and comms tools so data flows where it needs to go — automatically. Stripe, Notion, WhatsApp, HubSpot, and more.",
          feats: [
            "Stripe, Notion, HubSpot & more",
            "Custom API development",
            "Zero manual data transfer",
          ],
          metric: { val: "100+", lbl: "tools we can connect" },
        },
      ],
      moreTitle: "More capabilities we offer",
      moreItems: [
        {
          icon: "📊",
          tag: "CRM & Sales",
          title: "CRM & Lead Management",
          desc:
            "Leads from all channels automatically captured, scored, tagged, and dropped into the right follow-up sequence. No more data entry, no more lost leads.",
          feats: ["Multi-channel lead capture", "Auto scoring & tagging", "Smart follow-up sequences"],
        },
        {
          icon: "📅",
          tag: "Booking Systems",
          title: "AI Appointment Booking",
          desc:
            "Let your clients book, reschedule, and receive reminders automatically — no back-and-forth emails or phone calls just to set a meeting.",
          feats: ["24/7 self-service booking", "Automated reminders", "Google & Outlook sync"],
        },
        {
          icon: "🤖",
          tag: "Custom AI Agents",
          title: "Custom AI Agents",
          desc:
            "Bespoke AI agents trained on your business documents, logic, and workflows — acting as a tireless digital team member tailored to your exact operation.",
          feats: ["Business-specific training", "Document & knowledge AI", "Multi-step autonomous agents"],
        },
      ],
      ctaEyebrow: "Ready to automate your business?",
      ctaTitle: "Let's build your",
      ctaAccent: "AI system.",
      ctaBtn1: "Book a free call",
      ctaBtn2: "See pricing →",
    },
    hiw: {
      badge: "Our process",
      title: "From first call to",
      titleAccent: "live AI system",
      subtitle: "A clear four-step process — no surprises, no delays.",
      steps: [
        {
          phase: "Discovery",
          title: "We learn your business",
          desc:
            "We start with a free discovery call to understand your workflows, bottlenecks, and goals. No jargon, just a clear conversation about what slows you down.",
          bullets: [
            "Free 30-minute discovery call",
            "Workflow and pain point mapping",
            "Automation opportunity scoring",
          ],
        },
        {
          phase: "Proposal",
          title: "We design your solution",
          desc:
            "We send you a clear proposal: what we'll build, how it'll work, what it costs, and when it goes live. No vague scope, no hidden extras.",
          bullets: [
            "Custom AI system architecture",
            "Fixed-price proposal (no surprises)",
            "Phased delivery roadmap",
          ],
        },
        {
          phase: "Build & Integrate",
          title: "We build and connect everything",
          desc:
            "Our team builds your AI system and integrates it into your existing tools. You test it with us before it goes live.",
          bullets: [
            "Full build + integration",
            "Parallel testing before launch",
            "Zero-downtime deployment",
          ],
        },
        {
          phase: "Launch & Support",
          title: "We launch and stay with you",
          desc:
            "After launch, we monitor your system for 30 days and make adjustments as needed. You have direct access to us at any time.",
          bullets: [
            "30-day post-launch monitoring",
            "Real-time performance tracking",
            "Direct access to our team",
          ],
        },
      ],
      trust: [
        { val: "1–3 weeks", lbl: "Average time to first deployment" },
        { val: "Zero downtime", lbl: "Guaranteed deployment approach" },
        { val: "30 days", lbl: "Post-launch support included" },
      ],
    },
    useCases: {
      badge: "Use Cases",
      title: "What businesses",
      titleAccent: "actually automate",
      subtitle:
        "Real scenarios, real outcomes. No industry is off-limits — if you have repetitive processes, we can automate them.",
      items: [
        {
          icon: "💬",
          tag: "Sales & Lead Gen",
          title: "Never Miss a Lead Again",
          scenario:
            "A prospect messages your website at 11pm. Your AI chatbot instantly responds, qualifies the lead, and books a discovery call — before you even wake up.",
          outcome: "More leads captured. Zero manual work.",
        },
        {
          icon: "📞",
          tag: "Booking & Operations",
          title: "Phone Calls on Autopilot",
          scenario:
            "Customers call to book appointments. Your AI voice agent picks up every call, checks availability, confirms the booking, and sends a reminder — 24/7, no hold music.",
          outcome: "Zero missed calls. No staff needed.",
        },
        {
          icon: "🤖",
          tag: "Customer Support",
          title: "Support That Never Sleeps",
          scenario:
            "Your WhatsApp and Instagram DMs get 200 messages a day. An AI agent handles FAQs, order status, and complaints instantly — escalating only complex cases to your team.",
          outcome: "80% of queries resolved automatically.",
        },
        {
          icon: "📊",
          tag: "CRM & Pipeline",
          title: "Your CRM, Finally Organized",
          scenario:
            "Leads from ads, website, and WhatsApp automatically land in your CRM, get tagged, scored, and dropped into the right follow-up sequence — zero data entry.",
          outcome: "Clean pipeline. No leads fall through.",
        },
        {
          icon: "⚡",
          tag: "Workflow Automation",
          title: "Admin That Runs Itself",
          scenario:
            "When a deal closes, the system sends the contract, creates the project in Notion, invoices via Stripe, and notifies your Slack — triggered by a single event.",
          outcome: "Hours of admin saved every week.",
        },
        {
          icon: "🔗",
          tag: "API Integrations",
          title: "All Your Tools, Connected",
          scenario:
            "Your payment tool, booking calendar, email platform, and CRM don't talk to each other. We connect them all so data flows automatically — no copy-pasting ever again.",
          outcome: "Everything synced. Nothing duplicated.",
        },
      ],
      ctaText: "See a use case that fits your business?",
      ctaBtn: "Book a free call",
    },
    socialProof: {
      badge: "Trusted by teams",
      title: "The partners who",
      titleAccent: "believe in us",
      subtitle:
        "We're building trust with forward-thinking businesses. Be among the first to work with us.",
      logoSlot: "Your logo",
      logoNote: "Client logos coming soon — reach out to become a design partner.",
      trustNote:
        "Testimonials will appear here once we launch publicly. Be the first to work with us.",
    },
    about: {
      badge: "Who we are",
      title: "3 students.",
      titleAccent: "Serious results.",
      subtitle:
        "We're Justin, Alexander, and Adrian — three university students who got tired of watching businesses waste hours on tasks that AI can handle in seconds.",
      story:
        "We built AKJ.ai to prove that real AI automation doesn't need enterprise budgets or six-month timelines. We move fast, price fairly, and stay with you until your systems actually work.",
      values: [
        { icon: "⚡", title: "Fast delivery", desc: "Most projects go live in 1–3 weeks, not months." },
        { icon: "💡", title: "Transparent pricing", desc: "Fixed-price projects. No hidden fees, no vague contracts." },
        { icon: "🤝", title: "Real support", desc: "Direct access to the founders who built your system." },
      ],
      founders: [
        { name: "Justin Kuijper", role: "Co-Founder", initials: "JK" },
        { name: "Alexander Janssen", role: "Co-Founder", initials: "AJ" },
        { name: "Adrian Alvarez", role: "Co-Founder", initials: "AA" },
      ],
      ctaLabel: "Book a free discovery call",
    },
    pricing: {
      badge: "Pricing",
      title: "Simple,",
      titleAccent: "transparent pricing",
      subtitle:
        "Fixed-price projects. No hidden fees, no vague estimates. Pick your scope and we'll build it.",
      note: "All prices are one-time project fees. Monthly retainer & support packages available on request.",
      popularBadge: "Most popular",
      tiers: [
        {
          name: "Starter",
          desc: "Perfect for your first AI automation — one clear problem solved, fast.",
          priceLabel: "€150 – €400",
          priceSub: "One-time project fee",
          custom: true,
          features: [
            "1 AI chatbot or automation flow",
            "Website, WhatsApp, or email channel",
            "Standard integrations (CRM, Notion, email)",
            "1 round of revisions included",
            "Live in under 7 days",
          ],
          cta: "Get Started",
        },
        {
          name: "Growth",
          desc: "Multiple automations working together to save hours every week.",
          priceLabel: "€400 – €900",
          priceSub: "One-time project fee",
          custom: true,
          features: [
            "Up to 3 automations or AI systems",
            "AI voice agent or multi-channel chatbot",
            "CRM integration + lead management",
            "Priority support & 2 revision rounds",
            "Live in 1–2 weeks",
          ],
          cta: "Get Started",
        },
        {
          name: "Business",
          desc: "A full AI ecosystem — multiple systems integrated and optimized for scale.",
          priceLabel: "€900 – €2,000",
          priceSub: "One-time project fee",
          custom: true,
          features: [
            "Full AI workflow redesign",
            "Custom AI agents + voice + chatbots",
            "CRM, booking & API integrations",
            "30-day post-launch monitoring",
            "Dedicated founder support",
          ],
          cta: "Book a Call",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      title: "Questions we",
      titleAccent: "get all the time",
      subtitle: "Straight answers. No technical jargon.",
      items: [
        {
          q: "What exactly is AI automation?",
          a: "AI automation means replacing repetitive, manual tasks with intelligent software that runs 24/7. Think: a chatbot answering customer questions instantly, a voice agent booking appointments over the phone, or a workflow that sends follow-ups automatically — no human input needed after setup.",
        },
        {
          q: "How long does it take to go live?",
          a: "Simple chatbots and automations go live in under a week. More complex systems (multi-channel AI, CRM integrations, voice agents) take 1–3 weeks. We give you a clear timeline before we start — no surprises.",
        },
        {
          q: "Do I need technical knowledge to use this?",
          a: "None at all. We handle setup, integration, and testing. You manage your business — we manage the AI. You'll get a simple interface and a direct line to our team for any adjustments.",
        },
        {
          q: "Is this affordable for a small business?",
          a: "Yes — that's exactly why we built it this way. Projects start at €150. Compare that to one month of a part-time hire, and the AI works 24/7 without breaks or sick days. Most clients see positive ROI within the first month.",
        },
        {
          q: "What results can I expect?",
          a: "Most clients see a 40–80% reduction in repetitive manual work, faster customer response times (from hours to seconds), and more leads captured automatically. Every system is designed to deliver measurable, visible impact.",
        },
        {
          q: "Do you work with any type of business?",
          a: "Yes. Our systems are industry-agnostic. E-commerce stores, restaurants, real estate agencies, law firms, SaaS companies, clinics — if your business has repetitive processes, customer communication, or a sales pipeline, we can automate it.",
        },
        {
          q: "What happens after the project is finished?",
          a: "Every project includes 30 days of post-launch monitoring and adjustments. We stay until it works properly. After that, ongoing maintenance and support packages are available if you want us to keep optimizing.",
        },
      ],
    },
    contact: {
      badge: "Contact us",
      title: "Let's build your",
      titleAccent: "AI system",
      subtitle:
        "Book a free 30-minute discovery call or send us a message. We respond within 24 hours.",
      founders: "Reach a founder directly",
      formTitle: "Send us a message",
      formDesc:
        "Tell us about your business and what you want to automate. We'll send a tailored proposal within 24 hours.",
      name: "Full name",
      email: "Work email",
      company: "Company",
      service: "Service of interest",
      message: "Message",
      namePh: "Jane Smith",
      emailPh: "jane@company.com",
      companyPh: "Acme Corp",
      servicePh: "Select a service…",
      messagePh: "Tell us what you want to automate…",
      submit: "Send message",
      sending: "Sending…",
      privacy: "We typically respond within 24 hours. Your information is never shared.",
      successTitle: "Message sent!",
      successDesc: "Thanks for reaching out. We'll be in touch within 24 hours.",
      successBtn: "Send another message",
      errorMsg: "Something went wrong. Please try again or email us directly.",
      emails: [
        { lbl: "General Inquiries", val: "hello@akj.ai" },
        { lbl: "New Projects", val: "sales@akj.ai" },
        { lbl: "Careers", val: "careers@akj.ai" },
      ],
      services: [
        "AI Chatbot (Web / WhatsApp / Social)",
        "AI Voice Agent",
        "Workflow Automation",
        "CRM & Lead Management",
        "AI Appointment Booking",
        "API Integrations",
        "Custom AI Agent",
        "General Inquiry",
      ],
    },
    footer: {
      ctaEyebrow: "Ready to automate?",
      ctaTitle: "Book a free",
      ctaAccent: "discovery call",
      ctaDesc:
        "30 minutes with Justin, Alexander, or Adrian. We'll map out exactly what AI can do for your business.",
      ctaBtn1: "Book a free call",
      ctaBtn2: "See our services →",
      brandDesc:
        "AI automation agency built by Justin Kuijper, Alexander Janssen, and Adrian Alvarez.",
      newsletter: "Stay in the loop",
      nlPh: "your@company.com",
      nlBtn: "Subscribe",
      nlSuccess: "You're in. Welcome aboard.",
      colSolutions: "Solutions",
      colNavigate: "Navigate",
      colLegal: "Legal",
      navLinks: ["Home", "Use Cases", "Pricing", "FAQ", "Contact"],
      legalLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
      rights: "All rights reserved.",
      status: "All systems operational",
    },
  },

  es: {
    nav: {
      solutions: "Soluciones",
      howItWorks: "Cómo funciona",
      clients: "Clientes",
      useCases: "Casos de uso",
      pricing: "Precios",
      faq: "FAQ",
      about: "Nosotros",
      contact: "Contacto",
      signIn: "Iniciar sesión",
      getStarted: "Reservar llamada",
    },
    hero: {
      badge: "Agencia de Automatización IA",
      line1: "Tu negocio,",
      line2: "impulsado por",
      line2accent: "IA.",
      description:
        "Construimos chatbots, agentes de voz y sistemas de automatización que eliminan el trabajo manual, capturan más leads y escalan tu negocio — sin contratar más personal.",
      cta1: "Reservar llamada gratis",
      cta2: "Ver cómo funciona",
      stat1val: "1–3 semanas",
      stat1lbl: "Tiempo medio hasta el lanzamiento",
      stat2val: "60%+",
      stat2lbl: "Reducción de trabajo manual",
      dashTitle: "Sistema IA Activo",
      dashLive: "En vivo",
      dashChart: "Rendimiento semanal",
      dashSaved: "Tiempo ahorrado",
      dashAcc: "Precisión",
      dashUp: "Uptime",
      notifTitle: "Nuevo lead cualificado",
      notifSub: "Hace 2 minutos · Automatizado",
    },
    services: {
      badge: "Lo que construimos",
      title: "Sistemas IA que trabajan",
      titleAccent: "para tu negocio",
      subtitle:
        "Desde tu primer chatbot hasta una operación completamente automatizada — lo construimos, lo integramos y nos aseguramos de que funcione.",
      learnMore: "Saber más",
      items: [
        {
          tag: "Chatbots IA",
          title: "Chatbots para Web, WhatsApp y Redes",
          desc: "Despliega chatbots inteligentes que responden preguntas, cualifican leads y reservan citas en tu web, WhatsApp, Instagram y más.",
          feats: ["Respuestas instantáneas 24/7", "Cualificación y derivación de leads", "WhatsApp, Instagram y web"],
          metric: { val: "24/7", lbl: "atención al cliente continua" },
        },
        {
          tag: "Voz IA",
          title: "Agentes de Voz IA para Llamadas",
          desc: "Automatiza llamadas entrantes y salientes. Tu agente de voz reserva citas, responde preguntas y gestiona seguimientos sin perder ninguna llamada.",
          feats: ["Gestión de llamadas entrantes y salientes", "Conversaciones de voz naturales", "Sincronización con CRM"],
          metric: { val: "100%", lbl: "llamadas atendidas, cero perdidas" },
        },
        {
          tag: "Automatización",
          title: "Automatización de Flujos de Trabajo",
          desc: "Elimina tareas manuales repetitivas en toda tu operación. Desde emails disparados hasta automatizaciones de varios pasos — configúralo una vez y déjalo funcionar.",
          feats: ["Automatización de procesos extremo a extremo", "Flujos de acción personalizados", "Conecta más de 100 herramientas"],
          metric: { val: "60%+", lbl: "reducción de carga manual" },
        },
        {
          tag: "Integraciones",
          title: "Integraciones API y de Herramientas",
          desc: "Conecta tu sistema de pago, CRM, gestor de proyectos y herramientas de comunicación para que los datos fluyan solos. Stripe, Notion, WhatsApp, HubSpot y más.",
          feats: ["Stripe, Notion, HubSpot y más", "Desarrollo de API personalizado", "Sin transferencia manual de datos"],
          metric: { val: "100+", lbl: "herramientas que podemos conectar" },
        },
      ],
      moreTitle: "Más capacidades que ofrecemos",
      moreItems: [
        {
          icon: "📊",
          tag: "CRM y Ventas",
          title: "CRM y Gestión de Leads",
          desc: "Leads de todos los canales capturados, puntuados, etiquetados y colocados automáticamente en la secuencia de seguimiento correcta. Sin entrada de datos, sin leads perdidos.",
          feats: ["Captura multicanal de leads", "Puntuación y etiquetado automático", "Secuencias de seguimiento inteligentes"],
        },
        {
          icon: "📅",
          tag: "Sistemas de Reserva",
          title: "Reserva de Citas con IA",
          desc: "Permite que tus clientes reserven, reprogramen y reciban recordatorios automáticamente. Sin llamadas ni emails interminables.",
          feats: ["Reserva self-service 24/7", "Recordatorios automáticos", "Sincronización con Google y Outlook"],
        },
        {
          icon: "🤖",
          tag: "Agentes IA Personalizados",
          title: "Agentes IA a Medida",
          desc: "Agentes IA entrenados con tus documentos, lógica y flujos de trabajo — actuando como un empleado digital incansable adaptado a tu operación.",
          feats: ["Entrenamiento específico para tu negocio", "IA de documentos y base de conocimiento", "Agentes autónomos de múltiples pasos"],
        },
      ],
      ctaEyebrow: "¿Listo para automatizar tu negocio?",
      ctaTitle: "Vamos a construir tu",
      ctaAccent: "sistema IA.",
      ctaBtn1: "Reservar llamada gratis",
      ctaBtn2: "Ver precios →",
    },
    hiw: {
      badge: "Nuestro proceso",
      title: "De la primera llamada a",
      titleAccent: "sistemas IA en vivo",
      subtitle: "Un proceso claro de cuatro pasos — sin sorpresas, sin retrasos.",
      steps: [
        {
          phase: "Descubrimiento",
          title: "Conocemos tu negocio",
          desc: "Empezamos con una llamada de descubrimiento gratuita para entender tus flujos, cuellos de botella y objetivos. Sin tecnicismos.",
          bullets: ["Llamada de descubrimiento gratuita de 30 min", "Mapeo de flujos y puntos de dolor", "Puntuación de oportunidades de automatización"],
        },
        {
          phase: "Propuesta",
          title: "Diseñamos tu solución",
          desc: "Te enviamos una propuesta clara: qué construiremos, cómo funcionará, cuánto cuesta y cuándo entra en producción.",
          bullets: ["Arquitectura del sistema IA personalizado", "Propuesta a precio fijo (sin sorpresas)", "Hoja de ruta de entrega por fases"],
        },
        {
          phase: "Construcción",
          title: "Construimos e integramos todo",
          desc: "Nuestro equipo construye tu sistema IA y lo integra con tus herramientas actuales. Tú lo pruebas con nosotros antes del lanzamiento.",
          bullets: ["Construcción e integración completa", "Pruebas paralelas antes del lanzamiento", "Despliegue sin tiempo de inactividad"],
        },
        {
          phase: "Lanzamiento",
          title: "Lanzamos y nos quedamos contigo",
          desc: "Tras el lanzamiento monitorizamos tu sistema durante 30 días y hacemos ajustes. Tienes acceso directo a nosotros en todo momento.",
          bullets: ["30 días de monitorización post-lanzamiento", "Seguimiento de rendimiento en tiempo real", "Acceso directo a nuestro equipo"],
        },
      ],
      trust: [
        { val: "1–3 semanas", lbl: "Tiempo medio hasta el primer despliegue" },
        { val: "Cero inactividad", lbl: "Enfoque de despliegue garantizado" },
        { val: "30 días", lbl: "Soporte post-lanzamiento incluido" },
      ],
    },
    useCases: {
      badge: "Casos de uso",
      title: "Lo que los negocios",
      titleAccent: "realmente automatizan",
      subtitle: "Escenarios reales, resultados reales. Ningún sector está fuera de límites.",
      items: [
        {
          icon: "💬",
          tag: "Ventas y Leads",
          title: "No pierdas más leads",
          scenario: "Un prospecto escribe a tu web a las 11 de la noche. Tu chatbot IA responde al instante, cualifica el lead y reserva una llamada — antes de que despiertes.",
          outcome: "Más leads capturados. Cero trabajo manual.",
        },
        {
          icon: "📞",
          tag: "Reservas y Operaciones",
          title: "Llamadas en piloto automático",
          scenario: "Los clientes llaman para reservar citas. Tu agente de voz atiende cada llamada, comprueba la disponibilidad, confirma la reserva y envía recordatorio — 24/7.",
          outcome: "Cero llamadas perdidas. Sin personal necesario.",
        },
        {
          icon: "🤖",
          tag: "Atención al Cliente",
          title: "Soporte que nunca duerme",
          scenario: "Tu WhatsApp e Instagram reciben 200 mensajes al día. Un agente IA gestiona las FAQs, estado de pedidos y reclamaciones — escalando solo los casos complejos.",
          outcome: "El 80% de consultas resueltas automáticamente.",
        },
        {
          icon: "📊",
          tag: "CRM y Pipeline",
          title: "Tu CRM, finalmente organizado",
          scenario: "Los leads de anuncios, web y WhatsApp aterrizan solos en tu CRM, se etiquetan, puntúan y entran en la secuencia de seguimiento correcta — sin entrada de datos.",
          outcome: "Pipeline limpio. Ningún lead se pierde.",
        },
        {
          icon: "⚡",
          tag: "Automatización",
          title: "Administración que se gestiona sola",
          scenario: "Cuando se cierra un deal, el sistema envía el contrato, crea el proyecto en Notion, factura en Stripe y notifica en Slack — todo con un solo evento.",
          outcome: "Horas de administración ahorradas cada semana.",
        },
        {
          icon: "🔗",
          tag: "Integraciones API",
          title: "Todas tus herramientas conectadas",
          scenario: "Tu plataforma de pago, calendario, email y CRM no se comunican entre sí. Los conectamos todos para que los datos fluyan solos — sin copiar y pegar nunca más.",
          outcome: "Todo sincronizado. Nada duplicado.",
        },
      ],
      ctaText: "¿Ves un caso de uso que encaja con tu negocio?",
      ctaBtn: "Reservar llamada gratis",
    },
    socialProof: {
      badge: "Confianza de equipos",
      title: "Los partners que",
      titleAccent: "confían en nosotros",
      subtitle: "Construimos confianza con negocios innovadores. Sé de los primeros en trabajar con nosotros.",
      logoSlot: "Tu logo",
      logoNote: "Logos de clientes próximamente — contáctanos para ser partner de diseño.",
      trustNote: "Los testimonios aparecerán aquí al lanzar. Sé el primero en trabajar con nosotros.",
    },
    about: {
      badge: "Quiénes somos",
      title: "3 estudiantes.",
      titleAccent: "Resultados reales.",
      subtitle: "Somos Justin, Alexander y Adrian — tres estudiantes universitarios que se hartaron de ver negocios perdiendo horas en tareas que la IA puede hacer en segundos.",
      story: "Construimos AKJ.ai para demostrar que la automatización IA real no necesita presupuestos de gran empresa ni plazos de seis meses. Somos rápidos, transparentes en precios y nos quedamos hasta que tus sistemas funcionan.",
      values: [
        { icon: "⚡", title: "Entrega rápida", desc: "La mayoría de proyectos se lanzan en 1–3 semanas." },
        { icon: "💡", title: "Precios transparentes", desc: "Proyectos a precio fijo. Sin costes ocultos." },
        { icon: "🤝", title: "Soporte real", desc: "Acceso directo a los fundadores que construyeron tu sistema." },
      ],
      founders: [
        { name: "Justin Kuijper", role: "Co-Fundador", initials: "JK" },
        { name: "Alexander Janssen", role: "Co-Fundador", initials: "AJ" },
        { name: "Adrian Alvarez", role: "Co-Fundador", initials: "AA" },
      ],
      ctaLabel: "Reservar llamada de descubrimiento",
    },
    pricing: {
      badge: "Precios",
      title: "Precios",
      titleAccent: "simples y transparentes",
      subtitle: "Proyectos a precio fijo. Sin costes ocultos, sin estimaciones vagas. Elige tu alcance y lo construimos.",
      note: "Todos los precios son tarifas de proyecto únicas. Paquetes de mantenimiento mensual disponibles bajo petición.",
      popularBadge: "Más popular",
      tiers: [
        {
          name: "Starter",
          desc: "Perfecto para tu primera automatización IA — un problema concreto resuelto, rápido.",
          priceLabel: "€150 – €400",
          priceSub: "Tarifa de proyecto única",
          custom: true,
          features: [
            "1 chatbot IA o flujo de automatización",
            "Canal web, WhatsApp o email",
            "Integraciones estándar (CRM, Notion, email)",
            "1 ronda de revisiones incluida",
            "En producción en menos de 7 días",
          ],
          cta: "Empezar",
        },
        {
          name: "Growth",
          desc: "Varias automatizaciones trabajando juntas para ahorrar horas cada semana.",
          priceLabel: "€400 – €900",
          priceSub: "Tarifa de proyecto única",
          custom: true,
          features: [
            "Hasta 3 automatizaciones o sistemas IA",
            "Agente de voz IA o chatbot multicanal",
            "Integración CRM + gestión de leads",
            "Soporte prioritario y 2 rondas de revisión",
            "En producción en 1–2 semanas",
          ],
          cta: "Empezar",
        },
        {
          name: "Business",
          desc: "Un ecosistema IA completo — múltiples sistemas integrados y optimizados para escalar.",
          priceLabel: "€900 – €2.000",
          priceSub: "Tarifa de proyecto única",
          custom: true,
          features: [
            "Rediseño completo de flujos de trabajo con IA",
            "Agentes IA personalizados + voz + chatbots",
            "CRM, reservas e integraciones API",
            "30 días de monitorización post-lanzamiento",
            "Soporte dedicado de los fundadores",
          ],
          cta: "Reservar llamada",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      title: "Preguntas que",
      titleAccent: "nos hacen siempre",
      subtitle: "Respuestas claras. Sin tecnicismos.",
      items: [
        {
          q: "¿Qué es exactamente la automatización IA?",
          a: "La automatización IA significa reemplazar tareas manuales repetitivas con software inteligente que funciona 24/7. Por ejemplo: un chatbot que responde preguntas de clientes al instante, un agente de voz que reserva citas por teléfono, o un flujo que envía seguimientos automáticamente — sin intervención humana tras la configuración.",
        },
        {
          q: "¿Cuánto tiempo tarda en estar en producción?",
          a: "Los chatbots y automatizaciones simples están listos en menos de una semana. Los sistemas más complejos (IA multicanal, integraciones CRM, agentes de voz) tardan 1–3 semanas. Te damos un plazo claro antes de empezar — sin sorpresas.",
        },
        {
          q: "¿Necesito conocimientos técnicos?",
          a: "Ninguno. Nosotros nos encargamos de la configuración, integración y pruebas. Tú gestionas tu negocio — nosotros gestionamos la IA. Tendrás una interfaz sencilla y acceso directo a nuestro equipo para cualquier ajuste.",
        },
        {
          q: "¿Es asequible para una pequeña empresa?",
          a: "Sí, por eso lo construimos así. Los proyectos empiezan desde €150. Compáralo con un mes de un empleado a tiempo parcial, y la IA trabaja 24/7 sin descansos ni bajas. La mayoría de clientes ven un ROI positivo en el primer mes.",
        },
        {
          q: "¿Qué resultados puedo esperar?",
          a: "La mayoría de clientes ven una reducción del 40–80% en el trabajo manual repetitivo, tiempos de respuesta más rápidos (de horas a segundos) y más leads capturados automáticamente. Cada sistema está diseñado para generar un impacto medible y visible.",
        },
        {
          q: "¿Trabajáis con cualquier tipo de negocio?",
          a: "Sí. Nuestros sistemas son agnósticos al sector. E-commerce, restaurantes, inmobiliarias, despachos de abogados, empresas SaaS, clínicas — si tu negocio tiene procesos repetitivos, comunicación con clientes o un pipeline de ventas, lo podemos automatizar.",
        },
        {
          q: "¿Qué pasa después de que el proyecto está terminado?",
          a: "Cada proyecto incluye 30 días de monitorización y ajustes post-lanzamiento. Nos quedamos hasta que funcione correctamente. Después, hay paquetes de mantenimiento y soporte continuo disponibles.",
        },
      ],
    },
    contact: {
      badge: "Contáctanos",
      title: "Vamos a construir tu",
      titleAccent: "sistema IA",
      subtitle: "Reserva una llamada de descubrimiento gratuita o envíanos un mensaje. Respondemos en 24 horas.",
      founders: "Contacta con un fundador directamente",
      formTitle: "Envíanos un mensaje",
      formDesc: "Cuéntanos sobre tu negocio y qué quieres automatizar. Te enviaremos una propuesta personalizada en 24 horas.",
      name: "Nombre completo",
      email: "Email corporativo",
      company: "Empresa",
      service: "Servicio de interés",
      message: "Mensaje",
      namePh: "Ana García",
      emailPh: "ana@empresa.com",
      companyPh: "Mi Empresa",
      servicePh: "Selecciona un servicio...",
      messagePh: "Cuéntanos qué quieres automatizar...",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      privacy: "Respondemos en 24 horas. Tu información nunca se comparte.",
      successTitle: "¡Mensaje enviado!",
      successDesc: "Gracias por contactarnos. Te responderemos en 24 horas.",
      successBtn: "Enviar otro mensaje",
      errorMsg: "Algo salió mal. Inténtalo de nuevo o escríbenos directamente.",
      emails: [
        { lbl: "Consultas Generales", val: "hello@akj.ai" },
        { lbl: "Nuevos Proyectos", val: "sales@akj.ai" },
        { lbl: "Empleo", val: "careers@akj.ai" },
      ],
      services: [
        "Chatbot IA (Web / WhatsApp / Redes)",
        "Agente de Voz IA",
        "Automatización de Procesos",
        "CRM y Gestión de Leads",
        "Reserva de Citas con IA",
        "Integraciones API",
        "Agente IA Personalizado",
        "Consulta General",
      ],
    },
    footer: {
      ctaEyebrow: "¿Listo para automatizar?",
      ctaTitle: "Reserva una llamada",
      ctaAccent: "de descubrimiento gratuita",
      ctaDesc: "30 minutos con Justin, Alexander o Adrian. Trazaremos exactamente qué puede hacer la IA por tu negocio.",
      ctaBtn1: "Reservar llamada gratis",
      ctaBtn2: "Ver nuestros servicios →",
      brandDesc: "Agencia de automatización IA fundada por Justin Kuijper, Alexander Janssen y Adrian Alvarez.",
      newsletter: "Mantente informado",
      nlPh: "tu@empresa.com",
      nlBtn: "Suscribirse",
      nlSuccess: "¡Suscrito! Bienvenido.",
      colSolutions: "Soluciones",
      colNavigate: "Navegar",
      colLegal: "Legal",
      navLinks: ["Inicio", "Casos de uso", "Precios", "FAQ", "Contacto"],
      legalLinks: ["Privacidad", "Términos", "Cookies", "Seguridad"],
      rights: "Todos los derechos reservados.",
      status: "Sistemas operativos activos",
    },
  },

  nl: {
    nav: {
      solutions: "Oplossingen",
      howItWorks: "Hoe het werkt",
      clients: "Klanten",
      useCases: "Toepassingen",
      pricing: "Prijzen",
      faq: "FAQ",
      about: "Over ons",
      contact: "Contact",
      signIn: "Inloggen",
      getStarted: "Boek een gesprek",
    },
    hero: {
      badge: "AI Automatiseringsbureau",
      line1: "Uw bedrijf,",
      line2: "aangedreven door",
      line2accent: "AI.",
      description:
        "Wij bouwen AI-chatbots, spraakagenten en automatiseringssystemen die handmatig werk elimineren, meer leads vastleggen en uw bedrijf laten groeien — zonder extra personeel.",
      cta1: "Boek een gratis gesprek",
      cta2: "Bekijk hoe het werkt",
      stat1val: "1–3 weken",
      stat1lbl: "Gemiddelde tijd tot livegang",
      stat2val: "60%+",
      stat2lbl: "Minder handmatig werk",
      dashTitle: "AI-systeem actief",
      dashLive: "Live",
      dashChart: "Wekelijkse prestaties",
      dashSaved: "Bespaard",
      dashAcc: "Nauwkeurigheid",
      dashUp: "Uptime",
      notifTitle: "Nieuwe gekwalificeerde lead",
      notifSub: "2 minuten geleden · Geautomatiseerd",
    },
    services: {
      badge: "Wat we bouwen",
      title: "AI-systemen die werken",
      titleAccent: "voor uw bedrijf",
      subtitle:
        "Van uw eerste chatbot tot een volledig geautomatiseerde operatie — wij bouwen het, integreren het en zorgen dat het resultaat oplevert.",
      learnMore: "Meer weten",
      items: [
        {
          tag: "AI-chatbots",
          title: "Chatbots voor Web, WhatsApp & Social",
          desc: "Implementeer intelligente chatbots die vragen beantwoorden, leads kwalificeren en afspraken inplannen — op uw website, WhatsApp, Instagram en meer.",
          feats: ["24/7 directe klantrespons", "Leadkwalificatie & routering", "WhatsApp, Instagram & web"],
          metric: { val: "24/7", lbl: "altijd bereikbaar voor klanten" },
        },
        {
          tag: "Spraak-AI",
          title: "AI-spraakagenten voor telefoongesprekken",
          desc: "Automatiseer inkomende en uitgaande gesprekken. Uw AI-agent plant afspraken, beantwoordt vragen en handelt follow-ups af — geen gemist gesprek meer.",
          feats: ["Inkomende & uitgaande gesprekken", "Natuurlijke stemgesprekken", "CRM-sync na elk gesprek"],
          metric: { val: "100%", lbl: "gesprekken beantwoord" },
        },
        {
          tag: "Automatisering",
          title: "Werkstroom- & Procesautomatisering",
          desc: "Elimineer repetitieve handmatige taken in uw hele organisatie. Van getriggerde e-mails tot meerstapsautomatiseringen — stel het eenmalig in en laat het draaien.",
          feats: ["End-to-end procesautomatisering", "Aangepaste trigger- en actiestromen", "Verbindt 100+ tools"],
          metric: { val: "60%+", lbl: "minder handmatig werk" },
        },
        {
          tag: "Integraties",
          title: "API- & toolintegraties",
          desc: "Verbind uw betaalsysteem, CRM, projectmanager en communicatietools zodat gegevens automatisch stromen. Stripe, Notion, WhatsApp, HubSpot en meer.",
          feats: ["Stripe, Notion, HubSpot & meer", "Aangepaste API-ontwikkeling", "Geen handmatige gegevensoverdracht"],
          metric: { val: "100+", lbl: "tools die we kunnen verbinden" },
        },
      ],
      moreTitle: "Meer mogelijkheden die we bieden",
      moreItems: [
        {
          icon: "📊",
          tag: "CRM & Sales",
          title: "CRM & Leadbeheer",
          desc: "Leads uit alle kanalen worden automatisch vastgelegd, gescoord, getagd en in de juiste follow-upsequentie gezet. Geen handmatige invoer meer.",
          feats: ["Multichannel leadopvang", "Automatisch scoren & taggen", "Slimme follow-upsequenties"],
        },
        {
          icon: "📅",
          tag: "Boeking",
          title: "AI-afspraakbeheer",
          desc: "Laat klanten automatisch boeken, verzetten en herinneringen ontvangen — geen eindeloze e-mails of telefoontjes meer om een afspraak te maken.",
          feats: ["24/7 zelfbediening", "Automatische herinneringen", "Google & Outlook sync"],
        },
        {
          icon: "🤖",
          tag: "Aangepaste AI",
          title: "Aangepaste AI-agenten",
          desc: "Op maat gemaakte AI-agenten getraind op uw bedrijfsdocumenten en logica — als een onvermoeibare digitale medewerker voor uw organisatie.",
          feats: ["Bedrijfsspecifieke training", "Document-AI", "Autonome meerstapsagenten"],
        },
      ],
      ctaEyebrow: "Klaar om uw bedrijf te automatiseren?",
      ctaTitle: "Laten we uw",
      ctaAccent: "AI-systeem bouwen.",
      ctaBtn1: "Boek een gratis gesprek",
      ctaBtn2: "Bekijk prijzen →",
    },
    hiw: {
      badge: "Ons proces",
      title: "Van eerste gesprek tot",
      titleAccent: "live AI-systeem",
      subtitle: "Een helder vierstapenproces — geen verrassingen, geen vertragingen.",
      steps: [
        {
          phase: "Ontdekking",
          title: "We leren uw bedrijf kennen",
          desc: "We beginnen met een gratis ontdekkingsgesprek om uw werkstromen, knelpunten en doelen te begrijpen.",
          bullets: ["Gratis ontdekkingsgesprek van 30 min", "Werkstroom- en pijnpuntanalyse", "Automatiseringskansen in kaart brengen"],
        },
        {
          phase: "Voorstel",
          title: "We ontwerpen uw oplossing",
          desc: "We sturen u een helder voorstel: wat we bouwen, hoe het werkt, wat het kost en wanneer het live gaat.",
          bullets: ["Aangepaste AI-systeemarchitectuur", "Voorstel tegen vaste prijs", "Gefaseerde opleveringsroadmap"],
        },
        {
          phase: "Bouwen",
          title: "We bouwen en integreren alles",
          desc: "Ons team bouwt uw AI-systeem en integreert het in uw bestaande tools. U test het met ons voordat het live gaat.",
          bullets: ["Volledige bouw & integratie", "Parallelle tests vóór lancering", "Implementatie zonder downtime"],
        },
        {
          phase: "Lancering",
          title: "We lanceren en blijven bij u",
          desc: "Na de lancering bewaken we uw systeem 30 dagen lang en maken we aanpassingen. U heeft altijd directe toegang tot ons.",
          bullets: ["30 dagen monitoring na lancering", "Realtime prestatiebeheer", "Directe toegang tot ons team"],
        },
      ],
      trust: [
        { val: "1–3 weken", lbl: "Gemiddelde tijd tot eerste implementatie" },
        { val: "Nul downtime", lbl: "Gegarandeerde implementatiemethode" },
        { val: "30 dagen", lbl: "Post-lanceringssupport inbegrepen" },
      ],
    },
    useCases: {
      badge: "Toepassingen",
      title: "Wat bedrijven",
      titleAccent: "écht automatiseren",
      subtitle: "Echte scenario's, echte resultaten. Geen sector valt buiten de boot.",
      items: [
        {
          icon: "💬",
          tag: "Sales & Leads",
          title: "Mis nooit meer een lead",
          scenario: "Een prospect stuurt 's avonds een bericht via uw website. Uw AI-chatbot reageert direct, kwalificeert de lead en plant een gesprek in — nog voordat u wakker bent.",
          outcome: "Meer leads. Nul handmatig werk.",
        },
        {
          icon: "📞",
          tag: "Boeking & Operaties",
          title: "Telefoontjes op automatische piloot",
          scenario: "Klanten bellen om afspraken te maken. Uw AI-spraakagent neemt elk gesprek aan, controleert beschikbaarheid, bevestigt de boeking en stuurt een herinnering — 24/7.",
          outcome: "Nul gemiste gesprekken. Geen personeel nodig.",
        },
        {
          icon: "🤖",
          tag: "Klantenservice",
          title: "Support die nooit slaapt",
          scenario: "Uw WhatsApp en Instagram-DM's ontvangen 200 berichten per dag. Een AI-agent handelt FAQ's, bestellingsstatus en klachten direct af — alleen complexe gevallen worden doorverwezen.",
          outcome: "80% van vragen automatisch afgehandeld.",
        },
        {
          icon: "📊",
          tag: "CRM & Pipeline",
          title: "Uw CRM, eindelijk georganiseerd",
          scenario: "Leads van advertenties, website en WhatsApp komen automatisch in uw CRM, worden getagd, gescoord en in de juiste follow-upsequentie gezet — zonder gegevensinvoer.",
          outcome: "Schone pipeline. Geen leads verloren.",
        },
        {
          icon: "⚡",
          tag: "Werkstroomautomatisering",
          title: "Administratie die zichzelf regelt",
          scenario: "Wanneer een deal gesloten wordt, stuurt het systeem het contract, maakt het project in Notion aan, factureert via Stripe en meldt het in Slack — allemaal door één trigger.",
          outcome: "Uren aan administratie bespaard per week.",
        },
        {
          icon: "🔗",
          tag: "API-integraties",
          title: "Al uw tools verbonden",
          scenario: "Uw betalingssysteem, boekingskalender, e-mailplatform en CRM communiceren niet met elkaar. Wij verbinden ze zodat gegevens automatisch stromen — nooit meer kopiëren en plakken.",
          outcome: "Alles gesynchroniseerd. Niets gedupliceerd.",
        },
      ],
      ctaText: "Ziet u een toepassing die bij uw bedrijf past?",
      ctaBtn: "Boek een gratis gesprek",
    },
    socialProof: {
      badge: "Vertrouwd door teams",
      title: "De partners die",
      titleAccent: "in ons geloven",
      subtitle: "We bouwen vertrouwen op met vooruitstrevende bedrijven. Wees een van de eersten om met ons te werken.",
      logoSlot: "Uw logo",
      logoNote: "Klantlogo's komen binnenkort — neem contact op om designpartner te worden.",
      trustNote: "Testimonials verschijnen hier na de lancering. Wees de eerste die met ons werkt.",
    },
    about: {
      badge: "Wie wij zijn",
      title: "3 studenten.",
      titleAccent: "Serieuze resultaten.",
      subtitle: "Wij zijn Justin, Alexander en Adrian — drie universiteitsstudenten die het zat waren om bedrijven uren te zien verspillen aan taken die AI in seconden kan afhandelen.",
      story: "We bouwden AKJ.ai om te bewijzen dat echte AI-automatisering geen enterprise-budgetten of tijdlijnen van zes maanden nodig heeft. We werken snel, prijzen eerlijk en blijven totdat uw systemen echt werken.",
      values: [
        { icon: "⚡", title: "Snelle levering", desc: "De meeste projecten gaan live in 1–3 weken." },
        { icon: "💡", title: "Transparante prijzen", desc: "Vaste prijsprojecten. Geen verborgen kosten." },
        { icon: "🤝", title: "Echte support", desc: "Directe toegang tot de oprichters die uw systeem hebben gebouwd." },
      ],
      founders: [
        { name: "Justin Kuijper", role: "Medeoprichter", initials: "JK" },
        { name: "Alexander Janssen", role: "Medeoprichter", initials: "AJ" },
        { name: "Adrian Alvarez", role: "Medeoprichter", initials: "AA" },
      ],
      ctaLabel: "Boek een gratis ontdekkingsgesprek",
    },
    pricing: {
      badge: "Prijzen",
      title: "Eenvoudige,",
      titleAccent: "transparante prijzen",
      subtitle: "Projecten tegen vaste prijs. Geen verborgen kosten, geen vage schattingen. Kies uw scope en wij bouwen het.",
      note: "Alle prijzen zijn eenmalige projectkosten. Maandelijkse onderhouds- en supportpakketten beschikbaar op aanvraag.",
      popularBadge: "Meest populair",
      tiers: [
        {
          name: "Starter",
          desc: "Perfect voor uw eerste AI-automatisering — één concreet probleem snel opgelost.",
          priceLabel: "€150 – €400",
          priceSub: "Eenmalige projectkosten",
          custom: true,
          features: [
            "1 AI-chatbot of automatiseringsstroom",
            "Website-, WhatsApp- of e-mailkanaal",
            "Standaardintegraties (CRM, Notion, e-mail)",
            "1 revisieronde inbegrepen",
            "Live in minder dan 7 dagen",
          ],
          cta: "Aan de slag",
        },
        {
          name: "Growth",
          desc: "Meerdere automatiseringen die samenwerken om wekelijks uren te besparen.",
          priceLabel: "€400 – €900",
          priceSub: "Eenmalige projectkosten",
          custom: true,
          features: [
            "Tot 3 automatiseringen of AI-systemen",
            "AI-spraakagent of multichannel chatbot",
            "CRM-integratie + leadbeheer",
            "Prioriteitssupport & 2 revisierondes",
            "Live in 1–2 weken",
          ],
          cta: "Aan de slag",
        },
        {
          name: "Business",
          desc: "Een volledig AI-ecosysteem — meerdere systemen geïntegreerd en geoptimaliseerd voor schaal.",
          priceLabel: "€900 – €2.000",
          priceSub: "Eenmalige projectkosten",
          custom: true,
          features: [
            "Volledig AI-werkstroomherontwerp",
            "Aangepaste AI-agenten + spraak + chatbots",
            "CRM, boeking & API-integraties",
            "30 dagen monitoring na lancering",
            "Toegewijde ondersteuning door oprichters",
          ],
          cta: "Boek een gesprek",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      title: "Vragen die we",
      titleAccent: "altijd krijgen",
      subtitle: "Duidelijke antwoorden. Geen technisch jargon.",
      items: [
        {
          q: "Wat is AI-automatisering precies?",
          a: "AI-automatisering betekent dat repetitieve, handmatige taken worden vervangen door intelligente software die 24/7 draait. Denk aan: een chatbot die direct klantvragen beantwoordt, een spraakagent die afspraken inplant, of een workflow die automatisch follow-ups verstuurt — zonder menselijke tussenkomst na de installatie.",
        },
        {
          q: "Hoe lang duurt het om live te gaan?",
          a: "Eenvoudige chatbots en automatiseringen zijn live in minder dan een week. Complexere systemen (multichannel AI, CRM-integraties, spraakagenten) duren 1–3 weken. We geven u een duidelijke tijdlijn vóór de start — geen verrassingen.",
        },
        {
          q: "Heb ik technische kennis nodig?",
          a: "Helemaal niet. Wij regelen de installatie, integratie en tests. U beheert uw bedrijf — wij beheren de AI. U krijgt een eenvoudige interface en directe toegang tot ons team voor aanpassingen.",
        },
        {
          q: "Is dit betaalbaar voor een klein bedrijf?",
          a: "Ja — dat is precies waarom we het zo hebben opgezet. Projecten starten vanaf €150. Vergelijk dat met een maand een parttime medewerker, en de AI werkt 24/7 zonder pauzes of ziektedagen. De meeste klanten zien in de eerste maand al een positieve ROI.",
        },
        {
          q: "Welke resultaten kan ik verwachten?",
          a: "De meeste klanten zien een vermindering van 40–80% in repetitief handmatig werk, snellere reactietijden (van uren naar seconden) en meer automatisch vastgelegde leads. Elk systeem is ontworpen voor meetbare, zichtbare impact.",
        },
        {
          q: "Werken jullie met elk type bedrijf?",
          a: "Ja. Onze systemen zijn sector-agnostisch. E-commerce, restaurants, makelaars, advocatenkantoren, SaaS-bedrijven, klinieken — als uw bedrijf repetitieve processen, klantcommunicatie of een salespipeline heeft, kunnen we het automatiseren.",
        },
        {
          q: "Wat gebeurt er nadat het project klaar is?",
          a: "Elk project bevat 30 dagen monitoring en aanpassingen na de lancering. We blijven totdat het correct werkt. Daarna zijn onderhouds- en supportpakketten beschikbaar als u wilt dat we blijven optimaliseren.",
        },
      ],
    },
    contact: {
      badge: "Neem contact op",
      title: "Laten we uw",
      titleAccent: "AI-systeem bouwen",
      subtitle: "Boek een gratis ontdekkingsgesprek of stuur ons een bericht. We reageren binnen 24 uur.",
      founders: "Neem rechtstreeks contact op met een oprichter",
      formTitle: "Stuur ons een bericht",
      formDesc: "Vertel ons over uw bedrijf en wat u wilt automatiseren. We sturen een op maat gemaakt voorstel binnen 24 uur.",
      name: "Volledige naam",
      email: "Zakelijk e-mailadres",
      company: "Bedrijf",
      service: "Dienst van interesse",
      message: "Bericht",
      namePh: "Jan de Vries",
      emailPh: "jan@bedrijf.nl",
      companyPh: "Mijn Bedrijf",
      servicePh: "Selecteer een dienst…",
      messagePh: "Vertel ons wat u wilt automatiseren…",
      submit: "Bericht verzenden",
      sending: "Verzenden…",
      privacy: "We reageren doorgaans binnen 24 uur. Uw gegevens worden nooit gedeeld.",
      successTitle: "Bericht verzonden!",
      successDesc: "Bedankt voor uw bericht. We nemen binnen 24 uur contact op.",
      successBtn: "Nog een bericht sturen",
      errorMsg: "Er is iets misgegaan. Probeer het opnieuw of mail ons rechtstreeks.",
      emails: [
        { lbl: "Algemene vragen", val: "hello@akj.ai" },
        { lbl: "Nieuwe projecten", val: "sales@akj.ai" },
        { lbl: "Vacatures", val: "careers@akj.ai" },
      ],
      services: [
        "AI-chatbot (Web / WhatsApp / Social)",
        "AI-spraakagent",
        "Werkstroomautomatisering",
        "CRM & Leadbeheer",
        "AI-afspraakbeheer",
        "API-integraties",
        "Aangepaste AI-agent",
        "Algemene vraag",
      ],
    },
    footer: {
      ctaEyebrow: "Klaar om te automatiseren?",
      ctaTitle: "Boek een gratis",
      ctaAccent: "ontdekkingsgesprek",
      ctaDesc: "30 minuten met Justin, Alexander of Adrian. We brengen in kaart wat AI precies voor uw bedrijf kan doen.",
      ctaBtn1: "Boek een gratis gesprek",
      ctaBtn2: "Bekijk onze diensten →",
      brandDesc: "AI-automatiseringsagentschap opgericht door Justin Kuijper, Alexander Janssen en Adrian Alvarez.",
      newsletter: "Blijf op de hoogte",
      nlPh: "uw@bedrijf.nl",
      nlBtn: "Abonneren",
      nlSuccess: "U bent geabonneerd. Welkom!",
      colSolutions: "Oplossingen",
      colNavigate: "Navigeren",
      colLegal: "Juridisch",
      navLinks: ["Home", "Toepassingen", "Prijzen", "FAQ", "Contact"],
      legalLinks: ["Privacybeleid", "Servicevoorwaarden", "Cookiebeleid", "Beveiliging"],
      rights: "Alle rechten voorbehouden.",
      status: "Alle systemen operationeel",
    },
  },
};


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
