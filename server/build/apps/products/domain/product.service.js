"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const BaseError_1 = __importDefault(require("../../../libraries/errors/BaseError"));
const types_1 = require("../../../types");
const product_repository_1 = require("../data-access/product.repository");
class ProductService {
    constructor() {
        this.prodRepo = new product_repository_1.ProductRepository();
    }
    async getProducts(limit, skip) {
        const products = await this.prodRepo.getProducts(limit, skip);
        return products;
    }
    async createProduct(productInput) {
        const product = await this.prodRepo.insertProduct(productInput);
        if (!product) {
            throw new BaseError_1.default("add product", types_1.HttpStatusCode.NOT_FOUND, "Product not found");
        }
        return product;
    }
    async likeProduct(productId, userId) {
        const like = await this.prodRepo.likeProduct(productId, userId);
        return like;
    }
    async addComment(comment, userId, productId) {
        const isCommentAdded = await this.prodRepo.addComment(comment, userId, productId);
        return isCommentAdded;
    }
    async getMyProducts(userId) {
        const products = await this.prodRepo.getMyProducts(userId);
        return products;
    }
    async getSingleProduct(productId) {
        const product = await this.prodRepo.getSingleProduct(productId);
        return product;
    }
}
exports.ProductService = ProductService;
