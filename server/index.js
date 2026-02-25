import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import "dotenv/config";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.SERVER_PORT;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, secure: false },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth/", authRoutes);

app.listen(port, () => console.log("Server is running on port", port));
