import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { NotificationService } from "../services/notification.service";
import { sendSuccess } from "../utils/responseHandler";

const service = new NotificationService();

export class NotificationController {
  findAll = async (req: AuthenticatedRequest, res: Response) => {
    const notifications =
      req.user?.role === "Admin" ? await service.findAll() : await service.findByUser(req.user!.userId);

    return sendSuccess(res, 200, "Notifications retrieved successfully", notifications);
  };
}
