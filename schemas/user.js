import mongoose from "mongoose";
const userschema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userschema);
export default User;
