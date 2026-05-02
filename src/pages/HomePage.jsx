import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useApp } from "../context/useApp";
import PageTransition from "../components/PageTransition";
import Hero from "../components/hero";
import SocialProof from "../components/SocialProof";
import {
  GREEN, GREEN_DARK, GRAD, card, gradText,
  SectionBadge, SectionTitle, SectionSub, ArrowIcon, Container,
} from "../utils/SharedUI";
import {
  fadeUp, STAGGER,
  HOVER_LIFT, HOVER_LIFT_SM, HOVER_SCALE, TAP, TAP_SM,
  VP, D, E,
} from "../utils/motion";

// SVG icons for service tiles
const TileIcons = {
  chat: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  phone: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 2.82h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.36a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  lightning: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  chart: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  calendar: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  share: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  cpu: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
};

// Icons & spans are structural (not translatable)
const TILE_META = [
  { icon: TileIcons.chat,      span: 2 },
  { icon: TileIcons.phone,     span: 1 },
  { icon: TileIcons.lightning, span: 1 },
  { icon: TileIcons.chart,     span: 2 },
  { icon: TileIcons.calendar,  span: 2 },
  { icon: TileIcons.share,     span: 2 },
  { icon: TileIcons.cpu,       span: 2 },
];

const AVATARS = [
  { initials: "AÁ", bg: "#7c3aed" },
  { initials: "JK", bg: "#a78bfa" },
  { initials: "AK", bg: "#9333ea" },
];

const MARQUEE_CAPS = [
  "AI Chatbots", "Lead Qualification", "Voice Agents", "CRM Integration",
  "Email Automation", "Appointment Booking", "Invoice Processing",
  "24/7 Support", "WhatsApp Bots", "Custom AI Agents", "Workflow Automation",
  "Sales Pipelines",
];

const DEMO_MESSAGES = [
  { from: "customer", text: "Hi! I saw your ad — can I still book a table for tonight?" },
  { from: "ai",       text: "Hi there! Yes, we have availability. How many guests and what time works for you?", delay: 1400 },
  { from: "customer", text: "Party of 4, around 8pm please", delay: 2800 },
  { from: "ai",       text: "Perfect! I've reserved a table for 4 at 8:00 PM tonight ✓ Name for the booking?", delay: 4200 },
  { from: "customer", text: "Marco Rossi", delay: 5600 },
  { from: "ai",       text: "Done! Booking confirmed for Marco Rossi — 4 guests, 8:00 PM. You'll receive a confirmation shortly 🎉", delay: 6800 },
];

const DEMO_EVENTS = [
  { icon: "🟢", label: "Message received",   time: "00:01", active: 1 },
  { icon: "🧠", label: "Intent classified",  time: "00:01", active: 2 },
  { icon: "📅", label: "Booking confirmed",  time: "00:03", active: 4 },
  { icon: "📧", label: "Confirmation sent",  time: "00:07", active: 5 },
  { icon: "📊", label: "CRM updated",        time: "00:07", active: 6 },
];

function useReveal(vp = VP) {
  const ref = useRef(null);
  const inView = useInView(ref, vp);
  return { ref, inView };
}

function useCountUp(target, duration = 1600, inView = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

// ─── Marquee Strip ────────────────────────────────────────────────────────────
function MarqueeStrip() {
  const doubled = [...MARQUEE_CAPS, ...MARQUEE_CAPS];
  return (
    <div style={{
      overflow: "hidden",
      background: "var(--bg-primary)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "14px 0",
      position: "relative",
    }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "80px", background: "linear-gradient(90deg, var(--bg-primary), transparent)", zIndex: 1, pointerEvents: "none" }}/>
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "80px", background: "linear-gradient(-90deg, var(--bg-primary), transparent)", zIndex: 1, pointerEvents: "none" }}/>

      <div
        className="marquee-inner"
        style={{
          display: "flex", gap: "0",
          animation: "marquee 28s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((cap, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: "0",
            fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "13px",
            color: "var(--text-muted)", whiteSpace: "nowrap",
            padding: "0 24px",
          }}>
            {cap}
            <span style={{ marginLeft: "24px", color: "rgba(167,139,250,0.5)", fontWeight: 300 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Metric Strip ─────────────────────────────────────────────────────────────
const METRIC_NUMS = [3, 60, 24, 100];

function MetricCounter({ target, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp(target, 1800, inView);
  return (
    <span ref={ref} style={{ display: "inline" }}>
      {prefix}{count}{suffix}
    </span>
  );
}

function MetricStrip() {
  const { t } = useApp();
  const metrics = t.home.metrics;
  const { ref, inView } = useReveal();

  return (
    <div style={{
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-secondary)",
      padding: "48px 0",
    }}>
      <Container>
        <motion.div
          ref={ref}
          variants={STAGGER}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="metric-strip"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                textAlign: "center",
                padding: "0 24px",
                borderRight: i < metrics.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{
                fontFamily: "'Fraunces',serif", fontWeight: 800,
                fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1.0,
                marginBottom: "8px", ...gradText,
              }}>
                {i === 0 ? <><MetricCounter target={1} prefix="" suffix="–3 wks" /></> :
                 i === 1 ? <><MetricCounter target={60} suffix="%+" /></> :
                 i === 2 ? <>24/7</> :
                           <><MetricCounter target={100} suffix="+" /></>}
              </div>
              <div style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                color: "var(--text-muted)", lineHeight: 1.45,
              }}>
                {m.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}

// ─── Services Bento Grid ──────────────────────────────────────────────────────
function ServiceTile({ tile, meta, learnMore }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <motion.div
      variants={fadeUp}
      style={{ gridColumn: `span ${meta.span}` }}
      onClick={() => navigate("/services")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={HOVER_LIFT_SM}
      whileTap={TAP_SM}
      transition={{ duration: D.fast, ease: E.out }}
    >
      <div style={{
        ...card,
        padding: "24px 22px",
        cursor: "pointer", height: "100%",
        borderColor: hovered ? "rgba(167,139,250,0.35)" : "var(--border)",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transition: "border-color 0.22s, box-shadow 0.22s",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 80% 10%, rgba(167,139,250,0.06) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none",
        }}/>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: hovered ? GRAD : "rgba(167,139,250,0.10)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "14px",
          transition: "background 0.25s",
        }}>
          {meta.icon(hovered ? "#fff" : "rgba(167,139,250,0.85)")}
        </div>
        <p style={{
          fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "15px",
          color: "var(--text-primary)", marginBottom: "5px", letterSpacing: "-0.01em",
        }}>
          {tile.label}
        </p>
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "12px",
          color: "var(--text-muted)", lineHeight: 1.5,
        }}>
          {tile.desc}
        </p>
        <div style={{
          marginTop: "14px",
          display: "inline-flex", alignItems: "center", gap: "4px",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "12px",
          color: GREEN_DARK,
          opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-6px)",
          transition: "opacity 0.22s, transform 0.22s",
        }}>
          {learnMore} <ArrowIcon/>
        </div>
      </div>
    </motion.div>
  );
}

function ServicesGrid() {
  const { t } = useApp();
  const s = t.home.servicesGrid;
  const navigate = useNavigate();
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "100px 0" }}>
      <Container>
        <motion.div ref={ref} variants={STAGGER} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
            <SectionBadge>{s.badge}</SectionBadge>
            <SectionTitle accent={s.titleAccent}>{s.title}</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "52px" }}>
              <SectionSub>{s.subtitle}</SectionSub>
            </div>
          </motion.div>

          <div
            className="services-home-bento"
            style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "14px" }}
          >
            {s.tiles.map((tile, i) => (
              <ServiceTile key={i} tile={tile} meta={TILE_META[i]} learnMore={s.learnMore} />
            ))}
          </div>

          <motion.div variants={fadeUp} style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
            <motion.button
              onClick={() => navigate("/services")}
              whileHover={HOVER_SCALE}
              whileTap={TAP}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px",
                color: GREEN_DARK, background: "transparent",
                border: "1.5px solid rgba(167,139,250,0.40)",
                padding: "11px 26px", borderRadius: "12px", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "6px",
              }}
            >
              {s.cta} <ArrowIcon/>
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Live Demo Section (Signature Element) ───────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "10px 14px" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "rgba(167,139,250,0.6)",
          animation: `typing-dot 1.2s ${i * 0.2}s ease-in-out infinite`,
        }}/>
      ))}
    </div>
  );
}

function ChatBubble({ msg, visible }) {
  const isAI = msg.from === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        justifyContent: isAI ? "flex-start" : "flex-end",
        marginBottom: "10px",
      }}
    >
      {isAI && (
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%", background: GRAD,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginRight: "8px", marginTop: "2px", fontSize: "12px",
        }}>
          🤖
        </div>
      )}
      <div style={{
        maxWidth: "75%",
        padding: "10px 14px",
        borderRadius: isAI ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
        background: isAI ? "var(--bg-tertiary)" : GRAD,
        color: isAI ? "var(--text-primary)" : "#fff",
        fontFamily: "'DM Sans',sans-serif", fontSize: "13px", lineHeight: 1.55,
        border: isAI ? "1px solid var(--border)" : "none",
        boxShadow: isAI ? "none" : "0 4px 16px rgba(124,58,237,0.25)",
      }}>
        {msg.text}
      </div>
    </motion.div>
  );
}

function LiveDemoSection() {
  const { t } = useApp();
  const navigate = useNavigate();
  const { ref, inView } = useReveal();
  const [step, setStep] = useState(-1);
  const [showTyping, setShowTyping] = useState(false);
  const [activeEvents, setActiveEvents] = useState([]);
  const resetRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    const schedule = (fn, ms) => setTimeout(fn, ms);
    const timers = [];

    const run = () => {
      setStep(-1);
      setShowTyping(false);
      setActiveEvents([]);

      timers.push(schedule(() => setStep(0), 600));

      DEMO_MESSAGES.forEach((msg, i) => {
        const delay = msg.delay || 0;
        if (msg.from === "ai") {
          timers.push(schedule(() => setShowTyping(true), delay - 800));
          timers.push(schedule(() => { setShowTyping(false); setStep(i); }, delay));
        } else {
          timers.push(schedule(() => setStep(i), delay));
        }

        const eventsToShow = DEMO_EVENTS.filter(e => e.active <= i + 1);
        timers.push(schedule(() => setActiveEvents(eventsToShow.map(e => e.label)), delay + 200));
      });

      resetRef.current = schedule(run, 14000);
    };

    run();
    return () => { timers.forEach(clearTimeout); clearTimeout(resetRef.current); };
  }, [inView]);

  return (
    <section style={{ background: "var(--bg-primary)", padding: "100px 0 110px", position: "relative", overflow: "hidden" }}>
      <div className="dot-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: "20%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 65%)", pointerEvents: "none" }}/>

      <Container>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "12px",
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: GREEN, background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.25)",
              padding: "5px 14px", borderRadius: "99px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, animation: "arp-blink 2s ease infinite" }}/>
              Watch it work
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800,
            fontSize: "clamp(30px, 3.5vw, 52px)", lineHeight: 1.05,
            letterSpacing: "-0.025em", color: "var(--text-primary)",
            marginBottom: "16px",
          }}>
            Your AI responds while{" "}
            <span style={gradText}>you sleep.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "17px",
            color: "var(--text-secondary)", lineHeight: 1.65,
            maxWidth: "520px", margin: "0 auto",
          }}>
            A customer messages at 11pm. Your AI qualifies, responds, and books — in seconds. No human needed.
          </p>
        </div>

        {/* Demo grid */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="live-demo-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}
        >
          {/* Chat window */}
          <div style={{
            ...card,
            overflow: "hidden",
            boxShadow: "var(--shadow-lg), 0 0 0 1px rgba(167,139,250,0.08)",
          }}>
            {/* Window chrome */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "14px 16px", borderBottom: "1px solid var(--border)",
              background: "var(--bg-tertiary)",
            }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {["#ff5f57","#ffbd2e","#28c840"].map((c, i) => (
                  <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                ))}
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
                  Your Business AI — WhatsApp
                </span>
              </div>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 2px rgba(34,197,94,0.2)" }}/>
            </div>

            {/* Chat messages */}
            <div style={{ padding: "20px 16px", minHeight: "320px" }}>
              <AnimatePresence>
                {DEMO_MESSAGES.slice(0, step + 1).map((msg, i) => (
                  <ChatBubble key={i} msg={msg} visible />
                ))}
                {showTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}
                  >
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "12px" }}>🤖</div>
                    <div style={{ ...card, padding: "0", background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}>
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div style={{
              padding: "12px 16px", borderTop: "1px solid var(--border)",
              display: "flex", gap: "10px", alignItems: "center",
              background: "var(--bg-tertiary)",
            }}>
              <div style={{
                flex: 1, padding: "9px 14px", borderRadius: "99px",
                background: "var(--bg-input)", border: "1px solid var(--border)",
                fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-muted)",
              }}>
                AI is handling this conversation...
              </div>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Event feed */}
          <div className="live-demo-events" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "11px",
              color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em",
              marginBottom: "4px",
            }}>
              Automated actions
            </p>
            {DEMO_EVENTS.map((ev, i) => {
              const active = activeEvents.includes(ev.label);
              return (
                <motion.div
                  key={i}
                  animate={active ? { opacity: 1, x: 0 } : { opacity: 0.28, x: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    ...card,
                    padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: "12px",
                    borderColor: active ? "rgba(167,139,250,0.30)" : "var(--border)",
                    boxShadow: active ? "var(--shadow-sm), 0 0 0 1px rgba(167,139,250,0.10)" : "none",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                >
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                    background: active ? GRAD : "var(--bg-tertiary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "15px", transition: "background 0.3s",
                  }}>
                    {ev.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)", marginBottom: "2px" }}>
                      {ev.label}
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)" }}>
                      {active ? `completed in ${ev.time}` : "waiting..."}
                    </p>
                  </div>
                  {active && (
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Bottom stat */}
            <div style={{
              marginTop: "8px", padding: "18px 20px", borderRadius: "16px",
              background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.16)",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <span style={{ fontSize: "22px" }}>⚡</span>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                <strong style={{ color: "var(--text-primary)" }}>All of this happened in under 8 seconds</strong> — automatically, while you were unavailable.
              </p>
            </div>

            <button
              onClick={() => navigate("/contact")}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px",
                color: "#fff", background: GRAD, border: "none",
                padding: "13px 24px", borderRadius: "12px", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "8px",
                boxShadow: "0 4px 20px rgba(167,139,250,0.30)",
                transition: "transform 0.2s, box-shadow 0.2s",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(167,139,250,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(167,139,250,0.30)"; }}
            >
              Build this for my business <ArrowIcon white />
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Process Section (interactive) ───────────────────────────────────────────
function ProcessSection() {
  const { t } = useApp();
  const p = t.home.process;
  const [active, setActive] = useState(0);
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "var(--bg-tertiary)", padding: "100px 0" }}>
      <Container size="md">
        <motion.div ref={ref} variants={STAGGER} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
            <SectionBadge>{p.badge}</SectionBadge>
            <SectionTitle accent={p.titleAccent}>{p.title}</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "52px" }}>
              <SectionSub>{p.subtitle}</SectionSub>
            </div>
          </motion.div>

          {/* Step selector track */}
          <motion.div variants={fadeUp}>
            <div className="process-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0", marginBottom: "32px", position: "relative",
            }}>
              {p.steps.map((step, i) => (
                <div key={i} style={{ position: "relative" }}>
                  {i < p.steps.length - 1 && (
                    <div style={{
                      position: "absolute", top: "18px", left: "50%", right: "-50%",
                      height: "2px", background: "var(--border)", zIndex: 0,
                    }} className="process-connector">
                      <motion.div
                        animate={{ scaleX: i < active ? 1 : 0 }}
                        transition={{ duration: D.base, ease: E.out }}
                        style={{ position: "absolute", inset: 0, background: GRAD, transformOrigin: "left" }}
                      />
                    </div>
                  )}
                  <button
                    onClick={() => setActive(i)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      gap: "10px", width: "100%", background: "none", border: "none",
                      cursor: "pointer", padding: "0 8px", position: "relative", zIndex: 1,
                    }}
                  >
                    <motion.div
                      animate={{
                        background: i <= active ? GRAD : "var(--bg-card)",
                        borderColor: i <= active ? "transparent" : "var(--border)",
                        scale: i === active ? 1.15 : 1,
                      }}
                      transition={{ duration: D.fast, ease: E.out }}
                      style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        border: "2px solid var(--border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <span style={{
                        fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "11px",
                        color: i <= active ? "#fff" : "var(--text-muted)",
                      }}>
                        {step.num}
                      </span>
                    </motion.div>
                    <span style={{
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "12px",
                      textAlign: "center", lineHeight: 1.35,
                      color: i === active ? "var(--text-primary)" : "var(--text-muted)",
                      transition: "color 0.2s",
                    }}>
                      {step.title}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detail card */}
          <motion.div variants={fadeUp}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: D.base, ease: E.out }}
                style={{
                  ...card,
                  padding: "36px 40px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "28px",
                  alignItems: "start",
                }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: GRAD, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "16px", color: "#fff" }}>
                    {p.steps[active].num}
                  </span>
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "20px",
                    color: "var(--text-primary)", marginBottom: "10px", letterSpacing: "-0.02em",
                  }}>
                    {p.steps[active].title}
                  </h3>
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "14px",
                    color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "10px",
                  }}>
                    {p.steps[active].desc}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                    color: "var(--text-muted)", lineHeight: 1.65,
                  }}>
                    {p.steps[active].detail}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Prev / Next */}
          <motion.div variants={fadeUp} style={{
            marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <motion.button
              onClick={() => setActive(a => Math.max(0, a - 1))}
              whileHover={HOVER_LIFT_SM}
              whileTap={TAP_SM}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px",
                color: active === 0 ? "var(--text-muted)" : "var(--text-secondary)",
                background: "none", border: "1.5px solid var(--border)",
                padding: "8px 18px", borderRadius: "10px", cursor: active === 0 ? "default" : "pointer",
                opacity: active === 0 ? 0.4 : 1,
              }}
            >
              {p.prev}
            </motion.button>
            <span style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "12px",
              color: "var(--text-muted)", letterSpacing: "0.04em",
            }}>
              {String(active + 1).padStart(2, "0")} / {String(p.steps.length).padStart(2, "0")}
            </span>
            <motion.button
              onClick={() => setActive(a => Math.min(p.steps.length - 1, a + 1))}
              whileHover={HOVER_LIFT_SM}
              whileTap={TAP_SM}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px",
                color: active === p.steps.length - 1 ? "var(--text-muted)" : "var(--text-secondary)",
                background: "none", border: "1.5px solid var(--border)",
                padding: "8px 18px", borderRadius: "10px",
                cursor: active === p.steps.length - 1 ? "default" : "pointer",
                opacity: active === p.steps.length - 1 ? 0.4 : 1,
              }}
            >
              {p.next}
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Pricing Teaser ───────────────────────────────────────────────────────────
function PricingTeaser() {
  const { t } = useApp();
  const p = t.home.pricingTeaser;
  const navigate = useNavigate();
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "var(--bg-primary)", padding: "100px 0" }}>
      <Container>
        <motion.div ref={ref} variants={STAGGER} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
            <SectionBadge>{p.badge}</SectionBadge>
            <SectionTitle accent={p.titleAccent}>{p.title}</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "52px" }}>
              <SectionSub>{p.subtitle}</SectionSub>
            </div>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            alignItems: "start",
          }}>
            {p.tiers.map((tier, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{ ...(tier.featured ? { transform: "translateY(-4px)" } : {}) }}
              >
                <motion.div
                  whileHover={tier.featured ? HOVER_LIFT : HOVER_LIFT_SM}
                  whileTap={TAP_SM}
                  transition={{ duration: D.fast, ease: E.out }}
                  style={{
                    ...card,
                    padding: "32px 28px",
                    textAlign: "center",
                    position: "relative",
                    ...(tier.featured ? {
                      border: "2px solid rgba(167,139,250,0.55)",
                      boxShadow: "0 16px 56px rgba(167,139,250,0.16)",
                    } : {}),
                  }}
                >
                  {tier.featured && (
                    <div style={{
                      position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)",
                      background: GRAD, borderRadius: "99px", padding: "3px 18px",
                      fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700,
                      color: "#fff", letterSpacing: "0.08em", whiteSpace: "nowrap",
                    }}>
                      {p.popularBadge}
                    </div>
                  )}
                  <p style={{
                    fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "20px",
                    color: "var(--text-primary)", marginBottom: "8px",
                  }}>
                    {tier.name}
                  </p>
                  <p style={{
                    fontFamily: "'Fraunces',serif", fontWeight: 800,
                    fontSize: "clamp(22px, 2.5vw, 30px)", ...gradText, marginBottom: "12px",
                  }}>
                    {tier.price}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                    color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: "24px",
                  }}>
                    {tier.desc}
                  </p>
                  <motion.button
                    onClick={() => navigate("/contact")}
                    whileHover={HOVER_SCALE}
                    whileTap={TAP_SM}
                    style={{
                      width: "100%", fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                      fontSize: "13px", padding: "11px", borderRadius: "11px", cursor: "pointer",
                      ...(tier.featured
                        ? { background: GRAD, color: "#fff", border: "none", boxShadow: "0 4px 20px rgba(167,139,250,0.28)" }
                        : { background: "transparent", color: "var(--text-primary)", border: "1.5px solid var(--border)" }
                      ),
                    }}
                  >
                    {tier.cta}
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
            <motion.button
              onClick={() => navigate("/pricing")}
              whileHover={{ scale: 1.02 }}
              whileTap={TAP_SM}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px",
                color: "var(--text-muted)", background: "transparent", border: "none",
                cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px",
              }}
            >
              {p.cta} <ArrowIcon/>
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Use Cases Teaser ─────────────────────────────────────────────────────────
function UseCaseCard({ c }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={HOVER_LIFT}
      whileTap={TAP_SM}
      transition={{ duration: D.fast, ease: E.out }}
    >
      <div style={{
        ...card,
        padding: "28px 24px",
        height: "100%",
        display: "flex", flexDirection: "column",
        borderColor: hovered ? "rgba(167,139,250,0.30)" : "var(--border)",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transition: "border-color 0.22s, box-shadow 0.22s",
      }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: hovered ? GRAD : "rgba(167,139,250,0.10)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px", marginBottom: "14px",
          transition: "background 0.25s",
        }}>
          {c.icon}
        </div>
        <span style={{
          display: "inline-block",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "10px",
          textTransform: "uppercase", letterSpacing: "0.12em",
          color: GREEN_DARK, background: "rgba(167,139,250,0.10)",
          border: "1px solid rgba(167,139,250,0.25)",
          padding: "3px 10px", borderRadius: "99px", marginBottom: "12px",
        }}>
          {c.tag}
        </span>
        <h3 style={{
          fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "18px",
          color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.02em",
        }}>
          {c.title}
        </h3>
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
          color: "var(--text-secondary)", lineHeight: 1.65, flex: 1, marginBottom: "18px",
        }}>
          {c.desc}
        </p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          padding: "7px 13px", borderRadius: "10px",
          background: hovered ? "rgba(167,139,250,0.10)" : "var(--bg-tertiary)",
          border: `1px solid ${hovered ? "rgba(167,139,250,0.28)" : "var(--border)"}`,
          transition: "background 0.22s, border-color 0.22s",
          alignSelf: "flex-start",
        }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: hovered ? GREEN : "var(--text-muted)",
            transition: "background 0.22s",
          }}/>
          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "11px",
            color: hovered ? GREEN_DARK : "var(--text-muted)",
            transition: "color 0.22s",
          }}>
            {c.outcome}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function UseCasesTeaser() {
  const { t } = useApp();
  const u = t.home.useCasesTeaser;
  const navigate = useNavigate();
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "100px 0" }}>
      <Container>
        <motion.div ref={ref} variants={STAGGER} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
            <SectionBadge>{u.badge}</SectionBadge>
            <SectionTitle accent={u.titleAccent}>{u.title}</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "52px" }}>
              <SectionSub>{u.subtitle}</SectionSub>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {u.items.map((c, i) => (
              <UseCaseCard key={i} c={c} />
            ))}
          </div>

          <motion.div variants={fadeUp} style={{ marginTop: "36px", display: "flex", justifyContent: "center" }}>
            <motion.button
              onClick={() => navigate("/use-cases")}
              whileHover={HOVER_SCALE}
              whileTap={TAP}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px",
                color: GREEN_DARK, background: "transparent",
                border: "1.5px solid rgba(167,139,250,0.40)",
                padding: "11px 26px", borderRadius: "12px", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "6px",
              }}
            >
              {u.cta} <ArrowIcon/>
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Results Strip ────────────────────────────────────────────────────────────
function ResultsCounter({ val }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const num = parseInt(val.replace(/\D/g, ""), 10);
  const suffix = val.replace(/[\d]/g, "").replace("&lt;", "").trim();
  const prefix = val.includes("<") || val.includes("wk") || val.includes("sem") ? "<" : "";
  const count = useCountUp(num || 0, 1600, inView);
  return (
    <span ref={ref}>
      {prefix}{num ? count : "—"}{suffix}
    </span>
  );
}

function ResultsStrip() {
  const { t } = useApp();
  const r = t.home.resultsStrip;
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "#0a0a0b", padding: "88px 0", position: "relative", overflow: "hidden" }}>
      {/* Dark line grid */}
      <div className="line-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Orb */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 65%)", pointerEvents: "none" }}/>

      <Container style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <span style={{
            display: "inline-block",
            fontFamily: "'DM Sans',sans-serif", fontSize: "11px",
            fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(167,139,250,0.65)", marginBottom: "16px",
          }}>
            {r.label}
          </span>
        </div>

        <motion.div
          ref={ref}
          variants={STAGGER}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
          className="results-strip-grid"
        >
          {r.stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                textAlign: "center",
                padding: "40px 32px",
                borderRight: i < r.stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div style={{
                fontFamily: "'Fraunces',serif", fontWeight: 800,
                fontSize: "clamp(44px, 6vw, 72px)", lineHeight: 0.95,
                background: "linear-gradient(135deg,#c4b5fd,#a78bfa,#7c3aed)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: "16px", letterSpacing: "-0.03em",
              }}>
                <ResultsCounter val={s.val} />
              </div>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "15px",
                color: "rgba(255,255,255,0.45)", lineHeight: 1.55, margin: 0,
                maxWidth: "200px", marginLeft: "auto", marginRight: "auto",
              }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Final CTA Banner ─────────────────────────────────────────────────────────
function HomeCTA() {
  const { t } = useApp();
  const c = t.home.cta;
  const navigate = useNavigate();
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "var(--bg-primary)", padding: "80px 0 100px" }}>
      <Container size="md">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div style={{
            borderRadius: "28px",
            padding: "64px 52px",
            background: "linear-gradient(135deg, #1c1917, #262421)",
            position: "relative", overflow: "hidden",
            textAlign: "center",
          }}>
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.12) 0%,transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ position: "relative" }}>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600,
                color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
                letterSpacing: "0.12em", marginBottom: "18px",
              }}>
                {c.eyebrow}
              </p>
              <h2 style={{
                fontFamily: "'Fraunces',serif", fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 48px)", color: "#fff",
                lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "16px",
              }}>
                {c.title}{" "}
                <span style={gradText}>{c.titleAccent}</span>
              </h2>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "16px",
                color: "rgba(255,255,255,0.50)", lineHeight: 1.65,
                maxWidth: "440px", margin: "0 auto 36px",
              }}>
                {c.desc}
              </p>

              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(167,139,250,0.50)" }}
                  whileTap={TAP}
                  style={{
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
                    color: "#fff", background: GRAD, border: "none",
                    padding: "14px 32px", borderRadius: "14px", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    boxShadow: "0 4px 24px rgba(167,139,250,0.35)",
                  }}
                >
                  {c.btn1} <ArrowIcon white/>
                </motion.button>
                <motion.button
                  onClick={() => navigate("/services")}
                  whileHover={{ borderColor: "rgba(255,255,255,0.45)" }}
                  whileTap={TAP}
                  style={{
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
                    color: "rgba(255,255,255,0.55)", background: "none",
                    border: "1.5px solid rgba(255,255,255,0.18)",
                    padding: "14px 32px", borderRadius: "14px", cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                >
                  {c.btn2}
                </motion.button>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <div style={{ display: "flex" }}>
                  {AVATARS.map((a, i) => (
                    <div key={i} style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: a.bg, border: "2px solid #1c1917",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginLeft: i > 0 ? "-8px" : "0",
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "9px",
                      color: "#fff", letterSpacing: "0.02em",
                    }}>
                      {a.initials}
                    </div>
                  ))}
                </div>
                <span style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "12px",
                  color: "rgba(255,255,255,0.40)",
                }}>
                  {c.social}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Page assembly ────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <MarqueeStrip />
      <MetricStrip />
      <ServicesGrid />
      <LiveDemoSection />
      <ProcessSection />
      <PricingTeaser />
      <UseCasesTeaser />
      <ResultsStrip />
      <SocialProof />
      <HomeCTA />
    </PageTransition>
  );
}
