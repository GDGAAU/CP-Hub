import User from "../models/userModel.js";

export const getProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const profile = await User.getProfileByUsername(username);
        if (!profile) return res.status(404).json({ error: "User not found" });
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error retrieving profile" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedUser = await User.updateProfile(userId, req.body);
        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error updating profile" });
    }
};

export const getCurrentUser = async (req, res) => {
    if (req.user) {
        try {
            const profile = await User.getProfileByUsername(req.user.username);
            res.json(profile);
        } catch (err) {
            res.json(req.user);
        }
    } else {
        res.status(401).json({ error: "Not authenticated" });
    }
};

export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.getLeaderboard();
        res.json(leaderboard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error retrieving leaderboard" });
    }
};
