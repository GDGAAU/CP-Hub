import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Left panel - branding */}
      <div
        style={{
          width: "50%",
          minHeight: "100vh",
          background: "linear-gradient(to right, #2d5db3, #2b57a8, #274d97)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "20%",
            background: "rgba(0,0,0,0.15)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "1.25rem",
              }}
            >
              {"</>"}
            </div>
            <span
              style={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "1.25rem",
              }}
            >
              CodeLogic
            </span>
          </div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Master your algorithms,
            <br />
            <span style={{ opacity: 0.9 }}>climb the leaderboard.</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              maxWidth: "420px",
              lineHeight: 1.6,
              marginBottom: "24px",
              fontSize: "0.9375rem",
            }}
          >
            Join over 50,000 competitive programmers, track your team's DSA
            progress, solve daily challenges, optimize your logic.
          </p>
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "24px",
              backdropFilter: "blur(4px)",
              maxWidth: "360px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "6px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#ff5f56",
                }}
              />
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#ffbd2e",
                }}
              />
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#27c93f",
                }}
              />
            </div>
            <pre
              style={{
                margin: 0,
                fontFamily: "monospace",
                fontSize: "0.8125rem",
                lineHeight: 1.6,
                color: "#dbeafe",
              }}
            >
              <span style={{ color: "#f472b6" }}>function</span>{" "}
              <span style={{ color: "#60a5fa" }}>twoSum</span>
              <span style={{ color: "#dbeafe" }}>(nums, target) {"{"}</span>
              {"\n"}
              <span style={{ color: "#93c5fd" }}>  // Find indices</span>
              {"\n"}
              <span style={{ color: "#f472b6" }}>  return</span>
              <span style={{ color: "#dbeafe" }}> [0, 1];</span>
              {"\n"}
              <span style={{ color: "#dbeafe" }}>{"}"}</span>
            </pre>
          </div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div
        style={{
          width: "50%",
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #0f172a, #0b1220)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "380px",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            Welcome Back, Coder
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#94a3b8",
              marginBottom: "24px",
            }}
          >
            Sign in to continue to CodeLogic
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  color: "#cbd5e1",
                  marginBottom: "6px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%",
                  height: "44px",
                  padding: "0 14px",
                  fontSize: "0.9375rem",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  backgroundColor: "#1e293b",
                  color: "#ffffff",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#135bec";
                  e.target.style.boxShadow = "0 0 0 2px rgba(19, 91, 236, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#334155";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  color: "#cbd5e1",
                  marginBottom: "6px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  height: "44px",
                  padding: "0 14px",
                  fontSize: "0.9375rem",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  backgroundColor: "#1e293b",
                  color: "#ffffff",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#135bec";
                  e.target.style.boxShadow = "0 0 0 2px rgba(19, 91, 236, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#334155";
                  e.target.style.boxShadow = "none";
                }}
              />
              <Link
                to="/forgot-password"
                style={{
                  display: "block",
                  marginTop: "6px",
                  fontSize: "0.8125rem",
                  color: "#135bec",
                  textDecoration: "none",
                }}
                onMouseOver={(e) => {
                  e.target.style.textDecoration = "underline";
                }}
                onMouseOut={(e) => {
                  e.target.style.textDecoration = "none";
                }}
              >
                Forgot password?
              </Link>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "0.875rem",
                color: "#94a3b8",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  accentColor: "#135bec",
                  border: "1px solid #334155",
                }}
              />
              Remember me
            </label>

            <button
              type="submit"
              style={{
                width: "100%",
                height: "44px",
                padding: "0 16px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "#ffffff",
                background: "linear-gradient(to bottom, #135bec, #0f4fd4)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(19, 91, 236, 0.35)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Sign in
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                margin: "4px 0",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "#334155",
                }}
              />
              <span style={{ fontSize: "0.8125rem", color: "#b5b5b4" }}>
                Or continue with
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "#334155",
                }}
              />
            </div>

            <button
              type="button"
              style={{
                width: "100%",
                height: "44px",
                padding: "0 16px",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#cbd5e1",
                backgroundColor: "transparent",
                border: "1px solid #334155",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Continue with Google
            </button>

            <button
              type="button"
              style={{
                width: "100%",
                height: "44px",
                padding: "0 16px",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#cbd5e1",
                backgroundColor: "transparent",
                border: "1px solid #334155",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Continue with GitHub
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "0.875rem",
                color: "#94a3b8",
                margin: "8px 0 0 0",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#135bec",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Sign up free
              </Link>
            </p>

            {/* Login page footer */}
            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
                paddingTop: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#b5b5b4",
                  marginBottom: "8px",
                }}
              >
                © 2024 CodeLogic platform. All rights reserved.
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                  fontSize: "0.75rem",
                }}
              >
                <Link
                  to="/privacy"
                  style={{
                    color: "#135bec",
                    textDecoration: "none",
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  style={{
                    color: "#135bec",
                    textDecoration: "none",
                  }}
                >
                  Terms of Services
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
