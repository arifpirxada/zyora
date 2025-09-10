"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../data-access/user.repository");
const auth_service_1 = require("../../../libraries/auth/auth.service");
const BaseError_1 = __importDefault(require("../../../libraries/errors/BaseError"));
const types_1 = require("../../../types");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    constructor() {
        this.userRepo = new user_repository_1.UserRepository();
        this.authService = new auth_service_1.AuthService();
    }
    async getUser(userId) {
        if (!userId) {
            throw new BaseError_1.default('get user', types_1.HttpStatusCode.BAD_REQUEST, 'Could not get user Id');
        }
        const user = await this.userRepo.findUserById(userId);
        if (!user) {
            throw new BaseError_1.default('get user', types_1.HttpStatusCode.NOT_FOUND, 'User not found');
        }
        return user;
    }
    async createUser(userData) {
        const savedUser = await this.userRepo.insertUser(userData);
        const token = this.authService.generateToken(savedUser._id.toString());
        return {
            ...savedUser.toObject(),
            token,
        };
    }
    async loginUser(input) {
        const user = await this.userRepo.findUserByEmail(input.email);
        if (!user) {
            throw new BaseError_1.default('login', types_1.HttpStatusCode.UNAUTHORIZED, 'Invalid credentials');
        }
        const isPassMatch = await bcryptjs_1.default.compare(input.password, user.password);
        if (!isPassMatch) {
            throw new BaseError_1.default('login', types_1.HttpStatusCode.UNAUTHORIZED, 'Invalid credentials');
        }
        // Generate token
        const token = this.authService.generateToken(user._id.toString());
        return {
            ...user.toObject(),
            token,
        };
    }
}
exports.UserService = UserService;
