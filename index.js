import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import route from "./routes/unionRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const MONGOURL = process.env.MONGO_URL;

let isConnected = false;

const connectToMongoDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGOURL);
    isConnected = true;
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

connectToMongoDB();

app.use("/api", route);

app.get("/", (req, res) => {
  res.send("Carbon Footprint API is running");
});

export default app;
