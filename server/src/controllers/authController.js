import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import "dotenv/config";

export const registerUser = async (req, res) => {
  const { fname, lname, email, username, password } = req.body;
  const profileImg = process.env.PROFILE_PLACEHOLDER;
  try {
    const user = await User.byEmail(email);
    if (user) {
      return res.status(409).json({ message: "Email already exists!" });
    }
    const name = `${fname} ${lname}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(name);
    const newUser = await User.newUserLocal(
      name,
      email,
      hashedPassword,
      profileImg,
      username,
    );
    req.login(newUser, (err) => {
      if (err) {
        console.log("Login failed after registration");
        res.status(500).json({ message: "Login failed!" });
      }
      return res
        .status(201)
        .json({ message: "Registration Successful", user: newUser });
    });
  } catch (err) {
    console.log("Error registering user using the local method", err.message);
    console.error(err.stack);
    res
      .status(500)
      .json({ message: "Local Registration Error!", error: err.message });
  }
};
