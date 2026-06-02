import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { sendSuccess } from "../utils/responseHandler";

const service = new DashboardService();

export class DashboardController {
  reportSummary = async (_req: Request, res: Response) => {
    const summary = await service.reportSummary();
    return sendSuccess(res, 200, "Report summary retrieved successfully", summary);
  };

  userSummary = async (_req: Request, res: Response) => {
    const summary = await service.userSummary();
    return sendSuccess(res, 200, "User summary retrieved successfully", summary);
  };

  categorySummary = async (_req: Request, res: Response) => {
    const summary = await service.categorySummary();
    return sendSuccess(res, 200, "Category summary retrieved successfully", summary);
  };
}
