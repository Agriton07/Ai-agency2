import { useState } from "react";

const SERVICES = [
  {
    id: "workflow-automation",
    tag: "Process Automation",
    title: "AI Workflow Automation",
    description:
      "Eliminate manual bottlenecks with end-to-end business process automation. ARP Solutions designs intelligent AI agents that learn your workflows, execute tasks autonomously, and scale alongside your operations.",
    features: ["Autonomous AI agents, 24/7", "End-to-end process coverage", "No disruption to existing ops"],
    metric: { value: "Massive", label: "reduction in manual workload" },
    accent: "#45c789",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: "automation",
  },
  {
    id: "predictive-analytics",
    tag: "Data Intelligence",
    title: "Predictive Analytics",
    description:
      "Transform raw enterprise data into strategic competitive advantage. Our predictive models surface patterns, forecast outcomes, and surface proactive alerts — giving leadership the clarity to act before problems emerge.",
    features: ["Real-time data dashboards", "Proactive anomaly alerts", "Custom forecasting models"],
    metric: { value: "[X]×", label: "improvement in forecast accuracy" },
    accent: "#1aa685",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 20h18M5 20V12M9 20V8M13 20V4M17 20V10M21 20V6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: "analytics",
  },
  {
    id: "conversational-ai",
    tag: "Customer Experience",
    title: "Conversational AI",
    description:
      "Deploy custom chatbots and AI Voice Agents that handle inbound phone calls, qualify leads, and resolve support tickets — without human intervention. Built to sound and act like a natural extension of your team.",
    features: ["AI voice agents for phone calls", "Intelligent human escalation", "Omnichannel deployment"],
    metric: { value: "[X]%", label: "of inquiries resolved autonomously" },
    accent: "#45c789",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: "chat",
  },
  {
    id: "api-integrations",
    tag: "Infrastructure",
    title: "API Integrations",
    description:
      "Seamlessly connect AI capabilities with your existing enterprise tech stack — CRM, ERP, HRIS, and proprietary databases. Secure architecture with enterprise-grade access controls and guaranteed SLA.",
    features: ["REST & GraphQL API support", "SSO & RBAC security", "99.9% uptime SLA"],
    metric: { value: "Rapid", label: "time-to-integration" },
    accent: "#1aa685",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    visual: "api",
  },
];

// ─── Micro-visuals per service ──────────────────────────────────────────────

const AutomationVisual = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    {["Trigger received", "AI processes request", "Action executed", "Result delivered"].map((step, i) => (
      <div
        key={step}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 12px",
          borderRadius: "10px",
          background: i === 1 ? "rgba(69,199,137,0.12)" : "rgba(41,37,36,0.04)",
          border: `1px solid ${i === 1 ? "rgba(69,199,137,0.3)" : "rgba(231,229,228,0.8)"}`,
          transition: "all 0.2s",
        }}
      >
        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: i === 1 ? "linear-gradient(135deg,#45c789,#1aa685)" : "#e7e5e4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {i === 1 ? (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1L10 6L6 11L2 6L6 1Z" fill="white" /></svg>
          ) : (
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#a8a29e", fontFamily: "'DM Sans',sans-serif" }}>{i + 1}</span>
          )}
        </div>
        <span style={{ fontSize: "12px", fontWeight: i === 1 ? 600 : 400, color: i === 1 ? "#1aa685" : "#78716c", fontFamily: "'DM Sans',sans-serif" }}>
          {step}
        </span>
        {i < 3 && (
          <div style={{ marginLeft: "auto" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6h6M7 4l2 2-2 2" stroke="#d4d0cc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        )}
      </div>
    ))}
  </div>
);

const AnalyticsVisual = () => {
  const bars = [
    { h: 45, label: "Jan" }, { h: 62, label: "Feb" }, { h: 54, label: "Mar" },
    { h: 78, label: "Apr" }, { h: 70, label: "May" }, { h: 91, label: "Jun" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "#292524", fontFamily: "'DM Sans',sans-serif" }}>Forecast accuracy</span>
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#1aa685", fontFamily: "'DM Sans',sans-serif" }}>↑ Trending upward</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "72px" }}>
        {bars.map((b, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "100%",
                height: `${b.h}%`,
                borderRadius: "5px 5px 3px 3px",
                background: i === 5
                  ? "linear-gradient(180deg,#45c789,#1aa685)"
                  : `rgba(26,166,133,${0.2 + i * 0.1})`,
              }}
            />
            <span style={{ fontSize: "10px", color: "#a8a29e", fontFamily: "'DM Sans',sans-serif" }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatVisual = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    {[
      { from: "user", text: "What's the status of account #8821?" },
      { from: "ai", text: "Account #8821 is active. Their renewal is due in 14 days. Shall I trigger a follow-up?" },
      { from: "user", text: "Yes, send the automated sequence." },
    ].map((msg, i) => (
      <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
        <div
          style={{
            maxWidth: "85%",
            padding: "8px 12px",
            borderRadius: msg.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
            background: msg.from === "user" ? "linear-gradient(135deg,#45c789,#1aa685)" : "#f5f5f4",
            border: msg.from === "user" ? "none" : "1px solid #e7e5e4",
          }}
        >
          <p style={{ fontSize: "12px", color: msg.from === "user" ? "#fff" : "#292524", margin: 0, lineHeight: 1.45, fontFamily: "'DM Sans',sans-serif" }}>
            {msg.text}
          </p>
        </div>
      </div>
    ))}
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
      <div style={{ flex: 1, height: "32px", borderRadius: "8px", background: "#f5f5f4", border: "1px solid #e7e5e4" }} />
      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg,#45c789,#1aa685)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  </div>
);

const ApiVisual = () => (
  <div style={{ fontFamily: "'DM Mono', 'Fira Code', monospace", fontSize: "11px", lineHeight: 1.6 }}>
    <div style={{ background: "#1c1917", borderRadius: "10px", padding: "14px 16px", overflowX: "auto" }}>
      <div style={{ color: "#6b7280", marginBottom: "4px" }}>// Connect in minutes</div>
      <div>
        <span style={{ color: "#f9a8d4" }}>const</span>
        <span style={{ color: "#e5e7eb" }}> client </span>
        <span style={{ color: "#60a5fa" }}>=</span>
        <span style={{ color: "#a3e635" }}> new</span>
        <span style={{ color: "#fbbf24" }}> ARPSolutions</span>
        <span style={{ color: "#e5e7eb" }}>({"{"}</span>
      </div>
      <div style={{ paddingLeft: "16px" }}>
        <span style={{ color: "#94a3b8" }}>apiKey: </span>
        <span style={{ color: "#86efac" }}>'sk-arp-...'</span>
        <span style={{ color: "#e5e7eb" }}>,</span>
      </div>
      <div style={{ paddingLeft: "16px" }}>
        <span style={{ color: "#94a3b8" }}>env: </span>
        <span style={{ color: "#86efac" }}>'production'</span>
      </div>
      <div><span style={{ color: "#e5e7eb" }}>{"});"}</span></div>
      <div style={{ marginTop: "8px" }}>
        <span style={{ color: "#e5e7eb" }}>client.</span>
        <span style={{ color: "#fbbf24" }}>automate</span>
        <span style={{ color: "#e5e7eb" }}>(</span>
        <span style={{ color: "#86efac" }}>'invoice-approval'</span>
        <span style={{ color: "#e5e7eb" }}>);</span>
      </div>
      <div style={{ marginTop: "8px", padding: "6px 10px", borderRadius: "6px", background: "rgba(69,199,137,0.12)", border: "1px solid rgba(69,199,137,0.25)" }}>
        <span style={{ color: "#45c789" }}>✓ Connected · 11ms latency</span>
      </div>
    </div>
  </div>
);

const VISUALS = {
  automation: AutomationVisual,
  analytics: AnalyticsVisual,
  chat: ChatVisual,
  api: ApiVisual,
};

// ─── Service Card ─────────────────────────────────────────────────────────

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const Visual = VISUALS[service.visual];
  const isEven = index % 2 === 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e7e5e4",
        background: "#ffffff",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.04)"
          : "0 4px 24px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Content pane */}
      <div
        style={{
          padding: "40px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          order: isEven ? 1 : 2,
        }}
      >
        <div>
          {/* Tag + icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "rgba(69,199,137,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1aa685",
                flexShrink: 0,
              }}
            >
              {service.icon}
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#1aa685",
                background: "rgba(69,199,137,0.08)",
                padding: "4px 10px",
                borderRadius: "99px",
                border: "1px solid rgba(69,199,137,0.2)",
              }}
            >
              {service.tag}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 800,
              fontSize: "28px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#292524",
              marginBottom: "14px",
            }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              color: "#78716c",
              lineHeight: 1.65,
              marginBottom: "24px",
            }}
          >
            {service.description}
          </p>

          {/* Features */}
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {service.features.map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#45c789,#1aa685)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#57534e", fontWeight: 500 }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metric + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              background: "rgba(69,199,137,0.07)",
              border: "1px solid rgba(69,199,137,0.18)",
            }}
          >
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 800,
                fontSize: "22px",
                background: "linear-gradient(135deg,#45c789,#1aa685)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
              }}
            >
              {service.metric.value}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#78716c", marginTop: "2px" }}>
              {service.metric.label}
            </div>
          </div>

          <a
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: "#1aa685",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              borderRadius: "11px",
              border: "1.5px solid rgba(69,199,137,0.35)",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(69,199,137,0.08)"; e.currentTarget.style.borderColor = "#45c789"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(69,199,137,0.35)"; }}
          >
            Learn more
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Visual pane */}
      <div
        style={{
          background: "#fafafa",
          borderLeft: isEven ? "1px solid #e7e5e4" : "none",
          borderRight: !isEven ? "1px solid #e7e5e4" : "none",
          padding: "40px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          order: isEven ? 2 : 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background circle */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(69,199,137,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Visual />
      </div>
    </div>
  );
};

// ─── Section Header ──────────────────────────────────────────────────────

const SectionHeader = () => (
  <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 64px" }}>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "#1aa685",
        background: "rgba(69,199,137,0.08)",
        border: "1px solid rgba(69,199,137,0.22)",
        padding: "6px 14px",
        borderRadius: "99px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#45c789",
          animation: "pulseService 2s ease infinite",
        }}
      />
      What we do
    </div>

    <h2
      style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontWeight: 800,
        fontSize: "clamp(36px, 4vw, 52px)",
        lineHeight: 1.05,
        letterSpacing: "-0.025em",
        color: "#292524",
        marginBottom: "18px",
      }}
    >
      Everything your enterprise needs{" "}
      <span
        style={{
          background: "linear-gradient(135deg,#45c789,#1aa685)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        to scale with AI
      </span>
    </h2>

    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "17px",
        color: "#78716c",
        lineHeight: 1.65,
      }}
    >
      From your first automation to a fully integrated AI ecosystem.
      Built by Justin Kuijper, Alexander Janssen, and Adrian Alvarez — for enterprises that refuse to stand still.
    </p>
  </div>
);

// ─── Bottom CTA Strip ─────────────────────────────────────────────────────

const CtaStrip = () => (
  <div
    style={{
      marginTop: "64px",
      borderRadius: "24px",
      padding: "48px 56px",
      background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "32px",
      flexWrap: "wrap",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Background glow */}
    <div
      style={{
        position: "absolute",
        top: "-40px",
        right: "-40px",
        width: "280px",
        height: "280px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(69,199,137,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />

    <div style={{ position: "relative" }}>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "10px",
        }}
      >
        Ready to transform your operations?
      </p>
      <h3
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 800,
          fontSize: "clamp(24px, 3vw, 36px)",
          color: "#ffffff",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "0",
        }}
      >
        Start automating.{" "}
        <span
          style={{
            background: "linear-gradient(135deg,#45c789,#1aa685)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Scale without limits.
        </span>
      </h3>
    </div>

    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", position: "relative" }}>
      <a
        href="#"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: "15px",
          color: "#fff",
          textDecoration: "none",
          padding: "13px 28px",
          borderRadius: "13px",
          background: "linear-gradient(135deg,#45c789,#1aa685)",
          boxShadow: "0 4px 20px rgba(69,199,137,0.35)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "transform 0.2s, box-shadow 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(69,199,137,0.45)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(69,199,137,0.35)"; }}
      >
        Talk to our team
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <a
        href="#"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: "15px",
          color: "rgba(255,255,255,0.75)",
          textDecoration: "none",
          padding: "13px 28px",
          borderRadius: "13px",
          border: "1.5px solid rgba(255,255,255,0.15)",
          transition: "border-color 0.2s, color 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
      >
        Watch a live demo
      </a>
    </div>
  </div>
);

// ─── Main Export ─────────────────────────────────────────────────────────

export default function Services() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes pulseService { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 768px) {
          .service-card-grid { grid-template-columns: 1fr !important; }
          .service-card-grid > div { order: unset !important; }
          .cta-strip { flex-direction: column; padding: 36px 28px !important; }
        }
      `}</style>

      <section
        style={{
          background: "#fafafa",
          padding: "96px 0 112px",
        }}
      >
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader />

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          <CtaStrip />
        </div>
      </section>
    </>
  );
}