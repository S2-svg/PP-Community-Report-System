"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    const options = {
        expiresIn: (process.env.JWT_EXPIRES_IN ?? "1d"),
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET ?? "change_me_in_env", {
        ...options,
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map