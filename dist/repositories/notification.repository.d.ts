import { Notification } from "../entities/Notification";
import { BaseRepository } from "./abstract/base.repository";
export declare class NotificationRepository extends BaseRepository<Notification> {
    constructor();
    findByUser(userId: number): Promise<Notification[]>;
}
//# sourceMappingURL=notification.repository.d.ts.map