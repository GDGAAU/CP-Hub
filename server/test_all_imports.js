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

console.log('All imports successful');
console.log('session type:', typeof session);
console.log('session default type:', typeof session.default);
console.log('configurePassport type:', typeof configurePassport);
console.log('authRoutes type:', typeof authRoutes);
console.log('problemRoutes type:', typeof problemRoutes);
console.log('submissionRoutes type:', typeof submissionRoutes);
console.log('userRoutes type:', typeof userRoutes);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const sessionMiddleware = typeof session === 'function' ? session : session.default;
console.log('sessionMiddleware type:', typeof sessionMiddleware);

try {
    configurePassport();
    console.log('configurePassport successful');
} catch (e) {
    console.log('configurePassport failed:', e.message);
    console.log(e.stack);
}
