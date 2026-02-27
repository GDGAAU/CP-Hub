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
    // We are doing only the member ones taking the default value (will implement the other values later)
    const newUser = await db.query(
      `insert into users (name, email, google_id, profile_img) values ($1, $2, $3, $4) returning *`,
      [name, email, googleId, profileImg],
    );
    if (newUser.rows.length === 0) {
      return null;
    }
    return newUser.rows[0];
  },
  newUserLocal: async (name, email, password, profileImg, username) => {
    // Automatically role set as memeber
    // Dont forget to implement the profile image path before testing
    const newUser = await db.query(
      `insert into users(name, email, password, profile_img, username) values ($1, $2, $3, $4, $5) returning *`,
      [name, email, password, profileImg, username],
    );
    if (newUser.rows.length === 0) {
      return null;
    }
    return newUser.rows[0];
  },
};

export default User;
