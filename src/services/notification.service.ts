import { NotificationRepository } from "../repositories/notification.repository";

export class NotificationService {
  private readonly notifications = new NotificationRepository();

  findAll() {
    return this.notifications.findAll({
      relations: { user: true, report: true },
      order: { createdAt: "DESC" },
    });
  }

  findByUser(userId: number) {
    return this.notifications.findByUser(userId);
  }
}
