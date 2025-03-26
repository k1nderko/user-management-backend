import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
  company: String,
  jobTitle: String,
  age: { type: Number, required: false },
  email: { type: String, required: false, unique: true },
});

const User = mongoose.model("User", userSchema);

export default User;