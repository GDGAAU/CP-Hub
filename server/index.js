import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import "dotenv/config";
import authRoutes from "./src/routes/authRoutes.js";
import problemRoutes from "./src/routes/problemRoutes.js";
import submissionRoutes from "./src/routes/submissionRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import configurePassport from "./src/config/passport.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.SERVER_PORT;

// Fix for express-session ESM import
const sessionMiddleware = typeof session === 'function' ? session : session.default;

configurePassport();
app.use(
  sessionMiddleware({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, secure: false }, // set secure: true in production with HTTPS
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth/", authRoutes);
app.use("/api/problems/", problemRoutes);
app.use("/api/submissions/", submissionRoutes);
app.use("/api/users/", userRoutes);

app.listen(port, () => console.log("Server is running on port", port));
