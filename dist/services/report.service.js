"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const data_source_1 = require("../config/data-source");
const Report_1 = require("../entities/Report");
const ReportImage_1 = require("../entities/ReportImage");
const error_middleware_1 = require("../middlewares/error.middleware");
const report_repository_1 = require("../repositories/report.repository");
class ReportService {
    constructor() {
        this.reports = new report_repository_1.ReportRepository();
    }
    findAll() {
        return this.reports.findAllWithRelations();
    }
    async findById(reportId) {
        const report = await this.reports.findOneWithRelations(reportId);
        if (!report) {
            throw new error_middleware_1.AppError(404, "Report not found");
        }
        return report;
    }
    async create(input) {
        if (!input.userId || !input.categoryId || !input.title || !input.description || !input.location) {
            throw new error_middleware_1.AppError(400, "User, category, title, description, and location are required");
        }
        const reportId = await data_source_1.AppDataSource.transaction(async (manager) => {
            const report = await manager.save(manager.create(Report_1.Report, {
                userId: input.userId,
                categoryId: input.categoryId,
                statusId: 1,
                title: input.title,
                description: input.description,
                location: input.location,
            }));
            const reportEntity = report;
            const imageUrls = input.imageUrls ?? [];
            if (imageUrls.length > 0) {
                await manager.save(imageUrls.map((imageUrl) => manager.create(ReportImage_1.ReportImage, {
                    reportId: reportEntity.reportId,
                    imageUrl,
                })));
            }
            return reportEntity.reportId;
        });
        return this.findById(reportId);
    }
    async update(reportId, input) {
        await this.findById(reportId);
        await this.reports.update({ reportId }, input);
        return this.findById(reportId);
    }
    async updateStatus(reportId, input) {
        if (!input.statusId) {
            throw new error_middleware_1.AppError(400, "Status ID is required");
        }
        await this.findById(reportId);
        await this.reports.update({ reportId }, { statusId: input.statusId });
        return this.findById(reportId);
    }
    async delete(reportId) {
        const deleted = await this.reports.delete({ reportId });
        if (!deleted) {
            throw new error_middleware_1.AppError(404, "Report not found");
        }
        return deleted;
    }
    findByUser(userId) {
        return this.reports.findByUser(userId);
    }
    findByCategory(categoryId) {
        return this.reports.findByCategory(categoryId);
    }
    findByStatus(status) {
        const statusId = Number(status);
        if (Number.isInteger(statusId)) {
            return this.reports.findByStatus(statusId);
        }
        return this.reports.findByStatusName(status);
    }
    search(query) {
        if (!query.trim()) {
            throw new error_middleware_1.AppError(400, "Search query is required");
        }
        return this.reports.search(query);
    }
}
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map