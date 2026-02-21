import React from "react";

const StatsCard = ({ title, value, subtitle, icon, progress, delta, variant }) => {
  const cardStyle = {
    padding: "24px",
    backgroundColor: "#1a2233",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    transition: "box-shadow 0.2s",
  };

  const iconMap = {
    check: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    trophy: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    flame: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    percent: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#135bec" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6" />
        <path d="M9 9h.01" />
        <path d="M15 15h.01" />
      </svg>
    ),
  };

  const iconEl = variant && iconMap[variant] ? iconMap[variant] : (icon ? <span style={{ fontSize: "1.125rem", opacity: 0.6 }}>{icon}</span> : null);

  return (
    <div
      style={cardStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.25)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <span style={{ fontSize: "0.8125rem", color: "#b5b5b4", fontWeight: "500" }}>
          {title}
        </span>
        {iconEl}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: "1.625rem",
            fontWeight: "700",
            color: "#c4c4c4",
            lineHeight: 1.2,
          }}
        >
          {value}
        </span>
        {delta && (
          <span style={{ fontSize: "0.8125rem", fontWeight: "600", color: "#10b981" }}>
            {delta}
          </span>
        )}
      </div>
      {subtitle && (
        <div
          style={{
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            color: "#b5b5b4",
          }}
        >
          {subtitle}
        </div>
      )}
      {progress != null && (
        <div
          style={{
            marginTop: "12px",
            height: "6px",
            backgroundColor: "#1b2334",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(100, progress)}%`,
              height: "100%",
              backgroundColor: "#135bec",
              borderRadius: "4px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
