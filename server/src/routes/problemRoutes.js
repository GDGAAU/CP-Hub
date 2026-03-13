import express from "express";
import { getProblems, getProblem, createProblem, updateProblem, deleteProblem } from "../controllers/problemController.js";
import { ensureAuthenticated, ensureAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProblems);
router.get("/:id", getProblem);

// Admin-only routes
router.post("/", ensureAdmin, createProblem);
router.put("/:id", ensureAdmin, updateProblem);
router.delete("/:id", ensureAdmin, deleteProblem);

export default router;
