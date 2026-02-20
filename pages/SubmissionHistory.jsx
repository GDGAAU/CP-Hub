import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DUMMY_SUBMISSIONS = [
  { 
    id: 1, 
    status: "Accepted", 
    problemName: "Two Sum", 
    problemId: "1", 
    topic: "Arrays", 
    language: "Python 3", 
    runtime: "42 ms", 
    memory: "14.2 MB", 
    submittedAt: "2024-01-15 14:32:10"
  },
  { 
    id: 2, 
    status: "Wrong Answer", 
    problemName: "Valid Parentheses", 
    problemId: "20", 
    topic: "Stack", 
    language: "JavaScript", 
    runtime: "68 ms", 
    memory: "42.1 MB", 
    submittedAt: "2024-01-15 13:45:22"
  },
  { 
    id: 3, 
    status: "Time Limit Exceeded", 
    problemName: "Merge K Sorted Lists", 
    problemId: "23", 
    topic: "Linked List", 
    language: "C++", 
    runtime: ">2000 ms", 
    memory: "45.8 MB", 
    submittedAt: "2024-01-15 12:18:45"
  },
  { 
    id: 4, 
    status: "Accepted", 
    problemName: "Binary Tree Level Order", 
    problemId: "102", 
    topic: "Tree", 
    language: "Java", 
    runtime: "1 ms", 
    memory: "42.3 MB", 
    submittedAt: "2024-01-15 11:22:33"
  },
  { 
    id: 5, 
    status: "Runtime Error", 
    problemName: "Longest Substring Without Repeating", 
    problemId: "3", 
    topic: "Sliding Window", 
    language: "Python 3", 
    runtime: "-", 
    memory: "-", 
    submittedAt: "2024-01-15 10:15:27"
  },
  { 
    id: 6, 
    status: "Accepted", 
    problemName: "Add Two Numbers", 
    problemId: "2", 
    topic: "Linked List", 
    language: "Python 3", 
    runtime: "68 ms", 
    memory: "16.4 MB", 
    submittedAt: "2024-01-15 09:42:18"
  },
];

const getStatusBadge = (status) => {
  const colors = {
    "Accepted": { bg: "rgba(16, 185, 129, 0.15)", color: "#10b981" },
    "Wrong Answer": { bg: "rgba(239, 68, 68, 0.15)", color: "#ef4444" },
    "Time Limit Exceeded": { bg: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" },
    "Runtime Error": { bg: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }
  };
  
  const style = colors[status] || colors["Wrong Answer"];
  
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "0.75rem",
        fontWeight: "600",
        backgroundColor: style.bg,
        color: style.color,
      }}
    >
      {status}
    </span>
  );
};

const SubmissionHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedLanguage, setSelectedLanguage] = useState("Language");
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const topics = ["All Topics", "Arrays", "Stack", "Linked List", "Tree", "Sliding Window"];
  const statuses = ["All Status", "Accepted", "Wrong Answer", "Time Limit Exceeded", "Runtime Error"];
  const languages = ["Language", "Python 3", "JavaScript", "C++", "Java"];

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedTopic("All Topics");
    setSelectedStatus("All Status");
    setSelectedLanguage("Language");
  };

  const handleViewCode = (submissionId) => {
    navigate(`/view-solution/${submissionId}`);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Slim Sidebar */}
      <aside
        style={{
          width: "80px",
          backgroundColor: "#0f172a",
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          gap: "8px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: "#135bec",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "700",
            fontSize: "1.25rem",
            marginBottom: "20px",
          }}
        >
          C
        </div>

        {/* Navigation Icons */}
        {[
          { icon: "📊", path: "/dashboard", label: "Dashboard" },
          { icon: "💻", path: "/problems", label: "Problems" },
          { icon: "📋", path: "/submission-history", label: "Submissions", active: true },
          { icon: "📈", path: "/leaderboard", label: "Stats" },
          { icon: "⚙️", path: "/profile", label: "Settings" },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.path}
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              backgroundColor: item.active ? "rgba(19, 91, 236, 0.15)" : "transparent",
              color: item.active ? "#135bec" : "#b5b5b4",
              textDecoration: "none",
              fontSize: "1.25rem",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              if (!item.active) {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.color = "#c4c4c4";
              }
            }}
            onMouseOut={(e) => {
              if (!item.active) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#b5b5b4";
              }
            }}
            title={item.label}
          >
            {item.icon}
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "32px", overflow: "auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: "0.875rem", color: "#b5b5b4", marginBottom: "8px" }}>
            Dashboard &gt; Submission History
          </div>

          {/* Title and Subtitle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#c4c4c4", marginBottom: "8px" }}>
                Submission History
              </h1>
              <p style={{ fontSize: "0.9375rem", color: "#b5b5b4" }}>
                Review your technical progress and debug past solutions.
              </p>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#1a2233",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "#b5b5b4", marginBottom: "4px" }}>SUCCESS RATE</div>
                <div style={{ fontSize: "1.125rem", fontWeight: "700", color: "#10b981" }}>74.2%</div>
              </div>
              <div
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#1a2233",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "#b5b5b4", marginBottom: "4px" }}>TOTAL SOLVED</div>
                <div style={{ fontSize: "1.125rem", fontWeight: "700", color: "#135bec" }}>128</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          style={{
            backgroundColor: "#1a2233",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "24px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by problem name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "10px 14px",
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                color: "#c4c4c4",
                fontSize: "0.875rem",
              }}
            />

            {/* Dropdowns */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              style={{
                padding: "10px 14px",
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                color: "#c4c4c4",
                fontSize: "0.875rem",
                minWidth: "120px",
              }}
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: "10px 14px",
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                color: "#c4c4c4",
                fontSize: "0.875rem",
                minWidth: "120px",
              }}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{
                padding: "10px 14px",
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                color: "#c4c4c4",
                fontSize: "0.875rem",
                minWidth: "120px",
              }}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            {/* Reset Filters */}
            <button
              onClick={handleResetFilters}
              style={{
                padding: "10px 16px",
                backgroundColor: "transparent",
                border: "none",
                color: "#135bec",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Table Container */}
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
                {["STATUS", "PROBLEM NAME", "TOPIC", "LANGUAGE", "RUNTIME", "MEMORY", "SUBMITTED AT", "ACTION"].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      color: "#b5b5b4",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DUMMY_SUBMISSIONS.map((submission, index) => (
                <tr
                  key={submission.id}
                  style={{
                    borderBottom: index < DUMMY_SUBMISSIONS.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                    transition: "background-color 0.15s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td style={{ padding: "16px" }}>
                    {getStatusBadge(submission.status)}
                  </td>
                  <td style={{ padding: "16px", color: "#c4c4c4", fontSize: "0.875rem", fontWeight: "500" }}>
                    <Link
                      to={`/problems/${submission.problemId}`}
                      style={{ color: "#c4c4c4", textDecoration: "none" }}
                      onMouseOver={(e) => { e.target.style.color = "#135bec"; }}
                      onMouseOut={(e) => { e.target.style.color = "#c4c4c4"; }}
                    >
                      {submission.problemName}
                    </Link>
                  </td>
                  <td style={{ padding: "16px", color: "#b5b5b4", fontSize: "0.875rem" }}>
                    {submission.topic}
                  </td>
                  <td style={{ padding: "16px", color: "#b5b5b4", fontSize: "0.875rem" }}>
                    {submission.language}
                  </td>
                  <td style={{ padding: "16px", color: "#b5b5b4", fontSize: "0.875rem" }}>
                    {submission.runtime}
                  </td>
                  <td style={{ padding: "16px", color: "#b5b5b4", fontSize: "0.875rem" }}>
                    {submission.memory}
                  </td>
                  <td style={{ padding: "16px", color: "#b5b5b4", fontSize: "0.875rem" }}>
                    {submission.submittedAt}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <button
                      onClick={() => handleViewCode(submission.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "transparent",
                        border: "1px solid #135bec",
                        borderRadius: "6px",
                        color: "#135bec",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#135bec";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#135bec";
                      }}
                    >
                      View Code
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <div style={{ fontSize: "0.875rem", color: "#b5b5b4" }}>
              Showing 1 to 6 of 128 submissions
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "6px",
                  color: "#b5b5b4",
                  cursor: "pointer",
                }}
              >
                &lt;
              </button>
              {[1, 2, 3, "...", 22].map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: page === currentPage ? "#135bec" : "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "6px",
                    color: page === currentPage ? "white" : "#b5b5b4",
                    cursor: typeof page === "number" ? "pointer" : "default",
                  }}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(22, currentPage + 1))}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "6px",
                  color: "#b5b5b4",
                  cursor: "pointer",
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div
            style={{
              position: "fixed",
              bottom: "32px",
              right: "32px",
              backgroundColor: "#1a2233",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "12px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            <span style={{ color: "#c4c4c4", fontSize: "0.875rem", fontWeight: "500" }}>
              Solution Shared
            </span>
          </div>
        )}
      </main>
    </div>
  );
};

export default SubmissionHistory;
