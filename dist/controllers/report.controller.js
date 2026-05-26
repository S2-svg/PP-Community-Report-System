"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const report_service_1 = require("../services/report.service");
const responseHandler_1 = require("../utils/responseHandler");
const service = new report_service_1.ReportService();
const uploadedUrls = (files) => {
    return (files ?? []).map((file) => `/uploads/${file.filename}`);
};
class ReportController {
    constructor() {
        this.create = async (req, res) => {
            const report = await service.create({
                ...req.body,
                userId: req.user.userId,
                categoryId: Number(req.body.categoryId),
                imageUrls: uploadedUrls(req.files),
            });
            return (0, responseHandler_1.sendSuccess)(res, 201, "Report created successfully", report);
        };
        this.findAll = async (_req, res) => {
            const reports = await service.findAll();
            return (0, responseHandler_1.sendSuccess)(res, 200, "Reports retrieved successfully", reports);
        };
        this.findById = async (req, res) => {
            const report = await service.findById(Number(req.params.id));
            return (0, responseHandler_1.sendSuccess)(res, 200, "Report retrieved successfully", report);
        };
        this.update = async (req, res) => {
            const report = await service.update(Number(req.params.id), {
                ...req.body,
                categoryId: req.body.categoryId ? Number(req.body.categoryId) : undefined,
            });
            return (0, responseHandler_1.sendSuccess)(res, 200, "Report updated successfully", report);
        };
        this.updateStatus = async (req, res) => {
            const report = await service.updateStatus(Number(req.params.id), {
                statusId: Number(req.body.statusId),
            });
            return (0, responseHandler_1.sendSuccess)(res, 200, "Report status updated successfully", report);
        };
        this.delete = async (req, res) => {
            const report = await service.delete(Number(req.params.id));
            return (0, responseHandler_1.sendSuccess)(res, 200, "Report deleted successfully", report);
        };
        this.findByUser = async (req, res) => {
            const reports = await service.findByUser(Number(req.params.userId));
            return (0, responseHandler_1.sendSuccess)(res, 200, "User reports retrieved successfully", reports);
        };
        this.findByCategory = async (req, res) => {
            const reports = await service.findByCategory(Number(req.params.categoryId));
            return (0, responseHandler_1.sendSuccess)(res, 200, "Category reports retrieved successfully", reports);
        };
        this.findByStatus = async (req, res) => {
            const reports = await service.findByStatus(String(req.params.status));
            return (0, responseHandler_1.sendSuccess)(res, 200, "Status reports retrieved successfully", reports);
        };
        this.search = async (req, res) => {
            const reports = await service.search(String(req.query.q ?? ""));
            return (0, responseHandler_1.sendSuccess)(res, 200, "Search results retrieved successfully", reports);
        };
    }
}
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map