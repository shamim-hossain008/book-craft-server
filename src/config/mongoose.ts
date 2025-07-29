import mongoose from "mongoose";
import config from "../config/index";

export const connectMongoose = async () => {
  try {
    await mongoose.connect(config.mongo_uri as string);
    console.log("✅ MongoDB connected (Mongoose)");
  } catch (error) {
    console.error("❌ Mongoose connection failed:", error);
    process.exit(1);
  }
};
