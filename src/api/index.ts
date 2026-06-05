import serverless from "serverless-http";
import app from "../app";
import { AppDataSource } from "../config/data-source";

let isInitialized = false;

const initDB = async () => {
  if (!isInitialized) {
    await AppDataSource.initialize();
    console.log("Database connected");
    isInitialized = true;
  }
};

export default async function handler(req: any, res: any) {
  try {
    await initDB();
  } catch (error) {
    console.error("DB connection failed:", error);
    return res.status(500).json({ message: "DB connection failed" });
  }

  return serverless(app)(req, res);
}