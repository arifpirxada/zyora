"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const MONGO_URI = process.env.MONGO_URI;
if (!JWT_SECRET)
    throw new Error('JWT_SECRET_KEY is not defined in environment variables');
const config = {
    port: process.env.PORT || 3000,
    mongoUri: MONGO_URI,
    jwtSecret: JWT_SECRET
};
exports.default = config;
