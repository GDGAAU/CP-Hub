import React from "react";
import { Link, useLocation } from "react-router-dom";

const PAGE_BRANDING = {
  problems: {
    icon: "trophy",
    text: (
      <>
        <span style={{ color: "#c4c4c4" }}>Algo</span>
        <span style={{ color: "#135bec" }}>Master</span>
      </>
    ),
  },
  "problems/:id": {
    icon: "sprint",
    text: (
      <>
        <span style={{ color: "#ffffff" }}>Code Sprint</span>
      </>
    ),
  },
  profile: {
    icon: "track",
    text: (
      <>
        <span style={{ color: "#c4c4c4" }}>Algo</span>
        <span style={{ color: "#135bec" }}>Track</span>
      </>
    ),
  },
  "create-problem": {
    icon: "trophy",
    text: (
      <>
        <span style={{ color: "#c4c4c4" }}>Algo</span>
        <span style={{ color: "#135bec" }}>Master</span>
      </>
    ),
  },
  leaderboard: {
    icon: "trophy",
    text: (
      <>
        <span style={{ color: "#c4c4c4" }}>ALGO</span>
        <span style={{ color: "#135bec" }}>RANK</span>
      </>
    ),
  },
  submissions: {
    icon: "check",
    text: (
      <>
        <span style={{ color: "#c4c4c4" }}>Algo</span>
        <span style={{ color: "#135bec" }}>Track</span>
      </>
    ),
  },
};

const ICONS = {
  trophy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  sprint: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  track: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
    </svg>
  ),
  check: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
};

const getBrandingForPath = (pathname) => {
  if (pathname === "/profile" || pathname.startsWith("/profile/")) return PAGE_BRANDING.profile;
  if (pathname === "/leaderboard" || pathname === "/teams") return PAGE_BRANDING.leaderboard;
  if (pathname === "/create-problem") return PAGE_BRANDING["create-problem"];
  if (pathname === "/submissions") return PAGE_BRANDING.submissions;
  if (pathname.match(/^\/problems\/[^/]+$/)) return PAGE_BRANDING["problems/:id"];
  if (pathname === "/problems") return PAGE_BRANDING.problems;
  return PAGE_BRANDING.problems;
};

const TopNav = () => {
  const location = useLocation();
  const branding = getBrandingForPath(location.pathname);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        backgroundColor: "#0f172a",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <Link
        to="/dashboard"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
          fontSize: "1.125rem",
          fontWeight: "700",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", color: location.pathname.match(/^\/problems\/[^/]+$/) ? "#ffffff" : "#c4c4c4" }}>
          {ICONS[branding.icon] || ICONS.trophy}
        </span>
        {branding.text}
      </Link>
      <nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          to="/dashboard"
          style={{
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#b5b5b4",
            textDecoration: "none",
          }}
          onMouseOver={(e) => { e.target.style.color = "#c4c4c4"; }}
          onMouseOut={(e) => { e.target.style.color = "#b5b5b4"; }}
        >
          Dashboard
        </Link>
        <Link
          to="/problems"
          style={{
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#b5b5b4",
            textDecoration: "none",
          }}
          onMouseOver={(e) => { e.target.style.color = "#c4c4c4"; }}
          onMouseOut={(e) => { e.target.style.color = "#b5b5b4"; }}
        >
          Problems
        </Link>
        <Link
          to="/profile"
          style={{
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#b5b5b4",
            textDecoration: "none",
          }}
          onMouseOver={(e) => { e.target.style.color = "#c4c4c4"; }}
          onMouseOut={(e) => { e.target.style.color = "#b5b5b4"; }}
        >
          Profile
        </Link>
        <Link
          to="/leaderboard"
          style={{
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#b5b5b4",
            textDecoration: "none",
          }}
          onMouseOver={(e) => { e.target.style.color = "#c4c4c4"; }}
          onMouseOut={(e) => { e.target.style.color = "#b5b5b4"; }}
        >
          Leaderboard
        </Link>
      </nav>
    </header>
  );
};

export default TopNav;
