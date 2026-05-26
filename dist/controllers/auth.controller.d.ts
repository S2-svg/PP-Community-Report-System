import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
export declare class AuthController {
    register: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    profile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    changePassword: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    users: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateRole: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteUser: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=auth.controller.d.ts.map