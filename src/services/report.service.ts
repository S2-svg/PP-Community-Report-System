import { AppDataSource } from "../config/data-source";
import { Report } from "../entities/Report";
import { ReportImage } from "../entities/ReportImage";
import { AppError } from "../middlewares/error.middleware";
import { CreateReportInput, UpdateReportInput, UpdateReportStatusInput } from "../interfaces/report.interface";
import { ReportRepository } from "../repositories/report.repository";

export class ReportService {
  private readonly reports = new ReportRepository();

  findAll() {
    return this.reports.findAllWithRelations();
  }

  async findById(reportId: number) {
    const report = await this.reports.findOneWithRelations(reportId);
    if (!report) {
      throw new AppError(404, "Report not found");
    }

    return report;
  }

  async create(input: CreateReportInput) {
    if (!input.userId || !input.categoryId || !input.title || !input.description || !input.location) {
      throw new AppError(400, "User, category, title, description, and location are required");
    }

    const reportId = await AppDataSource.transaction(async (manager) => {
      const report = await manager.save(
        manager.create(Report, {
          userId: input.userId,
          categoryId: input.categoryId,
          statusId: 1,
          title: input.title,
          description: input.description,
          location: input.location,
        }),
      );

      const reportEntity = report as { reportId: number };
      const imageUrls = input.imageUrls ?? [];

      if (imageUrls.length > 0) {
        await manager.save(
          imageUrls.map((imageUrl) =>
            manager.create(ReportImage, {
              reportId: reportEntity.reportId,
              imageUrl,
            }),
          ),
        );
      }

      return reportEntity.reportId;
    });

    return this.findById(reportId);
  }

  async update(reportId: number, input: UpdateReportInput) {
    await this.findById(reportId);
    await this.reports.update({ reportId }, input);
    return this.findById(reportId);
  }

  async updateStatus(reportId: number, input: UpdateReportStatusInput) {
    if (!input.statusId) {
      throw new AppError(400, "Status ID is required");
    }

    await this.findById(reportId);
    await this.reports.update({ reportId }, { statusId: input.statusId });
    return this.findById(reportId);
  }

  async delete(reportId: number) {
    const deleted = await this.reports.delete({ reportId });
    if (!deleted) {
      throw new AppError(404, "Report not found");
    }

    return deleted;
  }

  findByUser(userId: number) {
    return this.reports.findByUser(userId);
  }

  findByCategory(categoryId: number) {
    return this.reports.findByCategory(categoryId);
  }

  findByStatus(status: string) {
    const statusId = Number(status);

    if (Number.isInteger(statusId)) {
      return this.reports.findByStatus(statusId);
    }

    return this.reports.findByStatusName(status);
  }

  search(query: string) {
    if (!query.trim()) {
      throw new AppError(400, "Search query is required");
    }

    return this.reports.search(query);
  }
}
