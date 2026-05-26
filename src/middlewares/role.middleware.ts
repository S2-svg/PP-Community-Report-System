import { NextFunction, Response } from "express";
import { UserRole } from "../entities/User";
import { AuthenticatedRequest } from "./auth.middleware";
import { sendError } from "../utils/responseHandler";

export const authorize =
  (...roles: UserRole[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication is required");
    }

    if (!roles.includes(req.user.role)) {
      return sendError(res, 403, "You do not have permission to perform this action");
    }

    return next();
  };
