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

  changePassword = async (req: AuthenticatedRequest, res: Response) => {
    const result = await service.changePassword(req.user!.userId, req.body);
    return sendSuccess(res, 200, "Password changed successfully", result);
  };
}
