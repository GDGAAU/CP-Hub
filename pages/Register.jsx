import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "0.9375rem",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    backgroundColor: "#0d111a",
    color: "#c4c4c4",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#c4c4c4",
    marginBottom: "6px",
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        backgroundColor: "#101622",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "24px",
          backgroundColor: "#1a2233",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#c4c4c4",
            marginBottom: "8px",
          }}
        >
          Create Account
        </h1>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "#b5b5b4",
            marginBottom: "24px",
          }}
        >
          Join ALGOLAB and start your coding journey.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#135bec";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#135bec";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#135bec";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            />
            <p
              style={{
                marginTop: "6px",
                fontSize: "0.75rem",
                color: "#b5b5b4",
                lineHeight: 1.5,
              }}
            >
              Password must be 8+ characters, include at least one number and one special symbol.
            </p>
          </div>

          <div>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#135bec";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            />
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              cursor: "pointer",
              fontSize: "0.875rem",
              color: "#b5b5b4",
            }}
          >
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
              style={{ accentColor: "#135bec", marginTop: "3px" }}
            />
            I agree to the terms and conditions
          </label>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "0.9375rem",
              fontWeight: "600",
              color: "#fff",
              backgroundColor: "#135bec",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0f4fd4";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#135bec";
            }}
          >
            Create Account
          </button>

          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#b5b5b4", margin: 0 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#135bec", textDecoration: "none", fontWeight: "500" }}>
              Sign in
            </Link>
          </p>

          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
              paddingTop: "24px",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "#b5b5b4",
                marginBottom: "8px",
              }}
            >
              © 2024 AlgoLab competitive programming platform built for developers by developers
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "24px",
                fontSize: "0.75rem",
              }}
            >
              <Link to="/help" style={{ color: "#135bec", textDecoration: "none" }}>
                Help Center
              </Link>
              <Link to="/safety" style={{ color: "#135bec", textDecoration: "none" }}>
                Safety
              </Link>
              <Link to="/status" style={{ color: "#135bec", textDecoration: "none" }}>
                Status
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
