import React, { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";

const LANG_MAP = {
  JavaScript: "javascript",
  Python: "python",
  "C++": "cpp",
  Java: "java",
};

const CodeEditor = ({
  value,
  onChange,
  language: controlledLanguage,
  onLanguageChange,
  showLanguageDropdown = false,
  height = "500px",
  placeholder = "// Write your code here...",
  style = {},
}) => {
  const [internalLang, setInternalLang] = useState("JavaScript");
  const lang = controlledLanguage ?? internalLang;
  const setLang = onLanguageChange ?? setInternalLang;
  const monacoLang = LANG_MAP[lang] ?? "javascript";

  const handleEditorChange = useCallback(
    (val) => {
      onChange?.(val ?? "");
    },
    [onChange]
  );

  return (
    <div style={{ width: "100%", flex: height === "100%" ? 1 : undefined, minHeight: height === "100%" ? 0 : undefined, height: height === "100%" ? "100%" : undefined, ...style }}>
      {showLanguageDropdown && (
        <div
          style={{
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <label
            style={{
              fontSize: "0.875rem",
              color: "#b5b5b4",
              marginRight: "0.5rem",
            }}
          >
            Language:
          </label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.875rem",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              color: "#c4c4c4",
              backgroundColor: "#1a2233",
              minWidth: "130px",
              cursor: "pointer",
            }}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
          </select>
        </div>
      )}
      <Editor
        height={height === "100%" ? "100%" : height}
        defaultLanguage="javascript"
        language={monacoLang}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          lineNumbers: "on",
          automaticLayout: true,
          fontSize: 14,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          smoothScrolling: true,
          padding: { top: 16 },
          wordWrap: "on",
        }}
        loading={
          <div
            style={{
              height: height === "100%" ? "350px" : height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0d111a",
              color: "#b5b5b4",
              fontSize: "0.875rem",
            }}
          >
            Loading editor...
          </div>
        }
        style={{ borderRadius: "0 0 12px 12px", overflow: "hidden" }}
      />
    </div>
  );
};

export default CodeEditor;
