import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import { GREEN, GREEN_DARK, GRAD, card, gradText, GreenCheck, ArrowIcon, tag } from "../utils/SharedUI";

// ─── Service tab icons ────────────────────────────────────────────────────────
const TAB_ICONS = [
  <svg key="chat" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  <svg key="voice" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.98-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.36a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  <svg key="auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="api" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  <svg key="crm" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  <svg key="book" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  <svg key="agent" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
];

// ─── Rich SVG visual illustrations ───────────────────────────────────────────
const ChatbotVisual = () => (
  <div style={{ width: "100%", maxWidth: "340px", margin: "0 auto" }}>
    <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
      {/* Window chrome */}
      <div style={{ background: "#1e1c1a", padding: "11px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }}/>)}
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", animation: "arp-blink 2s ease infinite" }}/>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>AI Chat Agent · Online</span>
          </div>
        </div>
      </div>
      {/* Chat body */}
      <div style={{ background: "#141312", padding: "18px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { from: "ai",   text: "Hi! 👋 How can I help you today?" },
          { from: "user", text: "I want to book an appointment for next week" },
          { from: "ai",   text: "I have slots Mon 10am, 2pm, Tue 11am. Which works best?" },
          { from: "user", text: "Monday 2pm please" },
          { from: "ai",   text: "Done! ✓ Booked for Monday at 2:00 PM. Confirmation sent.", highlight: true },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", gap: "7px", alignItems: "flex-end" }}>
            {m.from === "ai" && <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: GRAD, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#fff", fontWeight: 700, marginBottom: "1px" }}>AI</div>}
            <div style={{
              maxWidth: "78%", padding: "8px 11px", fontSize: "11px", lineHeight: 1.45,
              fontFamily: "'DM Sans',sans-serif",
              borderRadius: m.from === "user" ? "12px 3px 12px 12px" : "3px 12px 12px 12px",
              background: m.from === "user" ? GRAD : m.highlight ? "rgba(167,139,250,0.14)" : "rgba(255,255,255,0.06)",
              border: m.highlight ? "1px solid rgba(167,139,250,0.28)" : "none",
              color: m.from === "user" ? "#fff" : "rgba(255,255,255,0.82)",
            }}>{m.text}</div>
          </div>
        ))}
        <div style={{ marginTop: "4px", padding: "7px 10px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", animation: "arp-ping 1.5s ease infinite" }}/>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "rgba(34,197,94,0.85)", fontWeight: 600 }}>Responding in &lt;1 second · 24/7</span>
        </div>
      </div>
      {/* Input bar */}
      <div style={{ background: "#1e1c1a", padding: "10px 14px", display: "flex", gap: "8px", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: "20px", padding: "7px 12px" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>AI is handling this conversation…</span>
        </div>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
      </div>
    </div>
    {/* Channel chips */}
    <div style={{ display: "flex", gap: "6px", marginTop: "14px", justifyContent: "center", flexWrap: "wrap" }}>
      {["Website","WhatsApp","Instagram","Telegram"].map(ch => (
        <span key={ch} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(167,139,250,0.8)", background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.20)", borderRadius: "99px", padding: "3px 10px" }}>{ch}</span>
      ))}
    </div>
  </div>
);

const VoiceVisual = () => (
  <div style={{ width: "100%", maxWidth: "280px", margin: "0 auto" }}>
    <div style={{ borderRadius: "28px", background: "#141312", padding: "28px 20px", boxShadow: "0 24px 64px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "99px", padding: "4px 12px", marginBottom: "14px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", animation: "arp-blink 2s ease infinite" }}/>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "#22c55e", fontWeight: 600 }}>Call Active · 0:42</span>
        </div>
        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "16px", color: "#f5f0eb" }}>AI Voice Agent</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>Handling inbound calls 24/7</div>
      </div>
      {/* Waveform */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", height: "48px", marginBottom: "24px" }}>
        {[3,6,9,14,10,18,12,22,16,20,14,18,10,15,8,12,6,10,4,8,6,4].map((h, i) => (
          <div key={i} style={{
            width: "3px", borderRadius: "2px",
            background: `linear-gradient(to top, #7c3aed, #a78bfa)`,
            height: `${h * 2}px`,
            opacity: 0.6 + Math.sin(i * 0.8) * 0.4,
            animation: `bar-grow 0.8s ${i * 0.04}s ease both, arp-blink ${0.8 + (i % 3) * 0.3}s ${i * 0.1}s ease-in-out infinite`,
          }}/>
        ))}
      </div>
      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
        {[["100%", "Answered"], ["<2s", "Response"], ["0", "Missed"]].map(([v, l], i) => (
          <div key={i} style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "8px 4px" }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "14px", background: "linear-gradient(135deg,#c4b5fd,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{l}</div>
          </div>
        ))}
      </div>
      {/* End call button */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.7 13.5 19.79 19.79 0 0 1 1.61 4.89 2 2 0 0 1 3.6 2.71h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11z" transform="rotate(135 12 12)"/></svg>
        </div>
      </div>
    </div>
  </div>
);

const WorkflowVisual = () => {
  const nodes = [
    { label: "Trigger", icon: "⚡", x: 0, color: "#7c3aed" },
    { label: "AI Process", icon: "🧠", x: 1, color: "#a78bfa" },
    { label: "Action", icon: "⚙️", x: 2, color: "#6d28d9" },
    { label: "Deliver", icon: "✓", x: 3, color: "#22c55e" },
  ];
  return (
    <div style={{ width: "100%", padding: "8px 0" }}>
      {/* Pipeline nodes */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}>
        {nodes.map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < nodes.length - 1 ? "1" : "0" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: `${n.color}22`, border: `1.5px solid ${n.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px",
                animation: `bar-grow 0.5s ${i * 0.15}s ease both`,
              }}>
                {n.icon}
              </div>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{n.label}</span>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ flex: 1, height: "1.5px", background: "linear-gradient(90deg,rgba(167,139,250,0.4),rgba(167,139,250,0.1))", margin: "0 4px 18px" }}/>
            )}
          </div>
        ))}
      </div>
      {/* Automation log */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {[
          { text: "Deal closed in CRM", time: "09:42:01", color: "#a78bfa" },
          { text: "Contract sent to client", time: "09:42:02", color: "#a78bfa" },
          { text: "Stripe invoice created", time: "09:42:03", color: "#22c55e" },
          { text: "Notion project created", time: "09:42:04", color: "#a78bfa" },
          { text: "Slack #deals notified", time: "09:42:04", color: "#a78bfa" },
        ].map((log, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "8px 12px", borderRadius: "8px",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
            animation: `slide-in-up 0.4s ${0.3 + i * 0.1}s ease both`,
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: log.color, flexShrink: 0 }}/>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.65)", flex: 1 }}>{log.text}</span>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>{log.time}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "12px", textAlign: "center" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "rgba(167,139,250,0.6)", fontWeight: 600 }}>5 actions · completed in 3 seconds · 0 manual steps</span>
      </div>
    </div>
  );
};

const IntegrationsVisual = () => {
  const apps = [
    { name: "Stripe",   color: "#635bff", icon: "S",  angle: 0   },
    { name: "HubSpot",  color: "#ff7a59", icon: "H",  angle: 51  },
    { name: "Notion",   color: "#fff",    icon: "N",  angle: 102 },
    { name: "WhatsApp", color: "#25d366", icon: "W",  angle: 153 },
    { name: "Slack",    color: "#4a154b", icon: "Sl", angle: 204 },
    { name: "Sheets",   color: "#0f9d58", icon: "G",  angle: 255 },
    { name: "Outlook",  color: "#0078d4", icon: "O",  angle: 306 },
  ];
  const cx = 120, cy = 120, r = 90;
  return (
    <div style={{ width: "100%", maxWidth: "280px", margin: "0 auto" }}>
      <svg width="240" height="240" viewBox="0 0 240 240" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.05"/>
          </radialGradient>
        </defs>
        {/* Hub glow */}
        <circle cx={cx} cy={cy} r="38" fill="url(#hubGrad)" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5"/>
        <circle cx={cx} cy={cy} r="28" fill="#1a1917" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5"/>
        <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", fontWeight: 700, fill: "#a78bfa" }}>AKJ.ai</text>
        <text x={cx} y={cy + 9} textAnchor="middle" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "8px", fill: "rgba(255,255,255,0.4)" }}>hub</text>

        {apps.map((app, i) => {
          const rad = (app.angle * Math.PI) / 180;
          const ax = cx + r * Math.cos(rad);
          const ay = cy + r * Math.sin(rad);
          return (
            <g key={i}>
              {/* Connection line */}
              <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="rgba(167,139,250,0.18)" strokeWidth="1" strokeDasharray="3 3"/>
              {/* App dot */}
              <circle cx={ax} cy={ay} r="18" fill="#1e1c1a" stroke={app.color + "55"} strokeWidth="1.5"/>
              <text x={ax} y={ay + 4} textAnchor="middle" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", fontWeight: 700, fill: app.color }}>{app.icon}</text>
              <text x={ax} y={ay + 28} textAnchor="middle" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "8px", fill: "rgba(255,255,255,0.3)" }}>{app.name}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ textAlign: "center", marginTop: "-12px" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "rgba(167,139,250,0.6)", fontWeight: 600 }}>100+ tools connected · zero manual transfer</span>
      </div>
    </div>
  );
};

const CRMVisual = () => {
  const columns = [
    { label: "New",      color: "#6b7280", leads: ["Acme Corp", "TechStart", "FlowLabs"] },
    { label: "Qualified",color: "#a78bfa", leads: ["Nova Media", "BuildCo"] },
    { label: "Proposal", color: "#f59e0b", leads: ["GrowthX"] },
    { label: "Closed ✓", color: "#22c55e", leads: ["Vertex AI"] },
  ];
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <div style={{ display: "flex", gap: "8px", minWidth: "340px" }}>
        {columns.map((col, ci) => (
          <div key={ci} style={{ flex: 1, minWidth: "78px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px", padding: "0 4px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: col.color, flexShrink: 0 }}/>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{col.label}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {col.leads.map((lead, li) => (
                <div key={li} style={{
                  padding: "8px 8px", borderRadius: "8px",
                  background: "rgba(255,255,255,0.04)", border: `1px solid ${col.color}30`,
                  animation: `slide-in-up 0.4s ${(ci * 0.1 + li * 0.07)}s ease both`,
                }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.75)", marginBottom: "4px" }}>{lead}</div>
                  <div style={{ width: "100%", height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.06)" }}>
                    <div style={{ width: `${60 + ci * 12}%`, height: "100%", borderRadius: "2px", background: col.color + "88" }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "14px", padding: "8px 12px", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.18)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px" }}>🤖</span>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>AI auto-scored 14 new leads this week · 3 moved to proposal</span>
      </div>
    </div>
  );
};

const BookingVisual = () => {
  const days = ["M","T","W","T","F","S","S"];
  const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
  const bookedDays = [5,8,12,15,19,22];
  const availDays = [6,9,13,16,20,23];
  return (
    <div style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}>
      <div style={{ borderRadius: "14px", background: "#141312", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        {/* Calendar header */}
        <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "14px", color: "#f5f0eb" }}>June 2025</span>
            <div style={{ display: "flex", gap: "4px" }}>
              {["‹","›"].map((a,i) => <div key={i} style={{ width: "24px", height: "24px", borderRadius: "6px", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{a}</span></div>)}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginTop: "10px" }}>
            {days.map(d => <div key={d} style={{ textAlign: "center", fontFamily: "'DM Sans',sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>{d}</div>)}
          </div>
        </div>
        {/* Days grid */}
        <div style={{ padding: "8px 12px 14px", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "3px" }}>
          {nums.map(n => {
            const booked = bookedDays.includes(n);
            const avail = availDays.includes(n);
            return (
              <div key={n} style={{
                textAlign: "center", padding: "4px 2px", borderRadius: "6px", cursor: "pointer",
                background: booked ? GRAD : avail ? "rgba(167,139,250,0.12)" : "transparent",
                border: avail ? "1px solid rgba(167,139,250,0.25)" : "1px solid transparent",
              }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", fontWeight: 600, color: booked ? "#fff" : avail ? "#a78bfa" : "rgba(255,255,255,0.35)" }}>{n}</span>
              </div>
            );
          })}
        </div>
        {/* Booking confirmation */}
        <div style={{ margin: "0 12px 12px", padding: "10px 12px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
            <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", fontWeight: 700, color: "#22c55e" }}>Booking confirmed!</span>
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>Sarah J. · Consultation · Jun 5, 10:00 AM</span>
        </div>
      </div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "rgba(167,139,250,0.6)", fontWeight: 600 }}>Self-service 24/7 · Google & Outlook sync · auto-reminders</span>
      </div>
    </div>
  );
};

const AgentsVisual = () => (
  <div style={{ width: "100%", maxWidth: "320px", margin: "0 auto" }}>
    <div style={{ borderRadius: "12px", background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.6)", fontFamily: "monospace" }}>
      <div style={{ padding: "10px 14px", background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }}/>)}
        </div>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>ai_agent.py</span>
      </div>
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", lineHeight: 1.65 }}>
        <div><span style={{ color: "#8b949e" }}># Your custom AI agent</span></div>
        <div><span style={{ color: "#79c0ff" }}>agent</span><span style={{ color: "#c9d1d9" }}> = </span><span style={{ color: "#7ee787" }}>AKJAgent</span><span style={{ color: "#c9d1d9" }}>(</span></div>
        <div style={{ paddingLeft: "16px" }}><span style={{ color: "#79c0ff" }}>knowledge_base</span><span style={{ color: "#c9d1d9" }}>=</span><span style={{ color: "#a5d6ff" }}>"your_docs/"</span><span style={{ color: "#c9d1d9" }}>,</span></div>
        <div style={{ paddingLeft: "16px" }}><span style={{ color: "#79c0ff" }}>tools</span><span style={{ color: "#c9d1d9" }}>=</span><span style={{ color: "#c9d1d9" }}>[</span><span style={{ color: "#a5d6ff" }}>"crm"</span><span style={{ color: "#c9d1d9" }}>, </span><span style={{ color: "#a5d6ff" }}>"calendar"</span><span style={{ color: "#c9d1d9" }}>, </span><span style={{ color: "#a5d6ff" }}>"email"</span><span style={{ color: "#c9d1d9" }}>],</span></div>
        <div><span style={{ color: "#c9d1d9" }}>)</span></div>
        <div style={{ marginTop: "6px" }}><span style={{ color: "#8b949e" }}># Running autonomously…</span></div>
        {[
          "✓ Analyzed 3 customer requests",
          "✓ Updated CRM automatically",
          "✓ Sent 2 follow-up emails",
          "⟳ Processing invoice #8821…",
        ].map((l, i) => (
          <div key={i} style={{
            marginTop: "3px",
            color: l.startsWith("✓") ? "#7ee787" : "#f0883e",
            animation: `slide-in-up 0.3s ${0.4 + i * 0.15}s ease both`,
          }}>
            {l}
          </div>
        ))}
      </div>
    </div>
    <div style={{ marginTop: "12px", display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
      {["Knowledge AI","Multi-step","Autonomous","Custom logic"].map(c => (
        <span key={c} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(167,139,250,0.8)", background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.20)", borderRadius: "99px", padding: "3px 10px" }}>{c}</span>
      ))}
    </div>
  </div>
);

const VISUALS = [ChatbotVisual, VoiceVisual, WorkflowVisual, IntegrationsVisual, CRMVisual, BookingVisual, AgentsVisual];

// ─── Additional details shown on expand ──────────────────────────────────────
const DETAILS = [
  {
    useCases: ["E-commerce customer support","Restaurant booking","Real estate lead capture","SaaS onboarding"],
    techStack: ["OpenAI GPT-4o","Twilio","Make.com","WhatsApp Business API"],
    timeline: "3–5 days",
  },
  {
    useCases: ["Medical clinic scheduling","Restaurant reservations","Sales follow-up calls","Customer support line"],
    techStack: ["ElevenLabs / Vapi","Twilio Voice","CRM sync","Custom NLP"],
    timeline: "5–10 days",
  },
  {
    useCases: ["Sales pipeline automation","Invoice processing","Lead nurturing sequences","Team notifications"],
    techStack: ["Make.com / n8n","Zapier","Custom API","100+ integrations"],
    timeline: "3–7 days",
  },
  {
    useCases: ["Payment systems (Stripe)","CRM (HubSpot, Salesforce)","Project management (Notion)","Communication (Slack, Teams)"],
    techStack: ["REST API","Webhooks","OAuth 2.0","Custom middleware"],
    timeline: "3–7 days",
  },
  {
    useCases: ["Multi-channel lead capture","Sales pipeline automation","Follow-up sequences","Lead scoring & routing"],
    techStack: ["HubSpot","Salesforce","Pipedrive","Custom CRM"],
    timeline: "5–10 days",
  },
  {
    useCases: ["Clinics & medical practices","Salons & spas","Consultants & coaches","Restaurants & venues"],
    techStack: ["Calendly API","Google Calendar","Outlook","Custom booking UI"],
    timeline: "3–7 days",
  },
  {
    useCases: ["Document Q&A agent","Internal operations agent","Customer-facing assistant","Research & analysis agent"],
    techStack: ["GPT-4o / Claude","RAG pipeline","Vector database","Custom toolchain"],
    timeline: "1–3 weeks",
  },
];

// ─── Main Services Component ──────────────────────────────────────────────────
export default function Services() {
  const navigate = useNavigate();
  const { t } = useApp();
  const s = t.services;
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const allServices = [
    ...s.items.map((item, i) => ({
      tag: item.tag,
      title: item.title,
      desc: item.desc,
      feats: item.feats,
      metric: item.metric,
    })),
    ...s.moreItems.map((item) => ({
      tag: item.tag,
      title: item.title,
      desc: item.desc,
      feats: item.feats,
      metric: null,
    })),
  ];

  const tabNames = ["AI Chatbots", "Voice Agents", "Automation", "Integrations", "CRM & Leads", "Booking", "Custom Agents"];
  const service = allServices[activeTab];
  const Visual = VISUALS[activeTab];
  const details = DETAILS[activeTab];

  const handleTabChange = (i) => {
    setActiveTab(i);
    setExpanded(false);
  };

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "96px 0 112px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "12px",
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: GREEN, background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.25)",
              padding: "5px 14px", borderRadius: "99px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, animation: "arp-blink 2s ease infinite" }}/>
              {s.badge}
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800,
            fontSize: "clamp(30px, 3.5vw, 52px)", lineHeight: 1.05,
            letterSpacing: "-0.025em", color: "var(--text-primary)",
            marginBottom: "16px",
          }}>
            {s.title}{" "}<span style={gradText}>{s.titleAccent}</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "17px",
            color: "var(--text-secondary)", lineHeight: 1.65,
            maxWidth: "560px", margin: "0 auto",
          }}>
            {s.subtitle}
          </p>
        </div>

        {/* Tab navigation */}
        <div style={{ overflowX: "auto", marginBottom: "32px", paddingBottom: "4px" }}>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", minWidth: "max-content", margin: "0 auto", padding: "0 4px" }}>
            {tabNames.map((name, i) => {
              const active = i === activeTab;
              return (
                <button
                  key={i}
                  onClick={() => handleTabChange(i)}
                  style={{
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px",
                    padding: "9px 16px", borderRadius: "12px", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    border: active ? "none" : "1.5px solid var(--border)",
                    background: active ? GRAD : "transparent",
                    color: active ? "#fff" : "var(--text-muted)",
                    boxShadow: active ? "0 4px 16px rgba(124,58,237,0.30)" : "none",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; e.currentTarget.style.color = GREEN; }}}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}}
                >
                  <span style={{ color: active ? "#fff" : GREEN, opacity: active ? 1 : 0.7 }}>{TAB_ICONS[i]}</span>
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              ...card,
              overflow: "hidden",
              boxShadow: "var(--shadow-lg), 0 0 0 1px rgba(167,139,250,0.06)",
            }}>
              <div
                className="service-card-grid"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
              >
                {/* Left: text content */}
                <div className="service-card-text" style={{ padding: "48px 48px 40px" }}>
                  {/* Tag */}
                  <div style={{ marginBottom: "16px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "11px",
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      color: GREEN, background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.25)",
                      padding: "4px 12px", borderRadius: "99px",
                    }}>
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800,
                    fontSize: "clamp(22px, 2.4vw, 32px)", lineHeight: 1.1,
                    letterSpacing: "-0.025em", color: "var(--text-primary)",
                    marginBottom: "16px",
                  }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "15px",
                    color: "var(--text-secondary)", lineHeight: 1.7,
                    marginBottom: "24px",
                  }}>
                    {service.desc}
                  </p>

                  {/* Core features */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                    {service.feats.map((f, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <div style={{
                          width: "20px", height: "20px", borderRadius: "50%",
                          background: GRAD, flexShrink: 0, marginTop: "1px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5, fontWeight: 500 }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Metric callout */}
                  {service.metric && (
                    <div style={{
                      display: "inline-flex", gap: "16px", alignItems: "center",
                      padding: "14px 18px", borderRadius: "14px",
                      background: "rgba(167,139,250,0.07)", border: "1px solid rgba(167,139,250,0.18)",
                      marginBottom: "28px",
                    }}>
                      <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "28px", ...gradText, lineHeight: 1 }}>{service.metric.val}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.4, maxWidth: "120px" }}>{service.metric.lbl}</div>
                    </div>
                  )}

                  {/* Timeline badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
                      Live in <strong style={{ color: "var(--text-primary)" }}>{details.timeline}</strong>
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => navigate("/contact")}
                      style={{
                        fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px",
                        color: "#fff", background: GRAD, border: "none",
                        padding: "12px 22px", borderRadius: "12px", cursor: "pointer",
                        display: "inline-flex", alignItems: "center", gap: "7px",
                        boxShadow: "0 4px 16px rgba(124,58,237,0.28)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.40)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.28)"; }}
                    >
                      Get started <ArrowIcon white />
                    </button>

                    <button
                      onClick={() => setExpanded(e => !e)}
                      style={{
                        fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px",
                        color: "var(--text-primary)", background: "transparent",
                        border: "1.5px solid var(--border)",
                        padding: "12px 22px", borderRadius: "12px", cursor: "pointer",
                        display: "inline-flex", alignItems: "center", gap: "7px",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; e.currentTarget.style.color = GREEN; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                    >
                      {expanded ? "Show less" : s.learnMore}
                      <svg
                        width="13" height="13" viewBox="0 0 14 14" fill="none"
                        style={{ transition: "transform 0.25s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <path d="M2.5 5l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ paddingTop: "28px", borderTop: "1px solid var(--border)", marginTop: "28px" }}>
                          {/* Use cases */}
                          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Common use cases</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                            {details.useCases.map((uc, i) => (
                              <span key={i} style={{
                                fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 500,
                                color: "var(--text-secondary)", background: "var(--bg-tertiary)",
                                border: "1px solid var(--border)", borderRadius: "8px", padding: "5px 12px",
                              }}>{uc}</span>
                            ))}
                          </div>

                          {/* Tech stack */}
                          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Technology & tools</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                            {details.techStack.map((tech, i) => (
                              <span key={i} style={{
                                fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600,
                                color: GREEN, background: "rgba(167,139,250,0.08)",
                                border: "1px solid rgba(167,139,250,0.20)", borderRadius: "8px", padding: "5px 12px",
                              }}>{tech}</span>
                            ))}
                          </div>

                          {/* Delivery promise */}
                          <div style={{
                            padding: "14px 18px", borderRadius: "12px",
                            background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.16)",
                            display: "flex", alignItems: "center", gap: "12px",
                          }}>
                            <span style={{ fontSize: "20px" }}>⚡</span>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>
                              Fixed-price project · Live in <strong style={{ color: "var(--text-primary)" }}>{details.timeline}</strong> · 30-day post-launch support included
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right: visual panel */}
                <div
                  className="service-card-visual"
                  style={{
                    background: "#0f0e0d",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    padding: "48px 36px",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                    minHeight: "360px",
                  }}
                >
                  {/* Background glow */}
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%)", pointerEvents: "none" }}/>
                  <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Visual />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA banner */}
        <div style={{
          marginTop: "56px", borderRadius: "24px", padding: "52px 56px",
          background: "linear-gradient(135deg,#1c1917,#1a1917)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "32px", flexWrap: "wrap", position: "relative", overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.10) 0%,transparent 70%)", pointerEvents: "none" }}/>
          <div style={{ position: "absolute", bottom: "-40px", left: "30%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.06) 0%,transparent 70%)", pointerEvents: "none" }}/>
          <div style={{ position: "relative" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.40)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>{s.ctaEyebrow}</p>
            <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "clamp(22px,3vw,36px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              {s.ctaTitle}{" "}<span style={{ background: "linear-gradient(135deg,#c4b5fd,#a78bfa,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.ctaAccent}</span>
            </h3>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", position: "relative" }}>
            <button
              onClick={() => navigate("/contact")}
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px", color: "#fff", background: GRAD, border: "none", padding: "13px 28px", borderRadius: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 20px rgba(167,139,250,0.30)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(167,139,250,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(167,139,250,0.30)"; }}
            >
              {s.ctaBtn1}<ArrowIcon white/>
            </button>
            <button
              onClick={() => navigate("/pricing")}
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px", color: "rgba(255,255,255,0.65)", background: "none", border: "1.5px solid rgba(255,255,255,0.15)", padding: "13px 28px", borderRadius: "13px", cursor: "pointer", transition: "border-color 0.2s,color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.38)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            >
              {s.ctaBtn2}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
