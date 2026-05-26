"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const responseHandler_1 = require("../utils/responseHandler");
const service = new auth_service_1.AuthService();
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            const user = await service.register(req.body);
            return (0, responseHandler_1.sendSuccess)(res, 201, "User registered successfully", user);
        };
        this.login = async (req, res) => {
            const data = await service.login(req.body);
            return (0, responseHandler_1.sendSuccess)(res, 200, "Login successful", data);
        };
        this.profile = async (req, res) => {
            const user = await service.getProfile(req.user.userId);
            return (0, responseHandler_1.sendSuccess)(res, 200, "Profile retrieved successfully", user);
        };
        this.updateProfile = async (req, res) => {
            const user = await service.updateProfile(req.user.userId, req.body);
            return (0, responseHandler_1.sendSuccess)(res, 200, "Profile updated successfully", user);
        };
        this.changePassword = async (req, res) => {
            const result = await service.changePassword(req.user.userId, req.body);
            return (0, responseHandler_1.sendSuccess)(res, 200, "Password changed successfully", result);
        };
        this.users = async (_req, res) => {
            const users = await service.getAllUsers();
            return (0, responseHandler_1.sendSuccess)(res, 200, "Users retrieved successfully", users);
        };
        this.updateRole = async (req, res) => {
            const user = await service.updateRole(Number(req.params.id), req.body);
            return (0, responseHandler_1.sendSuccess)(res, 200, "User role updated successfully", user);
        };
        this.deleteUser = async (req, res) => {
            const user = await service.deleteUser(Number(req.params.id));
            return (0, responseHandler_1.sendSuccess)(res, 200, "User deleted successfully", user);
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map