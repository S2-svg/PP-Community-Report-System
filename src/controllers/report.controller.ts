import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { UpdateReportStatusInput } from "../interfaces/report.interface";
import { ReportService } from "../services/report.service";
import { sendSuccess } from "../utils/responseHandler";

const service = new ReportService();

const uploadedUrls = (files: Express.Multer.File[] | undefined) => {
  return (files ?? []).map((file) => `/uploads/${file.filename}`);
};

export class ReportController {
  create = async (req: AuthenticatedRequest, res: Response) => {
    const report = await service.create({
      ...req.body,
      userId: req.user!.userId,
      categoryId: Number(req.body.categoryId),
      imageUrls: uploadedUrls(req.files as Express.Multer.File[] | undefined),
    });
    return sendSuccess(res, 201, "Report created successfully", report);
  };

  findAll = async (_req: AuthenticatedRequest, res: Response) => {
    const reports = await service.findAll();
    return sendSuccess(res, 200, "Reports retrieved successfully", reports);
  };

  findById = async (req: AuthenticatedRequest, res: Response) => {
    const report = await service.findById(Number(req.params.id));
    return sendSuccess(res, 200, "Report retrieved successfully", report);
  };

  update = async (req: AuthenticatedRequest, res: Response) => {
    const report = await service.update(Number(req.params.id), {
      ...req.body,
      categoryId: req.body.categoryId ? Number(req.body.categoryId) : undefined,
    });
    return sendSuccess(res, 200, "Report updated successfully", report);
  };

  updateStatus = async (req: AuthenticatedRequest, res: Response) => {
    const input: UpdateReportStatusInput = {
      statusId: Number(req.body.statusId),
      changedByUserId: req.user!.userId,
    };

    if (req.body.note !== undefined) {
      input.note = String(req.body.note);
    }

    const report = await service.updateStatus(Number(req.params.id), input);
    return sendSuccess(res, 200, "Report status updated successfully", report);
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    const report = await service.delete(Number(req.params.id));
    return sendSuccess(res, 200, "Report deleted successfully", report);
  };

  findByUser = async (req: AuthenticatedRequest, res: Response) => {
    const reports = await service.findByUser(Number(req.params.userId));
    return sendSuccess(res, 200, "User reports retrieved successfully", reports);
  };

  findByCategory = async (req: AuthenticatedRequest, res: Response) => {
    const reports = await service.findByCategory(Number(req.params.categoryId));
    return sendSuccess(res, 200, "Category reports retrieved successfully", reports);
  };

  findByStatus = async (req: AuthenticatedRequest, res: Response) => {
    const reports = await service.findByStatus(String(req.params.status));
    return sendSuccess(res, 200, "Status reports retrieved successfully", reports);
  };

  findStatusHistory = async (req: AuthenticatedRequest, res: Response) => {
    const history = await service.findStatusHistory(Number(req.params.id));
    return sendSuccess(res, 200, "Report status timeline retrieved successfully", history);
  };

  search = async (req: AuthenticatedRequest, res: Response) => {
    const reports = await service.search(String(req.query.q ?? ""));
    return sendSuccess(res, 200, "Search results retrieved successfully", reports);
  };
}
