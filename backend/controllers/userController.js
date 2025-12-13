import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { passwordValid } from "../utils/validators.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) { res.status(500).json({ message: "Server error" }); }
};

export const createUser = async (req, res) => {
  // Admin creates user (admin/owner/user)
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: "Missing fields" });
    if (!passwordValid(password)) return res.status(400).json({ message: "Password invalid" });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email exists" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hash, role });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
};

export const getUserById = async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select("-password");
    if (!u) return res.status(404).json({ message: "User not found" });
    res.json(u);
  } catch (err) { res.status(500).json({ message: "Server error" }); }
};

export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!passwordValid(password)) return res.status(400).json({ message: "Password invalid" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(req.user._id, { password: hash });
    res.json({ message: "Password updated" });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
};
