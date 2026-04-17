import { useState, useRef } from "react";
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

// Icons & spans are structural (not translatable)
const TILE_META = [
  { icon: "💬", span: 2 },
  { icon: "📞", span: 1 },
  { icon: "⚡", span: 1 },
  { icon: "📊", span: 2 },
  { icon: "📅", span: 2 },
  { icon: "🔗", span: 2 },
  { icon: "🤖", span: 2 },
];

const AVATARS = [
  { initials: "JK", bg: "#7c3aed" },
  { initials: "AJ", bg: "#a78bfa" },
  { initials: "AA", bg: "#9333ea" },
];

function useReveal(vp = VP) {
  const ref = useRef(null);
  const inView = useInView(ref, vp);
  return { ref, inView };
}

// ─── Metric Strip ─────────────────────────────────────────────────────────────
function MetricStrip() {
  const { t } = useApp();
  const metrics = t.home.metrics;
  const { ref, inView } = useReveal();

  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-secondary)",
      padding: "40px 0",
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
                fontSize: "clamp(22px, 2.8vw, 36px)", lineHeight: 1.05,
                marginBottom: "6px", ...gradText,
              }}>
                {m.value}
              </div>
              <div style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "13px",
                color: "var(--text-muted)", lineHeight: 1.4,
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
          fontSize: "20px", marginBottom: "14px",
          transition: "background 0.25s",
        }}>
          {meta.icon}
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
      <MetricStrip />
      <ServicesGrid />
      <ProcessSection />
      <PricingTeaser />
      <UseCasesTeaser />
      <SocialProof />
      <HomeCTA />
    </PageTransition>
  );
}
