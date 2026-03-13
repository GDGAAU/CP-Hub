import express from "express";
import { getProfile, updateProfile, getCurrentUser, getLeaderboard } from "../controllers/userController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", getCurrentUser);
router.get("/profile/:username", getProfile);
router.put("/profile", ensureAuthenticated, updateProfile);
router.get("/leaderboard", getLeaderboard);

export default router;
