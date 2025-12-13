import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, validate: [validator.isEmail, "Invalid email"] },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin","user","owner"], default: "user" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
