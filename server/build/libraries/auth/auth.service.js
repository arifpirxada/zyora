"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const types_1 = require("../../types");
const BaseError_1 = __importDefault(require("../../libraries/errors/BaseError"));
class AuthService {
    generateToken(userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, config_1.default.jwtSecret, { expiresIn: '7d' });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        }
        catch {
            throw new BaseError_1.default('auth', types_1.HttpStatusCode.UNAUTHORIZED, 'Invalid access token');
        }
    }
}
exports.AuthService = AuthService;
