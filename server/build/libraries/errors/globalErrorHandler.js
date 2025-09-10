"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGlobalError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
const handleGlobalError = (error) => {
    console.error('Global Error:', error);
    if (error instanceof BaseError_1.default && !error.isOperational) {
        process.exit(1);
    }
};
exports.handleGlobalError = handleGlobalError;
