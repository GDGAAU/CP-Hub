import React, { useState, useEffect } from "react";
import axios from "axios";

const DIFF_BADGES = {
  E: { bg: "rgba(16, 185, 129, 0.2)", text: "#10b981", label: "E" },
  M: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b", label: "M" },
  H: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444", label: "H" },
};

const Leaderboard = () => {
  const [period, setPeriod] = useState("all-time");
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/leaderboard", { withCredentials: true });
        setLeaderboard(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const filteredRows = leaderboard
    .map((u, i) => ({ ...u, rank: i + 1 }))
    .filter(
      (r) =>
        !searchQuery.trim() ||
        r.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.name && r.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  if (loading) return <div style={{ color: "#c4c4c4", padding: "50px", textAlign: "center" }}>Loading leaderboard...</div>;

  const top3 = leaderboard.slice(0, 3).map((u, i) => ({ ...u, rank: i + 1 }));

  return (
    <div style={{ width: "100%", padding: "0 24px" }}>
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
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#c4c4c4", margin: "0 0 8px 0" }}>
            Global Rankings
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "#b5b5b4", margin: 0 }}>
            Track progress and compete with the CP-Hub community.
          </p>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 1fr",
            gap: "24px",
            marginBottom: "32px",
            alignItems: "end",
          }}
        >
          {/* Rank 2 (Left) */}
          {top3[1] && <PodiumCard user={top3[1]} isCenter={false} />}
          {/* Rank 1 (Center) */}
          {top3[0] && <PodiumCard user={top3[0]} isCenter={true} />}
          {/* Rank 3 (Right) */}
          {top3[2] && <PodiumCard user={top3[2]} isCenter={false} />}
        </div>
      )}

      {/* Search Bar */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search user..."
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
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1b2334", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <th style={thStyle}>Rank</th>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Total Solved</th>
              <th style={thStyle}>Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={tdStyle}>
                  <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#c4c4c4" }}>#{row.rank}</span>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundImage: `url('${row.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + row.username}')`, backgroundSize: "cover" }} />
                    <span style={{ color: "#c4c4c4", fontWeight: "500" }}>{row.name || row.username}</span>
                  </div>
                </td>
                <td style={tdStyle}>{row.total_solved}</td>
                <td style={tdStyle}>
                  <span style={{ fontWeight: "600", color: "#135bec" }}>{parseInt(row.total_solved) * 10}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PodiumCard = ({ user, isCenter }) => (
  <div
    style={{
      padding: isCenter ? "32px 24px" : "24px",
      backgroundColor: "#1a2233",
      borderRadius: "12px",
      border: isCenter ? "2px solid rgba(19, 91, 236, 0.5)" : "1px solid rgba(255, 255, 255, 0.06)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: isCenter ? "240px" : "210px",
      justifyContent: "space-between",
    }}
  >
    <div
      style={{
        position: "relative",
        width: isCenter ? "80px" : "64px",
        height: isCenter ? "80px" : "64px",
        borderRadius: "50%",
        backgroundImage: `url('${user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.username}')`,
        backgroundSize: "cover",
        border: "2px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      {isCenter && (
        <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", fontSize: "1.5rem" }}>👑</span>
      )}
    </div>
    <div style={{ fontSize: "1.125rem", fontWeight: "700", color: "#fff", marginTop: "12px" }}>{user.name || user.username}</div>
    <div style={{ fontSize: "0.75rem", color: "#135bec", fontWeight: "600", letterSpacing: "0.05em", margin: "4px 0 16px 0" }}>RANK #{user.rank}</div>
    <div>
      <div style={{ fontSize: "0.6875rem", color: "#b5b5b4" }}>Solved</div>
      <div style={{ fontSize: "1.125rem", fontWeight: "700", color: "#fff" }}>{user.total_solved}</div>
    </div>
  </div>
);

const thStyle = { padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: "#b5b5b4", textTransform: "uppercase" };
const tdStyle = { padding: "14px 20px", fontSize: "0.875rem", color: "#b5b5b4" };

export default Leaderboard;
