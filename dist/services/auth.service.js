"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_middleware_1 = require("../middlewares/error.middleware");
const user_repository_1 = require("../repositories/user.repository");
const generateToken_1 = require("../utils/generateToken");
const publicUser = (user) => {
    const { password, ...safeUser } = user;
    return safeUser;
};
class AuthService {
    constructor() {
        this.users = new user_repository_1.UserRepository();
    }
    async register(input) {
        if (!input.fullName || !input.email || !input.password) {
            throw new error_middleware_1.AppError(400, "Full name, email, and password are required");
        }
        const existingEmail = await this.users.findByEmail(input.email);
        if (existingEmail) {
            throw new error_middleware_1.AppError(409, "Email is already registered");
        }
        if (input.username) {
            const existingUsername = await this.users.findByUsername(input.username);
            if (existingUsername) {
                throw new error_middleware_1.AppError(409, "Username is already taken");
            }
        }
        const user = await this.users.create({
            fullName: input.fullName,
            username: input.username ?? null,
            email: input.email,
            password: await bcryptjs_1.default.hash(input.password, 10),
            phoneNumber: input.phoneNumber ?? null,
            role: "Citizen",
        });
        return publicUser(user);
    }
    async login(input) {
        if (!input.email || !input.password) {
            throw new error_middleware_1.AppError(400, "Email and password are required");
        }
        const user = await this.users.findByEmail(input.email);
        if (!user?.password) {
            throw new error_middleware_1.AppError(401, "Invalid email or password");
        }
        const isValid = await bcryptjs_1.default.compare(input.password, user.password);
        if (!isValid) {
            throw new error_middleware_1.AppError(401, "Invalid email or password");
        }
        const token = (0, generateToken_1.generateToken)({
            userId: user.userId,
            email: user.email,
            role: user.role,
        });
        return { token, user: publicUser(user) };
    }
    async getProfile(userId) {
        return publicUser(await this.findUser(userId));
    }
    async updateProfile(userId, input) {
        const user = await this.users.update({ userId }, input);
        if (!user) {
            throw new error_middleware_1.AppError(404, "User not found");
        }
        return publicUser(user);
    }
    async changePassword(userId, input) {
        if (!input.currentPassword || !input.newPassword) {
            throw new error_middleware_1.AppError(400, "Current password and new password are required");
        }
        const user = await this.findUser(userId);
        if (!user.password || !(await bcryptjs_1.default.compare(input.currentPassword, user.password))) {
            throw new error_middleware_1.AppError(401, "Current password is incorrect");
        }
        await this.users.update({ userId }, { password: await bcryptjs_1.default.hash(input.newPassword, 10) });
        return { changed: true };
    }
    async getAllUsers() {
        const users = await this.users.findAll({ order: { createdAt: "DESC" } });
        return users.map(publicUser);
    }
    async updateRole(userId, input) {
        if (!["Citizen", "Admin"].includes(input.role)) {
            throw new error_middleware_1.AppError(400, "Role must be Citizen or Admin");
        }
        const user = await this.users.update({ userId }, { role: input.role });
        if (!user) {
            throw new error_middleware_1.AppError(404, "User not found");
        }
        return publicUser(user);
    }
    async deleteUser(userId) {
        const user = await this.users.delete({ userId });
        if (!user) {
            throw new error_middleware_1.AppError(404, "User not found");
        }
        return publicUser(user);
    }
    async findUser(userId) {
        const user = await this.users.findById({ userId });
        if (!user) {
            throw new error_middleware_1.AppError(404, "User not found");
        }
        return user;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map