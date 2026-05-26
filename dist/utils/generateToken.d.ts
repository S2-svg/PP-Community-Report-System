import { UserRole } from "../entities/User";
export type JwtPayload = {
    userId: number;
    email: string | null;
    role: UserRole;
};
export declare const generateToken: (payload: JwtPayload) => string;
//# sourceMappingURL=generateToken.d.ts.map