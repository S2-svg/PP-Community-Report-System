"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const responseHandler_1 = require("../utils/responseHandler");
const authorize = (...roles) => (req, res, next) => {
    if (!req.user) {
        return (0, responseHandler_1.sendError)(res, 401, "Authentication is required");
    }
    if (!roles.includes(req.user.role)) {
        return (0, responseHandler_1.sendError)(res, 403, "You do not have permission to perform this action");
    }
    return next();
};
exports.authorize = authorize;
//# sourceMappingURL=role.middleware.js.map