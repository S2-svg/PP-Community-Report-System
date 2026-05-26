"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const error_middleware_1 = require("../middlewares/error.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const controller = new dashboard_controller_1.DashboardController();
router.get("/report-summary", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("Admin"), (0, error_middleware_1.asyncHandler)(controller.reportSummary));
router.get("/category-summary", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("Admin"), (0, error_middleware_1.asyncHandler)(controller.categorySummary));
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map