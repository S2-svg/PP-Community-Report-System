import bcrypt from "bcryptjs";
import { AppError } from "../middlewares/error.middleware";
import { User } from "../entities/User";
import {
  ChangePasswordInput,
  LoginInput,
} from "../interfaces/auth.interface";
import { UserRepository } from "../repositories/user.repository";
import { TempUserRepository } from "../repositories/temp-user.repository";
import { generateToken } from "../utils/generateToken";
import { normalizeEmail } from "../utils/validators";

const publicUser = (user: User) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export class AuthService {
  private readonly users = new UserRepository();
  private readonly tempUsers = new TempUserRepository();

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

  /**
   * Create account from verified temporary user record
   * Moves user from temp_users to users table
   */
  async createAccountFromTempUser(tempUserId: number): Promise<User> {
    // Get temp user record
    const tempUser = await this.tempUsers.findById(tempUserId);
    if (!tempUser) {
      throw new AppError(404, "Registration session not found");
    }

    // Check if email already exists in users table
    const existingUser = await this.users.findByEmail(tempUser.email);
    if (existingUser) {
      // Clean up temp user record
      await this.tempUsers.delete(tempUserId);
      throw new AppError(409, "Email is already registered");
    }

    // Check if username exists (if provided)
    if (tempUser.username && tempUser.username.trim()) {
      const existingUsername = await this.users.findByUsername(tempUser.username);
      if (existingUsername) {
        throw new AppError(409, "Username is already taken");
      }
    }

    // Create user in users table
    const user = await this.users.create({
      fullName: tempUser.fullName,
      username: tempUser.username && tempUser.username.trim() ? tempUser.username : null,
      email: normalizeEmail(tempUser.email),
      password: tempUser.password,
      phoneNumber: null,
      role: "Citizen",
    });

    // Delete temp user record after successful creation
    await this.tempUsers.delete(tempUserId);

    return user;
  }
}
