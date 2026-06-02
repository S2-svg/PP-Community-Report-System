"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const Category_1 = require("../entities/Category");
const Notification_1 = require("../entities/Notification");
const Report_1 = require("../entities/Report");
const ReportImage_1 = require("../entities/ReportImage");
const ReportStatusHistory_1 = require("../entities/ReportStatusHistory");
const Status_1 = require("../entities/Status");
const User_1 = require("../entities/User");
const TempUsers_1 = require("../entities/TempUsers");
dotenv_1.default.config();
const isCompiled = __dirname.includes("dist");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USERNAME ?? process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_DATABASE ?? process.env.DB_NAME ?? "pp_crs_db",
    synchronize: process.env.DB_SYNC === "true",
    logging: process.env.DB_LOGGING === "true",
    entities: [User_1.User, Category_1.Category, Status_1.Status, Report_1.Report, ReportImage_1.ReportImage, ReportStatusHistory_1.ReportStatusHistory, Notification_1.Notification, TempUsers_1.TempUser],
    migrations: [isCompiled ? "dist/database/migrations/*.js" : "src/database/migrations/*.ts"],
});
//# sourceMappingURL=data-source.js.map