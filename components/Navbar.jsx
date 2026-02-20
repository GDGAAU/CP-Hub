import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  const brandContent = isRegister ? (
    <>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
      </svg>
      <span style={{ color: "#c4c4c4" }}>ALGO</span>
      <span style={{ color: "#135bec" }}>LAB</span>
    </>
  ) : (
    "CPELITE"
  );

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#0f172a",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
  };

  const brandStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#c4c4c4",
    textDecoration: "none",
  };

  const linkGroupStyle = {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
  };

  const outlineLinkStyle = {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#b5b5b4",
    backgroundColor: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s",
  };

  const primaryLinkStyle = {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#135bec",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s",
  };

  return (
    <nav style={navStyle}>
      <Link
        to="/dashboard"
        style={{
          ...brandStyle,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {brandContent}
      </Link>
      <div style={linkGroupStyle}>
        <Link
          to="/login"
          style={outlineLinkStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#1a2233";
            e.currentTarget.style.borderColor = "#135bec";
            e.currentTarget.style.color = "#135bec";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.color = "#b5b5b4";
          }}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={primaryLinkStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#0f4fd4";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#135bec";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
