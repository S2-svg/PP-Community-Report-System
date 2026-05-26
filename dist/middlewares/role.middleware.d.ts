import { NextFunction, Response } from "express";
import { UserRole } from "../entities/User";
import { AuthenticatedRequest } from "./auth.middleware";
export declare const authorize: (...roles: UserRole[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=role.middleware.d.ts.map