import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useApp } from "../context/useApp";
import PageTransition from "../components/PageTransition";
import Hero from "../components/hero";
import SocialProof from "../components/SocialProof";
import { GREEN, GREEN_DARK, GRAD, card, gradText, SectionBadge, SectionTitle, SectionSub, ArrowIcon, GreenCheck } from "../utils/SharedUI";

// ─── Shared stagger container ─────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const fadeItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

function useReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return { ref, inView };
}

// ─── Services Preview Grid ────────────────────────────────────────────────────
const SERVICE_TILES = [
  { icon: "💬", label: "AI Chatbots",         desc: "Web, WhatsApp & social media" },
  { icon: "📞", label: "AI Voice Agents",      desc: "Automated phone call handling" },
  { icon: "⚡", label: "Workflow Automation",  desc: "End-to-end process automation" },
  { icon: "📊", label: "CRM & Lead Mgmt",      desc: "Capture, score & follow up" },
  { icon: "📅", label: "Appointment Booking",  desc: "24/7 self-service booking" },
  { icon: "🔗", label: "API Integrations",     desc: "Stripe, Notion, HubSpot & more" },
  { icon: "🤖", label: "Custom AI Agents",     desc: "Built around your exact business" },
];

function ServicesPreview() {
  const navigate = useNavigate();
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "96px 0" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeItem}>
            <SectionBadge>What we automate</SectionBadge>
            <SectionTitle accent="for every business">AI systems built</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "52px" }}>
              <SectionSub>Seven proven AI systems, any business, any industry. Pick what you need — we build and connect it all.</SectionSub>
            </div>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}>
            {SERVICE_TILES.map((tile, i) => (
              <motion.div key={i} variants={fadeItem}>
                <motion.div
                  onClick={() => navigate("/services")}
                  whileHover={{ y: -5, borderColor: "rgba(167,139,250,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    ...card,
                    padding: "22px 20px",
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", gap: "10px",
                  }}
                >
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "11px",
                    background: "rgba(167,139,250,0.10)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px",
                  }}>
                    {tile.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "14px", color: "var(--text-primary)", marginBottom: "4px" }}>{tile.label}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--text-muted)" }}>{tile.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeItem} style={{ marginTop: "36px", display: "flex", justifyContent: "center" }}>
            <motion.button
              onClick={() => navigate("/services")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px",
                color: GREEN_DARK, background: "transparent",
                border: "1.5px solid rgba(167,139,250,0.40)",
                padding: "10px 24px", borderRadius: "11px", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "6px",
              }}
            >
              View all 7 services in detail <ArrowIcon/>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── How We Work (compact 4-step) ────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "Free discovery call", desc: "30 minutes. We learn your business, map out what can be automated, and check if we're a fit." },
  { num: "02", title: "Custom proposal",      desc: "A clear plan: what we build, how it works, the price, and the timeline. No vague scope." },
  { num: "03", title: "Build & integrate",    desc: "We build your AI system, connect it to your tools, and test everything before launch." },
  { num: "04", title: "Launch & support",     desc: "Live in 1–3 weeks. 30 days of post-launch monitoring and adjustments included." },
];

function HowWeWork() {
  const { ref, inView } = useReveal();
  return (
    <section style={{ background: "var(--bg-tertiary)", padding: "96px 0" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeItem}>
            <SectionBadge>Our process</SectionBadge>
            <SectionTitle accent="fast results.">Simple process.</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "56px" }}>
              <SectionSub>Four steps from first conversation to a live AI system — no surprises, no delays.</SectionSub>
            </div>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}>
            {STEPS.map((step, i) => (
              <motion.div key={i} variants={fadeItem}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    ...card,
                    padding: "28px 24px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Step number watermark */}
                  <div style={{
                    position: "absolute", top: "-8px", right: "16px",
                    fontFamily: "'Fraunces',serif", fontWeight: 800,
                    fontSize: "64px", lineHeight: 1,
                    color: "var(--bg-tertiary)",
                    userSelect: "none", pointerEvents: "none",
                  }}>
                    {step.num}
                  </div>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: GRAD, display: "flex", alignItems: "center",
                    justifyContent: "center", marginBottom: "16px",
                  }}>
                    <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "12px", color: "#fff" }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "17px", color: "var(--text-primary)", marginBottom: "10px", letterSpacing: "-0.02em" }}>{step.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing Teaser ───────────────────────────────────────────────────────────
const PRICE_TIERS = [
  { name: "Starter", price: "€150 – €400", desc: "First AI automation. One problem solved, fast.", color: "var(--text-muted)" },
  { name: "Growth",  price: "€400 – €900", desc: "Multiple systems working together to save hours.", featured: true },
  { name: "Business",price: "€900 – €2,000", desc: "Full AI ecosystem for a scalable operation.", color: "var(--text-muted)" },
];

function PricingTeaser() {
  const navigate = useNavigate();
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "var(--bg-primary)", padding: "96px 0" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeItem}>
            <SectionBadge>Pricing</SectionBadge>
            <SectionTitle accent="transparent pricing">Simple,</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "52px" }}>
              <SectionSub>Fixed-price projects. No hidden fees. No monthly subscriptions. Pick your scope.</SectionSub>
            </div>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            alignItems: "center",
          }}>
            {PRICE_TIERS.map((tier, i) => (
              <motion.div key={i} variants={fadeItem}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    ...card,
                    padding: "28px 24px",
                    textAlign: "center",
                    position: "relative",
                    ...(tier.featured ? {
                      border: "2px solid rgba(167,139,250,0.50)",
                      boxShadow: "0 12px 48px rgba(167,139,250,0.14)",
                    } : {}),
                  }}
                >
                  {tier.featured && (
                    <div style={{
                      position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)",
                      background: GRAD, borderRadius: "99px", padding: "3px 16px",
                      fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700,
                      color: "#fff", letterSpacing: "0.06em", whiteSpace: "nowrap",
                    }}>
                      Most popular
                    </div>
                  )}
                  <p style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "20px", color: "var(--text-primary)", marginBottom: "8px" }}>{tier.name}</p>
                  <p style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "28px", ...gradText, marginBottom: "10px" }}>{tier.price}</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "20px" }}>{tier.desc}</p>
                  <motion.button
                    onClick={() => navigate("/contact")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%", fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                      fontSize: "13px", padding: "10px", borderRadius: "10px", cursor: "pointer",
                      ...(tier.featured
                        ? { background: GRAD, color: "#fff", border: "none" }
                        : { background: "transparent", color: "var(--text-primary)", border: "1.5px solid var(--border)" }),
                    }}
                  >
                    Get started
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeItem} style={{ marginTop: "28px", display: "flex", justifyContent: "center" }}>
            <motion.button
              onClick={() => navigate("/pricing")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px",
                color: "var(--text-muted)", background: "transparent", border: "none",
                cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px",
              }}
            >
              See full pricing & deliverables <ArrowIcon/>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Use Cases Teaser (3 cards) ───────────────────────────────────────────────
const TEASER_CASES = [
  { icon: "💬", tag: "Sales & Lead Gen",   title: "Never Miss a Lead",   desc: "A prospect messages at 11pm — your AI responds instantly, qualifies them, and books a call. While you sleep." },
  { icon: "📞", tag: "Booking & Ops",      title: "Calls on Autopilot",  desc: "Your AI voice agent picks up every call, books appointments, and sends confirmations — 24/7, zero hold music." },
  { icon: "⚡", tag: "Workflow Automation", title: "Admin Runs Itself",   desc: "Deal closes → contract sent → Notion updated → Stripe invoice sent → Slack notified. One trigger." },
];

function UseCasesTeaser() {
  const navigate = useNavigate();
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "96px 0" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeItem}>
            <SectionBadge>Use Cases</SectionBadge>
            <SectionTitle accent="actually automate">What businesses</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "52px" }}>
              <SectionSub>Real scenarios. Real outcomes. No industry is off-limits.</SectionSub>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {TEASER_CASES.map((c, i) => (
              <motion.div key={i} variants={fadeItem}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(167,139,250,0.35)" }}
                  transition={{ duration: 0.2 }}
                  style={{ ...card, padding: "28px 24px", height: "100%" }}
                >
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(167,139,250,0.10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "14px" }}>{c.icon}</div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: GREEN_DARK, background: "rgba(167,139,250,0.10)", border: "1px solid rgba(167,139,250,0.25)", padding: "3px 10px", borderRadius: "99px" }}>{c.tag}</span>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "18px", color: "var(--text-primary)", margin: "12px 0 8px", letterSpacing: "-0.02em" }}>{c.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{c.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeItem} style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
            <motion.button
              onClick={() => navigate("/use-cases")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px",
                color: GREEN_DARK, background: "transparent",
                border: "1.5px solid rgba(167,139,250,0.40)",
                padding: "10px 24px", borderRadius: "11px", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "6px",
              }}
            >
              See all 6 use cases <ArrowIcon/>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Final CTA Banner ─────────────────────────────────────────────────────────
function HomeCTA() {
  const navigate = useNavigate();
  const { ref, inView } = useReveal();

  return (
    <section style={{ background: "var(--bg-primary)", padding: "80px 0 100px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{
            borderRadius: "28px",
            padding: "60px 52px",
            background: "linear-gradient(135deg, #1c1917, #262421)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Glow */}
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.12) 0%,transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%)", pointerEvents: "none" }}/>

            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px" }}>
              Ready to automate?
            </p>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "16px" }}>
              Book a free{" "}
              <span style={gradText}>30-minute call.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.50)", lineHeight: 1.65, maxWidth: "460px", margin: "0 auto 36px" }}>
              We'll map out exactly what AI can do for your business. No commitment, no pitch — just a clear conversation.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                onClick={() => navigate("/contact")}
                whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(167,139,250,0.50)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
                  color: "#fff", background: GRAD, border: "none",
                  padding: "14px 32px", borderRadius: "14px", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  boxShadow: "0 4px 24px rgba(167,139,250,0.35)",
                }}
              >
                Book a free call <ArrowIcon white/>
              </motion.button>
              <motion.button
                onClick={() => navigate("/services")}
                whileHover={{ scale: 1.03, color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
                  color: "rgba(255,255,255,0.55)", background: "none",
                  border: "1.5px solid rgba(255,255,255,0.18)",
                  padding: "14px 32px", borderRadius: "14px", cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                See our services
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page assembly ────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <ServicesPreview />
      <HowWeWork />
      <PricingTeaser />
      <UseCasesTeaser />
      <SocialProof />
      <HomeCTA />
    </PageTransition>
  );
}
