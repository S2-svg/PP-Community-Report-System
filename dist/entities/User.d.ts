import { Notification } from "./Notification";
import { Report } from "./Report";
export type UserRole = "Citizen" | "Admin";
export declare class User {
    userId: number;
    fullName: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    phoneNumber: string | null;
    profileImage: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    address: string | null;
    bio: string | null;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    reports: Report[];
    notifications: Notification[];
}
//# sourceMappingURL=User.d.ts.map