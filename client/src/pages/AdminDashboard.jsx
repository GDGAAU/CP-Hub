import React, { useState, useEffect } from "react";
import axios from "axios";

// A simple dashboard for Admin to manage Problems
const AdminDashboard = () => {
    const [problems, setProblems] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [topic, setTopic] = useState("");

    const fetchProblems = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/problems", { withCredentials: true });
            setProblems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // Split comma separated tags into array
            const tags = topic.split(",").map((t) => t.trim()).filter((t) => t);

            await axios.post(
                "http://localhost:5000/api/problems",
                { title, description, difficulty, category_tags: tags },
                { withCredentials: true }
            );

            // Reset form
            setTitle("");
            setDescription("");
            setDifficulty("Easy");
            setTopic("");
            fetchProblems();
            alert("Problem created successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to create problem. Are you an admin?");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this problem?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/problems/${id}`, { withCredentials: true });
            fetchProblems();
        } catch (err) {
            console.error(err);
            alert("Failed to delete problem.");
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        backgroundColor: "#1a2233",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
    };

    return (
        <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto", color: "#c4c4c4" }}>
            <h1 style={{ color: "#fff", marginBottom: "30px" }}>Admin Dashboard: Problem Management</h1>

            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", alignItems: "flex-start" }}>
                {/* Create Problem Form */}
                <div style={{ flex: "1 1 400px", backgroundColor: "#0d111a", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "20px" }}>Create New Problem</h2>
                    <form onSubmit={handleCreate}>
                        <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={inputStyle}
                            placeholder="e.g. Two Sum"
                        />

                        <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>

                        <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Tags / Topic (comma separated)</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            style={inputStyle}
                            placeholder="e.g. Arrays, Hash Table"
                        />

                        <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Description (Markdown Supported)</label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ ...inputStyle, height: "200px", resize: "vertical" }}
                            placeholder="Enter problem requirements..."
                        />

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "12px",
                                backgroundColor: "#135bec",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "background-color 0.2s"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#0f4fd4"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#135bec"}
                        >
                            Create Problem
                        </button>
                    </form>
                </div>

                {/* Existing Problems List */}
                <div style={{ flex: "2 1 500px", backgroundColor: "#0d111a", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "20px" }}>Active Problems Catalog</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                                <th style={{ padding: "10px", fontSize: "0.9rem" }}>ID</th>
                                <th style={{ padding: "10px", fontSize: "0.9rem" }}>Title</th>
                                <th style={{ padding: "10px", fontSize: "0.9rem" }}>Difficulty</th>
                                <th style={{ padding: "10px", fontSize: "0.9rem" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problems.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No problems in database.</td>
                                </tr>
                            ) : (
                                problems.map(p => (
                                    <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                        <td style={{ padding: "12px 10px", fontSize: "0.9rem" }}>{p.id}</td>
                                        <td style={{ padding: "12px 10px", fontSize: "0.9rem", color: "#60a5fa" }}>{p.title}</td>
                                        <td style={{ padding: "12px 10px", fontSize: "0.9rem" }}>{p.difficulty}</td>
                                        <td style={{ padding: "12px 10px" }}>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                style={{
                                                    padding: "6px 12px",
                                                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                                                    color: "#ef4444",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "0.8rem",
                                                    fontWeight: "500"
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
