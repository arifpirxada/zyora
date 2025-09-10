"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../libraries/auth/auth.service");
const types_1 = require("../types");
const BaseError_1 = __importDefault(require("../libraries/errors/BaseError"));
const authService = new auth_service_1.AuthService();
const auth = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        throw new BaseError_1.default('auth', types_1.HttpStatusCode.UNAUTHORIZED, 'No access token provided');
    }
    const decoded = authService.verifyToken(token);
    if (!decoded || !decoded.id) {
        throw new BaseError_1.default('auth', types_1.HttpStatusCode.UNAUTHORIZED, 'Invalid access token');
    }
    req.userId = decoded.id;
    next();
};
exports.default = auth;
