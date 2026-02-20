import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const AuthLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#101622",
      }}
    >
      {!isLoginPage && <Navbar />}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
