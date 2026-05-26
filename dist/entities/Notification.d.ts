import { Report } from "./Report";
import { User } from "./User";
export declare class Notification {
    notificationId: number;
    userId: number | null;
    reportId: number | null;
    message: string | null;
    isRead: boolean;
    createdAt: Date;
    user: User | null;
    report: Report | null;
}
//# sourceMappingURL=Notification.d.ts.map