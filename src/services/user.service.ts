import { AppError } from "../middlewares/error.middleware";
import { User } from "../entities/User";
import {
  UpdateProfileInput,
  UpdateRoleInput,
} from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

const publicUser = (user: User) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export class UserService {
  private readonly users = new UserRepository();

  async getProfile(userId: number) {
    return publicUser(await this.findUser(userId));
  }

  async updateProfile(userId: number, input: UpdateProfileInput) {
    const user = await this.users.update({ userId }, input);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    return publicUser(user);
  }

  async getAllUsers() {
    const users = await this.users.findAll({ order: { createdAt: "DESC" } });
    return users.map(publicUser);
  }

  async updateRole(userId: number, input: UpdateRoleInput) {
    if (!["Citizen", "Admin"].includes(input.role)) {
      throw new AppError(400, "Role must be Citizen or Admin");
    }

    const user = await this.users.update({ userId }, { role: input.role });
    if (!user) {
      throw new AppError(404, "User not found");
    }

    return publicUser(user);
  }

  async deleteUser(userId: number) {
    const user = await this.users.delete({ userId });
    if (!user) {
      throw new AppError(404, "User not found");
    }

    return publicUser(user);
  }

  private async findUser(userId: number) {
    const user = await this.users.findById({ userId });
    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  }
}
