import mongoose from "mongoose";
const { Schema } = mongoose;



const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const UserModel = mongoose.model("User", userSchema);
