import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProblemRow from "../components/ProblemRow";

const DIFFICULTY_OPTIONS = ["All", "Easy", "Medium", "Hard"];
const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "solved", label: "Solved" },
  { value: "attempted", label: "Attempted" },
];
const TOPIC_OPTIONS = ["All Topics", "Arrays", "Strings", "Graphs", "DP", "Trees"];

const FilterButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: active ? "none" : "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "10px",
      cursor: "pointer",
      backgroundColor: active ? "#135bec" : "#1a2233",
      color: active ? "#fff" : "#b5b5b4",
      transition: "all 0.2s",
    }}
    onMouseOver={(e) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = "#1b2334";
        e.currentTarget.style.color = "#c4c4c4";
      }
    }}
    onMouseOut={(e) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = "#1a2233";
        e.currentTarget.style.color = "#b5b5b4";
      }
    }}
  >
    {children}
  </button>
);

const TABS = ["Problems", "Contents", "Leaderboard", "Discuss"];

const ProblemList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Problems");
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("All Topics");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // Replace with environment variable later if needed
        const res = await axios.get("http://localhost:5000/api/problems", { withCredentials: true });
        setProblems(res.data);
      } catch (err) {
        console.error("Error fetching problems:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficultyFilter === "All" || p.difficulty === difficultyFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "solved" && p.solved) ||
        (statusFilter === "attempted" && (p.attempted || p.solved));

      // PostgreSQL array representation needs checking
      const matchesTopic = topicFilter === "All Topics" || (p.category_tags && p.category_tags.includes(topicFilter));

      return matchesSearch && matchesDifficulty && matchesStatus && matchesTopic;
    });
  }, [search, difficultyFilter, statusFilter, topicFilter, problems]);

  const inputStyle = {
    flex: 1,
    minWidth: "200px",
    padding: "0.625rem 0.875rem",
    fontSize: "0.875rem",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    color: "#c4c4c4",
    backgroundColor: "#0d111a",
    transition: "border-color 0.2s",
  };

  const handleDailyRandom = () => {
    const random = DUMMY_PROBLEMS[Math.floor(Math.random() * DUMMY_PROBLEMS.length)];
    navigate(`/problems/${random.id}`);
  };

  return (
    <div style={{ width: "100%", padding: "0 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "1rem" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#c4c4c4",
            margin: 0,
          }}
        >
          Problems
        </h1>
        <Link
          to="/create-problem"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#fff",
            backgroundColor: "#135bec",
            borderRadius: "10px",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#0f4fd4";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#135bec";
          }}
        >
          Create Problem
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "24px",
          marginBottom: "20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          paddingBottom: "8px",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            style={{
              padding: 0,
              border: "none",
              background: "none",
              fontSize: "0.9375rem",
              color: activeTab === tab ? "#135bec" : "#b5b5b4",
              fontWeight: activeTab === tab ? 600 : 400,
              cursor: "pointer",
              borderBottom: activeTab === tab ? "2px solid #135bec" : "2px solid transparent",
              marginBottom: "-10px",
              paddingBottom: "8px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#1a2233",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: "600", color: "#b5b5b4", marginRight: "4px" }}>
            Difficulty:
          </span>
          {DIFFICULTY_OPTIONS.map((d) => (
            <FilterButton
              key={d}
              active={difficultyFilter === d}
              onClick={() => setDifficultyFilter(d)}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    d === "Easy"
                      ? "#10b981"
                      : d === "Medium"
                        ? "#f59e0b"
                        : d === "Hard"
                          ? "#ef4444"
                          : "transparent",
                  marginRight: d !== "All" ? "6px" : 0,
                  verticalAlign: "middle",
                }}
              />
              {d}
            </FilterButton>
          ))}
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: "600", color: "#b5b5b4", marginRight: "4px" }}>
            Status:
          </span>
          {STATUS_OPTIONS.map((s) => (
            <FilterButton
              key={s.value}
              active={statusFilter === s.value}
              onClick={() => setStatusFilter(s.value)}
            >
              {s.label}
            </FilterButton>
          ))}
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: "600", color: "#b5b5b4", marginRight: "4px" }}>
            Topic:
          </span>
          {TOPIC_OPTIONS.map((t) => (
            <FilterButton
              key={t}
              active={topicFilter === t}
              onClick={() => setTopicFilter(t)}
            >
              {t}
            </FilterButton>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            ...inputStyle,
            marginLeft: "auto",
          }}
        />
      </div>

      <div
        style={{
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#1a2233",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1b2334", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <th
                style={{
                  padding: "14px 16px",
                  textAlign: "left",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#b5b5b4",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  width: "40px",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "14px 16px",
                  textAlign: "left",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#b5b5b4",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: "14px 16px",
                  textAlign: "left",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#b5b5b4",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Difficulty
              </th>
              <th
                style={{
                  padding: "14px 16px",
                  textAlign: "left",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#b5b5b4",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Acceptance
              </th>
              <th
                style={{
                  padding: "14px 16px",
                  textAlign: "left",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#b5b5b4",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Topic
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <ProblemRow key={problem.id} problem={problem} />
            ))}
          </tbody>
        </table>
        {filteredProblems.length === 0 && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "#b5b5b4",
              fontSize: "0.875rem",
            }}
          >
            No problems found.
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleDailyRandom}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          padding: "12px 24px",
          fontSize: "0.875rem",
          fontWeight: "600",
          color: "#fff",
          backgroundColor: "#135bec",
          border: "none",
          borderRadius: "9999px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(19, 91, 236, 0.3)",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#0f4fd4";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#135bec";
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="7.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
        </svg>
        Daily Random
      </button>
    </div>
  );
};

export default ProblemList;
