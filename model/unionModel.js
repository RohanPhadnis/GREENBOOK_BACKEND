import mongoose from "mongoose";

const unionSchema = new mongoose.Schema(
  {
    unionName: {
      type: String,
      required: true,
    },
    registrationType: {
      type: String,
      enum: ["FPO", "Cooperative Society", "Trust", "Producer Company"],
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    verificationStandard: {
      type: String,
      enum: [
        "Verra (VCS)",
        "Gold Standard (GS)",
        "Indian Carbon Market (ICM)",
        "Climate Action Reserve (CAR)",
        "American Carbon Registry (ACR)",
        "Global Carbon Council (GCC)",
        "Plan Vivo",
      ],
      required: true,
    },
    verificationStatus: {
      type: String,
      enum: ["Verified", "Pending", "Rejected"],
      default: "Pending",
    },
    projectID: {
      type: String,
      required: true,
    },
    vintageYear: {
      type: Number,
      required: true,
    },
    totalVerifiedCredits: {
      type: Number,
      required: true,
      default: 0,
    },
    creditsAvailableForSale: {
      type: Number,
      required: true,
      default: 0,
    },
    creditType: {
      type: String,
      enum: ["Removal", "Avoidance", "Other"], // Replace with actual types
      required: true,
    },
    minPricePerCredit: {
      type: Number,
      required: true,
    },
    maxPricePerCredit: {
      type: Number,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Unions", unionSchema);
