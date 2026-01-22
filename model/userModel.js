import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["FARMER", "CORPORATE"],
      required: true,
    },
    farmerInfo: {
      type: Object,
      default: {},
    },
    corporateInfo: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
