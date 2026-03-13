import Problem from "../models/Problem.js";

export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.getAll();
        res.json(problems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error retrieving problems" });
    }
};

export const getProblem = async (req, res) => {
    try {
        const problem = await Problem.getById(req.params.id);
        if (!problem) return res.status(404).json({ error: "Problem not found" });
        res.json(problem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error retrieving problem" });
    }
};

export const createProblem = async (req, res) => {
    const { title, description, difficulty, category_tags, examples, constraints } = req.body;
    try {
        const newProblem = await Problem.create(title, description, difficulty, category_tags, examples, constraints);
        res.status(201).json(newProblem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error creating problem" });
    }
};

export const updateProblem = async (req, res) => {
    const { title, description, difficulty, category_tags, examples, constraints } = req.body;
    try {
        const updated = await Problem.update(req.params.id, title, description, difficulty, category_tags, examples, constraints);
        if (!updated) return res.status(404).json({ error: "Problem not found" });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error updating problem" });
    }
};

export const deleteProblem = async (req, res) => {
    try {
        const deleted = await Problem.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Problem not found" });
        res.json({ message: "Problem deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error deleting problem" });
    }
};
