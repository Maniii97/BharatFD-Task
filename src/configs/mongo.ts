import mongoose from "mongoose";
import { config } from "dotenv";

config();

const dbUrl = process.env.DB_URL as string;

const connectDB = async () => {
  await mongoose
    .connect(dbUrl)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Connection error:", err));
};

export default connectDB;
