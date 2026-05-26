import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "../utils/generateToken";
export type AuthenticatedRequest = Request & {
    user?: JwtPayload;
};
export declare const authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map