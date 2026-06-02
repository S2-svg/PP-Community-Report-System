import { AppDataSource } from "../config/data-source";
import { Category } from "../entities/Category";
import { Report } from "../entities/Report";
import { User } from "../entities/User";

export class DashboardService {
  async reportSummary() {
    const reportRepo = AppDataSource.getRepository(Report);
    const userRepo = AppDataSource.getRepository(User);

    const [totalReports, totalUsers, statusRows] = await Promise.all([
      reportRepo.count(),
      userRepo.count(),
      reportRepo
        .createQueryBuilder("report")
        .leftJoin("report.status", "status")
        .select("status.statusName", "status")
        .addSelect("COUNT(report.reportId)", "count")
        .groupBy("status.statusId")
        .getRawMany<{ status: string | null; count: string }>(),
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

  async userSummary() {
    const userRepo = AppDataSource.getRepository(User);

    const [totalUsers, roleRows] = await Promise.all([
      userRepo.count(),
      userRepo
        .createQueryBuilder("user")
        .select("user.role", "role")
        .addSelect("COUNT(user.userId)", "count")
        .groupBy("user.role")
        .getRawMany<{ role: string; count: string }>(),
    ]);

    return {
      totalUsers,
      byRole: roleRows.map((row) => ({
        role: row.role,
        count: Number(row.count),
      })),
    };
  }

  async categorySummary() {
    return AppDataSource.getRepository(Category)
      .createQueryBuilder("category")
      .leftJoin("category.reports", "report")
      .select("category.categoryId", "categoryId")
      .addSelect("category.categoryName", "categoryName")
      .addSelect("COUNT(report.reportId)", "count")
      .groupBy("category.categoryId")
      .getRawMany();
  }
}
