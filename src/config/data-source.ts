import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Category } from "../entities/Category";
import { Notification } from "../entities/Notification";
import { Report } from "../entities/Report";
import { ReportImage } from "../entities/ReportImage";
import { ReportStatusHistory } from "../entities/ReportStatusHistory";
import { Status } from "../entities/Status";
import { User } from "../entities/User";
import { TempUser } from "../entities/TempUsers";

dotenv.config();

const isCompiled = __dirname.includes("dist");

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_DATABASE ?? process.env.DB_NAME ?? "pp_crs_db",
  synchronize: process.env.DB_SYNC === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [User, Category, Status, Report, ReportImage, ReportStatusHistory, Notification, TempUser],
  migrations: [isCompiled ? "dist/database/migrations/*.js" : "src/database/migrations/*.ts"],
});
