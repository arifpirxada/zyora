"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = require("../domain/product.service");
const types_1 = require("../../../types");
const multer_1 = __importDefault(require("../../../libraries/multer"));
const multer_2 = __importDefault(require("multer"));
const upload = (0, multer_2.default)({ storage: multer_1.default }).array("photos", 8);
const productService = new product_service_1.ProductService();
const getProducts = async (req, res, next) => {
    try {
        const limit = typeof req.query.limit === "string" ? parseInt(req.query.limit) : 10;
        const skip = typeof req.query.skip === "string" ? parseInt(req.query.skip) : 0;
        const products = await productService.getProducts(limit, skip);
        res.status(types_1.HttpStatusCode.OK).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
        });
    }
    catch (err) {
        next(err);
    }
};
const createProduct = async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                if (err instanceof multer_2.default.MulterError &&
                    err.code === "LIMIT_UNEXPECTED_FILE") {
                    return res.status(400).json({
                        success: false,
                        message: "You can upload up to 8 photos only",
                    });
                }
                return next(err);
            }
            let productData = req.body;
            if (!productData.images) {
                productData.images = [];
            }
            req.files.forEach((file) => {
                productData.images.push(file.path);
            });
            const userId = req.userId;
            if (!userId || userId === undefined) {
                res.status(types_1.HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "No user found",
                });
            }
            productData.userId = userId;
            const product = await productService.createProduct(productData);
            res.status(types_1.HttpStatusCode.OK).json({
                success: true,
                message: "Product created successfully",
                product,
            });
        });
    }
    catch (err) {
        next(err);
    }
};
const likeProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const userId = req.userId;
        if (!userId || userId === undefined) {
            res.status(types_1.HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "No user found",
            });
        }
        const like = await productService.likeProduct(productId, userId);
        const message = like === 1 ? "Liked Product" : "Disliked Product";
        res.status(types_1.HttpStatusCode.OK).json({
            success: true,
            message,
        });
    }
    catch (err) {
        next(err);
    }
};
const addComment = async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId || userId === undefined) {
            res.status(types_1.HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "No user found",
            });
        }
        const comment = req.body.comment;
        const productId = req.params.id;
        if (!comment || !productId) {
            res.status(types_1.HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid post data",
            });
            return;
        }
        const isCommentAdded = await productService.addComment(comment, userId, productId);
        if (isCommentAdded !== 1) {
            res.status(types_1.HttpStatusCode.INTERNAL_SERVER).json({
                success: false,
                message: "Could not add comment",
            });
        }
        res.status(types_1.HttpStatusCode.OK).json({
            success: true,
            message: "Added comment to product",
        });
    }
    catch (err) {
        next(err);
    }
};
const getMyProducts = async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId || userId === undefined) {
            res.status(types_1.HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "No user found",
            });
        }
        const products = await productService.getMyProducts(userId);
        res.status(types_1.HttpStatusCode.OK).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
        });
    }
    catch (err) {
        next(err);
    }
};
const getSingleProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productService.getSingleProduct(productId);
        res.status(types_1.HttpStatusCode.OK).json({
            success: true,
            message: "Product fetched successfully",
            product,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.default = {
    createProduct,
    getProducts,
    likeProduct,
    addComment,
    getMyProducts,
    getSingleProduct,
};
