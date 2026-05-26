"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const error_middleware_1 = require("../middlewares/error.middleware");
const router = (0, express_1.Router)();
const controller = new notification_controller_1.NotificationController();
router.get("/", auth_middleware_1.authenticate, (0, error_middleware_1.asyncHandler)(controller.findAll));
exports.default = router;
//# sourceMappingURL=notification.routes.js.map