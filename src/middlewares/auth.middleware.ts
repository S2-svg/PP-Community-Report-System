import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../utils/generateToken";
import { sendError } from "../utils/responseHandler";

export type AuthenticatedRequest = Request & {
  user?: JwtPayload;
};

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return sendError(res, 401, "Authentication token is required");
  }

  try {
    const token = header.slice("Bearer ".length);
    req.user = jwt.verify(token, process.env.JWT_SECRET ?? "change_me_in_env") as JwtPayload;
    return next();
  } catch {
    return sendError(res, 401, "Invalid or expired token");
  }
};
