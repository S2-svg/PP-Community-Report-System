import jwt, { SignOptions } from "jsonwebtoken";
import { UserRole } from "../entities/User";

export type JwtPayload = {
  userId: number;
  email: string | null;
  role: UserRole;
};

export const generateToken = (payload: JwtPayload) => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "1d") as NonNullable<SignOptions["expiresIn"]>,
  };

  return jwt.sign(payload, process.env.JWT_SECRET ?? "change_me_in_env", {
    ...options,
  });
};
