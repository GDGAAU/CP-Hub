import passport from "passport";
import express from "express";
import "dotenv/config";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

const clientUrl = process.env.CLIENT_URL;

router.post("/register", registerUser);
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "User not logged in!" });
  }
});
// Send even the message in the name username
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});
router.get(
  "google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${clientUrl}/login?error=googlefail`,
  }),
  (req, res) => {
    res.redirect(`${clientUrl}/dashboard`);
  },
);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
    res.json("User logged out Successfully");
    // res.redirect(`${clientUrl}`);
    // Uncomment the redirect when working with frontend
  });
});
export default router;
