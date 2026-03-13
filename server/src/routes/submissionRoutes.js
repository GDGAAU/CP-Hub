import express from "express";
import { createSubmission, getUserSubmissions } from "../controllers/submissionController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", ensureAuthenticated, createSubmission);
router.get("/user", ensureAuthenticated, getUserSubmissions);

export default router;
