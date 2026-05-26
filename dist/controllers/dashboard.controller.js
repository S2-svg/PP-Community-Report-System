"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const responseHandler_1 = require("../utils/responseHandler");
const service = new dashboard_service_1.DashboardService();
class DashboardController {
    constructor() {
        this.reportSummary = async (_req, res) => {
            const summary = await service.reportSummary();
            return (0, responseHandler_1.sendSuccess)(res, 200, "Report summary retrieved successfully", summary);
        };
        this.categorySummary = async (_req, res) => {
            const summary = await service.categorySummary();
            return (0, responseHandler_1.sendSuccess)(res, 200, "Category summary retrieved successfully", summary);
        };
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map