import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DIFFICULTY_STYLES = {
  Easy: { bg: "rgba(16, 185, 129, 0.2)", text: "#10b981" },
  Medium: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b" },
  Hard: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444" },
};

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = username
          ? `http://localhost:5000/api/users/profile/${username}`
          : `http://localhost:5000/api/users/me`;
        const res = await axios.get(url, { withCredentials: true });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div style={{ width: "100%", padding: "50px", textAlign: "center", color: "#b5b5b4" }}>
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ width: "100%", padding: "50px", textAlign: "center", color: "#b5b5b4" }}>
        User not found.
      </div>
    );
  }

  const stats = profile.stats || { solved: {}, topics: [], accuracy: 0, current_streak: 0, activity: [] };

  // Activity map processing (last 365 days)
  const activityMap = new Array(365).fill(0);
  if (stats.activity) {
    stats.activity.forEach(a => {
      const diffDays = Math.floor((new Date() - new Date(a.date)) / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays < 365) {
        activityMap[364 - diffDays] = Math.min(parseInt(a.count) || 0, 4);
      }
    });
  }

  return (
    <div style={{ width: "100%", padding: "0 24px" }}>
      {/* Header section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "32px",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundImage: `url('${profile.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + profile.username}')`,
              backgroundSize: "cover",
              border: "4px solid rgba(19, 91, 236, 0.2)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          />
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              {profile.name || profile.username}
            </h1>
            <p style={{ fontSize: "1rem", color: "#135bec", margin: "4px 0", fontWeight: "600" }}>
              @{profile.username}
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#b5b5b4", margin: "8px 0 0 0", maxWidth: "500px", lineHeight: "1.5" }}>
              {profile.bio || "Competitive programmer and algorithm enthusiast."}
            </p>
          </div>
        </div>
        {!username && (
          <Link
            to="/settings"
            style={{
              padding: "10px 24px",
              backgroundColor: "#135bec",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.9375rem",
              boxShadow: "0 4px 12px rgba(19, 91, 236, 0.3)",
            }}
          >
            Edit Profile
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Solved Breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              padding: "24px",
              backgroundColor: "#1a2233",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <h3 style={{ fontSize: "1.125rem", color: "#fff", margin: "0 0 20px 0" }}>Solved Count</h3>
            <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto 24px auto" }}>
              <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray={`${Math.round(((stats.solved?.total_solved || 0) / 100) * 100)}, 100`}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#fff" }}>{stats.solved?.total_solved || 0}</div>
                <div style={{ fontSize: "0.8125rem", color: "#b5b5b4" }}>Total</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#10b981", fontWeight: "600" }}>Easy</span>
                <span style={{ color: "#fff" }}>{stats.solved?.easy_solved || 0}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#f59e0b", fontWeight: "600" }}>Medium</span>
                <span style={{ color: "#fff" }}>{stats.solved?.medium_solved || 0}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#ef4444", fontWeight: "600" }}>Hard</span>
                <span style={{ color: "#fff" }}>{stats.solved?.hard_solved || 0}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "24px",
              backgroundColor: "#1a2233",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div>
              <div style={{ fontSize: "0.8125rem", color: "#b5b5b4", marginBottom: "4px" }}>Accuracy</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff" }}>{stats.accuracy || 0}%</div>
            </div>
            <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.05)" }} />
            <div>
              <div style={{ fontSize: "0.8125rem", color: "#b5b5b4", marginBottom: "4px" }}>Streak</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#135bec" }}>{stats.current_streak || 0} Days 🔥</div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity Map and Topics */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Activity Heatmap */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "#1a2233",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <h3 style={{ fontSize: "1.125rem", color: "#fff", margin: "0 0 24px 0" }}>
              {stats.activity?.length || 0} Submissions in the past year
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(53, 1fr)",
                gap: "4px",
                overflowX: "auto",
                paddingBottom: "8px",
              }}
            >
              {activityMap.map((level, i) => {
                const shades = ["#1b2334", "#1e2839", "#222d3d", "#253242", "#135bec"];
                return (
                  <div
                    key={i}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "2px",
                      backgroundColor: shades[level] || shades[0],
                    }}
                    title={`Activity Level: ${level}`}
                  />
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", fontSize: "0.75rem", color: "#b5b5b4" }}>
              <span>Less</span>
              <div style={{ display: "flex", gap: "4px" }}>
                {[0, 1, 2, 3, 4].map(l => (
                  <div key={l} style={{ width: "10px", height: "10px", backgroundColor: ["#1b2334", "#1e2839", "#222d3d", "#253242", "#135bec"][l], borderRadius: "2px" }} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Topics breakdown */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "#1a2233",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <h3 style={{ fontSize: "1.125rem", color: "#fff", margin: "0 0 24px 0" }}>Topic Mastery</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "24px",
              }}
            >
              {stats.topics?.map((topic) => (
                <div key={topic.topic}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.875rem" }}>
                    <span style={{ color: "#fff" }}>{topic.topic}</span>
                    <span style={{ color: "#b5b5b4" }}>{topic.count}</span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${Math.min((topic.count / (stats.solved?.total_solved || 1)) * 100, 100)}%`,
                        height: "100%",
                        backgroundColor: "#135bec",
                      }}
                    />
                  </div>
                </div>
              ))}
              {(!stats.topics || stats.topics.length === 0) && (
                <p style={{ color: "#b5b5b4", fontSize: "0.875rem" }}>No topic data yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
