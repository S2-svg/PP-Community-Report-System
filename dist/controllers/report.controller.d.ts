import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
export declare class ReportController {
    create: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findAll: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findById: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateStatus: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findByUser: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findByCategory: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    findByStatus: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    search: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=report.controller.d.ts.map