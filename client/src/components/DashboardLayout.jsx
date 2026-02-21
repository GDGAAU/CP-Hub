import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

const DashboardLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#101622",
        width: "100%",
      }}
    >
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
        style={{
          display: "none",
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 1001,
          padding: "8px",
          backgroundColor: "#1a2233",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          color: "#c4c4c4",
          cursor: "pointer",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'show' : ''}`}
        onClick={toggleMobileMenu}
      />

      {isDashboard ? (
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <Sidebar />
          <main
            style={{
              flex: 1,
              padding: "24px",
              backgroundColor: "#101622",
              overflow: "auto",
            }}
          >
            <Outlet />
          </main>
        </div>
      ) : (
        <>
          <TopNav />
          <main
            style={{
              flex: 1,
              padding: "24px",
              backgroundColor: "#101622",
              overflow: "auto",
            }}
          >
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
