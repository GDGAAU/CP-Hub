import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Split from "react-split";
import CodeEditor from "../components/CodeEditor";

const DIFFICULTY_STYLES = {
  Easy: { bg: "rgba(16, 185, 129, 0.2)", text: "#10b981" },
  Medium: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b" },
  Hard: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444" },
};

const DEFAULT_CODE = `function solve(nums, target) {
  // Your code here
  return [];
}`;

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("JavaScript");
  const [consoleOutput, setConsoleOutput] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/problems/${id}`, { withCredentials: true });
        setProblem(res.data);
      } catch (err) {
        console.error("Error fetching problem:", err);
        setConsoleOutput("Failed to load problem.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  if (loading) return <div style={{ color: "#c4c4c4", padding: "20px" }}>Loading problem...</div>;
  if (!problem) return <div style={{ color: "#ef4444", padding: "20px" }}>Problem not found.</div>;

  const difficultyStyles = DIFFICULTY_STYLES[problem.difficulty] ?? {
    bg: "#1b2334",
    text: "#b5b5b4",
  };

  const handleRun = () => {
    setConsoleOutput("Run result will appear here.\n> Running... (dummy output)\n");
  };

  const handleSubmit = async () => {
    setConsoleOutput("> Submitting code to server...\n");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/submissions",
        { problemId: problem.id, language, code },
        { withCredentials: true }
      );
      setConsoleOutput(`> Submission successful! Status: ${res.data.status}\n> Waiting for execution...`);
    } catch (err) {
      console.error(err);
      setConsoleOutput("> Error submitting code. Make sure you are logged in.");
    }
  };

  const sectionStyle = {
    padding: "16px",
    backgroundColor: "#1a2233",
    borderRadius: "10px",
    marginBottom: "16px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
  };

  return (
    <Split
      sizes={[50, 50]}
      minSize={300}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 96px)",
      }}
    >
      <div
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingRight: "10px",
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
          <span style={{ color: "#c4c4c4" }}>{problem.title}</span>
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
            {problem.title}
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
              {problem.difficulty}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "#b5b5b4" }}>
              Problem ID: #{String(problem.id).padStart(4, "0")}
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
          <div
            style={{
              fontSize: "0.875rem",
              color: "#b5b5b4",
              lineHeight: 1.6,
            }}
          >
            <ReactMarkdown>{problem.description}</ReactMarkdown>
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
            Examples
          </h3>
          {(problem.examples || []).length > 0 ? (
            problem.examples.map((ex, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: idx < problem.examples.length - 1 ? "14px" : 0,
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
                      whiteSpace: "pre-wrap",
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
                      whiteSpace: "pre-wrap",
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
            ))
          ) : (
            <p style={{ fontSize: "0.8125rem", color: "#b5b5b4" }}>No examples provided.</p>
          )}
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
          {(problem.constraints || []).length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#b5b5b4", fontSize: "0.875rem", lineHeight: 1.8 }}>
              {problem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: "0.8125rem", color: "#b5b5b4" }}>No constraints provided.</p>
          )}
        </div>
      </div>

      <div
        style={{
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          paddingLeft: "10px",
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
          <div style={{ flex: 1, minHeight: 450, display: "flex", flexDirection: "column" }}>
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
            marginTop: "8px",
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
    </Split>
  );
};

export default ProblemDetail;
