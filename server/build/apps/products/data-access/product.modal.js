"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { _id: false });
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: false,
        default: [],
    },
    likes: {
        type: [
            {
                user: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "User",
                },
                _id: false,
            },
        ],
        default: [],
    },
    comments: {
        type: [commentSchema],
        default: [],
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
const productModal = mongoose_1.default.model("Product", productSchema);
exports.default = productModal;
