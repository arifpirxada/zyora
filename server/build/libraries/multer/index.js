"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "_" + Date.now() + ext);
    },
});
exports.default = storage;
