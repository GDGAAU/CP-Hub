import React, { useState } from "react";

const CreateProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [topic, setTopic] = useState("Arrays");
  const [timeLimit, setTimeLimit] = useState("");
  const [memoryLimit, setMemoryLimit] = useState("");
  const [constraints, setConstraints] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputBase = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "0.9375rem",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    backgroundColor: "#0d111a",
    color: "#c4c4c4",
    transition: "border-color 0.2s",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#c4c4c4",
    marginBottom: "6px",
  };

  const TOPICS = ["Arrays", "Strings", "Graphs", "DP", "Trees", "Math", "Greedy"];

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
        Create Problem
      </h1>
      <p
        style={{
          marginBottom: "24px",
          color: "#b5b5b4",
          fontSize: "0.9375rem",
        }}
      >
        Create a new coding problem for the platform.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
          backgroundColor: "#1a2233",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div>
          <label style={labelStyle}>Problem Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Two Sum"
            required
            style={inputBase}
            onFocus={(e) => {
              e.target.style.borderColor = "#135bec";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
            }}
          />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the problem in detail..."
            rows={6}
            required
            style={{
              ...inputBase,
              resize: "vertical",
              minHeight: "140px",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#135bec";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{ ...inputBase, cursor: "pointer" }}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>DSA Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ ...inputBase, cursor: "pointer" }}
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Time Limit (seconds)</label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              placeholder="e.g. 1"
              min={1}
              style={inputBase}
              onFocus={(e) => {
                e.target.style.borderColor = "#135bec";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>Memory Limit (MB)</label>
            <input
              type="number"
              value={memoryLimit}
              onChange={(e) => setMemoryLimit(e.target.value)}
              placeholder="e.g. 256"
              min={1}
              style={inputBase}
              onFocus={(e) => {
                e.target.style.borderColor = "#135bec";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Constraints</label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="List problem constraints, one per line..."
            rows={4}
            style={{
              ...inputBase,
              resize: "vertical",
              minHeight: "100px",
              fontFamily: "monospace",
              fontSize: "0.875rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#135bec";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
            }}
          />
        </div>

        <div>
          <label style={labelStyle}>Sample Input</label>
          <textarea
            value={sampleInput}
            onChange={(e) => setSampleInput(e.target.value)}
            placeholder="Sample input for the problem..."
            rows={3}
            style={{
              ...inputBase,
              resize: "vertical",
              fontFamily: "monospace",
              fontSize: "0.875rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#135bec";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
            }}
          />
        </div>

        <div>
          <label style={labelStyle}>Sample Output</label>
          <textarea
            value={sampleOutput}
            onChange={(e) => setSampleOutput(e.target.value)}
            placeholder="Expected output for the sample input..."
            rows={3}
            style={{
              ...inputBase,
              resize: "vertical",
              fontFamily: "monospace",
              fontSize: "0.875rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#135bec";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              // Save as draft logic
            }}
            style={{
              padding: "12px 20px",
              fontSize: "0.9375rem",
              fontWeight: "600",
              color: "#c4c4c4",
              backgroundColor: "#1b2334",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#1e2839";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#1b2334";
            }}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              fontSize: "0.9375rem",
              fontWeight: "600",
              color: "#fff",
              backgroundColor: "#135bec",
              border: "none",
              borderRadius: "10px",
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
            Publish Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProblem;
