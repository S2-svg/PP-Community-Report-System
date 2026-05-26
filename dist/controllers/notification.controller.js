"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_service_1 = require("../services/notification.service");
const responseHandler_1 = require("../utils/responseHandler");
const service = new notification_service_1.NotificationService();
class NotificationController {
    constructor() {
        this.findAll = async (req, res) => {
            const notifications = req.user?.role === "Admin" ? await service.findAll() : await service.findByUser(req.user.userId);
            return (0, responseHandler_1.sendSuccess)(res, 200, "Notifications retrieved successfully", notifications);
        };
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map