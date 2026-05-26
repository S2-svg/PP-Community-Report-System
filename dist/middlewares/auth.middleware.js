"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseHandler_1 = require("../utils/responseHandler");
const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return (0, responseHandler_1.sendError)(res, 401, "Authentication token is required");
    }
    try {
        const token = header.slice("Bearer ".length);
        req.user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET ?? "change_me_in_env");
        return next();
    }
    catch {
        return (0, responseHandler_1.sendError)(res, 401, "Invalid or expired token");
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map