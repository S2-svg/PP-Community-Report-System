"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.asyncHandler = exports.AppError = void 0;
const responseHandler_1 = require("../utils/responseHandler");
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const asyncHandler = (handler) => (req, res, next) => {
    handler(req, res, next).catch(next);
};
exports.asyncHandler = asyncHandler;
const errorMiddleware = (error, _req, res, _next) => {
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    const message = statusCode === 500 ? "Internal server error" : error.message;
    if (statusCode === 500) {
        console.error(error);
    }
    return (0, responseHandler_1.sendError)(res, statusCode, message);
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map