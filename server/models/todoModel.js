import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    userID:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "must provide an user"] },
  title: { type: String, required: [true, "must provide an title"], unique: true },
  isDone: { type: Boolean, default: false },
});
const todoModel = mongoose.model("todo", todoSchema);
export default todoModel;