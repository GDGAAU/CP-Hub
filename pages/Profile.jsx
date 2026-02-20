import React from "react";
import { Link } from "react-router-dom";

const ACTIVITY_DAYS = 365;
const getActivityData = () => {
  const arr = [];
  for (let i = 0; i < ACTIVITY_DAYS; i++) {
    arr.push(Math.floor(Math.random() * 5));
  }
  return arr;
};

const LATEST_SOLVED = [
  { problem: "Shortest Path in Binary Matrix", difficulty: "Medium", topic: "Graphs", time: "2h ago" },
  { problem: "Coin Change", difficulty: "Medium", topic: "DP", time: "5h ago" },
  { problem: "Valid Palindrome", difficulty: "Easy", topic: "Strings", time: "1d ago" },
];

const SKILL_PROFICIENCY = [
  { name: "GRAPHS", value: 92 },
  { name: "DP", value: 85 },
  { name: "STRINGS", value: 64 },
  { name: "MATH", value: 48 },
];

const DIFFICULTY_STYLES = {
  Easy: { bg: "rgba(16, 185, 129, 0.2)", text: "#10b981" },
  Medium: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b" },
  Hard: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444" },
};

const Profile = () => {
  const activity = getActivityData();

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Top Header Area */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "24px",
          marginBottom: "32px",
          flexWrap: "wrap",
        }}
      >
        <div className="profile-header-row" style={{ display: "flex", alignItems: "flex-start", gap: "24px", flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: "112px",
              height: "112px",
              minWidth: "112px",
              borderRadius: "50%",
              backgroundImage: "url('https://api.dicebear.com/7.x/avataaars/svg?seed=alex')",
              backgroundSize: "cover",
              border: "3px solid rgba(19, 91, 236, 0.25)",
              boxShadow: "0 0 24px rgba(19, 91, 236, 0.2)",
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#c4c4c4",
                margin: 0,
                marginBottom: "8px",
              }}
            >
              Alex &quot;TheGraph&quot; Chen
            </h1>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "#135bec",
                margin: 0,
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              Senior Competitive Programmer · Team Zenith
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#b5b5b4",
                margin: 0,
                marginBottom: "12px",
                lineHeight: 1.5,
              }}
            >
              Passionate about algorithms and competitive programming. Always pushing the limits.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["C++", "Python", "Rust"].map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "4px 12px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#135bec",
                    backgroundColor: "#1a2233",
                    borderRadius: "999px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="profile-header-buttons" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <Link
            to="/profile/edit"
            style={{
              padding: "10px 20px",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#c4c4c4",
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#135bec";
              e.currentTarget.style.color = "#135bec";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.color = "#c4c4c4";
            }}
          >
            Edit Profile
          </Link>
          <button
            type="button"
            aria-label="Share"
            style={{
              padding: "10px",
              fontSize: "1rem",
              color: "#b5b5b4",
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#135bec";
              e.currentTarget.style.color = "#135bec";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.color = "#b5b5b4";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Row - 4 cards */}
      <div
        className="profile-stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {/* Card 1: Team Rank */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#1a2233",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            minHeight: "120px",
          }}
        >
          <div style={{ fontSize: "0.8125rem", color: "#b5b5b4", marginBottom: "8px", fontWeight: "500" }}>
            Team Rank
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#c4c4c4" }}>#4</span>
            <span style={{ fontSize: "0.8125rem", fontWeight: "600", color: "#10b981" }}>+2</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#b5b5b4" }}>Top 5% of Team Zenith</div>
        </div>

        {/* Card 2: Solved */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#1a2233",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            minHeight: "120px",
          }}
        >
          <div style={{ fontSize: "0.8125rem", color: "#b5b5b4", marginBottom: "8px", fontWeight: "500" }}>
            Solved
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#c4c4c4", marginBottom: "12px" }}>
            842 / 1.2k
          </div>
          <div
            style={{
              height: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "70%",
                height: "100%",
                backgroundColor: "#135bec",
                borderRadius: "4px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Card 3: Most Active Topic */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#1a2233",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            minHeight: "120px",
          }}
        >
          <div style={{ fontSize: "0.8125rem", color: "#b5b5b4", marginBottom: "8px", fontWeight: "500" }}>
            Most Active Topic
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                minWidth: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(19, 91, 236, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#135bec" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#c4c4c4", marginBottom: "4px" }}>
                Dynamic Programming
              </div>
              <div style={{ fontSize: "0.75rem", color: "#b5b5b4" }}>214 problems solved this year</div>
            </div>
          </div>
        </div>

        {/* Card 4: Current Streak */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#1a2233",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            minHeight: "120px",
          }}
        >
          <div style={{ fontSize: "0.8125rem", color: "#b5b5b4", marginBottom: "8px", fontWeight: "500" }}>
            Current Streak
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                minWidth: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "#c4c4c4", marginBottom: "4px" }}>
                14 Days
              </div>
              <div style={{ fontSize: "0.75rem", color: "#b5b5b4" }}>Personal record: 28 days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity History */}
      <div
        style={{
          padding: "24px",
          backgroundColor: "#1a2233",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#c4c4c4", margin: 0 }}>
            Activity History
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", color: "#b5b5b4" }}>
            <span>Less</span>
            <div style={{ display: "flex", gap: "4px" }}>
              {["#1b2334", "#1e2839", "#253242", "#2d3d52", "#135bec"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "2px",
                    backgroundColor: c,
                  }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(53, 1fr)",
            gap: "4px",
            marginBottom: "12px",
          }}
        >
          {activity.map((level, i) => {
            const shades = ["#1b2334", "#1e2839", "#222d3d", "#253242", "#135bec"];
            return (
              <div
                key={i}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "2px",
                  backgroundColor: shades[level] || shades[0],
                }}
                title={`Day ${i + 1}`}
              />
            );
          })}
        </div>
        <div style={{ fontSize: "0.75rem", color: "#b5b5b4", display: "flex", gap: "24px" }}>
          <span>OCT</span>
          <span>NOV</span>
          <span>DEC</span>
          <span>JAN</span>
          <span>FEB</span>
          <span>MAR</span>
          <span>APR</span>
          <span>MAY</span>
          <span>JUN</span>
          <span>JUL</span>
          <span>AUG</span>
          <span>SEP</span>
        </div>
      </div>

      {/* Bottom Section - Two Columns */}
      <div
        className="profile-bottom-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
        }}
      >
        {/* Left: Latest Solved Problems */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#1a2233",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#c4c4c4", margin: 0 }}>
              Latest Solved Problems
            </h3>
            <Link
              to="/submissions"
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#135bec",
                textDecoration: "none",
              }}
              onMouseOver={(e) => { e.target.style.textDecoration = "underline"; }}
              onMouseOut={(e) => { e.target.style.textDecoration = "none"; }}
            >
              View All
            </Link>
          </div>
          <div
            style={{
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#1b2334", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Problem Name</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Difficulty</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Topic</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {LATEST_SOLVED.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < LATEST_SOLVED.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                      transition: "background-color 0.15s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#c4c4c4", fontWeight: "500" }}>{row.problem}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          backgroundColor: (DIFFICULTY_STYLES[row.difficulty] || DIFFICULTY_STYLES.Easy).bg,
                          color: (DIFFICULTY_STYLES[row.difficulty] || DIFFICULTY_STYLES.Easy).text,
                        }}
                      >
                        {row.difficulty}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#b5b5b4" }}>{row.topic}</td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#b5b5b4" }}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Skill Proficiency + Next Team Contest */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              padding: "24px",
              backgroundColor: "#1a2233",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#c4c4c4", margin: 0, marginBottom: "20px" }}>
              Skill Proficiency
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {SKILL_PROFICIENCY.map((s) => (
                <div key={s.name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                      fontSize: "0.8125rem",
                    }}
                  >
                    <span style={{ color: "#c4c4c4", fontWeight: "600" }}>{s.name}</span>
                    <span style={{ color: "#b5b5b4" }}>{s.value}%</span>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${s.value}%`,
                        height: "100%",
                        backgroundColor: "#135bec",
                        borderRadius: "4px",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Team Contest */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "rgba(19, 91, 236, 0.15)",
              borderRadius: "12px",
              border: "1px solid rgba(19, 91, 236, 0.3)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#c4c4c4", margin: 0, marginBottom: "8px" }}>
              Next Team Contest
            </h3>
            <div style={{ fontSize: "1.125rem", fontWeight: "600", color: "#135bec", marginBottom: "12px" }}>
              Zenith Invitational v4
            </div>
            <div style={{ fontSize: "0.875rem", color: "#b5b5b4", marginBottom: "16px" }}>
              2d 14h 32m
            </div>
            <button
              type="button"
              style={{
                padding: "10px 20px",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#fff",
                backgroundColor: "#135bec",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#0f4fd4"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#135bec"; }}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Profile Footer */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            color: "#b5b5b4",
          }}
        >
          © 2024 AlgoTrack performance metrics. Built for elite programmers teams.
        </div>
      </div>
    </div>
  );
};

export default Profile;
