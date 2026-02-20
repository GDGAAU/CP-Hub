import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";

const DIFFICULTY_STYLES = {
  Easy: { bg: "rgba(16, 185, 129, 0.2)", text: "#10b981" },
  Medium: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b" },
  Hard: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444" },
};

const DUMMY_PROBLEM = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  topic: "Arrays",
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3, 2, 4], target = 6",
      output: "[1, 2]",
      explanation: null,
    },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "Only one valid answer exists.",
  ],
};

const DEFAULT_CODE = `function twoSum(nums, target) {
  // Your code here
  return [];
}`;

const ProblemDetail = () => {
  const { id } = useParams();
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("JavaScript");
  const [consoleOutput, setConsoleOutput] = useState("");

  const difficultyStyles = DIFFICULTY_STYLES[DUMMY_PROBLEM.difficulty] ?? {
    bg: "#1b2334",
    text: "#b5b5b4",
  };

  const handleRun = () => {
    setConsoleOutput("Run result will appear here.\n> Running... (dummy output)\n");
  };

  const handleSubmit = () => {
    setConsoleOutput("Submit result will appear here.\n> Submitting... (dummy output)\n");
  };

  const sectionStyle = {
    padding: "16px",
    backgroundColor: "#1a2233",
    borderRadius: "10px",
    marginBottom: "16px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        minHeight: 0,
        gap: "24px",
        height: "calc(100vh - 96px)",
      }}
    >
      <div
        style={{
          flex: "1 1 50%",
          minWidth: 0,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#b5b5b4",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/dashboard" style={{ color: "#b5b5b4", textDecoration: "none" }} onMouseOver={(e) => { e.target.style.textDecoration = "underline"; }} onMouseOut={(e) => { e.target.style.textDecoration = "none"; }}>Dashboard</Link>
          <span>{" > "}</span>
          <Link to="/problems" style={{ color: "#b5b5b4", textDecoration: "none" }} onMouseOver={(e) => { e.target.style.textDecoration = "underline"; }} onMouseOut={(e) => { e.target.style.textDecoration = "none"; }}>Problems</Link>
          <span>{" > "}</span>
          <Link to={`/problems?topic=${DUMMY_PROBLEM.topic || "Arrays"}`} style={{ color: "#b5b5b4", textDecoration: "none" }} onMouseOver={(e) => { e.target.style.textDecoration = "underline"; }} onMouseOut={(e) => { e.target.style.textDecoration = "none"; }}>{DUMMY_PROBLEM.topic || "Arrays"}</Link>
          <span>{" > "}</span>
          <span style={{ color: "#c4c4c4" }}>{DUMMY_PROBLEM.title}</span>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#c4c4c4",
              marginBottom: "16px",
            }}
          >
            {DUMMY_PROBLEM.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: "600",
                backgroundColor: difficultyStyles.bg,
                color: difficultyStyles.text,
              }}
            >
              {DUMMY_PROBLEM.difficulty}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "#b5b5b4" }}>
              Problem ID: #{String(DUMMY_PROBLEM.id).padStart(4, "0")}
            </span>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#c4c4c4",
              marginBottom: "8px",
            }}
          >
            Explanation
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#b5b5b4",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {DUMMY_PROBLEM.description}
          </p>
        </div>

        <div style={sectionStyle}>
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#c4c4c4",
              marginBottom: "8px",
            }}
          >
            Example
          </h3>
          {DUMMY_PROBLEM.examples.map((ex, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: idx < DUMMY_PROBLEM.examples.length - 1 ? "14px" : 0,
                padding: "12px",
                backgroundColor: "#0d111a",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "8px",
              }}
            >
              <div style={{ marginBottom: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#b5b5b4", fontWeight: "500" }}>
                  Input:
                </span>
                <pre
                  style={{
                    marginTop: "4px",
                    fontSize: "0.8125rem",
                    color: "#c4c4c4",
                    fontFamily: "monospace",
                    overflow: "auto",
                  }}
                >
                  {ex.input}
                </pre>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#b5b5b4", fontWeight: "500" }}>
                  Output:
                </span>
                <pre
                  style={{
                    marginTop: "4px",
                    fontSize: "0.8125rem",
                    color: "#c4c4c4",
                    fontFamily: "monospace",
                    overflow: "auto",
                  }}
                >
                  {ex.output}
                </pre>
              </div>
              {ex.explanation && (
                <p style={{ marginTop: "8px", fontSize: "0.8125rem", color: "#b5b5b4" }}>
                  {ex.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={sectionStyle}>
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#c4c4c4",
              marginBottom: "8px",
            }}
          >
            Constraints
          </h3>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#b5b5b4", fontSize: "0.875rem", lineHeight: 1.8 }}>
            {DUMMY_PROBLEM.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          flex: "1 1 50%",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            backgroundColor: "#0d111a",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: "6px 12px",
                fontSize: "0.875rem",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                color: "#c4c4c4",
                backgroundColor: "#1a2233",
                minWidth: "120px",
                cursor: "pointer",
              }}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <div style={{ flex: 1, minHeight: 380, display: "flex", flexDirection: "column" }}>
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
              showLanguageDropdown={false}
              height="100%"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <button
            type="button"
            style={{
              padding: "8px 16px",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#c4c4c4",
              backgroundColor: "#1a2233",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#1b2334";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#1a2233";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
            }}
          >
            Console
          </button>
          <button
            onClick={handleRun}
            style={{
              padding: "8px 16px",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#fff",
              backgroundColor: "#135bec",
              border: "none",
              borderRadius: "8px",
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
            Run Code
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: "8px 16px",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#fff",
              backgroundColor: "#135bec",
              border: "none",
              borderRadius: "8px",
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
            Submit
          </button>
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: "#1a2233",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "10px",
            minHeight: "120px",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#b5b5b4",
              marginBottom: "8px",
            }}
          >
            Console
          </div>
          <pre
            style={{
              fontSize: "0.8125rem",
              fontFamily: "monospace",
              color: "#c4c4c4",
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {consoleOutput || "> Run your code to see output here."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
