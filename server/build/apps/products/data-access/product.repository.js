"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = exports.toObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BaseError_1 = __importDefault(require("../../../libraries/errors/BaseError"));
const product_modal_1 = __importDefault(require("./product.modal"));
const types_1 = require("../../../types");
const toObjectId = (id) => {
    if (id instanceof mongoose_1.default.Types.ObjectId) {
        return id;
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId");
    }
    return new mongoose_1.default.Types.ObjectId(id);
};
exports.toObjectId = toObjectId;
class ProductRepository {
    async getProducts(limit, skip) {
        try {
            if (limit < 0 || skip < 0)
                throw new BaseError_1.default("Get Product", types_1.HttpStatusCode.BAD_REQUEST, "Invalid query parameters, limit and skip");
            const products = await product_modal_1.default.find()
                .populate("likes.user", "name email profilePic")
                .populate("comments.userId", "name email profilePic")
                .sort({ createdAt: -1 }) // newest first
                .limit(limit)
                .skip(skip);
            return products;
        }
        catch (err) {
            throw new BaseError_1.default("Get Product", types_1.HttpStatusCode.INTERNAL_SERVER, "Could not get products");
        }
    }
    async insertProduct(input) {
        console.log(input.userId);
        input.userId = (0, exports.toObjectId)(input.userId);
        const newProduct = new product_modal_1.default(input);
        try {
            return await newProduct.save();
        }
        catch (err) {
            throw new BaseError_1.default("Error", types_1.HttpStatusCode.INTERNAL_SERVER, "Could not insert product");
        }
    }
    async likeProduct(prodId, user) {
        const productId = (0, exports.toObjectId)(prodId);
        const userId = (0, exports.toObjectId)(user);
        try {
            const product = await product_modal_1.default.findOne({
                _id: productId,
                "likes.user": userId,
            });
            let updateQuery;
            if (product) {
                // Already liked → remove (dislike)
                updateQuery = { $pull: { likes: { user: userId } } };
            }
            else {
                // Not liked yet → add (like)
                updateQuery = { $push: { likes: { user: userId } } };
            }
            const updated = await product_modal_1.default.updateOne({ _id: productId }, updateQuery);
            return updated.modifiedCount;
        }
        catch (err) {
            throw new BaseError_1.default("Like Product", types_1.HttpStatusCode.INTERNAL_SERVER, "Could not like product");
        }
    }
    async addComment(comment, user, productId) {
        const userId = (0, exports.toObjectId)(user);
        const id = (0, exports.toObjectId)(productId);
        try {
            const updateProduct = await product_modal_1.default.updateOne({ _id: id }, { $push: { comments: { userId, content: comment } } });
            return updateProduct.modifiedCount;
        }
        catch (err) {
            throw new BaseError_1.default("Comment Product", types_1.HttpStatusCode.INTERNAL_SERVER, "Could not comment product");
        }
    }
    async getMyProducts(user) {
        try {
            const userId = (0, exports.toObjectId)(user);
            const products = await product_modal_1.default.find({ userId })
                .populate("likes.user", "name email profilePic")
                .populate("comments.userId", "name email profilePic")
                .sort({ createdAt: -1 });
            return products;
        }
        catch (err) {
            throw new BaseError_1.default("Get My Product", types_1.HttpStatusCode.INTERNAL_SERVER, "Could not get my products");
        }
    }
    async getSingleProduct(productId) {
        try {
            const id = (0, exports.toObjectId)(productId);
            const product = await product_modal_1.default.findOne({ _id: id })
                .populate("likes.user", "name email profilePic")
                .populate("comments.userId", "name email profilePic");
            return product;
        }
        catch (err) {
            throw new BaseError_1.default("Get Single Product", types_1.HttpStatusCode.INTERNAL_SERVER, "Could not get single product");
        }
    }
}
exports.ProductRepository = ProductRepository;
