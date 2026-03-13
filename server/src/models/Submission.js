import db from "../config/db.js";

const Submission = {
    create: async (userId, problemId, language, code, status, runtime, memory) => {
        const result = await db.query(
            `INSERT INTO submissions (user_id, problem_id, language, code, status, runtime, memory) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [userId, problemId, language, code, status, runtime, memory]
        );
        return result.rows[0];
    },

    getByUserId: async (userId) => {
        const result = await db.query(
            `SELECT s.*, p.title as problem_title, p.category_tags, p.difficulty 
       FROM submissions s
       JOIN problems p ON s.problem_id = p.id
       WHERE s.user_id = $1
       ORDER BY s.timestamp DESC`,
            [userId]
        );
        return result.rows;
    },

    update: async (id, status, runtime, memory) => {
        const result = await db.query(
            `UPDATE submissions SET status = $1, runtime = $2, memory = $3 WHERE id = $4 RETURNING *`,
            [status, runtime, memory, id]
        );
        return result.rows[0];
    },

    getByProblemId: async (problemId, userId = null) => {
        let query = `
      SELECT s.*, u.username as user_username
      FROM submissions s
      JOIN users u ON s.user_id = u.id
      WHERE s.problem_id = $1
    `;
        const params = [problemId];

        if (userId) {
            query += ` AND s.user_id = $2`;
            params.push(userId);
        }

        query += ` ORDER BY s.timestamp DESC`;
        const result = await db.query(query, params);
        return result.rows;
    }
};

export default Submission;
