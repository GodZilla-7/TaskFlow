import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Must provide a username"], unique: true },
  email: { type: String, required: [true, "Must provide an email"], unique: true },
  password: { type: String, required: [true, "Must provide a password"] },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
