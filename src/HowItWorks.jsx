import { useState } from "react";

// ─── Step data ────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    phase: "Discovery",
    title: "We audit your operations",
    description:
      "Our team conducts a deep-dive audit of your existing workflows, tech stack, and operational pain points. We map every manual process, identify automation opportunities, and quantify where time and revenue are being lost.",
    bullets: [
      "Current-state workflow mapping",
      "Tech stack & integration assessment",
      "Automation opportunity scoring",
    ],
    visual: "audit",
  },
  {
    number: "02",
    phase: "Architecture",
    title: "We design your AI ecosystem",
    description:
      "Based on the audit, we architect a custom AI ecosystem — selecting the right models, designing agent logic, and planning every integration. No off-the-shelf templates. Every system is purpose-built for your business.",
    bullets: [
      "Custom AI agent architecture",
      "End-to-end integration blueprint",
      "Phased rollout roadmap",
    ],
    visual: "design",
  },
  {
    number: "03",
    phase: "Deployment",
    title: "We build and integrate",
    description:
      "Our engineers deploy your AI workflows, connect them to your existing systems via secure API integrations, and run rigorous testing cycles before anything goes live. Zero disruption to your current operations.",
    bullets: [
      "Secure API & system integration",
      "Parallel testing environment",
      "Zero-downtime deployment",
    ],
    visual: "deploy",
  },
  {
    number: "04",
    phase: "Optimization",
    title: "We monitor and improve",
    description:
      "Post-launch, our systems continuously monitor performance, flag anomalies, and self-optimize. You get a dedicated dashboard, regular reports, and a direct line to our team — so the value compounds over time.",
    bullets: [
      "Real-time performance monitoring",
      "Continuous model retraining",
      "Dedicated success partnership",
    ],
    visual: "optimize",
  },
];

// ─── Step Visuals ─────────────────────────────────────────────────────────

const AuditVisual = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "#292524" }}>
        Process audit scan
      </span>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "#1aa685", background: "rgba(69,199,137,0.10)", padding: "3px 9px", borderRadius: "99px", border: "1px solid rgba(69,199,137,0.2)" }}>
        Analyzing…
      </span>
    </div>
    {[
      { label: "Invoice processing", hours: "42h/wk", score: 92, color: "#45c789" },
      { label: "Lead qualification", hours: "28h/wk", score: 87, color: "#45c789" },
      { label: "Report generation", hours: "19h/wk", score: 74, color: "#1aa685" },
      { label: "Customer onboarding", hours: "35h/wk", score: 81, color: "#45c789" },
    ].map((row) => (
      <div key={row.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "#78716c", width: "140px", flexShrink: 0 }}>
          {row.label}
        </span>
        <div style={{ flex: 1, height: "6px", borderRadius: "99px", background: "#f0ede9", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${row.score}%`,
              borderRadius: "99px",
              background: `linear-gradient(90deg, ${row.color}, #1aa685)`,
            }}
          />
        </div>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700, color: "#1aa685", width: "42px", textAlign: "right", flexShrink: 0 }}>
          {row.hours}
        </span>
      </div>
    ))}
    <div style={{ marginTop: "8px", padding: "8px 12px", borderRadius: "10px", background: "rgba(69,199,137,0.07)", border: "1px solid rgba(69,199,137,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "#78716c" }}>Total automatable time</span>
      <span style={{ fontFamily: "'Fraunces',serif", fontSize: "18px", fontWeight: 800, background: "linear-gradient(135deg,#45c789,#1aa685)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>124h/wk</span>
    </div>
  </div>
);

const DesignVisual = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "#292524" }}>
        AI architecture blueprint
      </span>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "#78716c" }}>4 agents · 12 nodes</span>
    </div>
    {/* Architecture nodes */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
      {[
        { label: "Intake Agent", sub: "Triggers & routing", active: true },
        { label: "Processing Agent", sub: "Core logic", active: true },
        { label: "CRM Integration", sub: "Salesforce API", active: false },
        { label: "Notification Agent", sub: "Email / Slack", active: false },
      ].map((node) => (
        <div
          key={node.label}
          style={{
            padding: "9px 12px",
            borderRadius: "10px",
            background: node.active ? "rgba(69,199,137,0.10)" : "#f5f5f4",
            border: `1px solid ${node.active ? "rgba(69,199,137,0.28)" : "#e7e5e4"}`,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: node.active ? "#45c789" : "#d4d0cc", flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: node.active ? "#1aa685" : "#57534e" }}>{node.label}</span>
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "#a8a29e", paddingLeft: "13px" }}>{node.sub}</span>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 12px", borderRadius: "9px", background: "#f5f5f4", border: "1px solid #e7e5e4" }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="#d4d0cc" strokeWidth="1.5" strokeLinecap="round" /></svg>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "#a8a29e" }}>+ 8 more nodes in full blueprint</span>
    </div>
  </div>
);

const DeployVisual = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "#292524" }}>
        Deployment pipeline
      </span>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "#1aa685" }}>
        3 / 4 complete
      </span>
    </div>
    {[
      { label: "Environment provisioned", status: "done" },
      { label: "API integrations connected", status: "done" },
      { label: "Parallel test run passed", status: "done" },
      { label: "Live deployment", status: "active" },
    ].map((item, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "9px", background: item.status === "active" ? "rgba(69,199,137,0.08)" : "#fafafa", border: `1px solid ${item.status === "active" ? "rgba(69,199,137,0.25)" : "#e7e5e4"}` }}>
        <div style={{ width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: item.status === "done" ? "linear-gradient(135deg,#45c789,#1aa685)" : item.status === "active" ? "rgba(69,199,137,0.15)" : "#e7e5e4", border: item.status === "active" ? "2px solid #45c789" : "none" }}>
          {item.status === "done" && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
          {item.status === "active" && (
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#45c789", animation: "hiw-pulse 1.4s ease infinite" }} />
          )}
        </div>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: item.status === "active" ? 600 : 400, color: item.status === "active" ? "#1aa685" : item.status === "done" ? "#57534e" : "#a8a29e" }}>
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

const OptimizeVisual = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "#292524" }}>
        Live performance dashboard
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#45c789", animation: "hiw-pulse 1.5s ease infinite" }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "#1aa685", fontWeight: 600 }}>Live</span>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px" }}>
      {[
        { val: "99.9%", lbl: "Uptime" },
        { val: "14ms", lbl: "Avg latency" },
        { val: "0", lbl: "Errors today" },
      ].map((m) => (
        <div key={m.lbl} style={{ padding: "10px 8px", borderRadius: "10px", background: "rgba(69,199,137,0.07)", border: "1px solid rgba(69,199,137,0.18)", textAlign: "center" }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "16px", background: "linear-gradient(135deg,#45c789,#1aa685)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{m.val}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "#78716c", marginTop: "2px" }}>{m.lbl}</div>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {[
        { label: "Model accuracy", val: 97 },
        { label: "Automation rate", val: 91 },
      ].map((row) => (
        <div key={row.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "#78716c", width: "108px", flexShrink: 0 }}>{row.label}</span>
          <div style={{ flex: 1, height: "5px", borderRadius: "99px", background: "#f0ede9", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${row.val}%`, borderRadius: "99px", background: "linear-gradient(90deg,#45c789,#1aa685)" }} />
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700, color: "#1aa685", width: "32px", textAlign: "right", flexShrink: 0 }}>{row.val}%</span>
        </div>
      ))}
    </div>
  </div>
);

const VISUALS = { audit: AuditVisual, design: DesignVisual, deploy: DeployVisual, optimize: OptimizeVisual };

// ─── Step Tab ─────────────────────────────────────────────────────────────

const StepTab = ({ step, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "16px",
      padding: "20px 24px",
      borderRadius: "16px",
      background: active ? "#ffffff" : "transparent",
      border: `1px solid ${active ? "#e7e5e4" : "transparent"}`,
      boxShadow: active ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      cursor: "pointer",
      textAlign: "left",
      transition: "all 0.2s ease",
      width: "100%",
    }}
  >
    {/* Number badge */}
    <div
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: active ? "linear-gradient(135deg,#45c789,#1aa685)" : "rgba(41,37,36,0.06)",
        transition: "background 0.2s ease",
      }}
    >
      <span
        style={{
          fontFamily: "'Fraunces',Georgia,serif",
          fontWeight: 800,
          fontSize: "13px",
          color: active ? "#fff" : "#a8a29e",
        }}
      >
        {step.number}
      </span>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: active ? "#1aa685" : "#a8a29e",
          marginBottom: "4px",
          transition: "color 0.2s ease",
        }}
      >
        {step.phase}
      </div>
      <div
        style={{
          fontFamily: "'Fraunces',Georgia,serif",
          fontWeight: 800,
          fontSize: "16px",
          lineHeight: 1.2,
          color: active ? "#292524" : "#78716c",
          transition: "color 0.2s ease",
        }}
      >
        {step.title}
      </div>
    </div>
    {/* Active indicator */}
    {active && (
      <div style={{ width: "4px", height: "36px", borderRadius: "99px", background: "linear-gradient(180deg,#45c789,#1aa685)", flexShrink: 0, alignSelf: "center" }} />
    )}
  </button>
);

// ─── Step Detail Panel ────────────────────────────────────────────────────

const StepDetail = ({ step }) => {
  const Visual = VISUALS[step.visual];
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        border: "1px solid #e7e5e4",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
      }}
    >
      {/* Top strip */}
      <div
        style={{
          height: "4px",
          background: "linear-gradient(90deg,#45c789,#1aa685)",
        }}
      />
      <div style={{ padding: "36px 40px" }}>
        {/* Phase + number */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "13px",
              background: "linear-gradient(135deg,#45c789,#1aa685)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "16px", color: "#fff" }}>
              {step.number}
            </span>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1aa685", marginBottom: "2px" }}>
              Phase {step.number} · {step.phase}
            </div>
            <h3
              style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontWeight: 800,
                fontSize: "22px",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#292524",
                margin: 0,
              }}
            >
              {step.title}
            </h3>
          </div>
        </div>

        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", color: "#78716c", lineHeight: 1.65, marginBottom: "24px" }}>
          {step.description}
        </p>

        {/* Bullets */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "9px" }}>
          {step.bullets.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "linear-gradient(135deg,#45c789,#1aa685)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "#57534e", fontWeight: 500 }}>{b}</span>
            </li>
          ))}
        </ul>

        {/* Visual */}
        <div
          style={{
            background: "#fafafa",
            borderRadius: "16px",
            border: "1px solid #e7e5e4",
            padding: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              right: "-40px",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(69,199,137,0.07) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <Visual />
        </div>
      </div>
    </div>
  );
};

// ─── Progress dots (mobile) ───────────────────────────────────────────────

const ProgressDots = ({ active, total, onSelect }) => (
  <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" }}>
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        style={{
          width: i === active ? "24px" : "8px",
          height: "8px",
          borderRadius: "99px",
          background: i === active ? "linear-gradient(90deg,#45c789,#1aa685)" : "#e7e5e4",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "all 0.25s ease",
        }}
      />
    ))}
  </div>
);

// ─── Section Header ──────────────────────────────────────────────────────

const SectionHeader = () => (
  <div style={{ textAlign: "center", maxWidth: "580px", margin: "0 auto 64px" }}>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'DM Sans',sans-serif",
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
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#45c789", animation: "hiw-blink 2s ease infinite" }} />
      Our process
    </div>

    <h2
      style={{
        fontFamily: "'Fraunces',Georgia,serif",
        fontWeight: 800,
        fontSize: "clamp(34px,4vw,52px)",
        lineHeight: 1.05,
        letterSpacing: "-0.025em",
        color: "#292524",
        marginBottom: "18px",
      }}
    >
      From first meeting to{" "}
      <span
        style={{
          background: "linear-gradient(135deg,#45c789,#1aa685)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        live AI systems
      </span>
    </h2>

    <p
      style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: "17px",
        color: "#78716c",
        lineHeight: 1.65,
      }}
    >
      A proven four-phase methodology that takes you from operational audit to a fully deployed, continuously improving AI ecosystem — with zero disruption to your business.
    </p>
  </div>
);

// ─── Timeline connector strip (decorative) ───────────────────────────────

const TimelineStrip = ({ activeIndex }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0",
      marginBottom: "48px",
      padding: "0 24px",
    }}
  >
    {STEPS.map((step, i) => (
      <div key={step.number} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
        {/* Node */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: i <= activeIndex ? "linear-gradient(135deg,#45c789,#1aa685)" : "#f0ede9",
            border: i === activeIndex ? "3px solid rgba(69,199,137,0.3)" : "3px solid transparent",
            transition: "all 0.3s ease",
            boxShadow: i === activeIndex ? "0 0 0 4px rgba(69,199,137,0.12)" : "none",
          }}
        >
          {i < activeIndex ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7l3 3 5-5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "13px", color: i <= activeIndex ? "#fff" : "#c4bfba" }}>
              {step.number}
            </span>
          )}
        </div>
        {/* Connector */}
        {i < STEPS.length - 1 && (
          <div style={{ flex: 1, height: "3px", borderRadius: "99px", background: i < activeIndex ? "linear-gradient(90deg,#45c789,#1aa685)" : "#e7e5e4", transition: "background 0.4s ease", margin: "0 4px" }} />
        )}
      </div>
    ))}
  </div>
);

// ─── Main Export ─────────────────────────────────────────────────────────

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes hiw-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes hiw-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        @media (max-width: 900px) {
          .hiw-layout { flex-direction: column !important; }
          .hiw-tabs { flex-direction: row !important; overflow-x: auto; gap: 8px !important; padding-bottom: 4px; }
          .hiw-tab-btn { min-width: 200px; }
        }
      `}</style>

      <section style={{ background: "#fafafa", padding: "96px 0 112px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>

          <SectionHeader />

          {/* Timeline strip */}
          <TimelineStrip activeIndex={activeStep} />

          {/* Main layout: tabs + detail */}
          <div
            className="hiw-layout"
            style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}
          >
            {/* Left: step tabs */}
            <div
              className="hiw-tabs"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                width: "320px",
                flexShrink: 0,
                background: "#f5f3f0",
                borderRadius: "20px",
                padding: "12px",
                border: "1px solid #e7e5e4",
              }}
            >
              {STEPS.map((step, i) => (
                <div className="hiw-tab-btn" key={step.id}>
                  <StepTab
                    step={step}
                    active={activeStep === i}
                    onClick={() => setActiveStep(i)}
                  />
                </div>
              ))}
            </div>

            {/* Right: detail panel */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <StepDetail step={STEPS[activeStep]} />
              <ProgressDots active={activeStep} total={STEPS.length} onSelect={setActiveStep} />
            </div>
          </div>

          {/* Bottom trust bar */}
          <div
            style={{
              marginTop: "64px",
              padding: "28px 40px",
              borderRadius: "20px",
              background: "#ffffff",
              border: "1px solid #e7e5e4",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "24px",
              flexWrap: "wrap",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            {[
              { icon: "clock", value: "Weeks, not months", label: "Average time to first deployment" },
              { icon: "shield", value: "Zero downtime", label: "Guaranteed deployment approach" },
              { icon: "chart", value: "Continuous ROI", label: "Post-launch optimization included" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(69,199,137,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#1aa685",
                  }}
                >
                  {item.icon === "clock" && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  {item.icon === "shield" && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {item.icon === "chart" && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 17h14M5 17V11M8 17V7M11 17V4M14 17V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Fraunces',serif",
                      fontWeight: 800,
                      fontSize: "16px",
                      background: "linear-gradient(135deg,#45c789,#1aa685)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.value}
                  </div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "#78716c", marginTop: "2px" }}>
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}