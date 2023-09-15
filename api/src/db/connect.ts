import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  try {
    const dbUri = process.env.DB_URI;

    if (!dbUri) {
      throw new Error("DB_URI is not defined in the environment variables.");
    }

    await mongoose.connect(dbUri, {});
    console.info("Database connected");
  } catch (error: any) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

export { connect };
