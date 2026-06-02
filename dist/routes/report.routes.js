"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../controllers/report.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const error_middleware_1 = require("../middlewares/error.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
const controller = new report_controller_1.ReportController();
// Search and Filter
router.get("/search", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.search));
router.get("/users/:userId", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.findByUser));
router.get("/categories/:categoryId", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.findByCategory));
router.get("/statuses/:status", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.findByStatus));
router.get("/:id/timeline", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.findStatusHistory));
router.get("/:id", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.findById));
// CRUD
router.get("/", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.findAll));
router.post("/", auth_middleware_1.authenticate, upload_middleware_1.upload.array("images", 5), (0, error_middleware_1.asyncHandler)(controller.create));
router.put("/:id", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.update));
router.patch("/:id/status", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("Admin"), (0, error_middleware_1.asyncHandler)(controller.updateStatus));
router.delete("/:id", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.delete));
exports.default = router;
//# sourceMappingURL=report.routes.js.map