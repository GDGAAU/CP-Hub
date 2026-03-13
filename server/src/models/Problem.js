import db from "../config/db.js";

const Problem = {
    create: async (title, description, difficulty, categoryTags, examples, constraints) => {
        const result = await db.query(
            `INSERT INTO problems (title, description, difficulty, category_tags, examples, constraints) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, description, difficulty, categoryTags, examples, constraints]
        );
        return result.rows[0];
    },

    getAll: async () => {
        const result = await db.query(`SELECT * FROM problems ORDER BY id ASC`);
        return result.rows;
    },

    getById: async (id) => {
        const result = await db.query(`SELECT * FROM problems WHERE id = $1`, [id]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    },

    update: async (id, title, description, difficulty, categoryTags, examples, constraints) => {
        const result = await db.query(
            `UPDATE problems 
       SET title = COALESCE($1, title), 
           description = COALESCE($2, description), 
           difficulty = COALESCE($3, difficulty), 
           category_tags = COALESCE($4, category_tags),
           examples = COALESCE($5, examples),
           constraints = COALESCE($6, constraints)
       WHERE id = $7 RETURNING *`,
            [title, description, difficulty, categoryTags, examples, constraints, id]
        );
        if (result.rows.length === 0) return null;
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await db.query(`DELETE FROM problems WHERE id = $1 RETURNING *`, [id]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }
};

export default Problem;
