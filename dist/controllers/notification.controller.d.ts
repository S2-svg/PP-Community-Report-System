import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
export declare class NotificationController {
    findAll: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=notification.controller.d.ts.map