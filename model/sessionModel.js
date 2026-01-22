import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sessions", sessionSchema);
