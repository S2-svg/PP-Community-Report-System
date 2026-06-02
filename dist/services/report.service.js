"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const data_source_1 = require("../config/data-source");
const Notification_1 = require("../entities/Notification");
const Report_1 = require("../entities/Report");
const ReportImage_1 = require("../entities/ReportImage");
const ReportStatusHistory_1 = require("../entities/ReportStatusHistory");
const Status_1 = require("../entities/Status");
const error_middleware_1 = require("../middlewares/error.middleware");
const report_status_history_repository_1 = require("../repositories/report-status-history.repository");
const report_repository_1 = require("../repositories/report.repository");
class ReportService {
    constructor() {
        this.reports = new report_repository_1.ReportRepository();
        this.statusHistory = new report_status_history_repository_1.ReportStatusHistoryRepository();
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
        const updatedReportId = await data_source_1.AppDataSource.transaction(async (manager) => {
            const report = await manager.findOne(Report_1.Report, {
                where: { reportId },
                relations: { status: true },
            });
            if (!report) {
                throw new error_middleware_1.AppError(404, "Report not found");
            }
            const newStatus = await manager.findOne(Status_1.Status, {
                where: { statusId: input.statusId },
            });
            if (!newStatus) {
                throw new error_middleware_1.AppError(400, "Status not found");
            }
            const note = input.note?.trim() || null;
            await manager.update(Report_1.Report, { reportId }, { statusId: input.statusId });
            await manager.save(manager.create(ReportStatusHistory_1.ReportStatusHistory, {
                reportId,
                previousStatusId: report.statusId,
                newStatusId: input.statusId,
                changedByUserId: input.changedByUserId,
                note,
            }));
            if (report.userId) {
                const statusName = newStatus.statusName ?? `status #${newStatus.statusId}`;
                const title = report.title ? `"${report.title}"` : `#${report.reportId}`;
                await manager.save(manager.create(Notification_1.Notification, {
                    userId: report.userId,
                    reportId,
                    message: `Your report ${title} status changed to ${statusName}.`,
                }));
            }
            return reportId;
        });
        return this.findById(updatedReportId);
    }
    async findStatusHistory(reportId) {
        await this.findById(reportId);
        return this.statusHistory.findByReport(reportId);
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