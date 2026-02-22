import React from "react";
import { Link, useLocation } from "react-router-dom";

const ICONS = {
  Dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Problems: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 18l6-6-6-6" />
      <path d="M8 6v12" />
    </svg>
  ),
  Submissions: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  "Submission History": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18" />
      <path d="M3 6h18" />
      <path d="M3 18h18" />
      <path d="M7 3v18" />
      <path d="M13 3v18" />
      <path d="M17 3v18" />
    </svg>
  ),
  Standings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Profile: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const SIDEBAR_LINKS = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard" },
  { id: "problems", label: "Problems", path: "/problems" },
  { id: "submissions", label: "Submissions", path: "/submissions" },
  { id: "submission-history", label: "Submission History", path: "/submission-history" },
  { id: "standings", label: "Standings", path: "/leaderboard" },
  { id: "profile", label: "Profile", path: "/profile" },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    if (path === "/problems") return location.pathname.startsWith("/problems") && !location.pathname.endsWith("/create-problem");
    if (path === "/leaderboard") return location.pathname === "/leaderboard";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="sidebar-desktop"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "240px",
          minHeight: "100%",
          backgroundColor: "#0f172a",
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          padding: "1.25rem 0",
        }}
      >
      <div style={{ padding: "0 1rem", marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "#c4c4c4",
            letterSpacing: "0.02em",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          CPELITE
        </div>
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          flex: 1,
        }}
      >
        {SIDEBAR_LINKS.map((link) => {
          const active = isActive(link.path);
          const iconKey = link.label;
          return (
            <Link
              key={link.id}
              to={link.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                margin: "0 0.75rem",
                fontSize: "0.9375rem",
                fontWeight: active ? "600" : "500",
                color: active ? "#135bec" : "#b5b5b4",
                backgroundColor: active ? "rgba(19, 91, 236, 0.15)" : "transparent",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.color = "#c4c4c4";
                }
              }}
              onMouseOut={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#b5b5b4";
                }
              }}
            >
              <span style={{ display: "flex", alignItems: "center", color: active ? "#135bec" : "inherit" }}>
                {ICONS[iconKey] ?? ICONS.Dashboard}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          padding: "1rem",
          margin: "0 0.75rem",
          marginTop: "auto",
          backgroundColor: "#1a2233",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundImage: "url('https://api.dicebear.com/7.x/avataaars/svg?seed=user')",
              backgroundSize: "cover",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          />
          <div>
            <div style={{ fontSize: "0.9375rem", fontWeight: "600", color: "#c4c4c4" }}>Alex</div>
            <div style={{ fontSize: "0.75rem", color: "#b5b5b4" }}>Rating: 2840</div>
          </div>
        </div>
        <Link
          to="/profile"
          style={{
            fontSize: "0.8125rem",
            color: "#135bec",
            textDecoration: "none",
          }}
          onMouseOver={(e) => { e.target.style.textDecoration = "underline"; }}
          onMouseOut={(e) => { e.target.style.textDecoration = "none"; }}
        >
          View Profile
        </Link>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
