import React from "react";
import { Link } from "react-router-dom";

const DIFFICULTY_COLORS = {
  Easy: "#10b981",
  Medium: "#f59e0b",
  Hard: "#ef4444",
};

const StatusIcon = ({ solved, attempted }) => {
  if (solved) {
    return (
      <span style={{ color: "#10b981", display: "flex", alignItems: "center" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  if (attempted) {
    return (
      <span style={{ color: "#f59e0b", display: "flex", alignItems: "center" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </span>
    );
  }
  return (
    <span style={{ color: "#b5b5b4", display: "flex", alignItems: "center", opacity: 0.5 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </span>
  );
};

const ProblemRow = ({ problem }) => {
  const difficultyColor = DIFFICULTY_COLORS[problem.difficulty] ?? "#b5b5b4";

  return (
    <tr
      style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        transition: "background-color 0.15s",
        minHeight: "52px",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <td style={{ padding: "14px 16px", width: "40px", verticalAlign: "middle" }}>
        <StatusIcon solved={problem.solved} attempted={problem.attempted} />
      </td>
      <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
        <Link
          to={`/problems/${problem.id}`}
          style={{
            color: "#135bec",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "0.875rem",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "#3d7aff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "#135bec";
          }}
        >
          {problem.title}
        </Link>
      </td>
      <td
        style={{
          padding: "14px 16px",
          fontSize: "0.8125rem",
          fontWeight: "500",
          color: difficultyColor,
          verticalAlign: "middle",
        }}
      >
        {problem.difficulty}
      </td>
      <td
        style={{
          padding: "14px 16px",
          fontSize: "0.875rem",
          color: "#b5b5b4",
          verticalAlign: "middle",
        }}
      >
        {problem.acceptance}%
      </td>
      <td
        style={{
          padding: "14px 16px",
          fontSize: "0.875rem",
          color: "#b5b5b4",
          verticalAlign: "middle",
        }}
      >
        {problem.topic}
      </td>
    </tr>
  );
};

export default ProblemRow;
