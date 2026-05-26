"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const report_controller_1 = require("../controllers/report.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const error_middleware_1 = require("../middlewares/error.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
const reportController = new report_controller_1.ReportController();
router.use(auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("Admin"));
router.get("/users", (0, error_middleware_1.asyncHandler)(authController.users));
router.delete("/users/:id", (0, error_middleware_1.asyncHandler)(authController.deleteUser));
router.patch("/users/:id/role", (0, error_middleware_1.asyncHandler)(authController.updateRole));
router.get("/reports", (0, error_middleware_1.asyncHandler)(reportController.findAll));
exports.default = router;
//# sourceMappingURL=admin.routes.js.map