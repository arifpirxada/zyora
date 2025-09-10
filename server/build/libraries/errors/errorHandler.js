"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
const types_1 = require("../../types");
const handleError = (err, req, res, _next) => {
    console.log(err);
    // Catch Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.status(types_1.HttpStatusCode.BAD_REQUEST).json({
            success: false,
            message: 'Invalid ID format',
        });
        return;
    }
    const isOperational = err instanceof BaseError_1.default && err.isOperational;
    const statusCode = err instanceof BaseError_1.default ? err.statusCode : types_1.HttpStatusCode.INTERNAL_SERVER;
    const message = isOperational
        ? err.message
        : 'Something went wrong. Please try again later.';
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', err);
    }
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.handleError = handleError;
