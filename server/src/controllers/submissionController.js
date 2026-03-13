import Submission from "../models/Submission.js";

// Mock execution service for now until we build the Docker engine
export const createSubmission = async (req, res) => {
    const { problemId, language, code } = req.body;
    const userId = req.user.id;

    try {
        // 1. Initial State
        let status = "Pending";
        let runtime = 0;
        let memory = 0;

        // Save initial pending state
        const newSubmission = await Submission.create(userId, problemId, language, code, status, runtime, memory);

        res.status(201).json(newSubmission);

        // 2. Mock execution lag (in reality, this goes to BullMQ)
        setTimeout(async () => {
            // Very basic mock evaluation
            const finalStatus = code.includes("return") || code.includes("print") ? "Accepted" : "Wrong Answer";
            const finalRuntime = Math.floor(Math.random() * 50) + 10;
            const finalMemory = Math.floor(Math.random() * 20) + 5;

            // Update the database
            await Submission.update(newSubmission.id, finalStatus, finalRuntime, finalMemory);
            console.log(`Submission ${newSubmission.id} evaluated: ${finalStatus}`);
        }, 2000);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error creating submission" });
    }
};

export const getUserSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.getByUserId(req.user.id);
        res.json(submissions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error retrieving submissions" });
    }
};
