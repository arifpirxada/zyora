"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    const URI = process.env.MONGO_URI;
    if (!URI)
        throw new Error("Database URI not defined");
    try {
        await mongoose_1.default.connect(URI);
        console.info("Database connected");
    }
    catch (error) {
        console.error("Database not connected:", error);
        throw error;
    }
};
exports.default = connectDatabase;
