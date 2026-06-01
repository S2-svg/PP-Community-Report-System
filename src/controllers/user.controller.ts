import { Response } from "express";
import { UserService } from "../services/user.service";
import { sendSuccess } from "../utils/responseHandler";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

const service = new UserService();

export class UserController {

  profile = async (req: AuthenticatedRequest, res: Response) => {
    const user = await service.getProfile(req.user!.userId);
    return sendSuccess(res, 200, "Profile retrieved successfully", user);
  };

  updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    const user = await service.updateProfile(req.user!.userId, req.body);
    return sendSuccess(res, 200, "Profile updated successfully", user);
  };

  users = async (_req: AuthenticatedRequest, res: Response) => {
    const users = await service.getAllUsers();
    return sendSuccess(res, 200, "Users retrieved successfully", users);
  };

  updateRole = async (req: AuthenticatedRequest, res: Response) => {
    const user = await service.updateRole(Number(req.params.id), req.body);
    return sendSuccess(res, 200, "User role updated successfully", user);
  };

  deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    const user = await service.deleteUser(Number(req.params.id));
    return sendSuccess(res, 200, "User deleted successfully", user);
  };
}
