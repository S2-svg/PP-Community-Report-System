"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const Notification_1 = require("../entities/Notification");
const base_repository_1 = require("./abstract/base.repository");
class NotificationRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(Notification_1.Notification);
    }
    findByUser(userId) {
        return this.repository().find({
            where: { userId },
            relations: { report: true },
            order: { createdAt: "DESC" },
        });
    }
}
exports.NotificationRepository = NotificationRepository;
//# sourceMappingURL=notification.repository.js.map