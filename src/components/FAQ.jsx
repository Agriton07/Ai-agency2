import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import { GREEN, GREEN_DARK, GRAD, card, SectionBadge, SectionTitle, SectionSub, ArrowIcon, gradText } from "../utils/SharedUI";

const ChevronDown = ({ open }) => (
  <svg
    width="18" height="18" viewBox="0 0 20 20" fill="none"
    style={{ transition: "transform 0.28s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
  >
    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FAQItem = ({ item, isOpen, onToggle, index }) => {
  return (
    <div
      style={{
        ...card,
        overflow: "hidden",
        transition: "box-shadow 0.2s, border-color 0.2s",
        borderColor: isOpen ? "rgba(167,139,250,0.35)" : "var(--border)",
        boxShadow: isOpen ? "0 4px 24px rgba(167,139,250,0.10)" : "var(--shadow-sm)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "22px 28px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
            background: isOpen ? GRAD : "var(--bg-tertiary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}>
            <span style={{
              fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "11px",
              color: isOpen ? "#fff" : "var(--text-muted)",
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "15px",
            color: "var(--text-primary)", lineHeight: 1.35,
          }}>
            {item.q}
          </span>
        </div>
        <div style={{ color: isOpen ? GREEN_DARK : "var(--text-muted)", transition: "color 0.2s" }}>
          <ChevronDown open={isOpen}/>
        </div>
      </button>

      <div style={{
        maxHeight: isOpen ? "400px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.32s ease",
      }}>
        <div style={{
          padding: "0 28px 24px 70px",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
        }}>
          {item.a}
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const navigate = useNavigate();
  const { t } = useApp();
  const f = t.faq;
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section style={{ background: "var(--bg-tertiary)", padding: "96px 0 112px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
        <SectionBadge>{f.badge}</SectionBadge>
        <SectionTitle accent={f.titleAccent}>{f.title}</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "56px" }}>
          <SectionSub>{f.subtitle}</SectionSub>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {f.items.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* CTA at the bottom */}
        <div style={{
          marginTop: "52px",
          textAlign: "center",
          padding: "36px 40px",
          borderRadius: "20px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}>
          <p style={{
            fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "22px",
            color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "10px",
          }}>
            Still have questions?
          </p>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "15px",
            color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px",
          }}>
            Book a free 30-minute call and we'll answer everything.
          </p>
          <button
            onClick={() => navigate("/contact")}
            style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px",
              color: "#fff", background: GRAD, border: "none",
              padding: "12px 28px", borderRadius: "12px", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: "7px",
              boxShadow: "0 4px 20px rgba(167,139,250,0.28)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(167,139,250,0.38)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(167,139,250,0.28)"; }}
          >
            Book a free call <ArrowIcon white/>
          </button>
        </div>
      </div>
    </section>
  );
}
