import db from "../config/db";

export default User = {
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
    // We are doing only the member ones taking the default value (will implement the other values later)
    const newUser = await db.query(
      `inser into users (name, email, google_id, profile_img) values ($1, $2, $3, $4) returning *`,
      [name, email, googleId, profileImg],
    );
    if (newUser.rows.length === 0) {
      return null;
    }
    return newUser.rows[0];
  },
};
