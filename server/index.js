import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import "dotenv/config";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.SERVER_PORT;
app.listen(port, () => console.log("Server is running on port", { port }));
