import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

const DashboardLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#101622",
      }}
    >
      {isDashboard ? (
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <Sidebar />
          <main
            style={{
              flex: 1,
              padding: "32px",
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
              padding: "32px",
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
