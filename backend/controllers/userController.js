import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const token = createToken(user._id);
    res.json({ success: true, message: "Login Successful", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in login user" });
  }
};
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter password of length more than 8",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, message: "SignUp successful", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error creating user" });
  }
};
