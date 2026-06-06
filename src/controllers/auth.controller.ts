import { Response } from "express";
import { AuthService } from "../services/auth.service";
import { sendSuccess } from "../utils/responseHandler";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { AppError } from "../middlewares/error.middleware";
import bcrypt from "bcryptjs";
import { normalizeEmail } from "../utils/validators";

const authService = new AuthService();

export class AuthController {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  register = async (req: AuthenticatedRequest, res: Response) => {
    const { fullName, email, password, username, phoneNumber } = req.body;

    // Register user directly (no email verification)
    const result = await authService.register({
      fullName,
      email,
      password,
      username,
      phoneNumber,
    });

    return sendSuccess(res, 201, "Account created successfully", {
      user: {
        userId: result.user.userId,
        fullName: result.user.fullName,
        email: result.user.email,
        username: result.user.username,
        role: result.user.role,
      },
      token: result.token,
    });
  };

  login = async (req: AuthenticatedRequest, res: Response) => {
    const data = await authService.login(req.body);
    return sendSuccess(res, 200, "Login successful", data);
  };

  changePassword = async (req: AuthenticatedRequest, res: Response) => {
    const result = await authService.changePassword(req.user!.userId, req.body);
    return sendSuccess(res, 200, "Password changed successfully", result);
  };

  logout = async (req: AuthenticatedRequest, res: Response) => {
    const result = await authService.logout(req.user!.userId);
    return sendSuccess(res, 200, "Logout successful", result);
  };
}

