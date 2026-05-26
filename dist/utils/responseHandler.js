"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data: data ?? null,
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.sendError = sendError;
//# sourceMappingURL=responseHandler.js.map