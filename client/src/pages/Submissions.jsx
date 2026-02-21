import React from "react";

const DUMMY_SUBMISSIONS = [
  { id: 1, problem: "Two Sum", status: "Accepted", language: "JavaScript", time: "2 min ago" },
  { id: 2, problem: "Valid Parentheses", status: "Wrong", language: "Python", time: "1 hour ago" },
  { id: 3, problem: "Merge Two Lists", status: "Pending", language: "C++", time: "3 hours ago" },
];

const getStatusColor = (status) => {
  if (status === "Accepted") return "#10b981";
  if (status === "Wrong") return "#ef4444";
  return "#f59e0b";
};

const Submissions = () => {
  return (
    <div style={{ width: "100%", padding: "0 24px" }}>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#c4c4c4",
          marginBottom: "8px",
        }}
      >
        Submissions
      </h1>
      <p
        style={{
          marginBottom: "24px",
          color: "#b5b5b4",
          fontSize: "0.9375rem",
        }}
      >
        View your submission history.
      </p>

      <div
        style={{
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#1a2233",
        }}
      >
        <table className="responsive-table" style={{ width: "100%", borderCollapse: "collapse" }}>
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
                }}
              >
                Problem
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
                Language
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
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_SUBMISSIONS.map((s) => (
              <tr
                key={s.id}
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  transition: "background-color 0.15s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#c4c4c4",
                  }}
                >
                  {s.problem}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: getStatusColor(s.status),
                  }}
                >
                  {s.status}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "0.875rem",
                    color: "#b5b5b4",
                  }}
                >
                  {s.language}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: "0.875rem",
                    color: "#b5b5b4",
                  }}
                >
                  {s.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
