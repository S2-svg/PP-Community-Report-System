import { Notification } from "../entities/Notification";
import { BaseRepository } from "./abstract/base.repository";

export class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super(Notification);
  }

  findByUser(userId: number) {
    return this.repository().find({
      where: { userId },
      relations: { report: true },
      order: { createdAt: "DESC" },
    });
  }
}
