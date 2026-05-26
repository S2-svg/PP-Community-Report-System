import { Category } from "./Category";
import { Notification } from "./Notification";
import { ReportImage } from "./ReportImage";
import { Status } from "./Status";
import { User } from "./User";
export declare class Report {
    reportId: number;
    userId: number | null;
    categoryId: number | null;
    statusId: number | null;
    title: string | null;
    description: string | null;
    location: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: User | null;
    category: Category | null;
    status: Status | null;
    images: ReportImage[];
    notifications: Notification[];
}
//# sourceMappingURL=Report.d.ts.map