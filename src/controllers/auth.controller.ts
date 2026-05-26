import { Response } from "express";
import { AuthService } from "../services/auth.service";
import { sendSuccess } from "../utils/responseHandler";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

const service = new AuthService();

export class AuthController {
  register = async (req: AuthenticatedRequest, res: Response) => {
    const user = await service.register(req.body);
    return sendSuccess(res, 201, "User registered successfully", user);
  };

  login = async (req: AuthenticatedRequest, res: Response) => {
    const data = await service.login(req.body);
    return sendSuccess(res, 200, "Login successful", data);
  };

  profile = async (req: AuthenticatedRequest, res: Response) => {
    const user = await service.getProfile(req.user!.userId);
    return sendSuccess(res, 200, "Profile retrieved successfully", user);
  };

  updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    const user = await service.updateProfile(req.user!.userId, req.body);
    return sendSuccess(res, 200, "Profile updated successfully", user);
  };

  changePassword = async (req: AuthenticatedRequest, res: Response) => {
    const result = await service.changePassword(req.user!.userId, req.body);
    return sendSuccess(res, 200, "Password changed successfully", result);
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
