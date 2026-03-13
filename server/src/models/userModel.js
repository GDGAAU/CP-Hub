import db from "../config/db.js";

const User = {
  byEmailUsername: async (email) => {
    const result = await db.query(
      `select * from users where email = $1 or username = $1`,
      [email],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
  byEmail: async (email) => {
    const result = await db.query(`select * from users where email = $1`, [
      email,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
  byId: async (id) => {
    const result = await db.query(`select * from users where id = $1`, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
  newUserGoogle: async (name, email, googleId, profileImg) => {
    const newUser = await db.query(
      `insert into users (name, email, google_id, profile_img) values ($1, $2, $3, $4) returning *`,
      [name, email, googleId, profileImg],
    );
    if (newUser.rows.length === 0) {
      return null;
    }
    return newUser.rows[0];
  },
  newUserLocal: async (name, email, password, profileImg, role, username) => {
    const userRole = role ? role : "member";
    const newUser = await db.query(
      `insert into users(name, email, password, profile_img, role, username) values ($1, $2, $3, $4, $5, $6) returning *`,
      [name, email, password, profileImg, userRole, username],
    );
    if (newUser.rows.length === 0) {
      return null;
    }
    return newUser.rows[0];
  },
  updateProfile: async (id, data) => {
    const { bio, college, github_url, linkedin_url, website_url, skills, location } = data;
    const result = await db.query(
      `UPDATE users 
       SET bio = COALESCE($1, bio), 
           college = COALESCE($2, college), 
           github_url = COALESCE($3, github_url), 
           linkedin_url = COALESCE($4, linkedin_url), 
           website_url = COALESCE($5, website_url), 
           skills = COALESCE($6, skills),
           location = COALESCE($7, location)
       WHERE id = $8 RETURNING *`,
      [bio, college, github_url, linkedin_url, website_url, skills, location, id]
    );
    return result.rows[0];
  },
  getProfileByUsername: async (username) => {
    const userResult = await db.query(`SELECT id, name, username, email, profile_img, role, bio, college, github_url, linkedin_url, website_url, skills, location, created_at FROM users WHERE username = $1`, [username]);
    if (userResult.rows.length === 0) return null;
    const user = userResult.rows[0];

    // Get solved stats
    const statsResult = await db.query(
      `SELECT 
        COUNT(*) as total_solved,
        COUNT(CASE WHEN p.difficulty = 'Easy' THEN 1 END) as easy_solved,
        COUNT(CASE WHEN p.difficulty = 'Medium' THEN 1 END) as medium_solved,
        COUNT(CASE WHEN p.difficulty = 'Hard' THEN 1 END) as hard_solved
       FROM submissions s
       JOIN problems p ON s.problem_id = p.id
       WHERE s.user_id = $1 AND s.status = 'Accepted'`,
      [user.id]
    );

    // Get accuracy (Accepted vs Total)
    const accuracyResult = await db.query(
      `SELECT 
        COUNT(*) as total_submissions,
        COUNT(CASE WHEN status = 'Accepted' THEN 1 END) as accepted_submissions
       FROM submissions 
       WHERE user_id = $1`,
      [user.id]
    );

    // Get topic-wise stats
    const topicStatsResult = await db.query(
      `SELECT 
        unnest(p.category_tags) as topic,
        COUNT(*) as count
       FROM submissions s
       JOIN problems p ON s.problem_id = p.id
       WHERE s.user_id = $1 AND s.status = 'Accepted'
       GROUP BY topic
       ORDER BY count DESC`,
      [user.id]
    );

    // Get activity map (last 365 days)
    const activityResult = await db.query(
      `SELECT 
        DATE(timestamp) as date,
        COUNT(*) as count
       FROM submissions 
       WHERE user_id = $1 AND timestamp > NOW() - INTERVAL '365 days'
       GROUP BY date
       ORDER BY date ASC`,
      [user.id]
    );

    // Calculate Streak (Simple version: consecutive days with at least one submission)
    const streakResult = await db.query(
      `WITH RECURSIVE dates AS (
        SELECT DISTINCT DATE(timestamp) as submission_date
        FROM submissions
        WHERE user_id = $1
      ),
      streaks AS (
        SELECT submission_date, 1 as streak_len
        FROM dates
        WHERE submission_date = CURRENT_DATE OR submission_date = CURRENT_DATE - INTERVAL '1 day'
        UNION ALL
        SELECT d.submission_date, s.streak_len + 1
        FROM dates d
        JOIN streaks s ON d.submission_date = s.submission_date - INTERVAL '1 day'
      )
      SELECT MAX(streak_len) as current_streak FROM streaks`,
      [user.id]
    );

    const totalSub = parseInt(accuracyResult.rows[0].total_submissions);
    const accSub = parseInt(accuracyResult.rows[0].accepted_submissions);

    user.stats = {
      solved: statsResult.rows[0],
      topics: topicStatsResult.rows,
      accuracy: totalSub > 0 ? Math.round((accSub / totalSub) * 100) : 0,
      activity: activityResult.rows,
      current_streak: streakResult.rows[0].current_streak || 0
    };

    return user;
  },

  getLeaderboard: async () => {
    const result = await db.query(`
      SELECT 
        u.id, 
        u.username, 
        u.name, 
        u.avatar,
        COUNT(DISTINCT s.problem_id) FILTER (WHERE s.status = 'Accepted') as total_solved
      FROM users u
      LEFT JOIN submissions s ON u.id = s.user_id
      GROUP BY u.id, u.username, u.name, u.avatar
      ORDER BY total_solved DESC
      LIMIT 50
    `);
    return result.rows;
  },
};

export default User;
