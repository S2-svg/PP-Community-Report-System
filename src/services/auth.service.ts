import bcrypt from "bcryptjs";
import { AppError } from "../middlewares/error.middleware";
import { User } from "../entities/User";
import {
  ChangePasswordInput,
  LoginInput,
} from "../interfaces/auth.interface";
import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../utils/generateToken";
import { normalizeEmail } from "../utils/validators";

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  username?: string;
  phoneNumber?: string;
}

const publicUser = (user: User) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export class AuthService {
  private readonly users = new UserRepository();

  async register(input: RegisterInput) {
    if (!input.email || !input.password || !input.fullName) {
      throw new AppError(400, "Email, password, and full name are required");
    }

    // Normalize email
    const normalizedEmail = normalizeEmail(input.email);

    // Check if email already exists
    const existingUser = await this.users.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new AppError(409, "Email is already registered");
    }

    // Check if username exists (if provided)
    if (input.username) {
      const existingUsername = await this.users.findByUsername(input.username);
      if (existingUsername) {
        throw new AppError(409, "Username is already taken");
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create user directly
    const user = await this.users.create({
      fullName: input.fullName,
      username: input.username && input.username.trim() ? input.username : null,
      email: normalizedEmail,
      password: hashedPassword,
      phoneNumber: input.phoneNumber || null,
      role: "Citizen",
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
    });

    return { token, user: publicUser(user) };
  }

  async login(input: LoginInput) {
    if (!input.email || !input.password) {
      throw new AppError(400, "Email and password are required");
    }

    const user = await this.users.findByEmail(input.email);
    if (!user?.password) {
      throw new AppError(401, "Invalid email or password");
    }

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      throw new AppError(401, "Invalid email or password");
    }

    const token = generateToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
    });

    return { token, user: publicUser(user) };
  }

  async changePassword(userId: number, input: ChangePasswordInput) {
    if (!input.currentPassword || !input.newPassword) {
      throw new AppError(400, "Current password and new password are required");
    }

    const user = await this.findUser(userId);
    if (!user.password || !(await bcrypt.compare(input.currentPassword, user.password))) {
      throw new AppError(401, "Current password is incorrect");
    }

    await this.users.update({ userId }, { password: await bcrypt.hash(input.newPassword, 10) });
    return { changed: true };
  }

  private async findUser(userId: number) {
    const user = await this.users.findById({ userId });
    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  }

  async logout(userId: number) {
    // Stateless JWT logout: client should discard token.
    return {
      success: true,
      loggedOut: true,
      userId,
      message: "Logout successful. Token should be removed from client (Postman/frontend).",
    };
  }
}
