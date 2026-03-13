import passportGoogle from "passport-google-oauth2";
import passportLocal from "passport-local";
import "dotenv/config";
import passport from "passport";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Handle potential ESM/CJS interop for Strategies
const GoogleStrategy = passportGoogle.Strategy || passportGoogle.OAuth2Strategy;
const LocalStrategy = passportLocal.Strategy;

const configurePassport = () => {
  if (!LocalStrategy) {
     console.error("FATAL: LocalStrategy is not defined!");
  }
  if (!GoogleStrategy) {
     console.error("FATAL: GoogleStrategy is not defined!");
  }

  passport.use(
    "local",
    new LocalStrategy(async (username, password, cb) => {
      try {
        const user = await User.byEmailUsername(username);
        if (!user) {
          return cb(null, false, { message: "User or email not found" });
        }
        bcrypt.compare(password, user.password, (err, valid) => {
          if (err) return cb(err);
          if (!valid) return cb(null, false, { message: "Incorrect password" });
          return cb(null, user);
        });
      } catch (err) {
        return cb(err);
      }
    }),
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || 'dummy',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await User.byEmail(profile.email);
          if (!user) {
            const { id, displayName, emails, photos } = profile;
            const email = emails[0]?.value;
            const photo = photos[0]?.value;
            const newUser = await User.newUserGoogle(
              displayName,
              email,
              id,
              photo,
            );
            return cb(null, newUser, {
              message: "User added to the database using Google Authentication",
            });
          }
          return cb(null, user, {
            message: "User signed it with google account",
          });
        } catch (err) {
          cb(err);
        }
      },
    ),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.byId(id);
      user ? cb(null, user) : cb(new Error("User not found", null));
    } catch (err) {
      cb(err, null, { message: "Error deserilizing user information" });
    }
  });
};

export default configurePassport;
