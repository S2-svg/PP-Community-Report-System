"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const data_source_1 = require("../config/data-source");
const Category_1 = require("../entities/Category");
const Report_1 = require("../entities/Report");
const User_1 = require("../entities/User");
class DashboardService {
    async reportSummary() {
        const reportRepo = data_source_1.AppDataSource.getRepository(Report_1.Report);
        const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        const [totalReports, totalUsers, statusRows] = await Promise.all([
            reportRepo.count(),
            userRepo.count(),
            reportRepo
                .createQueryBuilder("report")
                .leftJoin("report.status", "status")
                .select("status.statusName", "status")
                .addSelect("COUNT(report.reportId)", "count")
                .groupBy("status.statusId")
                .getRawMany(),
        ]);
        return {
            totalReports,
            totalUsers,
            byStatus: statusRows.map((row) => ({
                status: row.status ?? "Unknown",
                count: Number(row.count),
            })),
        };
    }
    async categorySummary() {
        return data_source_1.AppDataSource.getRepository(Category_1.Category)
            .createQueryBuilder("category")
            .leftJoin("category.reports", "report")
            .select("category.categoryId", "categoryId")
            .addSelect("category.categoryName", "categoryName")
            .addSelect("COUNT(report.reportId)", "count")
            .groupBy("category.categoryId")
            .getRawMany();
    }
}
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map