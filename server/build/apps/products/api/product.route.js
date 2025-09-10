"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("./product.controller"));
const auth_middleware_1 = __importDefault(require("../../../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.get('/', product_controller_1.default.getProducts);
router.get('/me', auth_middleware_1.default, product_controller_1.default.getMyProducts);
router.get('/:id', product_controller_1.default.getSingleProduct);
router.post('/', auth_middleware_1.default, product_controller_1.default.createProduct);
router.put('/:id/like', auth_middleware_1.default, product_controller_1.default.likeProduct);
router.post('/:id/comment', auth_middleware_1.default, product_controller_1.default.addComment);
exports.default = router;
