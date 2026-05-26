"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const notification_repository_1 = require("../repositories/notification.repository");
class NotificationService {
    constructor() {
        this.notifications = new notification_repository_1.NotificationRepository();
    }
    findAll() {
        return this.notifications.findAll({
            relations: { user: true, report: true },
            order: { createdAt: "DESC" },
        });
    }
    findByUser(userId) {
        return this.notifications.findByUser(userId);
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map