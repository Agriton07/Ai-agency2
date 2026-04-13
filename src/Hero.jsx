import { useState, useEffect } from "react";

const BarChart = () => {
  const bars = [
    { height: 40, opacity: 0.4 },
    { height: 65, opacity: 0.6 },
    { height: 50, opacity: 0.5 },
    { height: 85, opacity: 0.9 },
    { height: 70, opacity: 0.75 },
    { height: 95, opacity: 1 },
    { height: 80, opacity: 0.85 },
  ];

  return (
    <div className="flex items-end gap-1.5 h-16">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${bar.height}%`,
            background: `rgba(26, 166, 133, ${bar.opacity})`,
            transition: "height 0.3s ease",
          }}
        />
      ))}
    </div>
  );
};

const MetricCard = ({ value, label }) => (
  <div className="flex flex-col items-center gap-0.5">
    <span
      className="text-base font-bold"
      style={{
        background: "linear-gradient(135deg, #45c789, #1aa685)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {value}
    </span>
    <span className="text-xs text-center leading-tight" style={{ color: "#78716c" }}>
      {label}
    </span>
  </div>
);

const NotificationCard = () => (
  <div
    className="absolute -bottom-4 -left-4 rounded-xl p-3 flex items-start gap-2.5 shadow-lg"
    style={{
      background: "#ffffff",
      border: "1px solid #e7e5e4",
      minWidth: "220px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
    }}
  >
    <div
      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
      style={{ background: "linear-gradient(135deg, #45c789, #1aa685)" }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-semibold" style={{ color: "#292524" }}>
        New qualified lead captured
      </span>
      <span className="text-xs" style={{ color: "#78716c" }}>
        2 minutes ago · Automated
      </span>
    </div>
  </div>
);

const DashboardCard = () => (
  <div className="relative">
    <div
      className="rounded-2xl p-5 relative"
      style={{
        background: "#ffffff",
        border: "1px solid #e7e5e4",
        boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 28px 72px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)";
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: "#45c789",
                opacity: 0.4,
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            <span
              className="relative w-2.5 h-2.5 rounded-full"
              style={{ background: "#45c789" }}
            />
          </div>
          <span className="text-sm font-semibold" style={{ color: "#292524" }}>
            AI Engine Active
          </span>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ background: "#f0faf5", color: "#1aa685" }}
        >
          Live
        </span>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium" style={{ color: "#78716c" }}>
            Weekly performance
          </span>
          <span
            className="text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, #45c789, #1aa685)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            +24.8%
          </span>
        </div>
        <BarChart />
      </div>

      {/* Divider */}
      <div className="my-4" style={{ borderTop: "1px solid #e7e5e4" }} />

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <MetricCard value="[X]h/wk" label="Time Saved" />
        <MetricCard value="99.2%" label="Accuracy" />
        <MetricCard value="99.9%" label="Uptime" />
      </div>
    </div>

    {/* Overlapping Notification */}
    <NotificationCard />
  </div>
);

const AnimatedUnderline = ({ children }) => (
  <span className="relative inline-block">
    {children}
    <span
      className="absolute left-0 -bottom-1 w-full h-0.5 rounded-full"
      style={{
        background: "linear-gradient(90deg, #45c789, #1aa685)",
        transform: "scaleX(1)",
        transformOrigin: "left",
        animation: "underlineGrow 0.8s ease forwards",
      }}
    />
  </span>
);

const GradientText = ({ children }) => (
  <span
    style={{
      background: "linear-gradient(135deg, #45c789 0%, #1aa685 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {children}
  </span>
);

const StatItem = ({ value, label }) => (
  <div className="flex flex-col gap-0.5">
    <span
      className="text-2xl font-bold tracking-tight"
      style={{
        background: "linear-gradient(135deg, #45c789, #1aa685)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {value}
    </span>
    <span className="text-sm" style={{ color: "#78716c" }}>
      {label}
    </span>
  </div>
);

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes underlineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-headline {
          font-family: 'Fraunces', Georgia, serif;
          font-optical-sizing: auto;
        }
        .hero-body {
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary {
          background: linear-gradient(135deg, #45c789, #1aa685);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 24px rgba(26, 166, 133, 0.35);
        }
        .btn-secondary {
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .btn-secondary:hover {
          border-color: #1aa685 !important;
          color: #1aa685 !important;
          transform: scale(1.03);
        }
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.7s ease forwards;
        }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
        .fade-up-4 { animation-delay: 0.55s; }
        .fade-up-5 { animation-delay: 0.7s; }
      `}</style>

      <section
        className="hero-body relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#fafafa", color: "#292524" }}
      >
        {/* Subtle background decoration */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 80% 40%, rgba(69, 199, 137, 0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-1/3 h-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 20% 80%, rgba(26, 166, 133, 0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* LEFT */}
            <div className="flex flex-col gap-8">
              {/* Badge */}
              <div className="fade-up fade-up-1 inline-flex">
                <span
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(69,199,137,0.10)",
                    color: "#1aa685",
                    border: "1px solid rgba(69,199,137,0.25)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#45c789" }} />
                  Enterprise AI Automation
                </span>
              </div>

              {/* Headline */}
              <h1
                className="hero-headline fade-up fade-up-2 leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(44px, 5.5vw, 76px)", color: "#292524", fontWeight: 800 }}
              >
                Your AI partner<br />
                for{" "}
                <AnimatedUnderline>intelligent</AnimatedUnderline>
                <br />
                <GradientText>automation</GradientText>
              </h1>

              {/* Description */}
              <p
                className="fade-up fade-up-3 text-lg leading-relaxed max-w-md"
                style={{ color: "#78716c", fontWeight: 400 }}
              >
                ARP Solutions helps enterprises eliminate operational complexity through
                AI-powered automation ecosystems — so your team focuses on what drives growth.
              </p>

              {/* Buttons */}
              <div className="fade-up fade-up-4 flex flex-wrap gap-3">
                <button
                  className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-semibold text-sm shadow-md"
                >
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className="btn-secondary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm"
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #e7e5e4",
                    color: "#292524",
                  }}
                >
                  Watch Demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
                  </svg>
                </button>
              </div>

              {/* Stats */}
              <div
                className="fade-up fade-up-5 flex items-center gap-8 pt-2"
                style={{ borderTop: "1px solid #e7e5e4" }}
              >
                <div className="pt-6">
                  <StatItem value="Proven ROI" label="Across every engagement" />
                </div>
                <div
                  className="pt-6"
                  style={{ borderLeft: "1px solid #e7e5e4", paddingLeft: "2rem" }}
                >
                  <StatItem value="Massive" label="Hours saved per month" />
                </div>
              </div>
            </div>

            {/* RIGHT — Dashboard */}
            <div className="fade-up fade-up-3 flex justify-center lg:justify-end pb-8">
              <div className="w-full max-w-sm">
                <DashboardCard />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}