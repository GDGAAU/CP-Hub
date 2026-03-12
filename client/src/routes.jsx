import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import Leaderboard from "./pages/Leaderboard";
import CreateProblem from "./pages/CreateProblem";
import Submissions from "./pages/Submissions";
import SubmissionHistory from "./pages/SubmissionHistory";
import ViewSolution from "./pages/ViewSolution";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="problems" element={<ProblemList />} />
        <Route path="problems/:id" element={<ProblemDetail />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="create-problem" element={<CreateProblem />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="submission-history" element={<SubmissionHistory />} />
        <Route path="view-solution/:id" element={<ViewSolution />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="profile/edit" element={<Profile />} />
        <Route path="teams" element={<Leaderboard />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
