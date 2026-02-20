import React, { useState } from "react";

const TOP_3 = [
  { rank: 2, name: "CodeWizard", subtitle: "MASTER", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=c2", totalSolved: 892, totalPoints: 2840 },
  { rank: 1, name: "CodeDragon", subtitle: "GRANDMASTER", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=c1", totalSolved: 1042, totalPoints: 3420 },
  { rank: 3, name: "ByteQueen", subtitle: "EXPERT", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=c3", totalSolved: 756, totalPoints: 2680 },
];

const RANK_TABLE = [
  { rank: 1, name: "CodeDragon", difficulty: "H", totalSolved: 1042, points: 3420, trend: "up", isUser: false },
  { rank: 2, name: "CodeWizard", difficulty: "M", totalSolved: 892, points: 2840, trend: "up", isUser: false },
  { rank: 3, name: "ByteQueen", difficulty: "M", totalSolved: 756, points: 2680, trend: "down", isUser: false },
  { rank: 4, name: "Alex Chen", difficulty: "E", totalSolved: 842, points: 2520, trend: "up", isUser: true },
  { rank: 5, name: "Emma Davis", difficulty: "E", totalSolved: 721, points: 2280, trend: "up", isUser: false },
  { rank: 6, name: "Jordan Lee", difficulty: "E", totalSolved: 615, points: 2150, trend: "down", isUser: false },
];

const DIFF_BADGES = {
  E: { bg: "rgba(16, 185, 129, 0.2)", text: "#10b981", label: "E" },
  M: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b", label: "M" },
  H: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444", label: "H" },
};

const Leaderboard = () => {
  const [period, setPeriod] = useState("weekly");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = RANK_TABLE.filter(
    (r) =>
      !searchQuery.trim() ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Top Section */}
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
            Team Rankings
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#b5b5b4",
              margin: 0,
            }}
          >
            Track your team&apos;s progress and compete for the top spot.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          {["weekly", "monthly", "all-time"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              style={{
                padding: "8px 16px",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: period === p ? "#fff" : "#b5b5b4",
                backgroundColor: period === p ? "#135bec" : "transparent",
                border: period === p ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "999px",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (period !== p) e.currentTarget.style.borderColor = "#135bec";
              }}
              onMouseOut={(e) => {
                if (period !== p) e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              {p === "all-time" ? "All-Time" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <select
            style={{
              padding: "8px 12px",
              fontSize: "0.875rem",
              color: "#c4c4c4",
              backgroundColor: "#1a2233",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="">Region</option>
            <option value="global">Global</option>
            <option value="us">US</option>
            <option value="eu">EU</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div
        className="leaderboard-podium"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr 1fr",
          gap: "24px",
          marginBottom: "32px",
          alignItems: "end",
        }}
      >
        {[TOP_3[1], TOP_3[0], TOP_3[2]].map((user, idx) => {
          const isCenter = idx === 1;
          return (
            <div
              key={user.rank}
              className="podium-card"
              style={{
                padding: isCenter ? "32px 24px" : "24px",
                backgroundColor: "#1a2233",
                borderRadius: "12px",
                border: isCenter ? "2px solid rgba(19, 91, 236, 0.5)" : "1px solid rgba(255, 255, 255, 0.06)",
                boxShadow: isCenter ? "0 0 24px rgba(19, 91, 236, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.15)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: isCenter ? "220px" : "200px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: isCenter ? "80px" : "64px",
                  height: isCenter ? "80px" : "64px",
                  borderRadius: "50%",
                  backgroundImage: `url('${user.avatar}')`,
                  backgroundSize: "cover",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  marginBottom: "12px",
                }}
              >
                {isCenter && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: "1.25rem",
                    }}
                    title="Crown"
                  >
                    👑
                  </span>
                )}
              </div>
              <div style={{ fontSize: isCenter ? "1.25rem" : "1.0625rem", fontWeight: "700", color: "#c4c4c4", marginBottom: "4px" }}>
                {user.name}
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: "600", color: "#135bec", marginBottom: "16px", letterSpacing: "0.05em" }}>
                {user.subtitle}
              </div>
              <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "#b5b5b4", marginBottom: "2px" }}>Total Solved</div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: "600", color: "#c4c4c4" }}>{user.totalSolved}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "#b5b5b4", marginBottom: "2px" }}>Total Points</div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: "600", color: "#135bec" }}>{user.totalPoints}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search team or user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "12px 16px",
            fontSize: "0.9375rem",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            backgroundColor: "#1a2233",
            color: "#c4c4c4",
            outline: "none",
          }}
        />
      </div>

      {/* Rank Table */}
      <div
        style={{
          backgroundColor: "#1a2233",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1b2334", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Rank</th>
              <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Coder</th>
              <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Difficulty</th>
              <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Solved</th>
              <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Points</th>
              <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}>Trend</th>
              <th style={{ padding: "14px 20px", textAlign: "right", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase", letterSpacing: "0.05em" }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr
                key={row.rank}
                style={{
                  backgroundColor: row.isUser ? "rgba(19, 91, 236, 0.15)" : "transparent",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  transition: "background-color 0.15s",
                }}
                onMouseOver={(e) => {
                  if (!row.isUser) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                }}
                onMouseOut={(e) => {
                  if (!row.isUser) e.currentTarget.style.backgroundColor = "transparent";
                  else e.currentTarget.style.backgroundColor = "rgba(19, 91, 236, 0.15)";
                }}
              >
                <td style={{ padding: "14px 20px" }}>
                  {row.isUser ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "0.75rem", color: "#135bec", fontWeight: "600" }}>Your Rank</span>
                      <span style={{ fontSize: "0.875rem", fontWeight: "700", color: "#c4c4c4" }}>#{row.rank}</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#c4c4c4" }}>{row.rank}</span>
                  )}
                </td>
                <td style={{ padding: "14px 20px", fontSize: "0.875rem", fontWeight: "500", color: "#c4c4c4" }}>
                  {row.name}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      backgroundColor: (DIFF_BADGES[row.difficulty] || DIFF_BADGES.E).bg,
                      color: (DIFF_BADGES[row.difficulty] || DIFF_BADGES.E).text,
                    }}
                  >
                    {row.difficulty}
                  </span>
                </td>
                <td style={{ padding: "14px 20px", fontSize: "0.875rem", color: "#b5b5b4" }}>{row.totalSolved}</td>
                <td style={{ padding: "14px 20px", fontSize: "0.875rem", fontWeight: "600", color: "#c4c4c4" }}>{row.points}</td>
                <td style={{ padding: "14px 20px" }}>
                  {row.trend === "up" ? (
                    <span style={{ color: "#10b981" }}>↑</span>
                  ) : (
                    <span style={{ color: "#ef4444" }}>↓</span>
                  )}
                </td>
                <td style={{ padding: "14px 20px", textAlign: "right" }}>
                  {row.isUser ? (
                    <button
                      type="button"
                      style={{
                        padding: "8px 16px",
                        fontSize: "0.8125rem",
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
                      Boost Rank
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <button
            type="button"
            style={{
              padding: "8px 12px",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#fff",
              backgroundColor: "#135bec",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            1
          </button>
          <button
            type="button"
            style={{
              padding: "8px 12px",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#b5b5b4",
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            2
          </button>
          <button
            type="button"
            style={{
              padding: "8px 12px",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#b5b5b4",
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            3
          </button>
          <span style={{ padding: "0 8px", color: "#b5b5b4", fontSize: "0.875rem" }}>…</span>
          <button
            type="button"
            style={{
              padding: "8px 12px",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#b5b5b4",
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            142
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
