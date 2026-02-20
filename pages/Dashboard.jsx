import React, { useState } from "react";
import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";

const TOPICS = [
  { name: "Arrays & Strings", mastery: 85 },
  { name: "Trees & Graphs", mastery: 60 },
  { name: "Dynamic Programming", mastery: 30 },
  { name: "Sorting & Searching", mastery: 72 },
  { name: "Bit Manipulation", mastery: 45 },
  { name: "Math & Geometry", mastery: 55 },
];

const TEAM_STANDINGS = [
  { rank: 1, name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=a1", isUser: true, rating: 2840 },
  { rank: 2, name: "Sara Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=a2", isUser: false, rating: 2610 },
  { rank: 3, name: "Marcus Williams", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=a3", isUser: false, rating: 2540 },
  { rank: 4, name: "Emma Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=a4", isUser: false, rating: 2280 },
  { rank: 5, name: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=a5", isUser: false, rating: 2150 },
];

const RECENT_SUBMISSIONS = [
  { problem: "Two Sum", difficulty: "Easy", status: "Accepted", language: "JavaScript", time: "2 min ago" },
  { problem: "Valid Parentheses", difficulty: "Easy", status: "Wrong", language: "Python", time: "1 hour ago" },
  { problem: "Merge Two Lists", difficulty: "Easy", status: "Accepted", language: "C++", time: "3 hours ago" },
  { problem: "Reverse Integer", difficulty: "Easy", status: "Pending", language: "JavaScript", time: "5 hours ago" },
];

const DIFFICULTY_STYLES = {
  Easy: { bg: "rgba(16, 185, 129, 0.2)", text: "#10b981" },
  Medium: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b" },
  Hard: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444" },
};

const getStatusColor = (status) => {
  if (status === "Accepted") return "#10b981";
  if (status === "Wrong") return "#ef4444";
  return "#f59e0b";
};

const ACTIVITY_DAYS = 365;
const getActivityData = () => {
  const arr = [];
  for (let i = 0; i < ACTIVITY_DAYS; i++) {
    arr.push(Math.floor(Math.random() * 5));
  }
  return arr;
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const activity = getActivityData();

  const searchLower = searchQuery.toLowerCase().trim();
  const matchesTopic = (name) => name.toLowerCase().includes(searchLower);
  const matchesProblem = (name) => name.toLowerCase().includes(searchLower);
  const matchesUser = (name) => name.toLowerCase().includes(searchLower);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Top section */}
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
        <div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "#c4c4c4",
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Welcome back, Alex 👋
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#b5b5b4",
              margin: 0,
            }}
          >
            Keep pushing your limits. Every problem solved brings you closer to mastery.
          </p>
        </div>
        <div
          style={{
            flex: "0 1 320px",
            minWidth: "200px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#b5b5b4",
              fontSize: "0.9375rem",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search problems, topics or users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 42px",
              fontSize: "0.9375rem",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              backgroundColor: "#1a2233",
              color: "#c4c4c4",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#135bec";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
            }}
          />
        </div>
      </div>

      {/* Stat cards row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <StatsCard
          title="Total Solved"
          value="42"
          subtitle="problems"
          variant="check"
          progress={70}
        />
        <StatsCard
          title="Global Rank"
          value="#128"
          subtitle="out of 1,500"
          variant="trophy"
          delta="+12"
        />
        <StatsCard
          title="Current Streak"
          value="7"
          subtitle="days"
          variant="flame"
        />
        <StatsCard
          title="Accuracy Rate"
          value="78%"
          subtitle="last 30 days"
          variant="percent"
        />
      </div>

      {/* Topic Mastery + Team Standings */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 320px)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
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
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#c4c4c4",
                margin: 0,
              }}
            >
              Topic Mastery
            </h3>
            <Link
              to="/profile"
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#135bec",
                textDecoration: "none",
              }}
              onMouseOver={(e) => { e.target.style.textDecoration = "underline"; }}
              onMouseOut={(e) => { e.target.style.textDecoration = "none"; }}
            >
              View Detailed Roadmap
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {TOPICS.filter((t) => !searchLower || matchesTopic(t.name)).map((t) => (
              <div key={t.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                    fontSize: "0.875rem",
                  }}
                >
                  <span style={{ color: "#c4c4c4", fontWeight: "500" }}>{t.name}</span>
                  <span style={{ color: "#b5b5b4" }}>{t.mastery}%</span>
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
                      width: `${t.mastery}%`,
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
          <div style={{ marginTop: "24px" }}>
            <div
              style={{
                fontSize: "0.8125rem",
                fontWeight: "600",
                color: "#b5b5b4",
                marginBottom: "12px",
              }}
            >
              Solved Activity
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(53, 1fr)",
                gap: "4px",
                maxHeight: "100px",
                overflow: "auto",
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
                      borderRadius: "4px",
                      backgroundColor: shades[level] || shades[0],
                    }}
                    title={`Day ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "24px",
            backgroundColor: "#1a2233",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#c4c4c4",
              margin: 0,
              marginBottom: "20px",
            }}
          >
            Team Standings
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {TEAM_STANDINGS.filter((t) => !searchLower || matchesUser(t.name)).map((user) => (
              <div
                key={user.rank}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: user.isUser ? "rgba(19, 91, 236, 0.12)" : "transparent",
                  border: user.isUser ? "1px solid rgba(19, 91, 236, 0.25)" : "1px solid transparent",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#b5b5b4",
                    minWidth: "24px",
                  }}
                >
                  #{user.rank}
                </span>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundImage: `url('${user.avatar}')`,
                    backgroundSize: "cover",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: "500", color: user.isUser ? "#135bec" : "#c4c4c4" }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#b5b5b4" }}>{user.rating}</div>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/leaderboard"
            style={{
              display: "block",
              marginTop: "16px",
              padding: "10px 16px",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#fff",
              backgroundColor: "#135bec",
              borderRadius: "8px",
              textAlign: "center",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0f4fd4";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#135bec";
            }}
          >
            View Full Leaderboard
          </Link>
        </div>
      </div>

      {/* Recent Submissions */}
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
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#c4c4c4",
              margin: 0,
            }}
          >
            Recent Submissions
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
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Problem</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Difficulty</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Language</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SUBMISSIONS.filter((s) => !searchLower || matchesProblem(s.problem)).map((s, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < RECENT_SUBMISSIONS.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                    transition: "background-color 0.15s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#c4c4c4", fontWeight: "500" }}>{s.problem}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        backgroundColor: (DIFFICULTY_STYLES[s.difficulty] || DIFFICULTY_STYLES.Easy).bg,
                        color: (DIFFICULTY_STYLES[s.difficulty] || DIFFICULTY_STYLES.Easy).text,
                      }}
                    >
                      {s.difficulty}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", fontWeight: "500", color: getStatusColor(s.status) }}>{s.status}</td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#b5b5b4" }}>{s.language}</td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#b5b5b4" }}>{s.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
