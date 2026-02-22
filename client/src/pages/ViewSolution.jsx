import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DUMMY_CODE = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Given an array of integers nums and an integer target,
        return indices of the two numbers such that they add up to target.
        """
        # Create a hash map to store value -> index mapping
        num_map = {}
        
        # Iterate through the array
        for i, num in enumerate(nums):
            complement = target - num
            
            # Check if complement exists in the map
            if complement in num_map:
                return [num_map[complement], i]
            
            # Add current number to the map
            num_map[num] = i
        
        # No solution found (shouldn't happen with valid input)
        return []

# Example usage:
# sol = Solution()
# result = sol.twoSum([2, 7, 11, 15], 9)
# print(result)  # Output: [0, 1]`;

const ViewSolution = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isConnected, setIsConnected] = useState(true);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(DUMMY_CODE);
    // Could add toast notification here
  };

  const handleClose = () => {
    navigate("/submission-history");
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#101622", 
      padding: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ 
        width: "100%", 
        padding: "0 24px",
        backgroundColor: "#1a2233",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        overflow: "hidden"
      }}>
        {/* Header Bar */}
        <div style={{ 
          padding: "20px 24px", 
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          {/* Left side - Problem info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <h1 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "600", 
                color: "#c4c4c4",
                margin: 0
              }}>
                Two Sum
              </h1>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                }}
              >
                ACCEPTED
              </span>
            </div>
            <div style={{ fontSize: "0.875rem", color: "#b5b5b4" }}>
              Submission ID: #{id || "12345"} • Submitted on 2024-01-15 14:32:10
            </div>
          </div>

          {/* Right side - Actions */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleCopyCode}
              style={{
                padding: "8px 16px",
                backgroundColor: "transparent",
                border: "1px solid #135bec",
                borderRadius: "6px",
                color: "#135bec",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
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
              📋 Copy Code
            </button>
            <button
              onClick={handleClose}
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "6px",
                color: "#b5b5b4",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.color = "#c4c4c4";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#b5b5b4";
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ 
          padding: "16px 24px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          gap: "32px",
          flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.875rem", color: "#b5b5b4" }}>Runtime:</span>
            <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#10b981" }}>42 ms</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.875rem", color: "#b5b5b4" }}>Memory:</span>
            <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#10b981" }}>14.2 MB</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.875rem", color: "#b5b5b4" }}>Language:</span>
            <span style={{ fontSize: "0.875rem", color: "#c4c4c4" }}>Python 3</span>
          </div>
        </div>

        {/* Code Area */}
        <div style={{ 
          padding: "24px",
          backgroundColor: "#0d111a",
          borderRadius: "8px",
          margin: "24px",
          border: "1px solid rgba(255, 255, 255, 0.04)",
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
          fontSize: "0.875rem",
          lineHeight: "1.6",
          color: "#c4c4c4",
          overflow: "auto",
          maxHeight: "500px"
        }}>
          <pre style={{ margin: 0, fontFamily: "inherit" }}>
            <code>{DUMMY_CODE}</code>
          </pre>
        </div>

        {/* Bottom Action Bar */}
        <div style={{ 
          padding: "20px 24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          {/* Left side - Actions */}
          <div style={{ display: "flex", gap: "16px" }}>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "6px",
                color: "#c4c4c4",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              📤 Share Solution
            </button>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "6px",
                color: "#c4c4c4",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ✏️ Edit in Playground
            </button>
          </div>

          {/* Right side - Connection Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: isConnected ? "#10b981" : "#ef4444",
                animation: isConnected ? "pulse 2s infinite" : "none",
              }}
            />
            <span style={{ fontSize: "0.875rem", color: "#b5b5b4" }}>
              {isConnected ? "Connected to Cloud Sync" : "Connection Lost"}
            </span>
          </div>
        </div>
      </div>

      {/* Add pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default ViewSolution;
